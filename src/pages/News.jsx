// pages/News.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Newspaper, Calendar, User } from "lucide-react";

export function News() {
  const newsItems = [
    {
      id: 1,
      title: "Yangi loyiha ishga tushdi",
      date: "2024-01-15",
      author: "Erkinov Z.",
      excerpt: "Bizning yangi platforma endi sinov rejimida ishlamoqda..."
    },
    {
      id: 2,
      title: "Veb-sayt yangilanishi",
      date: "2024-01-10",
      author: "Erkinov Z.",
      excerpt: "Saytning yangi versiyasi chiqarildi..."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Orqaga</span>
        </Link>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Yangiliklar
          </h1>

          <div className="space-y-6">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {item.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {item.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}