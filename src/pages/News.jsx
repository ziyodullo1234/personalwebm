import { motion, MotionConfig } from "framer-motion";

export default function News() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="flex min-h-screen items-center justify-center bg-[#2a0a14] px-6">
        <motion.svg
          role="img"
          aria-label="Yurak shaklidagi M harfi"
          viewBox="0 0 200 180"
          className="w-[min(80vw,26rem)] drop-shadow-[0_20px_60px_rgba(255,77,109,0.35)]"
          animate={{ scale: [1, 1.06, 1, 1.1, 1] }}
          transition={{
            duration: 1.6,
            times: [0, 0.15, 0.3, 0.45, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Yurak */}
          <path
            d="M100 172 C20 112 2 74 2 48 C2 20 22 3 49 3 C71 3 90 15 100 35 C110 15 129 3 151 3 C178 3 198 20 198 48 C198 74 180 112 100 172 Z"
            fill="#ff4d6d"
          />
          {/* Katta M */}
          <path
            d="M52 118 V46 L100 98 L148 46 V118"
            fill="none"
            stroke="#fff1f3"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </main>
    </MotionConfig>
  );
}