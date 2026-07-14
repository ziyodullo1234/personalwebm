import { motion } from "framer-motion";
import { 
  Heart,
  Star,
  Trophy,
  BookOpen,
  Crown,
  Zap,
  Sparkles
} from "lucide-react";

export function Skills() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 rounded-full blur-[80px]" />
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)
            `
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full mx-auto relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-gray-400 text-[10px] tracking-[0.3em]">✦ MEN HAQIMDA ✦</span>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-purple-500/5"
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-2 border-purple-500/30 flex items-center justify-center shadow-xl shadow-purple-500/20">
              <span className="text-5xl">👨‍💻</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-2"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Erkinov Ziyodullo
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent mx-auto my-4"
          />

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 text-sm text-center font-light leading-relaxed max-w-sm mx-auto"
          >
            Real Madrid muhlisi, Mbappé va Yamal ashadiy muhlisi.
            <br />
            100+ kitob o'qigan, to'xtab qolishni xohlamayman.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-4 gap-3 mt-8"
          >
            {[
              { icon: "⚽", label: "Real", count: "Madrid" },
              { icon: "🐢", label: "Mbappé", count: "⭐" },
              { icon: "🌟", label: "Yamal", count: "⭐" },
              { icon: "📚", label: "Kitob", count: "100+" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="bg-white/5 rounded-2xl p-3 text-center border border-white/5 hover:border-purple-500/20 transition-all duration-300 group"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-[10px] text-gray-500 font-light">{item.label}</div>
                <div className="text-[10px] text-gray-600 font-light">{item.count}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
          >
            {["⚽ Futbol", "🥊 UFC", "📖 Kitob", "🏆 Hala Madrid"].map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-400 border border-white/5"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 flex items-center justify-center gap-2 text-gray-700/50 text-[10px]"
          >
            <span className="w-4 h-px bg-gradient-to-r from-transparent to-gray-700/50" />
            <span className="tracking-[0.3em] flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>¡HALA MADRID!</span>
              <Zap className="w-3 h-3 text-yellow-400" />
            </span>
            <span className="w-4 h-px bg-gradient-to-l from-transparent to-gray-700/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}