import { NextResponse } from "next/server";

type YouTubeChannelListResponse = {
  items?: Array<{
    id: string;
    snippet?: {
      title?: string;
    };
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
};

type YouTubePlaylistItemsResponse = {
  items?: Array<{
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      channelTitle?: string;
      resourceId?: {
        videoId?: string;
      };
      thumbnails?: {
        maxres?: { url: string };
        standard?: { url: string };
        high?: { url: string };
        medium?: { url: string };
        default?: { url: string };
      };
    };
  }>;
};

function pickThumbnail(
  thumbnails:
    | {
        maxres?: { url: string };
        standard?: { url: string };
        high?: { url: string };
        medium?: { url: string };
        default?: { url: string };
      }
    | undefined
) {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    ""
  );
}

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      throw new Error("Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID");
    }

    const channelUrl = new URL(
      "https://www.googleapis.com/youtube/v3/channels"
    );
    channelUrl.searchParams.set("part", "contentDetails,snippet");
    channelUrl.searchParams.set("id", channelId);
    channelUrl.searchParams.set("key", apiKey);

const channelRes = await fetch(channelUrl.toString(), {
  next: { revalidate: 3600 },
});;

    if (!channelRes.ok) {
      const text = await channelRes.text();
      throw new Error(
        `Failed to get YouTube channel: ${channelRes.status} ${text}`
      );
    }

    const channelJson =
      (await channelRes.json()) as YouTubeChannelListResponse;
    const channel = channelJson.items?.[0];
    const uploadsPlaylistId = channel?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error("Uploads playlist not found for YouTube channel");
    }

    const playlistUrl = new URL(
      "https://www.googleapis.com/youtube/v3/playlistItems"
    );
    playlistUrl.searchParams.set("part", "snippet");
    playlistUrl.searchParams.set("playlistId", uploadsPlaylistId);
    playlistUrl.searchParams.set("maxResults", "8");
    playlistUrl.searchParams.set("key", apiKey);

const playlistRes = await fetch(playlistUrl.toString(), {
  next: { revalidate: 3600 },
});

    if (!playlistRes.ok) {
      const text = await playlistRes.text();
      throw new Error(
        `Failed to get YouTube playlist items: ${playlistRes.status} ${text}`
      );
    }

    const playlistJson =
      (await playlistRes.json()) as YouTubePlaylistItemsResponse;

    const videos = (playlistJson.items || [])
      .map((item) => {
        const snippet = item.snippet;
        const videoId = snippet?.resourceId?.videoId;

        if (!videoId) return null;

        return {
          id: videoId,
          title: snippet?.title || "Untitled video",
          description: snippet?.description || "",
          publishedAt: snippet?.publishedAt || null,
          channelTitle: snippet?.channelTitle || channel?.snippet?.title || "",
          thumbnail: pickThumbnail(snippet?.thumbnails),
          url: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        };
      })
      .filter(Boolean);

return NextResponse.json(
  {
    channelId,
    channelTitle: channel?.snippet?.title || "YouTube Channel",
    uploadsPlaylistId,
    videos,
  },
  {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=7200",
    },
  }
);
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
  {
    status: 500,
    headers: {
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  }
);
