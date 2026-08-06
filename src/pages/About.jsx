import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-500">
      <div className="text-center max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Orqaga</span>
        </Link>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center transition-colors duration-300">
            <BookOpen className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Kitob o'qing!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto"
        >
          Agar kitob o'qimasangiz, jaholat botqog'iga botib qolasiz!
        </motion.p>
      </div>
    </div>
  );
}