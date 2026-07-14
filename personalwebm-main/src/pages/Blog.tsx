import { motion } from "framer-motion";

export function Blog() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      
      {/* Animated circle background */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Asosiy kontent */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >
        {/* Gap yozuvi */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight"
        >
          Gap ko'p
        </motion.h1>

        {/* Amal qilish qiyin */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-400 text-xl md:text-2xl lg:text-3xl font-light mb-8"
        >
          amal qilish qiyinda
        </motion.p>

        {/* Minimal chiziq */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"
        />

        {/* Kichik footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-gray-600 text-sm mt-8"
        >
          lekin harakat qilish kerak
        </motion.p>
      </motion.div>
    </div>
  );
}