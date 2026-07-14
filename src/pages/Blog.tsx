import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Code2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Dasturlash tillari ma'lumotlari
const skills = [
  {
    name: "Java",
    icon: "☕",
    color: "from-red-500 to-orange-500",
    ring: "border-orange-400/60",
    desc: "Backend dasturlash",
  },
  {
    name: "React",
    icon: "⚛️",
    color: "from-cyan-400 to-sky-500",
    ring: "border-cyan-400/60",
    desc: "Frontend framework",
  },
  {
    name: "Python",
    icon: "🐍",
    color: "from-sky-400 to-amber-400",
    ring: "border-sky-400/60",
    desc: "Ko'p maqsadli til",
  },
  {
    name: "Vite",
    icon: "⚡",
    color: "from-violet-400 to-amber-300",
    ring: "border-violet-400/60",
    desc: "Tez build tool",
  },
  {
    name: "HTML",
    icon: "🌐",
    color: "from-orange-400 to-red-400",
    ring: "border-orange-400/60",
    desc: "Web markup",
  },
];

const ORBIT_DURATION = 22; // seconds — icons endi doim aylanib turadi
const ORBIT_RADIUS = 108; // px

export function Blog() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Faol til nomini avtomatik almashtirish (orbitadan mustaqil)
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSkill = () => setCurrentIndex((prev) => (prev + 1) % skills.length);
  const prevSkill = () =>
    setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length);

  const playState = isAutoPlay ? "running" : "paused";

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* keyframes for the orbit ring + counter-spin icons */}
      <style>{`
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-counter-spin { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>

      {/* Background: stadion tungi foni + maydon chizig'i gridi */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] bg-amber-500/5 rounded-full blur-[150px]"
          animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full mx-auto relative z-10"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-zinc-400 text-xs tracking-[0.2em]">
              MEN HAQIMDA
            </span>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/40"
        >
          {/* Profile */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-zinc-800">
            <motion.div whileHover={{ scale: 1.05, rotate: -4 }} className="relative shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center">
                <span className="text-5xl md:text-6xl">👨‍💻</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-zinc-950 border-2 border-amber-400/60 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
            </motion.div>

            <div className="text-center md:text-left flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display uppercase tracking-wide text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3"
              >
                Erkinov Ziyodullo
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-zinc-400 text-sm"
              >
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  2005 yil 29-iyun
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  Andijon
                </span>
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  IT sohasi
                </span>
              </motion.div>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-zinc-300 text-base md:text-lg font-light leading-relaxed text-center mb-10 max-w-2xl mx-auto"
          >
            Hozirda IT sohasini mukammal o'rganyapman.{" "}
            <span className="text-orange-400 font-medium">Java</span>,{" "}
            <span className="text-cyan-400 font-medium">React</span>,{" "}
            <span className="text-sky-400 font-medium">Python</span>,{" "}
            <span className="text-violet-400 font-medium">Vite</span> va{" "}
            <span className="text-orange-400 font-medium">HTML</span>{" "}
            tillarini mukammal bilaman.
          </motion.p>

          {/* Skills Orbit */}
          <div className="relative flex flex-col items-center">
            <h3 className="font-mono text-zinc-500 text-xs tracking-[0.25em] text-center mb-8">
              BILADIGAN TILLARIM
            </h3>

            <div className="relative flex items-center justify-center">
              {/* Nav buttons */}
              <button
                onClick={prevSkill}
                aria-label="Oldingi til"
                className="absolute left-0 z-20 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 p-2 rounded-full transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSkill}
                aria-label="Keyingi til"
                className="absolute right-0 z-20 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 p-2 rounded-full transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Orbit track (visual guide ring) */}
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border border-dashed border-zinc-800" />

              {/* Rotating ring — continuously spins */}
              <div
                className="absolute inset-0"
                style={{
                  animation: `orbit-spin ${ORBIT_DURATION}s linear infinite`,
                  animationPlayState: playState,
                }}
              >
                {skills.map((skill, index) => {
                  const angle = (360 / skills.length) * index;
                  const isActive = currentIndex === index;
                  return (
                    <div
                      key={skill.name}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translate(${ORBIT_RADIUS}px) rotate(${-angle}deg) translate(-50%, -50%)`,
                      }}
                    >
                      {/* counter-rotates so the icon itself always stays upright */}
                      <div
                        style={{
                          animation: `orbit-counter-spin ${ORBIT_DURATION}s linear infinite`,
                          animationPlayState: playState,
                        }}
                      >
                        <button
                          onClick={() => setCurrentIndex(index)}
                          aria-label={skill.name}
                          className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${skill.color} bg-opacity-10 flex items-center justify-center transition-all duration-300 border-2 ${
                            isActive
                              ? `${skill.ring} scale-110 shadow-lg shadow-black/40`
                              : "border-zinc-800 opacity-70 hover:opacity-100"
                          } bg-zinc-900`}
                        >
                          <span className="text-2xl md:text-3xl">{skill.icon}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active skill label */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mt-8"
            >
              <h4
                className={`font-display uppercase tracking-wide text-xl md:text-2xl font-semibold bg-gradient-to-r ${skills[currentIndex].color} bg-clip-text text-transparent`}
              >
                {skills[currentIndex].name}
              </h4>
              <p className="text-zinc-500 text-sm mt-1">{skills[currentIndex].desc}</p>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {skills.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`${skills[index].name} tanlash`}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? "w-6 h-1.5 bg-emerald-500"
                      : "w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            {/* Play/Pause — endi oddiy oqim ichida, hech narsaga qoplanmaydi */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="mt-5 text-zinc-500 hover:text-emerald-400 transition-colors duration-300 text-xs font-mono tracking-widest flex items-center gap-2"
            >
              <span>{isAutoPlay ? "⏸" : "▶"}</span>
              <span>{isAutoPlay ? "TO'XTATISH" : "DAVOM ETTIRISH"}</span>
            </button>
          </div>
        </motion.div>

        {/* Footer quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex items-center justify-center gap-4 text-zinc-700 text-xs font-mono"
        >
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-zinc-700" />
          <span className="tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">✧</span>
            Gap ko'p — amal qilish qiyin
            <span className="text-emerald-500">✧</span>
          </span>
          <span className="w-6 h-px bg-gradient-to-l from-transparent to-zinc-700" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-zinc-600 text-xs text-center mt-4 font-light tracking-wider"
        >
          lekin harakat qilish kerak ✦
        </motion.p>
      </motion.div>
    </div>
  );
}