import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "> initializing system...",
  "> loading modules... OK",
  "> tekshirilmoqda: foydalanuvchi sessiyasi",
  "> ulanish o'rnatildi",
  "",
  "Xush kelibsiz, foydalanuvchi",
];

function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [charIndex, setCharIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const t = setTimeout(onFinish, 900);
      return () => clearTimeout(t);
    }

    const currentLine = LINES[lineIndex];

    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 18);
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
      className="fixed inset-0 z-50 bg-black flex items-center justify-center font-mono text-green-400 px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-xl text-sm md:text-base">
        {visibleLines.map((line, i) => (
          <div key={i} className={line.includes("Xush kelibsiz") ? "text-white font-bold mt-2" : ""}>
            {line}
          </div>
        ))}
        <div className={typingLine.includes("Xush kelibsiz") ? "text-white font-bold mt-2" : ""}>
          {typingLine}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-2 h-4 bg-green-400 ml-1"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootScreen key="boot" onFinish={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
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
                rotate: [-1, 1, -1, 1, 0],
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
      )}
    </>
  );
}