import { motion } from "framer-motion";

export function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Tepada sekin yuruvchi yozuv */}
      <motion.div
        className="absolute top-8 whitespace-nowrap text-gray-700 text-sm md:text-base lg:text-lg font-mono tracking-wider"
        animate={{ x: ["100vw", "-100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        Test rejimida ishlamoqda idealariz bolsa ayting
      </motion.div>

      {/* Asosiy 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="text-center"
      >
        <motion.h1
          animate={{ 
            x: [-3, 3, -3, 3, 0],
            rotate: [-1, 1, -1, 1, 0]
          }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-8xl md:text-9xl lg:text-[200px] font-bold text-white tracking-tighter"
        >
          404
        </motion.h1>

        {/* Telegram link */}
        <motion.a
          href="https://t.me/erkinovziyodullo"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="inline-block mt-8 px-6 py-2 text-gray-500 hover:text-white text-sm md:text-base border border-gray-700 rounded-full hover:border-gray-500 transition-all duration-300"
        >
          📱 Murojat uchun
        </motion.a>
      </motion.div>
    </div>
  );
}