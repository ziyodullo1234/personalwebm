// pages/Home.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const LINES = [
  "> tizim ishga tushmoqda...",
  "> modullar yuklanmoqda... OK",
  "> ulanish o'rnatildi",
  "",
  "Xush kelibsiz",
];

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
  const [darkMode, setDarkMode] = useState(false);

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

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      <AnimatePresence>
        {!booted && <BootScreen key="boot" onFinish={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        >
          {/* Dark Mode Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500" />
          
          {/* Dark Mode Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

          {/* Dark Mode Toggle Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-24 right-6 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-lg"
            aria-label="Mavzuni almashtirish"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </motion.button>

          <div className="text-center max-w-2xl mx-auto relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-block px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  Erkinov
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              Tez orada foydali
              <br />
              <span className="text-blue-600 dark:text-blue-400">veb-sayt</span> taqdim etamiz
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
              {/* Progress Bar */}
              <div className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Progress Text */}
              <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
                <span>Tayyorlanmoqda</span>
                <span className="font-mono">{progress}%</span>
              </div>

              {/* Airplane Animation */}
              <div className="relative h-8 mt-4 overflow-hidden">
                <motion.div
                  className="absolute left-0 text-2xl"
                  animate={{ x: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  style={{ x: `${progress}%` }}
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
              <a
                href="https://t.me/erkinovziyodullo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-6 py-2 text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
              >
                Bog'lanish
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}