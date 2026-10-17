import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Newspaper, RotateCcw, Trophy, Volume2, VolumeX } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// Professional 3D Darvozalar va Fizikali UCL To'pi
function UCLStadiumField({ onGoal }: { onGoal: (side: "chap" | "ong") => void }) {
  const ballRef = useRef<HTMLDivElement>(null);
  const size = 68;

  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let vx = (Math.random() > 0.5 ? 1 : -1) * (2.8 + Math.random() * 1.2);
    let vy = (Math.random() > 0.5 ? 1 : -1) * (2.0 + Math.random() * 1.2);
    let rotation = 0;
    let animId: number;

    const animate = () => {
      x += vx;
      y += vy;
      rotation += (Math.abs(vx) + Math.abs(vy)) * 1.3;

      const W = window.innerWidth;
      const H = window.innerHeight;

      // Darvoza balandligi (ekran markazining 25% dan 75% gacha)
      const goalTop = H * 0.25;
      const goalBottom = H * 0.75;

      // O'NG DARVOZA (GOL!)
      if (x >= W - size - 12) {
        if (y >= goalTop && y <= goalBottom) {
          onGoal("ong");
          x = W / 2;
          y = H / 2;
          vx = -3.2;
          vy = (Math.random() - 0.5) * 3;
        } else {
          x = W - size - 12;
          vx = -Math.abs(vx);
        }
      }

      // CHAP DARVOZA (GOL!)
      if (x <= 12) {
        if (y >= goalTop && y <= goalBottom) {
          onGoal("chap");
          x = W / 2;
          y = H / 2;
          vx = 3.2;
          vy = (Math.random() - 0.5) * 3;
        } else {
          x = 12;
          vx = Math.abs(vx);
        }
      }

      // Shift / Pol to'siqlari
      if (y >= H - size - 10) {
        y = H - size - 10;
        vy = -Math.abs(vy);
      } else if (y <= 10) {
        y = 10;
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
      {/* Stadion markaziy doirasi (Maydon foni) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
        <div className="size-[420px] sm:size-[560px] rounded-full border border-blue-400/20 shadow-[0_0_80px_rgba(59,130,246,0.1)] flex items-center justify-center">
          <div className="size-2 rounded-full bg-blue-400/50" />
        </div>
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
      </div>

      {/* CHAP DARVOZA (Stadion to'ri) */}
      <div className="pointer-events-none fixed left-0 top-[25vh] h-[50vh] w-12 sm:w-16 z-0 flex items-center">
        <div className="relative h-full w-full rounded-r-2xl border-y-2 border-r-4 border-blue-400/60 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent backdrop-blur-[2px] shadow-[0_0_30px_rgba(59,130,246,0.3)] overflow-hidden">
          {/* Darvoza to'ri chiziqlari */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:10px_10px]" />
          <div className="absolute inset-y-0 right-0 w-1 bg-blue-300 shadow-[0_0_15px_#60a5fa]" />
        </div>
      </div>

      {/* O'NG DARVOZA (Stadion to'ri) */}
      <div className="pointer-events-none fixed right-0 top-[25vh] h-[50vh] w-12 sm:w-16 z-0 flex items-center justify-end">
        <div className="relative h-full w-full rounded-l-2xl border-y-2 border-l-4 border-amber-400/60 bg-gradient-to-l from-amber-600/20 via-amber-500/10 to-transparent backdrop-blur-[2px] shadow-[0_0_30px_rgba(251,191,36,0.3)] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:10px_10px]" />
          <div className="absolute inset-y-0 left-0 w-1 bg-amber-300 shadow-[0_0_15px_#fbbf24]" />
        </div>
      </div>

      {/* UEFA Yulduzli To'pi */}
      <div
        ref={ballRef}
        className="pointer-events-none fixed top-0 left-0 z-10 size-[56px] sm:size-[68px] select-none will-change-transform"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] filter">
          <defs>
            <radialGradient id="ballShine" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="85%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="47" fill="url(#ballShine)" stroke="#0f172a" strokeWidth="2.5" />
          {/* UCL Yulduzlari */}
          <g fill="#020617" stroke="#2563eb" strokeWidth="1.2">
            <polygon points="50,26 54,40 68,40 57,49 61,63 50,54 39,63 43,49 32,40 46,40" />
            <polygon points="24,12 28,22 39,22 30,29 33,39 24,33 15,39 18,29 9,22 20,22" />
            <polygon points="76,12 80,22 91,22 82,29 85,39 76,33 67,39 70,29 61,22 72,22" />
            <polygon points="78,62 82,72 93,72 84,79 87,89 78,83 69,89 72,79 63,72 74,72" />
            <polygon points="22,62 26,72 37,72 28,79 31,89 22,83 13,89 16,79 7,72 18,72" />
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

  // Hisob & Gol animatsiyasi
  const [scores, setScores] = useState({ chap: 0, ong: 0 });
  const [goalAlert, setGoalAlert] = useState<{ active: boolean; side: "chap" | "ong" | null }>({
    active: false,
    side: null,
  });

  // Parallax Gyroskopik 3D harakat
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Harfma-harf yozilish
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

  // Gol sodir bo'lganda
  const handleGoalDetected = useCallback((side: "chap" | "ong") => {
    setScores((prev) => ({ ...prev, [side]: prev[side] + 1 }));
    setGoalAlert({ active: true, side });

    setTimeout(() => {
      setGoalAlert({ active: false, side: null });
    }, 1800);
  }, []);

  const handleReopen = () => {
    setIsClosed(false);
    setDisplayText("");
    setCurrentIndex(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#05070d] text-white flex flex-col items-center justify-center p-4 sm:p-8 antialiased selection:bg-amber-400 selection:text-black overflow-hidden font-sans"
    >
      {/* UCL Maydon va Darvozalar */}
      <UCLStadiumField onGoal={handleGoalDetected} />

      {/* Orqa fondagi UEFA tungi nurlari */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[55rem] h-[35rem] bg-gradient-to-b from-blue-600/25 via-indigo-600/15 to-transparent blur-[140px] rounded-full" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[45rem] h-[25rem] bg-amber-600/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1e293b15_0%,transparent_70%)]" />
      </div>

      {/* Kinematik "GOOOL!" Splash Screen */}
      <AnimatePresence>
        {goalAlert.active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3, filter: "blur(20px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none select-none bg-blue-950/20 backdrop-blur-[2px]"
          >
            {/* Shok to'lqini (Shockwave) */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`absolute size-[350px] rounded-full border-4 ${
                goalAlert.side === "chap" ? "border-blue-400" : "border-amber-400"
              }`}
            />
            
            <motion.span
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              className="text-7xl sm:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-500 drop-shadow-[0_0_50px_rgba(251,191,36,0.8)]"
            >
              GOOOOL!
            </motion.span>
            
            <span className="mt-2 text-sm sm:text-base font-mono uppercase tracking-[0.4em] text-cyan-300 font-bold drop-shadow">
              UEFA Champions League • {goalAlert.side === "chap" ? "Chap Darvoza" : "O'ng Darvoza"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tepadagi Boshqaruv & Live Scoreboard */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl flex items-center justify-between mb-8 px-2 z-40"
      >
        {/* Hisob Tablosi (Match Scoreboard) */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 backdrop-blur-xl shadow-2xl">
          <Trophy className="size-4 text-amber-400" />
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider">
            <span className="text-blue-400">BLUE {scores.chap}</span>
            <span className="text-slate-600">:</span>
            <span className="text-amber-400">{scores.ong} GOLD</span>
          </div>
        </div>

        {/* Tugmalar */}
        <div className="flex items-center gap-2">
          {isClosed && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReopen}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all"
            >
              <RotateCcw className="size-3.5" />
              <span>Qayta ochish</span>
            </motion.button>
          )}

          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-xl transition-all active:scale-95 shadow-lg"
          >
            <Newspaper className="size-3.5 text-blue-400" />
            <span>Yangiliklar</span>
          </Link>
        </div>
      </motion.header>

      {/* 3D Interaktiv Daftar (Apple Moleskine Edition) */}
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        className="relative z-20 w-full max-w-xl transition-shadow duration-300"
      >
        {/* Chuqur 3D atrof soyasi */}
        <div className="absolute -inset-3 bg-gradient-to-r from-blue-900/20 via-black/80 to-amber-900/20 blur-3xl -z-10 rounded-[35px] opacity-90" />

        {/* Daftarning charm korpusi */}
        <div className="relative w-full min-h-[440px] sm:min-h-[490px] rounded-[30px] bg-gradient-to-b from-[#10141f] via-[#0a0d14] to-[#05070a] p-3 sm:p-4 border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Ichki Oq Qog'oz (Ochiq paytda) */}
          <div className="relative z-10 w-full h-full min-h-[410px] sm:min-h-[460px] rounded-2xl bg-[#faf7ef] shadow-[inset_0_0_40px_rgba(200,175,130,0.3)] border border-[#e5dcce] p-6 sm:p-9 flex flex-col justify-between overflow-hidden">
            
            {/* Qizil hoshiya va nozik chiziqlar */}
            <div className="absolute top-0 bottom-0 left-10 sm:left-14 w-[1.5px] bg-red-400/60 pointer-events-none" />
            <div
              className="absolute inset-0 pl-12 sm:pl-16 pr-6 pt-14 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 35px, rgba(37, 99, 235, 0.12) 35px, rgba(37, 99, 235, 0.12) 36px)",
              }}
            />

            {/* Tepasi: Sana va Hudud */}
            <div className="relative z-10 flex justify-between items-center pl-6 sm:pl-10 pb-3 border-b border-[#ebdcc7]">
              <span className="text-[11px] font-mono tracking-wider text-[#8c7a65] uppercase font-semibold">
                Andijon • Paxtaobod
              </span>
              <span className="font-mono text-xs text-[#8c7a65] font-bold bg-[#f1e6d7] px-2.5 py-0.5 rounded-md shadow-sm">
                2005.06.29
              </span>
            </div>

            {/* Qo'lda yozilayotgan matn & Tilla Uchar Pero */}
            <div className="relative z-10 pl-6 sm:pl-10 my-auto py-4">
              <p className="relative font-serif italic text-2xl sm:text-3xl text-[#16274a] font-medium leading-[38px] sm:leading-[46px] tracking-wide select-none">
                {displayText}
                {!isClosed && currentIndex < fullText.length && (
                  <motion.span
                    animate={{ rotate: [10, 24, 10], y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 0.35 }}
                    className="inline-block relative text-3xl ml-1.5 -translate-y-2 pointer-events-none filter drop-shadow"
                  >
                    ✒️
                  </motion.span>
                )}
              </p>
            </div>

            {/* Pastki qism: Imzo */}
            <div className="relative z-10 flex items-center justify-between pl-6 sm:pl-10 pt-3 border-t border-[#ebdcc7] text-xs font-serif text-[#9b8872]">
              <span className="font-mono text-[11px] text-[#a59178]">Holat: Tasdiqlangan</span>
              <span className="italic font-bold text-[#16274a] text-sm">Ziyodullo Erkinov</span>
            </div>
          </div>

          {/* 3D Yopiluvchi Royal Muqova */}
          <motion.div
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{
              rotateY: isClosed ? 0 : 180,
              opacity: isClosed ? 1 : 0,
            }}
            transition={{
              duration: 1.0,
              type: "spring",
              damping: 14,
              stiffness: 85,
            }}
            style={{ transformOrigin: "left center" }}
            onClick={handleReopen}
            className={`absolute inset-0 z-30 rounded-[30px] bg-gradient-to-br from-[#162238] via-[#0d1524] to-[#04070e] border-2 border-amber-500/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between p-7 sm:p-10 cursor-pointer ${
              isClosed ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Oltin xatcho'p tasmasi */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute top-0 right-10 w-4 h-12 bg-gradient-to-b from-amber-500 to-amber-700 rounded-b-md shadow-lg border-x border-amber-300"
            />

            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-amber-200/70">
              <span className="border-b border-amber-500/40 pb-0.5">Shaxsiy Tarix</span>
              <span>№ 01</span>
            </div>

            {/* Gerb va Nom */}
            <div className="my-auto text-center py-6 border-y border-amber-500/20 bg-amber-400/[0.02] rounded-2xl backdrop-blur-sm">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="size-16 mx-auto mb-4 rounded-full border-2 border-amber-400/60 bg-gradient-to-tr from-amber-600/30 to-amber-400/10 flex items-center justify-center text-amber-300 font-serif font-extrabold text-3xl shadow-[0_0_30px_rgba(251,191,36,0.3)]"
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
              Daftarni ochish uchun bosing ✨
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}