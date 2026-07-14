import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Sparkles, ChevronRight } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black flex items-center justify-center relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-transparent rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-indigo-600/10 via-purple-600/10 to-transparent rounded-full blur-[150px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/5 via-blue-500/5 to-transparent rounded-full blur-[120px]" />
        </div>

        {/* Grid pattern - simpler version */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Scrolling text */}
      <motion.div
        className="absolute top-10 whitespace-nowrap text-gray-600/40 text-sm md:text-base lg:text-lg font-light tracking-[0.3em] select-none uppercase"
        animate={{ x: ["100vw", "-100%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        ✦ Test rejimida ishlamoqda — fikr va takliflar bo'lsa yozing ✦
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center relative z-10 px-4 max-w-3xl mx-auto"
      >
        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-gray-400 text-xs font-light tracking-[0.2em]">FREE EBOOK</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-tight"
        >
          Mening kitobimni
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            yuklab oling
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-400 text-base md:text-lg font-light tracking-wide max-w-md mx-auto"
        >
          Telegram kanalimda bepul kitobimni topasiz
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 60, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mx-auto my-8"
        />

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="https://telegram.me/erkinov_ziyodullo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 60px rgba(139,92,246,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <BookOpen className="w-5 h-5 group-hover:rotate-[-10deg] transition-transform" />
            <span>Telegram kanal</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          {/* Secondary link */}
          <motion.a
            href="https://t.me/erkinovziyodullo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm font-light transition-colors duration-300 group"
          >
            <span>Yoki shaxsiy chat</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 flex items-center justify-center gap-4 text-gray-700/50 text-xs font-mono"
        >
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-gray-700/50" />
          <span className="tracking-widest">@erkinov_ziyodullo</span>
          <span className="w-6 h-px bg-gradient-to-l from-transparent to-gray-700/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}