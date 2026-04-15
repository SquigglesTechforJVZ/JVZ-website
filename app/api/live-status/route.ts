import { NextResponse } from "next/server";

type TwitchTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
};

type TwitchUsersResponse = {
  data: TwitchUser[];
};

type TwitchStream = {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
};

type TwitchStreamsResponse = {
  data: TwitchStream[];
};

async function getTwitchAppToken() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get Twitch token: ${res.status} ${text}`);
  }

  const json = (await res.json()) as TwitchTokenResponse;
  return json.access_token;
}

async function getTwitchUserId(login: string, accessToken: string) {
  const clientId = process.env.TWITCH_CLIENT_ID!;
  const url = new URL("https://api.twitch.tv/helix/users");
  url.searchParams.set("login", login);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": clientId,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get Twitch user: ${res.status} ${text}`);
  }

  const json = (await res.json()) as TwitchUsersResponse;
  const user = json.data[0];

  if (!user) {
    throw new Error(`Twitch user not found for login: ${login}`);
  }

  return user;
}

export async function GET() {
  try {
    const login = process.env.TWITCH_CHANNEL_LOGIN || "jvzfrmdablk";
    const accessToken = await getTwitchAppToken();
    const user = await getTwitchUserId(login, accessToken);
    const clientId = process.env.TWITCH_CLIENT_ID!;

    const url = new URL("https://api.twitch.tv/helix/streams");
    url.searchParams.set("user_id", user.id);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to get Twitch stream: ${res.status} ${text}`);
    }

    const json = (await res.json()) as TwitchStreamsResponse;
    const stream = json.data[0];

    if (!stream) {
      return NextResponse.json({
        isLive: false,
        title: `${user.display_name} is currently offline`,
        game: "Waiting for the next session",
        viewerCount: 0,
        startedAt: null,
        channelLogin: user.login,
        channelName: user.display_name,
      });
    }

    return NextResponse.json({
      isLive: true,
      title: stream.title,
      game: stream.game_name || "Live now",
      viewerCount: stream.viewer_count,
      startedAt: stream.started_at,
      thumbnailUrl: stream.thumbnail_url
        .replace("{width}", "1280")
        .replace("{height}", "720"),
      channelLogin: stream.user_login,
      channelName: stream.user_name,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json(
      {
        isLive: false,
        title: "Live status unavailable",
        game: "Could not load Twitch status",
        error: message,
      },
      { status: 500 }
    );
  }
}
