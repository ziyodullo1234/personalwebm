import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Newspaper, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export function Home() {
  const fullText =
    "Men Erkinov Ziyodullo, 2005-yil 29-iyunda Andijon viloyati Paxtaobod tumanida tug'ilganman.";

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);

  // Yozish tezligi tezlashtirildi (35ms)
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      // Yozib bo'lgach 1.2 soniya o'qishga vaqt beradi va yopiladi
      const closeTimer = setTimeout(() => {
        setIsClosed(true);
      }, 1200);
      return () => clearTimeout(closeTimer);
    }
  }, [currentIndex, fullText]);

  // Qaytadan ochish va yozdirish
  const handleReopen = () => {
    setIsClosed(false);
    setDisplayText("");
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen w-full bg-[#111215] flex flex-col items-center justify-center p-4 sm:p-6 antialiased selection:bg-amber-200 selection:text-amber-900 overflow-hidden">
      
      {/* Tepadagi navigatsiya paneli */}
      <div className="w-full max-w-xl flex items-center justify-between mb-5 px-1 z-50">
        <span className="font-mono text-xs text-neutral-400">
          kundalik.note
        </span>

        <div className="flex items-center gap-2">
          {isClosed && (
            <button
              onClick={handleReopen}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium text-neutral-200 border border-white/10 backdrop-blur-md transition-all active:scale-95"
            >
              <RotateCcw className="size-3.5 text-amber-400" />
              <span>Qaytadan ochish</span>
            </button>
          )}

          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3.5 py-1.5 text-xs font-medium text-neutral-200 border border-white/10 backdrop-blur-md transition-all active:scale-95"
          >
            <Newspaper className="size-3.5 text-amber-400" />
            <span>Yangiliklar</span>
          </Link>
        </div>
      </div>

      {/* 3D Maydon (Daftar) */}
      <div className="relative w-full max-w-xl [perspective:1400px]">
        <div className="relative w-full min-h-[400px] sm:min-h-[460px] rounded-2xl bg-[#1e1914] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/10">
          
          {/* Ichki Oq Sahifa (Har doim ochiq va yozuv ko'rinib turadi) */}
          <div className="relative z-10 w-full h-full min-h-[380px] sm:min-h-[435px] rounded-xl bg-[#faf6ee] shadow-[inset_0_0_30px_rgba(180,150,110,0.2)] border border-[#e5dcce] overflow-hidden p-6 sm:p-8 flex flex-col justify-between">
            
            {/* Qizil hoshiya chizig'i */}
            <div className="absolute top-0 bottom-0 left-10 sm:left-14 w-[1px] bg-red-400/50 pointer-events-none" />

            {/* Qog'oz chiziqlari */}
            <div
              className="absolute inset-0 pl-12 sm:pl-16 pr-5 sm:pr-8 pt-14 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 35px, rgba(99, 133, 184, 0.16) 35px, rgba(99, 133, 184, 0.16) 36px)",
              }}
            />

            {/* Sana qismi */}
            <div className="relative z-10 flex justify-between items-center pl-6 sm:pl-10 pb-3 border-b border-[#ebdcc7]">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#8c7a65]">
                Andijon, Paxtaobod
              </span>
              <span className="font-mono text-[11px] sm:text-xs text-[#8c7a65] font-semibold bg-[#f0e6d6] px-2.5 py-0.5 rounded-md">
                2005.06.29
              </span>
            </div>

            {/* Ruchka bilan yoziladigan matn */}
            <div className="relative z-10 pl-6 sm:pl-10 my-auto py-4">
              <p className="font-serif italic text-xl sm:text-3xl text-[#1a2d59] font-medium leading-[36px] sm:leading-[44px] tracking-wide">
                {displayText}
                {!isClosed && (
                  <span className="inline-block w-[2.5px] h-5 sm:h-7 bg-[#254ea8] ml-1.5 translate-y-1 animate-pulse" />
                )}
              </p>
            </div>

            {/* Imzo */}
            <div className="relative z-10 flex items-center justify-end pl-6 sm:pl-10 pt-3 border-t border-[#ebdcc7] text-xs font-serif text-[#9b8872]">
              <span className="italic font-semibold text-[#1a2d59]">Z. Erkinov</span>
            </div>
          </div>

          {/* Yopiluvchi Qora Muqova (Faqat yozuv tugagach o'ngdan yopiladi) */}
          <motion.div
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{
              rotateY: isClosed ? 0 : 180,
              opacity: isClosed ? 1 : 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: "left center" }}
            onClick={handleReopen}
            className={`absolute inset-0 z-30 rounded-2xl bg-gradient-to-br from-[#2b231c] via-[#1f1914] to-[#12100d] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col justify-between p-7 sm:p-9 cursor-pointer ${
              isClosed ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div className="absolute top-0 right-8 sm:right-10 w-4 h-9 bg-red-800 rounded-b shadow-md" />

            <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#a89078]/70">
              <span>Shaxsiy kundalik</span>
              <span>2005</span>
            </div>

            <div className="my-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-serif tracking-widest uppercase font-bold text-[#e8dfcf] drop-shadow-md">
                Erkinov Ziyodullo
              </h2>
              <p className="mt-2 text-xs font-mono text-[#a89078] tracking-widest">
                29.06.2005 • PAXTAOBOD
              </p>
            </div>

            <div className="text-center text-[11px] font-mono text-neutral-400">
              Ochish uchun ustiga bosing
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}