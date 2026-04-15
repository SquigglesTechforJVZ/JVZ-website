"use client";

import { useEffect, useState, type CSSProperties } from "react";

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

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, rgba(120,105,30,0.25), transparent 40%), radial-gradient(circle at bottom right, rgba(80,70,20,0.18), transparent 40%), #000000",
    color: "#ffffff",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  container: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "24px",
  },
  card: {
    border: "1px solid rgba(120,105,30,0.35)",
    background: "rgba(255,255,255,0.04)",
    borderRadius: 24,
    boxShadow: "0 0 30px rgba(120,105,30,0.10)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    padding: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 54,
    fontWeight: 900,
    margin: 0,
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 10,
    maxWidth: 760,
    color: "rgba(255,255,255,0.72)",
    fontSize: 20,
    lineHeight: 1.5,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  buttonPrimary: {
    display: "inline-block",
    background: "#d4af37",
    color: "#000",
    padding: "14px 22px",
    borderRadius: 16,
    textDecoration: "none",
    fontWeight: 800,
    boxShadow: "0 0 16px rgba(212,175,55,0.35)",
  },
  buttonSecondary: {
    display: "inline-block",
    background: "rgba(255,255,255,0.03)",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: 16,
    textDecoration: "none",
    fontWeight: 700,
    border: "1px solid rgba(212,175,55,0.22)",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
    marginBottom: 24,
  },
  gridMainSide: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 24,
    marginBottom: 24,
  },
  gridTwo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    marginBottom: 24,
  },
  panel: {
    padding: 22,
  },
  smallLabel: {
    color: "#d4af37",
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: 900,
    margin: "4px 0 14px 0",
  },
  statusDotWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  statusDotLive: {
    width: 12,
    height: 12,
    borderRadius: 999,
    background: "#ef4444",
    boxShadow: "0 0 14px rgba(239,68,68,0.7)",
  },
  statusDotOff: {
    width: 12,
    height: 12,
    borderRadius: 999,
    background: "#666",
  },
  liveBadge: {
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1,
    border: "1px solid rgba(255,255,255,0.12)",
  },
  iframeWrap: {
    overflow: "hidden",
    borderRadius: 18,
    background: "#050505",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  aboutCards: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 14,
    marginTop: 18,
  },
  aboutMiniCard: {
    borderRadius: 18,
    padding: 18,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  youtubeLayout: {
    display: "grid",
    gridTemplateColumns: "1.12fr 0.88fr",
    gap: 16,
  },
  featuredVideo: {
    overflow: "hidden",
    borderRadius: 24,
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.08)",
    textDecoration: "none",
    color: "#fff",
  },
  featuredVideoImageWrap: {
    position: "relative",
    aspectRatio: "16 / 9",
    overflow: "hidden",
    background: "rgba(255,255,255,0.05)",
  },
  featuredVideoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  overlayBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#d4af37",
    background: "rgba(0,0,0,0.55)",
    border: "1px solid rgba(212,175,55,0.22)",
  },
  overlayGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.15), transparent)",
  },
  overlayTitleWrap: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
  sideVideoList: {
    display: "grid",
    gap: 12,
  },
  sideVideoCard: {
    display: "flex",
    gap: 12,
    borderRadius: 20,
    padding: 12,
    background: "rgba(0,0,0,0.40)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    textDecoration: "none",
  },
  thumbWrap: {
    width: 160,
    height: 96,
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: 14,
    background: "rgba(255,255,255,0.05)",
    position: "relative",
  },
  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  gameList: {
    display: "grid",
    gap: 14,
  },
  gameCard: {
    borderRadius: 18,
    padding: 18,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  chatBox: {
    height: 420,
  },
  highlightsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  highlightCard: {
    borderRadius: 16,
    padding: 16,
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  scheduleRow: {
    display: "grid",
    gridTemplateColumns: "0.9fr 0.8fr 1.1fr",
    gap: 12,
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  muted: {
    color: "rgba(255,255,255,0.65)",
  },
  centerFallback: {
    borderRadius: 20,
    border: "1px dashed rgba(255,255,255,0.18)",
    padding: 32,
    textAlign: "center",
    background: "rgba(0,0,0,0.30)",
  },
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
    <div style={styles.page}>
      <div style={styles.container}>
        <section style={{ ...styles.card, ...styles.header }}>
          <div>
            <h1 style={styles.title}>JVZFrmDaBlk</h1>
            <p style={styles.subtitle}>
              Whether I’m behind the wheel or in the middle of a firefight, it’s all about being fast, smooth, and deadly precise.
            </p>
          </div>
          <div style={styles.buttonRow}>
            <a href="https://www.youtube.com/@jvzfrmdablk" target="_blank" rel="noreferrer" style={styles.buttonPrimary}>
              YouTube
            </a>
            <a href="https://www.twitch.tv/jvzfrmdablk" target="_blank" rel="noreferrer" style={styles.buttonSecondary}>
              Twitch
            </a>
          </div>
        </section>

        <section style={styles.grid3}>
          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={styles.statusDotWrap}>
              <span style={live.isLive ? styles.statusDotLive : styles.statusDotOff} />
              <div style={styles.smallLabel}>Live Status</div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 10 }}>
              {live.isLive ? "LIVE NOW" : "Offline right now. Locked in soon."}
            </div>
            <div style={styles.muted}>
              {live.isLive
                ? "The channel is live right now. Jump in and catch the action as it happens."
                : "Catch uploads on YouTube and jump to Twitch when the stream goes live."}
            </div>
          </div>

          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={styles.smallLabel}>Current Title</div>
            <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.3 }}>{live.title}</div>
            <div style={{ ...styles.muted, marginTop: 10 }}>
              {live.isLive ? "Pulled live from Twitch automatically." : "This updates automatically when the channel goes live."}
            </div>
          </div>

          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={styles.smallLabel}>Current Focus</div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{live.game}</div>
            <div style={{ ...styles.muted, marginTop: 10 }}>
              {live.isLive ? `${live.viewerCount || 0} viewer${live.viewerCount === 1 ? "" : "s"} watching now.` : "Waiting for the next session."}
            </div>
          </div>
        </section>

        <section style={styles.gridMainSide}>
          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900 }}>Live Broadcast</div>
              <span
                style={{
                  ...styles.liveBadge,
                  color: live.isLive ? "#fecaca" : "rgba(255,255,255,0.7)",
                  background: live.isLive ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)",
                  border: live.isLive ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {live.isLive ? "LIVE" : "OFFLINE"}
              </span>
            </div>
            <div
              style={{
                ...styles.iframeWrap,
                boxShadow: live.isLive ? "0 0 24px rgba(239,68,68,0.22)" : undefined,
                border: live.isLive ? "2px solid rgba(239,68,68,0.35)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <iframe
                src="https://player.twitch.tv/?channel=jvzfrmdablk&parent=jvz-website.vercel.app"
                style={{ width: "100%", height: 460, border: 0, display: "block" }}
                allowFullScreen
                title="JVZ Twitch Stream"
              />
            </div>
          </div>

          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={styles.smallLabel}>About JVZFrmDaBlk</div>
            <div style={styles.sectionTitle}>Precision over panic. Speed over hesitation.</div>
            <p style={{ ...styles.muted, fontSize: 18, lineHeight: 1.6 }}>
              JVZFrmDaBlk is built around control under pressure — whether it is chasing the cleanest line on the track, reading a firefight in real time, or locking into a high-focus live session.
            </p>
            <p style={{ ...styles.muted, fontSize: 18, lineHeight: 1.6 }}>
              The channel blends racing precision, shooter awareness, and community energy into a style that stays sharp, smooth, and deliberate.
            </p>
            <div style={styles.aboutCards}>
              <div style={styles.aboutMiniCard}>
                <div style={styles.smallLabel}>Style</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>Clean Execution</div>
                <div style={{ ...styles.muted, marginTop: 8 }}>Focused gameplay, sharp reactions, and steady control.</div>
              </div>
              <div style={styles.aboutMiniCard}>
                <div style={styles.smallLabel}>Focus</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>Racing + Firefights</div>
                <div style={{ ...styles.muted, marginTop: 8 }}>Built around speed, awareness, and decision-making under pressure.</div>
              </div>
              <div style={styles.aboutMiniCard}>
                <div style={styles.smallLabel}>Energy</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>Community Locked In</div>
                <div style={{ ...styles.muted, marginTop: 8 }}>Uploads, live streams, and chat that keep the whole page feeling active.</div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.gridMainSide}>
          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={styles.smallLabel}>YouTube Grid</div>
                <div style={{ fontSize: 30, fontWeight: 900 }}>Latest uploads, built like a real creator hub.</div>
              </div>
              <a href="https://www.youtube.com/@jvzfrmdablk/videos" target="_blank" rel="noreferrer" style={styles.buttonSecondary}>
                View all videos
              </a>
            </div>

            {youtubeLoading ? (
              <div style={styles.centerFallback}>Loading YouTube videos...</div>
            ) : videos.length > 0 ? (
              <div style={styles.youtubeLayout}>
                <a href={featuredVideo?.url} target="_blank" rel="noreferrer" style={styles.featuredVideo}>
                  <div style={styles.featuredVideoImageWrap}>
                    {featuredVideo?.thumbnail ? (
                      <img src={featuredVideo.thumbnail} alt={featuredVideo.title} style={styles.featuredVideoImg} />
                    ) : null}
                    <div style={styles.overlayGradient} />
                    <div style={styles.overlayBadge}>Featured Upload</div>
                    <div style={styles.overlayTitleWrap}>
                      <div style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.15 }}>{featuredVideo?.title}</div>
                    </div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={styles.smallLabel}>Latest pull from your YouTube feed</div>
                    <div style={styles.muted}>Your newest upload gets hero placement automatically so the page always feels current.</div>
                  </div>
                </a>

                <div style={styles.sideVideoList}>
                  {gridVideos.map((video, index) => (
                    <a key={video.id} href={video.url} target="_blank" rel="noreferrer" style={styles.sideVideoCard}>
                      <div style={styles.thumbWrap}>
                        {video.thumbnail ? <img src={video.thumbnail} alt={video.title} style={styles.thumbImg} /> : null}
                        <div style={{ ...styles.overlayBadge, top: 8, left: 8, fontSize: 10, padding: "4px 8px" }}>
                          0{index + 1}
                        </div>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ ...styles.smallLabel, marginBottom: 6 }}>YouTube</div>
                        <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.4 }}>{video.title}</div>
                        <div style={{ ...styles.muted, marginTop: 10, fontSize: 13 }}>Latest upload from the channel feed.</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div style={styles.centerFallback}>Could not load YouTube videos right now.</div>
            )}
          </div>

          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={styles.smallLabel}>Featured Games</div>
            <div style={styles.sectionTitle}>Built for speed, control, and pressure.</div>
            <div style={styles.gameList}>
              {featuredGames.map((game) => (
                <div key={game.title} style={styles.gameCard}>
                  <div style={styles.smallLabel}>{game.type}</div>
                  <div style={{ fontSize: 24, fontWeight: 800 }}>{game.title}</div>
                  <div style={{ ...styles.muted, marginTop: 10, lineHeight: 1.6 }}>{game.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.gridTwo}>
          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900 }}>Twitch Chat</div>
              <a href="https://www.twitch.tv/popout/jvzfrmdablk/chat?popout=" target="_blank" rel="noreferrer" style={styles.buttonSecondary}>
                Open full chat
              </a>
            </div>
            <div style={styles.iframeWrap}>
              <iframe
                src="https://www.twitch.tv/embed/jvzfrmdablk/chat?parent=jvz-website.vercel.app"
                style={{ width: "100%", height: styles.chatBox.height as number, border: 0, display: "block" }}
                title="JVZ Twitch Chat"
              />
            </div>
          </div>

          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 900 }}>YouTube Community</div>
              <a href="https://www.youtube.com/@jvzfrmdablk" target="_blank" rel="noreferrer" style={styles.buttonSecondary}>
                Open channel
              </a>
            </div>
            <div style={{ ...styles.centerFallback, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800 }}>YouTube does not provide a clean live chat embed for this layout.</div>
              <div style={{ ...styles.muted, marginTop: 12, lineHeight: 1.7 }}>
                Use this panel as a community hub for YouTube comments, Shorts, channel updates, or a direct jump to your channel page.
              </div>
              <div style={{ marginTop: 20 }}>
                <a href="https://www.youtube.com/@jvzfrmdablk" target="_blank" rel="noreferrer" style={styles.buttonPrimary}>
                  Go to YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        <section style={{ ...styles.gridMainSide, gridTemplateColumns: "1fr 0.9fr" }}>
          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={{ fontSize: 30, fontWeight: 900, marginBottom: 16 }}>Highlights</div>
            <div style={styles.highlightsGrid}>
              {clips.map((clip) => (
                <div key={clip} style={styles.highlightCard}>
                  {clip}
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...styles.card, ...styles.panel }}>
            <div style={{ fontSize: 30, fontWeight: 900, marginBottom: 16 }}>Schedule</div>
            {schedule.map((item) => (
              <div key={item.day} style={styles.scheduleRow}>
                <div>{item.day}</div>
                <div style={styles.muted}>{item.time}</div>
                <div style={{ color: "#f4d03f" }}>{item.title}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
