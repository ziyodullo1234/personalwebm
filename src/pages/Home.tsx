import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Newspaper, RotateCcw, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// Darvozalarga kirganda 'GOOL!' deydigan va hisobni yuritadigan futbol maydonli to'p
function UCLFootballWithGoals({ onGoal }: { onGoal: (side: "chap" | "ong") => void }) {
  const ballRef = useRef<HTMLDivElement>(null);
  const size = 70;

  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let vx = (Math.random() > 0.5 ? 1 : -1) * (2.2 + Math.random() * 1.5);
    let vy = (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 1.5);
    let rotation = 0;
    let animId: number;

    const animate = () => {
      x += vx;
      y += vy;
      rotation += (vx + vy) * 1.1;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const goalTop = screenHeight * 0.3;
      const goalBottom = screenHeight * 0.7;

      // O'ng darvoza (Gol chizig'i)
      if (x >= screenWidth - size) {
        if (y >= goalTop && y <= goalBottom) {
          onGoal("ong");
          x = screenWidth / 2;
          y = screenHeight / 2;
          vx = -2.5;
          vy = (Math.random() - 0.5) * 3;
        } else {
          x = screenWidth - size;
          vx = -Math.abs(vx);
        }
      }

      // Chap darvoza (Gol chizig'i)
      if (x <= 0) {
        if (y >= goalTop && y <= goalBottom) {
          onGoal("chap");
          x = screenWidth / 2;
          y = screenHeight / 2;
          vx = 2.5;
          vy = (Math.random() - 0.5) * 3;
        } else {
          x = 0;
          vx = Math.abs(vx);
        }
      }

      // Shift/Tepaga va pastga urilishlar
      if (y >= screenHeight - size) {
        y = screenHeight - size;
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
  }, [onGoal]);

  return (
    <>
      {/* Chap Darvoza */}
      <div className="absolute left-0 top-[30vh] h-[40vh] w-4 sm:w-6 bg-gradient-to-r from-blue-500/30 to-transparent border-y-2 border-r-2 border-dashed border-blue-400/40 rounded-r-xl z-0 pointer-events-none flex items-center justify-center">
        <span className="[writing-mode:vertical-lr] text-[9px] font-mono text-blue-400/50">CHAP DARVOZA</span>
      </div>

      {/* O'ng Darvoza */}
      <div className="absolute right-0 top-[30vh] h-[40vh] w-4 sm:w-6 bg-gradient-to-l from-amber-500/30 to-transparent border-y-2 border-l-2 border-dashed border-amber-400/40 rounded-l-xl z-0 pointer-events-none flex items-center justify-center">
        <span className="[writing-mode:vertical-rl] text-[9px] font-mono text-amber-400/50">O'NG DARVOZA</span>
      </div>

      {/* UCL To'pi */}
      <div
        ref={ballRef}
        className="pointer-events-none fixed top-0 left-0 z-0 size-[55px] sm:size-[70px] select-none opacity-60 will-change-transform"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          <circle cx="50" cy="50" r="46" fill="#f8fafc" stroke="#1e293b" strokeWidth="3" />
          <g fill="#0b0f19" stroke="#3b82f6" strokeWidth="1.2">
            <polygon points="50,28 55,41 69,41 58,50 62,63 50,55 38,63 42,50 31,41 45,41" />
            <polygon points="26,14 30,24 41,24 32,31 35,41 26,35 17,41 20,31 11,24 22,24" />
            <polygon points="74,14 78,24 89,24 80,31 83,41 74,35 65,41 68,31 59,24 70,24" />
            <polygon points="76,60 80,70 91,70 82,77 85,87 76,81 67,87 70,77 61,70 72,70" />
            <polygon points="24,60 28,70 39,70 30,77 33,87 24,81 15,87 18,77 9,70 20,70" />
          </g>
        </svg>
      </div>
    </>
  );
}

export function Home() {
  const fullText =
    "Men Erkinov Ziyodullo, 2005-yil 29-iyunda Andijon viloyati Paxtaobod tumanida tug'ilganman.";

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);

  // Score stats & GOAL show animation states (Xatolik tuzatilgan qism)
  const [scores, setScores] = useState({ chap: 0, ong: 0 });
  const [goalAlert, setGoalAlert] = useState(false);

  // Perspective 3D animation
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Typewriter ketma-ketligi
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      const closeTimer = setTimeout(() => {
        setIsClosed(true);
      }, 1200);
      return () => clearTimeout(closeTimer);
    }
  }, [currentIndex, fullText]);

  // Har safar to'p darvozaga kirganda ishga tushadi
  const handleGoalDetected = (side: "chap" | "ong") => {
    setScores((prev) => ({ ...prev, [side]: prev[side] + 1 }));
    setGoalAlert(true);
    setTimeout(() => {
      setGoalAlert(false);
    }, 1500);
  };

  const handleReopen = () => {
    setIsClosed(false);
    setDisplayText("");
    setCurrentIndex(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#0d1117] flex flex-col items-center justify-center p-4 sm:p-8 antialiased selection:bg-amber-300 selection:text-neutral-900 overflow-hidden"
    >
      {/* 2 Ta Darvoza & UCL To'p mexanikasi */}
      <UCLFootballWithGoals onGoal={handleGoalDetected} />

      {/* Kinematik fon nurlari */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-amber-500/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />
      </div>

      {/* GOOL! Portlovchi text xabari */}
      <AnimatePresence>
        {goalAlert && (
          <motion.div
            initial={{ scale: 0.1, opacity: 0, rotate: -15 }}
            animate={{ scale: [1, 1.3, 1], opacity: 1, rotate: 0 }}
            exit={{ scale: 2, opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed z-50 text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500 font-serif tracking-widest uppercase drop-shadow-[0_10px_35px_rgba(251,191,36,0.8)] pointer-events-none select-none text-center"
          >
            ⚽ GOOOL!!! 🔥
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tepadagi navigatsiya va Hisob (Scoreboard) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl flex items-center justify-between mb-6 px-1 z-50"
      >
        {/* UCL Hisoblagich */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-1.5 backdrop-blur-md text-xs font-mono">
          <span className="text-blue-400">CHAP {scores.chap}</span>
          <span className="text-neutral-500">:</span>
          <span className="text-amber-400">{scores.ong} O'NG</span>
        </div>

        <div className="flex items-center gap-2">
          {isClosed && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReopen}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1.5 text-xs font-semibold text-neutral-950 shadow-lg"
            >
              <RotateCcw className="size-3.5" />
              <span>Qayta ochish</span>
            </motion.button>
          )}

          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-4 py-1.5 text-xs font-medium text-white border border-white/15 backdrop-blur-md shadow-md transition-all active:scale-95"
          >
            <Newspaper className="size-3.5 text-blue-400" />
            <span>Yangiliklar</span>
          </Link>
        </div>
      </motion.div>

      {/* 3D Maydon (Daftar) */}
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative z-10 w-full max-w-xl transition-shadow duration-300"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-black/80 via-blue-950/40 to-black/80 blur-2xl -z-10 rounded-3xl opacity-80" />

        <div className="relative w-full min-h-[430px] sm:min-h-[480px] rounded-3xl bg-[#0b101b] p-3 sm:p-4 border border-blue-500/25 shadow-2xl overflow-hidden">
          
          {/* Ichki Sahifa */}
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
              <span className="text-[11px] font-mono tracking-wider text-[#8c7a65] uppercase flex items-center gap-1.5">
                <Sparkles className="size-3 text-amber-500 animate-pulse" /> Andijon • Paxtaobod
              </span>
              <span className="font-mono text-xs text-[#8c7a65] font-bold bg-[#f1e6d7] px-2.5 py-0.5 rounded-md shadow-sm">
                2005.06.29
              </span>
            </div>

            <div className="relative z-10 pl-7 sm:pl-10 my-auto py-4">
              <p className="relative font-serif italic text-2xl sm:text-3xl text-[#162a56] font-medium leading-[38px] sm:leading-[46px] tracking-wide select-none">
                {displayText}
                {!isClosed && currentIndex < fullText.length && (
                  <motion.span
                    animate={{ rotate: [12, 24, 12], y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 0.35 }}
                    className="inline-block relative text-3xl ml-1 -translate-y-2 pointer-events-none filter drop-shadow-md"
                  >
                    ✒️
                  </motion.span>
                )}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pl-7 sm:pl-10 pt-3 border-t border-[#ebdcc7] text-xs font-serif text-[#9b8872]">
              <span className="font-mono text-[11px] text-[#a59178]">Holat: Tasdiqlangan</span>
              <span className="italic font-bold text-[#162a56] text-sm">Ziyodullo Erkinov</span>
            </div>
          </div>

          {/* Muqova */}
          <motion.div
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{
              rotateY: isClosed ? 0 : 180,
              opacity: isClosed ? 1 : 0,
            }}
            transition={{
              duration: 1.1,
              type: "spring",
              damping: 14,
              stiffness: 85,
            }}
            style={{ transformOrigin: "left center" }}
            onClick={handleReopen}
            className={`absolute inset-0 z-30 rounded-3xl bg-gradient-to-br from-[#1b263b] via-[#0d1527] to-[#050914] border-2 border-amber-500/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between p-7 sm:p-10 cursor-pointer ${
              isClosed ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute top-0 right-10 w-4 h-12 bg-gradient-to-b from-amber-500 to-amber-700 rounded-b-md shadow-lg border-x border-amber-300"
            />

            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-amber-200/70">
              <span className="border-b border-amber-500/40 pb-0.5">Shaxsiy Tarix</span>
              <span>№ 01</span>
            </div>

            <div className="my-auto text-center py-6 border-y border-amber-500/20 bg-amber-400/[0.03] rounded-2xl backdrop-blur-sm">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="size-14 mx-auto mb-4 rounded-full border-2 border-amber-400/60 bg-gradient-to-tr from-amber-600/30 to-amber-400/10 flex items-center justify-center text-amber-300 font-serif font-extrabold text-2xl shadow-[0_0_25px_rgba(251,191,36,0.3)]"
              >
                E
              </motion.div>
              <h2 className="text-2xl sm:text-4xl font-serif tracking-widest uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 drop-shadow">
                Erkinov Ziyodullo
              </h2>
              <p className="mt-2.5 text-xs font-mono tracking-widest text-amber-300/80">
                29.06.2005 • PAXTAOBOD TUMANI
              </p>
            </div>

            <div className="text-center text-xs font-mono text-slate-400 animate-pulse">
              Daftarni ochish uchun ustiga bosing ✨
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}