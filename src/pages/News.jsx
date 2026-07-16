// pages/News.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function News() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black p-4 relative overflow-hidden">
      {/* Fon effektlari */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Orqaga</span>
          </Link>
          <h1 className="text-white font-bold text-xl">⚽ Yangiliklar</h1>
          <div className="w-20" />
        </div>

        {/* Asosiy kontent */}
        <div className="flex flex-col items-center justify-center py-16 md:py-24">
          {/* "Breaking news" sticker */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
            className="mb-6"
          >
            <div className="bg-red-600 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-600/30 tracking-wide uppercase">
              🔴 So'nggi daqiqa
            </div>
          </motion.div>

          {/* Katta yangilik matni */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 120 }}
            className="text-center max-w-2xl"
          >
            <motion.div
              animate={{ rotate: [0, -8, 8, -8, 0] }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-7xl md:text-8xl mb-6 inline-block"
            >
              😂
            </motion.div>

            <h2 className="text-white text-2xl md:text-4xl font-bold leading-snug mb-4">
              Bugungi kunning eng katta yangiligi —
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400">
                siz kitob o'qimaganingiz
              </span>
            </h2>

            <p className="text-gray-500 text-sm md:text-base mt-4">
              Muxbirlarimiz joyidan xabar bermoqda, jamoat hayajonda.
            </p>
          </motion.div>

          {/* Statistika stikerlari */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            <span className="bg-white/5 border border-white/10 text-gray-300 text-xs md:text-sm px-4 py-2 rounded-full">
              📖 0 bet o'qildi
            </span>
            <span className="bg-white/5 border border-white/10 text-gray-300 text-xs md:text-sm px-4 py-2 rounded-full">
              📱 47 soat skroll qilindi
            </span>
            <span className="bg-white/5 border border-white/10 text-gray-300 text-xs md:text-sm px-4 py-2 rounded-full">
              🛋 "Ertaga o'qiyman" — 312-marta aytildi
            </span>
          </motion.div>

          {/* Pastki hazil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-14 flex items-center gap-2 text-gray-500 text-sm md:text-base"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            <span>Sog' bo'lsangiz bo'ldi, qolgani mayda-chuyda.</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}