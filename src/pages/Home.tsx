
import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Github,
  Send,
} from "lucide-react";
import type { Mesh } from "three";

// ================================
// 3D ANIMATSIYA
// ================================

function AnimatedOrb() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.15;
    ref.current.rotation.x += delta * 0.08;
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.12}
      floatIntensity={0.25}
    >
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.15, 2]} />

        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.35}
          metalness={0.3}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        powerPreference: "low-power",
      }}
    >
      <ambientLight intensity={1.4} />

      <pointLight
        position={[3, 3, 3]}
        intensity={2}
        color="#a78bfa"
      />

      <Suspense fallback={null}>
        <AnimatedOrb />
      </Suspense>
    </Canvas>
  );
}

// ================================
// ANIMATSIYA SOZLAMASI
// ================================

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReduced(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => {
      media.removeEventListener?.("change", update);
    };
  }, []);

  return reduced;
}

// ================================
// ASOSIY SAHIFA
// ================================

export function Home() {
  const reduceMotion = useReducedMotionPreference();

  const projects = [
    {
      title: "Portfolio",
      description:
        "Shaxsiy sahifa va loyihalar uchun zamonaviy web dizayn.",
      tags: ["React", "Tailwind"],
    },
    {
      title: "Web interfeys",
      description:
        "Sodda, qulay va turli ekranlarga mos interfeyslar.",
      tags: ["TypeScript", "CSS"],
    },
    {
      title: "Cybersecurity",
      description:
        "Tarmoq va axborot xavfsizligini amaliy o‘rganish.",
      tags: ["Linux", "Security"],
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-hidden bg-[#08090d] text-white">
        {/* Orqa fon */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]" />

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-[100px]" />
        </div>

        {/* Navigatsiya */}
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
          <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#08090d]/85 px-4 py-3 backdrop-blur-xl sm:px-6">
            <Link
              to="/"
              className="shrink-0 text-sm font-bold tracking-wide sm:text-base"
            >
              ZIYODULLO
              <span className="text-violet-400">.</span>
            </Link>

            <div className="flex items-center gap-3 text-xs text-slate-300 sm:gap-7 sm:text-sm">
              <a
                href="#about"
                className="transition hover:text-white"
              >
                Men haqimda
              </a>

              <a
                href="#projects"
                className="transition hover:text-white"
              >
                Loyihalar
              </a>

              <Link
                to="/news"
                className="transition hover:text-white"
              >
                Yangiliklar
              </Link>
            </div>
          </nav>
        </header>

        <main className="relative z-10 mx-auto max-w-5xl px-4">
          {/* HERO */}
          <section className="relative grid min-h-[90svh] items-center gap-5 pb-16 pt-28 sm:px-4 sm:pt-32 md:grid-cols-2 md:gap-12">
            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-400 sm:text-sm">
                Salom, mening ismim
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Erkinov
                <br />
                <span className="text-violet-400">
                  Ziyodullo.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
                Web dasturlash, zamonaviy texnologiyalar va
                kiberxavfsizlikka qiziqaman. Har kuni yangi
                bilim va tajriba orttirishga intilaman.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium transition hover:bg-violet-500"
                >
                  Loyihalarim
                  <ArrowRight size={16} />
                </a>

                <Link
                  to="/news"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm transition hover:bg-white/5"
                >
                  Yangiliklar
                </Link>
              </div>

              {/* Ijtimoiy tarmoqlar */}
              <div className="mt-8 flex items-center gap-5">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-slate-400 transition hover:text-white"
                >
                  <Github size={20} />
                </a>

                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="text-slate-400 transition hover:text-white"
                >
                  <Send size={20} />
                </a>
              </div>
            </motion.div>

            {/* 3D obyekt */}
            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, scale: 0.95 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto h-64 w-full max-w-sm sm:h-80 md:h-[400px]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-violet-600/10 blur-3xl"
              />

              <div className="relative h-full w-full">
                <Scene />
              </div>
            </motion.div>

            <a
              href="#about"
              aria-label="Men haqimda bo‘limiga o‘tish"
              className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate-500 transition hover:text-white md:block"
            >
              <ArrowDown size={20} />
            </a>
          </section>

          {/* MEN HAQIMDA */}
          <section
            id="about"
            className="scroll-mt-28 py-16 sm:py-24"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Men haqimda
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Oddiylik. Izlanish. Rivojlanish.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Men texnologiyalarni amaliy loyihalar orqali
              o‘rganaman. Maqsadim — foydali, tez ishlaydigan
              va foydalanish uchun qulay raqamli mahsulotlar
              yaratish.
            </p>
          </section>

          {/* LOYIHALAR */}
          <section
            id="projects"
            className="scroll-mt-28 py-12 sm:py-20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Ishlarim
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Loyihalar
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  whileInView={
                    reduceMotion
                      ? undefined
                      : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/30"
                >
                  <h3 className="text-lg font-semibold">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ALOQA */}
          <section className="py-12 sm:py-16">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
              <h2 className="text-xl font-bold sm:text-2xl">
                Aloqada bo‘lamiz
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Taklif yoki hamkorlik bo‘yicha men bilan
                bog‘lanishingiz mumkin.
              </p>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium transition hover:bg-violet-500"
              >
                <Send size={16} />
                Telegram orqali bog‘lanish
              </a>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-8 border-t border-white/10 py-7 text-center text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} Erkinov Ziyodullo.
            Barcha huquqlar himoyalangan.
          </footer>
        </main>
      </div>
    </MotionConfig>
  );
}

export default Home;
