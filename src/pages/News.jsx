import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Ekran devorlariga tegib sakraydigan realistik Chempionlar ligasi to'pi
function BouncingUCLBall() {
  const ballRef = useRef(null);

  useEffect(() => {
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 100);
    let vx = (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 0.8);
    let vy = (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 0.8);
    let rotation = 0;
    let animId;

    const size = window.innerWidth < 640 ? 70 : 95;

    const animate = () => {
      x += vx;
      y += vy;
      rotation += (vx + vy) * 0.8;

      const maxX = window.innerWidth - size;
      const maxY = window.innerHeight - size;

      if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx);
      } else if (x <= 0) {
        x = 0;
        vx = Math.abs(vx);
      }

      if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy);
      } else if (y <= 0) {
        y = 0;
        vy = Math.abs(vy);
      }

      if (ballRef.current) {
        ballRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={ballRef}
      className="pointer-events-none fixed top-0 left-0 z-0 size-[70px] sm:size-[95px] select-none opacity-45 will-change-transform"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]"
      >
        <defs>
          <radialGradient id="uclSphereNews" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#uclSphereNews)" stroke="#0f172a" strokeWidth="2.5" />
        <g fill="#090d16" stroke="#1d4ed8" strokeWidth="1">
          <polygon points="50,28 55,41 69,41 58,50 62,63 50,55 38,63 42,50 31,41 45,41" />
          <polygon points="26,14 30,24 41,24 32,31 35,41 26,35 17,41 20,31 11,24 22,24" />
          <polygon points="74,14 78,24 89,24 80,31 83,41 74,35 65,41 68,31 59,24 70,24" />
          <polygon points="76,60 80,70 91,70 82,77 85,87 76,81 67,87 70,77 61,70 72,70" />
          <polygon points="24,60 28,70 39,70 30,77 33,87 24,81 15,87 18,77 9,70 20,70" />
        </g>
      </svg>
    </div>
  );
}

export function News() {
  const line1 = "Yangiliklar hozircha mavjud emas...";
  const line2 = "Gapingiz bo'lsa, bemalol yozing:";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  // 3D Parallax Tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), {
    stiffness: 180,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // 1-qator
  useEffect(() => {
    if (index1 < line1.length) {
      const t = setTimeout(() => {
        setText1((prev) => prev + line1[index1]);
        setIndex1((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(t);
    }
  }, [index1, line1]);

  // 2-qator
  useEffect(() => {
    if (index1 >= line1.length && index2 < line2.length) {
      const t = setTimeout(() => {
        setText2((prev) => prev + line2[index2]);
        setIndex2((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(t);
    }
  }, [index1, line1.length, index2, line2]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#0d1117] flex flex-col items-center justify-center p-4 sm:p-8 antialiased selection:bg-amber-300 selection:text-neutral-900 overflow-hidden"
    >
      {/* Devorlarga urilib sakraydigan UCL to'pi */}
      <BouncingUCLBall />

      {/* Kinematik fon nurlari */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-amber-500/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />
      </div>

      {/* Tepadagi navigatsiya paneli */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl flex items-center justify-between mb-6 px-1 z-50"
      >
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-4 py-1.5 text-xs font-medium text-white border border-white/15 backdrop-blur-md shadow-md transition-all active:scale-95"
        >
          <ArrowLeft className="size-3.5 text-amber-400 transition-transform group-hover:-translate-x-1" />
          <span>Bosh sahifaga qaytish</span>
        </Link>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
          <Sparkles className="size-3.5 text-amber-400" />
          <span>sahifa № 02</span>
        </div>
      </motion.div>

      {/* 3D Maydon (Bloknot) */}
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative z-10 w-full max-w-xl transition-shadow duration-300"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-black/80 via-blue-950/40 to-black/80 blur-2xl -z-10 rounded-3xl opacity-80" />

        <div className="relative w-full min-h-[430px] sm:min-h-[480px] rounded-3xl bg-[#0b101b] p-3 sm:p-4 border border-blue-500/25 shadow-2xl overflow-hidden">
          
          <div className="relative z-10 w-full h-full min-h-[400px] sm:min-h-[450px] rounded-2xl bg-[#faf7ee] shadow-[inset_0_0_40px_rgba(200,175,130,0.35)] border border-[#e8ded0] p-6 sm:p-9 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 bottom-0 left-11 sm:left-14 w-[1.5px] bg-red-400/60 pointer-events-none" />
            <div
              className="absolute inset-0 pl-13 sm:pl-16 pr-6 pt-14 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 35px, rgba(37, 99, 235, 0.15) 35px, rgba(37, 99, 235, 0.15) 36px)",
              }}
            />

            <div className="relative z-10 flex justify-between items-center pl-7 sm:pl-10 pb-3 border-b border-[#ebdcc7]">
              <span className="text-[11px] font-mono tracking-wider text-[#8c7a65] uppercase">
                Rasmiy Eslatmalar
              </span>
              <span className="font-mono text-xs text-[#8c7a65] font-bold bg-[#f1e6d7] px-2.5 py-0.5 rounded-md shadow-sm">
                2026-yil
              </span>
            </div>

            <div className="relative z-10 pl-7 sm:pl-10 my-auto py-5 space-y-6">
              <div>
                <p className="relative font-serif italic text-xl sm:text-2xl text-[#162a56] font-medium leading-[38px] tracking-wide select-none">
                  {text1}
                  {index1 < line1.length && (
                    <motion.span
                      animate={{ rotate: [12, 24, 12], y: [-2, 2, -2] }}
                      transition={{ repeat: Infinity, duration: 0.35 }}
                      className="inline-block relative text-2xl ml-1 -translate-y-1.5 pointer-events-none filter drop-shadow-md"
                    >
                      ✒️
                    </motion.span>
                  )}
                </p>
              </div>

              {index1 >= line1.length && (
                <div className="pt-2">
                  <p className="relative font-serif italic text-lg sm:text-xl text-[#162a56] font-medium leading-[38px] tracking-wide select-none">
                    {text2}
                    {index2 < line2.length && (
                      <motion.span
                        animate={{ rotate: [12, 24, 12], y: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 0.35 }}
                        className="inline-block relative text-2xl ml-1 -translate-y-1.5 pointer-events-none filter drop-shadow-md"
                      >
                        ✒️
                      </motion.span>
                    )}
                  </p>

                  {index2 >= line2.length && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4 pt-1"
                    >
                      <a
                        href="https://t.me/erkinovziyodullo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 hover:from-blue-600/20 hover:to-indigo-600/20 text-[#162a56] font-serif italic text-base sm:text-lg px-4 py-2 border border-blue-400/40 shadow-sm transition-all hover:scale-105 active:scale-95"
                      >
                        <Send className="size-4 text-blue-600 transition-transform group-hover:translate-x-0.5" />
                        <span className="underline decoration-blue-500/50 underline-offset-4 font-semibold">
                          @erkinovziyodullo (Telegram)
                        </span>
                      </a>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            <div className="relative z-10 flex items-center justify-between pl-7 sm:pl-10 pt-3 border-t border-[#ebdcc7] text-xs font-serif text-[#9b8872]">
              <span className="font-mono text-[11px] text-[#a59178]">Holat: Kutilmoqda</span>
              <span className="italic font-bold text-[#162a56] text-sm">Ziyodullo Erkinov</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}