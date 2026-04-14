export default function StreamingPlatformWebsite() {
  const schedule = [
    { day: "Monday", time: "7:00 PM ET", title: "Community Night" },
    { day: "Wednesday", time: "8:00 PM ET", title: "Main Content / Ranked" },
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(180,160,60,0.18),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        {/* HEADER */}
        <header className="mb-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
              YouTube-First Platform
            </p>
            <h1 className="mt-2 text-4xl font-black">JVZFrmDaBlk</h1>
            <p className="mt-2 text-white/70">
              YouTube first. Twitch live. Community always.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="https://www.youtube.com/@jvzfrmdablk"
              target="_blank"
              className="rounded-2xl bg-yellow-300 px-5 py-3 font-bold text-black"
            >
              YouTube
            </a>
            <a
              href="https://www.twitch.tv/jvzfrmdablk"
              target="_blank"
              className="rounded-2xl border border-white/20 px-5 py-3"
            >
              Twitch
            </a>
          </div>
        </header>

        {/* YOUTUBE EMBED */}
        <div className="rounded-3xl border border-white/10 p-4 mb-6">
          <h2 className="mb-3 text-xl font-bold text-yellow-300">
            Featured YouTube Content
          </h2>

          <div className="aspect-video overflow-hidden rounded-2xl">
           <iframe
  className="w-full h-full"
  src="https://www.youtube.com/embed?listType=user_uploads&list=UU"
  title="YouTube videos"
  allowFullScreen
/>
          </div>
        </div>

        {/* TWITCH EMBED */}
        <div className="rounded-3xl border border-white/10 p-4 mb-6">
          <h2 className="mb-3 text-xl font-bold text-purple-400">
            Live on Twitch
          </h2>

          <div className="aspect-video overflow-hidden rounded-2xl">
            <iframe
              src="https://player.twitch.tv/?channel=jvzfrmdablk&parent=jvz-website.vercel.app"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="rounded-3xl border border-white/10 p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Schedule</h2>
          {schedule.map((item) => (
            <div key={item.day} className="flex justify-between py-2 border-b border-white/10">
              <span>{item.day}</span>
              <span>{item.time}</span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>

        {/* CLIPS */}
        <div className="rounded-3xl border border-white/10 p-6">
          <h2 className="text-2xl font-bold mb-4">Highlights</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {clips.map((clip) => (
              <div key={clip} className="bg-white/5 p-4 rounded-xl">
                {clip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

