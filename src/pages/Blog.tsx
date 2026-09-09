// pages/Blog.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Star, Quote, Heart, ChevronRight, Award, Library, BookMarked, Sparkles } from "lucide-react";
import { useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  emoji: string;
  rating: number;
  category: string;
  year: number;
  quote: string;
}

export function Blog() {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  const books: Book[] = [
    {
      id: 1,
      title: "Qanday qilib do'st orttirish va odamlarga ta'sir o'tkazish",
      author: "Deyl Karnegi",
      description: "Insoniy munosabatlar va muloqot san'ati haqida eng mashhur kitob",
      emoji: "🤝",
      rating: 5,
      category: "Psixologiya",
      year: 1936,
      quote: "Odamlarni qiziqtirishning eng ishonchli usuli - ular haqida gapirishdir."
    },
    {
      id: 2,
      title: "Boy otadan boy bolaga",
      author: "Robert Kiyosaki",
      description: "Moliyaviy savodxonlik va boylik sirlari",
      emoji: "💰",
      rating: 5,
      category: "Moliyaviy",
      year: 1997,
      quote: "Pul uchun ishlamang, pul siz uchun ishlasin."
    },
    {
      id: 3,
      title: "7 ko'nikma",
      author: "Stiven Kovi",
      description: "Yuqori samarali odamlarning 7 ta ko'nikmasi",
      emoji: "📈",
      rating: 5,
      category: "Shaxsiy rivojlanish",
      year: 1989,
      quote: "Avval tushunishga harakat qiling, keyin tushunilishga."
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      description: "Kichik odatlar qanday qilib katta natijalarga olib keladi",
      emoji: "⚡",
      rating: 5,
      category: "Odatlar",
      year: 2018,
      quote: "Siz o'zingizning odatlaringiz darajasiga tushasiz, maqsadlaringiz darajasiga emas."
    },
    {
      id: 5,
      title: "Sho'ng'in",
      author: "O'tkir Hoshimov",
      description: "O'zbek adabiyotining durdona asari",
      emoji: "📖",
      rating: 5,
      category: "Adabiyot",
      year: 1978,
      quote: "Hayot - bu sho'ng'in, unda cho'kish ham, suzish ham bor."
    },
    {
      id: 6,
      title: "Alkimyogar",
      author: "Paulo Koelyo",
      description: "O'z orzularingga ergashish haqida falsafiy roman",
      emoji: "✨",
      rating: 5,
      category: "Falsafa",
      year: 1988,
      quote: "Koinot hamma narsani qilishga yordam beradi, agar sen chin dildan xohlasang."
    },
    {
      id: 7,
      title: "Sohibqiron",
      author: "O'tkir Hoshimov",
      description: "Amir Temur hayoti haqida tarixiy roman",
      emoji: "⚔️",
      rating: 5,
      category: "Tarix",
      year: 1991,
      quote: "Kuch adolatda, adolat kuchda."
    },
    {
      id: 8,
      title: "Dunyo tilsimi",
      author: "O'tkir Hoshimov",
      description: "O'zbek adabiyotining eng yaxshi asarlaridan biri",
      emoji: "🌍",
      rating: 5,
      category: "Adabiyot",
      year: 1985,
      quote: "Til - xalqning ko'zgusi."
    },
    {
      id: 9,
      title: "Har kuni ertalab",
      author: "Xel Elrod",
      description: "Ertalabki odatlar hayotingizni qanday o'zgartiradi",
      emoji: "🌅",
      rating: 4,
      category: "Odatlar",
      year: 2016,
      quote: "Ertalab soat 5 da turish hayotingizni butunlay o'zgartiradi."
    },
    {
      id: 10,
      title: "Quvonchli odam",
      author: "Deyl Karnegi",
      description: "Baxt va quvonch sirlari",
      emoji: "😊",
      rating: 5,
      category: "Psixologiya",
      year: 1948,
      quote: "Quvonch - bu ichki holat, tashqi sharoitga bog'liq emas."
    }
  ];

  const categories = ['Hammasi', 'Psixologiya', 'Adabiyot', 'Odatlar', 'Moliyaviy', 'Falsafa', 'Tarix'];
  const [selectedCategory, setSelectedCategory] = useState('Hammasi');

  const filteredBooks = selectedCategory === 'Hammasi' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-24">
        {/* Orqaga tugmasi */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Orqaga</span>
        </Link>

        {/* Sarlavha */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl shadow-2xl mb-4">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Erkinov Ziyodullo kutubxonasi 📚
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Men kitobni juda sevaman! 📖 100+ kitob mutola qilganman. 
            Sizlarga eng yaxshi 10 ta kitobni tavsiya qilaman.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-amber-600 dark:text-amber-400">
            <Heart className="w-5 h-5 fill-current animate-pulse" />
            <span className="text-sm font-medium">Kitobxonlik - hayot falsafasi</span>
            <Heart className="w-5 h-5 fill-current animate-pulse delay-150" />
          </div>
        </motion.div>

        {/* Kategoriyalar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Kitoblar ro'yxati */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient fon */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Kitob ichidagi elementlar */}
              <div className="relative z-10">
                {/* Kitob raqami va emoji */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{book.emoji}</span>
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      #{book.id}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < book.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Kitob nomi */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {book.title}
                </h3>

                {/* Muallif */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                  <BookMarked className="w-3 h-3" />
                  {book.author} • {book.year}
                </p>

                {/* Kategoriya */}
                <span className="inline-block px-3 py-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full mb-3">
                  {book.category}
                </span>

                {/* Tavsif */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {book.description}
                </p>

                {/* Iqtibos */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredBook === book.id ? 1 : 0,
                    height: hoveredBook === book.id ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 p-3 bg-amber-50 dark:bg-gray-700/50 rounded-xl border-l-4 border-amber-500 dark:border-amber-400">
                    <Quote className="w-4 h-4 text-amber-500 dark:text-amber-400 mb-1" />
                    <p className="text-sm text-gray-700 dark:text-gray-200 italic">
                      "{book.quote}"
                    </p>
                  </div>
                </motion.div>

                {/* O'qish tugmasi */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span>O'qishni tavsiya qilaman</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Hover effekti - yorug'lik */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Statistika */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: BookOpen, label: "O'qilgan kitoblar", value: "100+" },
            { icon: Award, label: "Tavsiya etilgan", value: "10 ta" },
            { icon: Library, label: "Kitobxon", value: "12 yil" },
            { icon: Sparkles, label: "Eng sevimli", value: "Deyl Karnegi" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <stat.icon className="w-6 h-6 text-amber-500 dark:text-amber-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 rounded-2xl border border-amber-200 dark:border-amber-800">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-bold text-amber-600 dark:text-amber-400">Erkinov Ziyodullo</span> 
              {" "}tomonidan sevib o'qilgan kitoblar 📚
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              "Kitob o'qish - aqlni o'stirish, dunyoqarashni kengaytirishdir"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}