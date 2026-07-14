import { motion } from "framer-motion";

export function Gallery() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background effekt */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-4"
        >
          404
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-lg"
        >
          uxalsh kerek
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-sm mt-6"
        >
          Real Madrid — mening sevimli klubim
        </motion.p>

        {/* AJRATISH CHIZIGI */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 40, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto my-8"
        />

        {/* TELEGRAM TAKLIF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <p className="text-gray-500 text-sm mb-3">
            Shunaqa web sayt qilishni hohlasangiz
          </p>
          <p className="text-gray-600 text-xs mb-4">
            adavy gaz o'rganing men bn
          </p>
          <a
            href="https://t.me/erkinovziyodullo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
          >
            📩 Telegram
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}