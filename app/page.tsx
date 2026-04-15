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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Stealth background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,105,30,0.25),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(80,70,20,0.18),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">

        {/* HEADER */}
        <header className="mb-10 flex flex-col gap-4 rounded-3xl border border-amber-900/30 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(120,105,30,0.12)] backdrop-blur md:flex-row md:items-center md:justify-between">
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

        {/* YOUTUBE */}
        <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-4 mb-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
          <h2 className="mb-3 text-xl font-bold text-amber-300">Featured Content</h2>

          <div className="aspect-video overflow-hidden rounded-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/videoseries?list=UU"
              title="JVZ YouTube"
              allowFullScreen
            />
          </div>
        </div>

        {/* TWITCH */}
        <div className="rounded-3xl border border-amber-900/30 bg-white/[0.03] p-4 mb-6 shadow-[0_0_30px_rgba(120,105,30,0.1)]">
          <h2 className="mb-3 text-xl font-bold text-amber-200">Live Broadcast</h2>

          <div className="aspect-video overflow-hidden rounded-2xl">
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
