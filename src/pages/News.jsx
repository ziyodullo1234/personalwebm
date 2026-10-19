import { Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import Lenis from "lenis";
import { MotionConfig, motion } from "framer-motion";
import { Send } from "lucide-react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=Manrope:wght@400;600;700&display=swap');
:root{--bg:#06070c;--mute:#9aa0bd;--v:#7c5cff;--c:#22d3ee}
.fd{font-family:'Bricolage Grotesque',system-ui,sans-serif}.fb{font-family:'Manrope',system-ui,sans-serif}
a:focus-visible{outline:2px solid var(--c);outline-offset:4px;border-radius:999px}
`;

// Yangilik qo'shish uchun: { date: "12-oktabr, 2026", title: "...", text: "..." }
const news = [];

const glow = new THREE.Color("#22d3ee").multiplyScalar(3);

function useSmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09 });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
}

function Rig() {
  useFrame((s, dt) => {
    s.camera.position.x = THREE.MathUtils.damp(s.camera.position.x, s.pointer.x * 0.8, 3, dt);
    s.camera.position.y = THREE.MathUtils.damp(s.camera.position.y, s.pointer.y * 0.5, 3, dt);
    s.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Ripples() {
  const refs = useRef([]);
  useFrame(({ clock }) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const k = (clock.elapsedTime / 4 + i / 3) % 1;
      m.scale.setScalar(0.8 + k * 3.4);
      m.material.opacity = (1 - k) * 0.9;
    });
  });
  return [0, 1, 2].map((i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)} rotation={[Math.PI / 2.15, 0, 0]}>
      <torusGeometry args={[1, 0.008, 8, 180]} />
      <meshBasicMaterial color={glow} transparent toneMapped={false} />
    </mesh>
  ));
}

function Knot({ reduce }) {
  const g = useRef();
  useFrame((s, dt) => {
    const wide = s.viewport.width > 7;
    g.current.position.y = THREE.MathUtils.damp(g.current.position.y, wide ? 1.15 : 1.5, 3, dt);
    g.current.scale.setScalar(wide ? 1 : 0.75);
    g.current.rotation.y += dt * 0.3;
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -s.pointer.y * 0.5, 3, dt);
  });
  return (
    <group ref={g}>
      <Float speed={reduce ? 0 : 1.6} rotationIntensity={0.4} floatIntensity={1}>
        <mesh>
          <torusKnotGeometry args={[0.85, 0.28, 300, 36]} />
          <meshPhysicalMaterial color="#8b6cff" metalness={1} roughness={0.12} iridescence={1} iridescenceIOR={1.4} clearcoat={1} envMapIntensity={1.5} />
        </mesh>
      </Float>
      <Ripples />
    </group>
  );
}

function Scene({ reduce }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7.5], fov: 42 }} gl={{ powerPreference: "high-performance" }} eventSource={document.body} eventPrefix="client">
      <color attach="background" args={["#06070c"]} />
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={4} position={[-4, 3, -3]} scale={[8, 4, 1]} color="#7c5cff" />
          <Lightformer form="rect" intensity={4} position={[5, -2, 2]} scale={[6, 3, 1]} color="#22d3ee" />
          <Lightformer form="ring" intensity={3} position={[0, 4, 4]} scale={4} color="#ffffff" />
        </Environment>
        <Knot reduce={reduce} />
        <Sparkles count={120} scale={[16, 9, 8]} size={2.5} speed={reduce ? 0 : 0.35} color="#a5b4ff" />
      </Suspense>
      <Rig />
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.1} luminanceThreshold={0.9} mipmapBlur />
        <Vignette offset={0.25} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}

function Nav() {
  return (
    <nav aria-label="Asosiy" className="fb fixed left-1/2 top-4 z-30 flex -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl">
      <Link to="/" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--mute)] transition-colors hover:text-white">Bosh sahifa</Link>
      <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">Yangiliklar</span>
    </nav>
  );
}

export function News() {
  useSmoothScroll();
  const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <MotionConfig reducedMotion="user">
      <div className="fb relative min-h-screen w-full overflow-x-hidden bg-[var(--bg)] text-white antialiased selection:bg-[var(--v)]">
        <style>{css}</style>
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0"><Scene reduce={reduce} /></div>
        <Nav />

        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 pb-8 pt-[46vh]">
          <div className="flex-1">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }} className="fd text-center text-5xl font-extrabold tracking-tight sm:text-7xl">
              Yangiliklar
            </motion.h1>

            <div className="mt-10">
              {news.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center backdrop-blur-md sm:p-10">
                  <span className="mx-auto mb-4 flex size-3.5">
                    <span className="absolute inline-flex size-3.5 animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex size-3.5 rounded-full bg-emerald-500" />
                  </span>
                  <p className="fd text-2xl font-extrabold sm:text-3xl">Yangilik hozircha yo'q, bizda tinchlik.</p>
                  <p className="mx-auto mt-3 max-w-sm leading-relaxed text-[var(--mute)]">
                    Hozircha hech qanday e'lon yo'q. Biror yangilik yoki taklifingiz bo'lsa, xabar qoldiring.
                  </p>
                  <motion.a href="https://t.me/erkinovziyodullo" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#06070c]">
                    <Send className="size-4" />
                    Yangilik bo'lsa xabar bering
                  </motion.a>
                </motion.div>
              ) : (
                <ul className="space-y-5">
                  {news.map((n, i) => (
                    <motion.li key={n.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md">
                      <span className="text-sm text-[var(--mute)]">{n.date}</span>
                      <h2 className="fd mt-1 text-2xl font-extrabold">{n.title}</h2>
                      <p className="mt-2 leading-relaxed text-[var(--mute)]">{n.text}</p>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <footer className="mt-16 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-6 text-sm text-[var(--mute)]">
            <span>© 2026 Erkinov Ziyodullo</span>
            <span>Holat: hammasi sokin</span>
          </footer>
        </main>
      </div>
    </MotionConfig>
  );
}