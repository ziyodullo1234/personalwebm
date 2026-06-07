import { motion } from "framer-motion";

export function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="text-center"
      >
        <motion.h1
          animate={{ 
            x: [-5, 5, -5, 5, 0],
            rotate: [-2, 2, -2, 2, 0]
          }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-4"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-400"
        >
          not found
        </motion.p>
      </motion.div>
    </div>
  );
}