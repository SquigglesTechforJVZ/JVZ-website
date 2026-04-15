"use client";

import { useEffect, useState } from "react";

type LiveStatus = {
  isLive: boolean;
  title: string;
  game: string;
  viewerCount?: number;
  startedAt?: string | null;
  channelLogin?: string;
  channelName?: string;
  error?: string;
};

type YouTubeVideo = {
  id: string;
  title: string;
  description?: string;
  publishedAt?: string | null;
  thumbnail: string;
  url: string;
  embedUrl?: string;
};

export default function StreamingPlatformWebsite() {
  const [live, setLive] = useState<LiveStatus>({
    isLive: false,
    title: "Loading live status...",
    game: "Checking Twitch...",
    viewerCount: 0,
    startedAt: null,
  });

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [youtubeLoading, setYoutubeLoading] = useState(true);

  const schedule = [
    { day: "Monday", time: "7:00 PM ET", title: "Community Night" },
    { day: "Wednesday", time: "8:00 PM ET", title: "Ranked / Main Game" },
    { day: "Friday", time: "9:00 PM ET", title: "Late Night Chaos" },
    { day: "Sunday", time: "6:00 PM ET", title: "Chill Stream + Recap" },
  ];

  const clips = [
    "Big clutch moment",
    "Funniest community clip",
    "Best raid reaction",
    "Late-night chaos highlight",
  ];

  const featuredGames = [
    {
      title: "Gran Turismo 7",
      type: "Precision Racing",
      text: "Fast lines, smooth inputs, and controlled pace under pressure.",
    },
    {
      title: "Arc Raiders",
      type: "Extraction / Firefight",
      text: "Movement, awareness, and deadly precise decision-making in the middle of chaos.",
    },
    {
      title: "Variety Nights",
      type: "Community Energy",
      text: "Mix of racing, shooters, and live reactions built around the channel vibe.",
    },
  ];

  useEffect(() => {
    let mounted = true;

    async function loadLiveStatus() {
      try {
        const response = await fetch("/api/live-status", { cache: "no-store" });
        const json = await response.json();

        if (!mounted) return;

        setLive({
          isLive: Boolean(json.isLive),
          title: json.title || "Live status unavailable",
          game: json.game || "Could not load Twitch status",
          viewerCount: json.viewerCount || 0,
          startedAt: json.startedAt || null,
          channelLogin: json.channelLogin || "jvzfrmdablk",
          channelName: json.channelName || "JVZFrmDaBlk",
          error: json.error,
        });
      } catch {
        if (!mounted) return;

        setLive({
          isLive: false,
          title: "Live status unavailable",
          game: "Could not load Twitch status",
          viewerCount: 0,
          startedAt: null,
        });
      }
    }

    async function loadYouTubeFeed() {
      try {
        const response = await fetch("/api/youtube-feed", { cache: "no-store" });
        const json = await response.json();

        if (!mounted) return;

        setVideos(Array.isArray(json.videos) ? json.videos : []);
      } catch {
        if (!mounted) return;
        setVideos([]);
      } finally {
        if (mounted) setYoutubeLoading(false);
      }
    }

    loadLiveStatus();
    loadYouTubeFeed();

    const interval = setInterval(loadLiveStatus, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const featuredVideo = videos[0];
  const gridVideos = videos.slice(1, 7);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,105,30,0.25),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(80,70,20,0.18),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-amber-900/30 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(120,105,30,0.12)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">JVZFrmDaBlk</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
              Whether I’m behind the wheel or in the middle of a firefight, it’s all about being fast, smooth, and deadly precise.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="https://www.youtube.com/@jvzfrmdablk"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-amber-300 px-5 py-3 font-bold text-black shadow-[0_0_15px_rgba(200,180,60,0.4)]"
            >
              YouTube
            </a>
            <a
              href="https://www.twitch.tv/jvzfrmdablk"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-amber-300/20 bg-white/[0.02] px-5 py-3 text-white shadow-[0_0_10px_rgba(120,105,30,0.2)]"
            >
              Twitch
            </a>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.04] p-5 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex h-3 w-3 rounded-full ${
                  live.isLive ? "bg-red-500 animate-pulse" : "bg-zinc-500"
                }`}
              />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Live Status</p>
            </div>
            <h2 className="mt-3 text-2xl font-black">
              {live.isLive ? "LIVE NOW" : "Offline right now. Locked in soon."}
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {live.isLive
                ? "The channel is live right now. Jump in and catch the action as it happens."
                : "Catch uploads on YouTube and jump to Twitch when the stream goes live."}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-5 shadow-[0_0_30px_rgba(120,105,30,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Current Title</p>
            <p className="mt-3 text-xl font-bold">{live.title}</p>
            <p className="mt-2 text-sm text-white/70">
              {live.isLive
                ? "Pulled live from Twitch automatically."
                : "This updates automatically when the channel goes live."}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-5 shadow-[0_0_30px_rgba(120,105,30,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Current Focus</p>
            <p className="mt-3 text-xl font-bold">{live.game}</p>
            <p className="mt-2 text-sm text-white/70">
              {live.isLive
                ? `${live.viewerCount || 0} viewer${live.viewerCount === 1 ? "" : "s"} watching now.`
                : "Waiting for the next session."}
            </p>
          </div>
        </section>

        <section className="mb-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-4 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-amber-200">Live Broadcast</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  live.isLive
                    ? "border border-red-500/30 bg-red-500/15 text-red-200"
                    : "border border-white/10 bg-white/5 text-white/60"
                }`}
              >
                {live.isLive ? "LIVE" : "OFFLINE"}
              </span>
            </div>

            <div
              className={`aspect-video overflow-hidden rounded-2xl ${
                live.isLive ? "ring-2 ring-red-500/40 shadow-[0_0_25px_rgba(220,38,38,0.18)]" : ""
              }`}
            >
              <iframe
                src="https://player.twitch.tv/?channel=jvzfrmdablk&parent=jvz-website.vercel.app"
                className="h-full w-full"
                allowFullScreen
                title="JVZ Twitch Stream"
              />
            </div>
          </div>

          <section className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <div className="grid gap-6 md:grid-cols-1 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">About JVZFrmDaBlk</p>
                <h2 className="mt-2 text-3xl font-black md:text-4xl">Precision over panic. Speed over hesitation.</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                  JVZFrmDaBlk is built around control under pressure — whether it is chasing the cleanest line on the track, reading a firefight in real time, or locking into a high-focus live session.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
                  The channel blends racing precision, shooter awareness, and community energy into a style that stays sharp, smooth, and deliberate. Every stream, upload, and reaction is meant to feel clean, fast, and dialed in.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 shadow-[0_0_12px_rgba(120,105,30,0.08)]">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Style</p>
                  <p className="mt-3 text-lg font-bold">Clean Execution</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">Focused gameplay, sharp reactions, and steady control.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 shadow-[0_0_12px_rgba(120,105,30,0.08)]">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Focus</p>
                  <p className="mt-3 text-lg font-bold">Racing + Firefights</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">Built around speed, awareness, and decision-making under pressure.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 shadow-[0_0_12px_rgba(120,105,30,0.08)]">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Energy</p>
                  <p className="mt-3 text-lg font-bold">Community Locked In</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">Uploads, live streams, and chat that keep the whole page feeling active.</p>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="mb-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-4 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">YouTube Grid</p>
                <h2 className="mt-2 text-2xl font-black">Latest uploads, built like a real creator hub.</h2>
              </div>
              <a
                href="https://www.youtube.com/@jvzfrmdablk/videos"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-2xl border border-amber-300/20 bg-black/30 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:border-amber-300/40 hover:bg-black/50"
              >
                View all videos
              </a>
            </div>

            {youtubeLoading ? (
              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 p-3">
                  <div className="aspect-video animate-pulse rounded-[1.25rem] bg-white/5" />
                  <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-white/5" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/5" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-white/5" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse rounded-[1.5rem] border border-white/10 bg-black/30 p-3">
                      <div className="aspect-video rounded-xl bg-white/5" />
                      <div className="mt-3 h-4 rounded bg-white/5" />
                      <div className="mt-2 h-3 w-2/3 rounded bg-white/5" />
                    </div>
                  ))}
                </div>
              </div>
            ) : videos.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-[1.12fr_0.88fr]">
                <a
                  href={featuredVideo?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 shadow-[0_0_18px_rgba(120,105,30,0.08)] transition duration-300 hover:-translate-y-1 hover:border-amber-300/30 hover:shadow-[0_0_28px_rgba(200,180,60,0.12)]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {featuredVideo?.thumbnail ? (
                      <img
                        src={featuredVideo.thumbnail}
                        alt={featuredVideo.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-white/5 text-white/50">
                        No thumbnail available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex rounded-full border border-amber-300/20 bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-300 backdrop-blur">
                      Featured Upload
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="max-w-3xl text-2xl font-black leading-tight text-white md:text-3xl">
                        {featuredVideo?.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                      <span className="inline-flex h-2 w-2 rounded-full bg-amber-300" />
                      Latest pull from your YouTube feed
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/65">
                      Your newest upload gets hero placement automatically so the page always feels current.
                    </p>
                  </div>
                </a>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                  {gridVideos.map((video, index) => (
                    <a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex gap-3 rounded-[1.5rem] border border-white/10 bg-black/40 p-3 shadow-[0_0_12px_rgba(120,105,30,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/30 hover:bg-black/50 hover:shadow-[0_0_18px_rgba(200,180,60,0.1)]"
                    >
                      <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-xl bg-white/5">
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-white/40">
                            No image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute left-2 top-2 rounded-full border border-amber-300/20 bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300 backdrop-blur">
                          0{index + 1}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">YouTube</p>
                        <h4 className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-white">{video.title}</h4>
                        <p className="mt-2 text-xs text-white/50">Latest upload from the channel feed.</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-black/30 px-6 py-12 text-center">
                <p className="text-lg font-semibold">Could not load YouTube videos right now.</p>
                <p className="mt-2 text-sm text-white/65">Check your YouTube API key and channel ID in Vercel, then redeploy.</p>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Featured Games</p>
              <h2 className="mt-2 text-3xl font-black">Built for speed, control, and pressure.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3 md:grid-cols-1">
              {featuredGames.map((game) => (
                <div
                  key={game.title}
                  className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_0_12px_rgba(120,105,30,0.08)]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">{game.type}</p>
                  <h3 className="mt-3 text-xl font-bold">{game.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">{game.text}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="mb-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-4 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-amber-200">Twitch Chat</h2>
              <a
                href="https://www.twitch.tv/popout/jvzfrmdablk/chat?popout="
                target="_blank"
                rel="noreferrer"
                className="text-sm text-amber-300 hover:underline"
              >
                Open full chat
              </a>
            </div>
            <div className="h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                src="https://www.twitch.tv/embed/jvzfrmdablk/chat?parent=jvz-website.vercel.app"
                className="h-full w-full"
                title="JVZ Twitch Chat"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-4 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-amber-300">YouTube Community</h2>
              <a
                href="https://www.youtube.com/@jvzfrmdablk"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-amber-300 hover:underline"
              >
                Open channel
              </a>
            </div>
            <div className="flex h-[420px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/40 px-6 text-center">
              <div>
                <p className="text-lg font-semibold">YouTube does not provide a clean live chat embed for this layout.</p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Use this panel as a community hub for YouTube comments, Shorts, channel updates, or a direct jump to your channel page.
                </p>
                <a
                  href="https://www.youtube.com/@jvzfrmdablk"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-2xl bg-amber-300 px-5 py-3 font-bold text-black shadow-[0_0_15px_rgba(200,180,60,0.35)]"
                >
                  Go to YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-6 md:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <h2 className="mb-4 text-2xl font-bold">Highlights</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {clips.map((clip) => (
                <div
                  key={clip}
                  className="rounded-xl border border-white/10 bg-black/40 p-4 shadow-[0_0_12px_rgba(120,105,30,0.08)]"
                >
                  {clip}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <h2 className="mb-4 text-2xl font-bold">Schedule</h2>
            {schedule.map((item) => (
              <div key={item.day} className="flex justify-between border-b border-white/10 py-2">
                <span className="text-white/90">{item.day}</span>
                <span className="text-white/70">{item.time}</span>
                <span className="text-amber-200">{item.title}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
