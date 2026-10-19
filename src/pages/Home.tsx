import { Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import Lenis from "lenis";
import { MotionConfig, motion } from "framer-motion";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=Manrope:wght@400;600;700&display=swap');
:root{--bg:#06070c;--mute:#9aa0bd;--v:#7c5cff;--c:#22d3ee}
.fd{font-family:'Bricolage Grotesque',system-ui,sans-serif}.fb{font-family:'Manrope',system-ui,sans-serif}
a:focus-visible{outline:2px solid var(--c);outline-offset:4px;border-radius:12px}
`;

const scroll = { p: 0 };
const glow = new THREE.Color("#22d3ee").multiplyScalar(3);

function useSmoothScroll() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.09 });
    let id;
    const raf = (t) => { lenis?.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    const on = () => { scroll.p = Math.min(1, scrollY / Math.max(1, innerHeight * 0.9)); };
    addEventListener("scroll", on, { passive: true });
    on();
    return () => { cancelAnimationFrame(id); lenis?.destroy(); removeEventListener("scroll", on); };
  }, []);
}

function Rig() {
  useFrame((s, dt) => {
    s.camera.position.x = THREE.MathUtils.damp(s.camera.position.x, s.pointer.x * 0.7, 3, dt);
    s.camera.position.y = THREE.MathUtils.damp(s.camera.position.y, s.pointer.y * 0.45, 3, dt);
    s.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Gem({ label, r, speed, phase, color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const a = clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(a) * r, Math.sin(a * 1.3) * 0.4, Math.sin(a) * r);
    ref.current.rotation.y = a * 2;
  });
  return (
    <group ref={ref}>
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} metalness={0.6} roughness={0.2} toneMapped={false} />
      </mesh>
      <Html position={[0, -0.5, 0]} center distanceFactor={8} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
        <span className="fb whitespace-nowrap rounded-full border border-white/20 bg-black/40 px-3 py-1 text-sm font-bold text-white backdrop-blur">{label}</span>
      </Html>
    </group>
  );
}

function Orb({ reduce }) {
  const g = useRef();
  useFrame((s, dt) => {
    const wide = s.viewport.width > 7;
    const t = scroll.p;
    const tx = wide ? 2.5 * (1 - t) : 0;
    const ty = (wide ? 0 : 1.7) * (1 - t) + t * 2.5;
    g.current.position.x = THREE.MathUtils.damp(g.current.position.x, tx, 3, dt);
    g.current.position.y = THREE.MathUtils.damp(g.current.position.y, ty, 3, dt);
    const sc = THREE.MathUtils.damp(g.current.scale.x, (wide ? 1 : 0.7) * (1 - t * 0.45), 3, dt);
    g.current.scale.setScalar(sc);
    g.current.rotation.y += dt * 0.25 + t * dt;
  });
  return (
    <group ref={g}>
      <Float speed={reduce ? 0 : 1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <sphereGeometry args={[1.5, 128, 128]} />
          <MeshDistortMaterial color="#6d4aff" roughness={0.08} metalness={0.9} distort={reduce ? 0 : 0.35} speed={1.6} iridescence={1} clearcoat={1} envMapIntensity={1.6} />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 2.4, 0, 0.3]}>
        <torusGeometry args={[2.35, 0.012, 16, 220]} />
        <meshBasicMaterial color={glow} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.4, 0]}>
        <torusGeometry args={[2.9, 0.008, 16, 220]} />
        <meshBasicMaterial color="#7c5cff" toneMapped={false} />
      </mesh>
      <group rotation={[0.4, 0, 0.25]}>
        <Gem label="React" r={2.35} speed={0.5} phase={0} color="#22d3ee" />
        <Gem label="Django" r={2.35} speed={0.5} phase={2.1} color="#34d399" />
        <Gem label="Kali" r={2.35} speed={0.5} phase={4.2} color="#a78bfa" />
      </group>
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
        <Orb reduce={reduce} />
        <Sparkles count={140} scale={[16, 9, 8]} size={2.5} speed={reduce ? 0 : 0.4} color="#a5b4ff" />
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
      <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">Bosh sahifa</span>
      <Link to="/news" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--mute)] transition-colors hover:text-white">Yangiliklar</Link>
    </nav>
  );
}

const Line = ({ children, delay = 0, className = "" }) => (
  <span className="block overflow-hidden pb-[0.1em]">
    <motion.span className={`block ${className}`} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.span>
  </span>
);

const reveal = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.7 } };
const card = "block h-full rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md transition-colors hover:border-[var(--c)]/60 hover:bg-white/[0.09]";
const link = "mt-5 inline-block font-bold text-[var(--c)] underline decoration-2 underline-offset-[6px]";

export function Home() {
  useSmoothScroll();
  const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <MotionConfig reducedMotion="user">
      <div className="fb relative min-h-screen w-full overflow-x-hidden bg-[var(--bg)] text-white antialiased selection:bg-[var(--v)]">
        <style>{css}</style>
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0"><Scene reduce={reduce} /></div>
        <Nav />

        <main className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <section className="flex min-h-screen items-center pt-20">
            <div className="max-w-xl">
              <h1 className="fd text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-8xl">
                <Line>Erkinov</Line>
                <Line delay={0.12} className="bg-gradient-to-r from-white via-cyan-300 to-violet-400 bg-clip-text text-transparent">Ziyodullo</Line>
              </h1>
              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-8 max-w-md text-lg leading-relaxed text-[var(--mute)]">
                Shaxsiy sahifam. Dasturlashda o'rgangan narsalarim va loyihalarim shu yerda. Sichqonchani siljiting va pastga aylantiring.
              </motion.p>
            </div>
          </section>

          <motion.section {...reveal} className="py-24">
            <p className="fd max-w-3xl text-3xl font-bold leading-snug sm:text-5xl">
              Paxtaobod, Andijondan dasturchiman. Interfeyslarni React bilan, serverni Django bilan yozaman, xavfsizlikni Kali Linux'da o'rganaman.
            </p>
          </motion.section>

          <section className="grid gap-5 pb-24 md:grid-cols-3">
            {[
              { t: "Yangiliklar", d: "E'lonlar va yangi yozuvlar shu yerda chiqadi.", to: "/news", c: "Ochish" },
              { t: "Telegram", d: "Savol, taklif yoki hamkorlik bo'lsa, yozing.", href: "https://t.me/erkinovziyodullo", c: "t.me/erkinovziyodullo" },
              { t: "Manzil", d: "Paxtaobod, Andijon, O'zbekiston." },
            ].map((x, i) => (
              <motion.div key={x.t} {...reveal} transition={{ duration: 0.7, delay: i * 0.1 }}>
                <div className={card}>
                  <h2 className="fd text-2xl font-extrabold">{x.t}</h2>
                  <p className="mt-2 leading-relaxed text-[var(--mute)]">{x.d}</p>
                  {x.to && <Link to={x.to} className={link}>{x.c}</Link>}
                  {x.href && <a href={x.href} target="_blank" rel="noopener noreferrer" className={link}>{x.c}</a>}
                </div>
              </motion.div>
            ))}
          </section>

          <footer className="flex flex-wrap justify-between gap-2 border-t border-white/10 py-6 text-sm text-[var(--mute)]">
            <span>© 2026 Erkinov Ziyodullo</span>
            <span>Andijon, Paxtaobod</span>
          </footer>
        </main>
      </div>
    </MotionConfig>
  );
}