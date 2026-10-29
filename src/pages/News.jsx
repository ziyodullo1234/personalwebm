
import { Link } from "react-router-dom";
import { motion, MotionConfig } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useState } from "react";

const news = [
  // Yangilik qo‘shish namunasi:
  // {
  //   id: 1,
  //   date: "29.10.2026",
  //   title: "Yangi loyiha",
  //   description: "Yangi loyiha ustida ish boshlandi."
  // }
];

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export default function News() {
  const reduceMotion = useReducedMotionPreference();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#08090d] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />
        </div>

        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
          <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl sm:px-6">
            <Link
              to="/"
              className="text-sm font-bold tracking-wide sm:text-base"
            >
              ZIYODULLO<span className="text-violet-400">.</span>
            </Link>

            <Link
              to="/"
              className="inline-flex min-h-9 items-center gap-2 text-sm text-slate-300 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Bosh sahifa
            </Link>
          </nav>
        </header>

        <main className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-12 pt-28 sm:px-6 sm:pt-36">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-violet-400 sm:text-sm">
              Yangiliklar va e’lonlar
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Yangiliklar<span className="text-violet-400">.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Loyihalarim va faoliyatim haqidagi yangiliklar.
            </p>
          </motion.div>

          {news.length === 0 ? (
            <motion.section
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                <Send size={20} />
              </div>

              <h2 className="text-lg font-semibold sm:text-xl">
                Hozircha yangiliklar yo‘q
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                Yangi yangiliklar shu yerda e’lon qilinadi.
              </p>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium transition hover:bg-violet-500"
              >
                Telegram <Send size={15} />
              </a>
            </motion.section>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {news.map((item, index) => (
                <motion.article
                  key={item.id ?? index}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-400/30 sm:p-6"
                >
                  <p className="text-xs text-slate-500 sm:text-sm">
                    {item.date}
                  </p>

                  <h2 className="mt-2 break-words text-lg font-semibold leading-snug sm:text-xl">
                    {item.title}
                  </h2>

                  <p className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          )}

          <footer className="mt-10 border-t border-white/10 pt-5 sm:mt-14 sm:pt-6">
            <p className="text-center text-xs text-slate-500 sm:text-sm">
              © {new Date().getFullYear()} Erkinov Ziyodullo
            </p>
          </footer>
        </main>
      </div>
    </MotionConfig>
  );
}
