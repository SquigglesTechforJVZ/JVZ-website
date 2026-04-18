import { NextResponse } from "next/server";

type YouTubeSearchResponse = {
  items?: Array<{
    id?: {
      videoId?: string;
    };
    snippet?: {
      title?: string;
      liveBroadcastContent?: string;
    };
  }>;
};

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      throw new Error("Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID");
    }

    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("channelId", channelId);
    url.searchParams.set("eventType", "live");
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "1");
    url.searchParams.set("key", apiKey);

const res = await fetch(url.toString(), {
  next: { revalidate: 60 },
});
      const text = await res.text();
      throw new Error(`Failed to get YouTube live status: ${res.status} ${text}`);
    }

    const json = (await res.json()) as YouTubeSearchResponse;
    const item = json.items?.[0];
    const videoId = item?.id?.videoId;
    const title = item?.snippet?.title || "";

    if (!videoId) {
      return NextResponse.json({
        isLive: false,
        videoId: null,
        title: "",
      });
    }

    return NextResponse.json({
      isLive: true,
      videoId,
      title,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json(
      {
        isLive: false,
        videoId: null,
        title: "",
        error: message,
      },
      { status: 500 }
    );
  }
}
