export default function StreamingPlatformWebsite() {
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

  const isLive = false;
  const liveTitle = "JVZFrmDaBlk is currently offline";
  const liveGame = "Waiting for the next session";

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Stealth background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,105,30,0.25),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(80,70,20,0.18),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        {/* HEADER */}
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

        {/* LIVE STATUS BAR */}
        <section className="mb-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.04] p-5 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
            <div className="flex items-center gap-3">
              <span className={`inline-flex h-3 w-3 rounded-full ${isLive ? "bg-red-500 animate-pulse" : "bg-zinc-500"}`} />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Live Status</p>
            </div>
            <h2 className="mt-3 text-2xl font-black">{isLive ? "LIVE NOW" : "Offline right now. Locked in soon."}</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {isLive
                ? "The channel is live right now. Jump in and catch the action as it happens."
                : "Catch uploads on YouTube and jump to Twitch when the stream goes live."}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-5 shadow-[0_0_30px_rgba(120,105,30,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Current Title</p>
            <p className="mt-3 text-xl font-bold">{liveTitle}</p>
            <p className="mt-2 text-sm text-white/70">Update this text when you change stream themes, uploads, or featured sessions.</p>
          </div>

          <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-5 shadow-[0_0_30px_rgba(120,105,30,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Current Focus</p>
            <p className="mt-3 text-xl font-bold">{liveGame}</p>
            <p className="mt-2 text-sm text-white/70">Use this for the game, content category, or event you are currently running.</p>
          </div>
        </section>

        {/* YOUTUBE */}
        <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-4 mb-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
          <h2 className="mb-3 text-xl font-bold text-amber-300">Featured Content</h2>

          <div className={`aspect-video overflow-hidden rounded-2xl ${isLive ? "ring-2 ring-red-500/40 shadow-[0_0_25px_rgba(220,38,38,0.18)]" : ""}`}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/videoseries?list=UU"
              title="JVZ YouTube"
              allowFullScreen
            />
          </div>
        </div>

        {/* CHAT EMBEDS */}
        <section className="mb-6 grid gap-6 lg:grid-cols-2">
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

        {/* FEATURED GAMES */}
        <section className="mb-6 rounded-3xl border border-amber-900/30 bg-white/[0.03] p-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Featured Games</p>
            <h2 className="mt-2 text-3xl font-black">Built for speed, control, and pressure.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
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

        {/* TWITCH */}
        <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-4 mb-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-amber-200">Live Broadcast</h2>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${isLive ? "border border-red-500/30 bg-red-500/15 text-red-200" : "border border-white/10 bg-white/5 text-white/60"}`}>
              {isLive ? "LIVE" : "OFFLINE"}
            </span>
          </div>

          <div className={`aspect-video overflow-hidden rounded-2xl ${isLive ? "ring-2 ring-red-500/40 shadow-[0_0_25px_rgba(220,38,38,0.18)]" : ""}`}
            <iframe
              src="https://player.twitch.tv/?channel=jvzfrmdablk&parent=jvz-website.vercel.app"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-6 mb-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
          <h2 className="text-2xl font-bold mb-4">Schedule</h2>
          {schedule.map((item) => (
            <div key={item.day} className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/90">{item.day}</span>
              <span className="text-white/70">{item.time}</span>
              <span className="text-amber-200">{item.title}</span>
            </div>
          ))}
        </div>

        {/* CLIPS */}
        <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
          <h2 className="text-2xl font-bold mb-4">Highlights</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {clips.map((clip) => (
              <div key={clip} className="bg-black/40 border border-white/10 p-4 rounded-xl shadow-[0_0_12px_rgba(120,105,30,0.08)]">
                {clip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
