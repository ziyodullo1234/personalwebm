import { motion } from "framer-motion";
import { Rocket, ExternalLink } from "lucide-react";

export function Skills() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Title */}
        <motion.h1
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Meni loyiham
          </span>
        </motion.h1>

        {/* Button */}
        <motion.a
          href="https://erkinov-ziyodullo.uz"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          <Rocket className="w-5 h-5" />
          erkinov-ziyodullo.uz
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </div>
  );
}