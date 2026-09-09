// pages/Home.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const LINES = [
  "> tizim ishga tushmoqda...",
  "> modullar yuklanmoqda... OK",
  "> ulanish o'rnatildi",
  "",
  "Xush kelibsiz",
];

// BootScreen komponenti Home dan oldin aniqlanishi kerak
function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [charIndex, setCharIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const t = setTimeout(onFinish, 400);
      return () => clearTimeout(t);
    }

    const currentLine = LINES[lineIndex];

    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 20);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, currentLine]);
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex, onFinish]);

  const typingLine =
    lineIndex < LINES.length ? LINES[lineIndex].slice(0, charIndex) : "";

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-center font-mono text-gray-700 dark:text-gray-300 p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>Boot</span>
        </div>

        <div className="space-y-1.5 text-sm leading-relaxed">
          {visibleLines.map((line, i) => (
            <div key={i} className={line.includes("Xush kelibsiz") ? "text-black dark:text-white font-bold text-lg pt-2" : "text-gray-600 dark:text-gray-400"}>
              {line}
            </div>
          ))}

          <div className={typingLine.includes("Xush kelibsiz") ? "text-black dark:text-white font-bold text-lg pt-2" : "text-gray-600 dark:text-gray-400"}>
            {typingLine}
            <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Home() {
  const [booted, setBooted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark mode ni localStorage ga saqlash
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Progress bar animatsiyasi
  useEffect(() => {
    if (!booted) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [booted]);

  // Navigatsiya menyusi
  const navItems = [
    { name: 'Bosh sahifa', path: '/' },
    { name: 'Yangiliklar', path: '/news' },
    { name: 'Ko\'nikmalar', path: '/skills' },
    { name: 'Galereya', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Men haqimda', path: '/about' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      <AnimatePresence>
        {!booted && <BootScreen key="boot" onFinish={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <>
          {/* Navbar */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                  Erkinov
                </Link>

                {/* Desktop menyu */}
                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* O'ng tomon */}
                <div className="flex items-center space-x-4">
                  {/* Dark mode tugmasi */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Mavzuni almashtirish"
                  >
                    {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
                  </button>

                  {/* Mobil menyu tugmasi */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Menyuni ochish/yopish"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobil menyu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <div className="px-4 py-4 space-y-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Asosiy kontent */}
          <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden pt-20">
            {/* Gradient fon */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500" />
            
            {/* Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="text-center max-w-2xl mx-auto relative z-10">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="inline-block px-8 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300 shadow-xl">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Erkinov
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              >
                Tez orada foydali
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  veb-sayt
                </span> taqdim etamiz
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-8 max-w-md mx-auto"
              >
                Siz uchun eng zamonaviy va foydali platformani tayyorlayapmiz
              </motion.p>

              {/* Progress Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="max-w-sm mx-auto"
              >
                <div className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
                  <span>Tayyorlanmoqda</span>
                  <span className="font-mono">{progress}%</span>
                </div>

                {/* Airplane Animation */}
                <div className="relative h-8 mt-4 overflow-hidden">
                  <motion.div
                    className="absolute left-0 text-2xl"
                    animate={{ x: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  >
                    <span className="inline-block transform -rotate-45">✈️</span>
                  </motion.div>
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gray-200 dark:bg-gray-700" />
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-10"
              >
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">Hurmat bilan,</p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Erkinov Ziyodullo</p>
                
                <div className="flex items-center justify-center gap-3 mt-3">
                  <a
                    href="https://t.me/erkinovziyodullo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                  >
                    Bog'lanish
                  </a>
                  
                  {/* Ijtimoiy tarmoqlar */}
                  <a
                    href="#"
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}