
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Moon,
  Sun,
  Menu,
  X,
  Github,
  Send,
  Phone,
} from "lucide-react";

// ================================
// MA'LUMOTLAR
// ================================

const PROFILE = {
  birthDate: new Date(2005, 5, 29),
  phone: "+998950571017",
  phoneView: "+998 95 057 10 17",
  telegram: "https://t.me/",
  github: "https://github.com/",
  mainProject: "https://erkinov-ziyodullo.uz/",
};

const SKILLS = [
  { title: "React", text: "Zamonaviy va tez veb-interfeyslar." },
  { title: "Django", text: "Server qismi, API va ma'lumotlar bazasi." },
  { title: "Flutter", text: "Android va iOS uchun mobil ilovalar." },
];

const LANGUAGES = ["Python", "JavaScript", "TypeScript", "Dart"];

type Theme = "light" | "dark";

function getAge(birth: Date) {
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();

  const had =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() &&
      now.getDate() >= birth.getDate());

  return had ? age : age - 1;
}

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");

    if (saved === "light" || saved === "dark") return saved;
  } catch {}

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// ================================
// CSS
// ================================

const CSS = `
html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

.zp {
  --bg: #fafafa;
  --surface: #ffffff;
  --text: #111114;
  --muted: #686875;
  --line: #e7e7ec;
  --accent: #3155ff;
  --accent-text: #ffffff;

  min-height: 100vh;
  background: var(--bg);
  color: var(--text);

  font-family: system-ui, -apple-system, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif;

  line-height: 1.6;
  -webkit-font-smoothing: antialiased;

  transition: background .25s, color .25s;
}

.zp[data-theme="dark"] {
  --bg: #09090d;
  --surface: #131319;
  --text: #f4f4f7;
  --muted: #a1a1ad;
  --line: #25252e;
  --accent: #7287ff;
  --accent-text: #09090d;
}

.zp *,
.zp *::before,
.zp *::after {
  box-sizing: border-box;
}

.zp h1,
.zp h2,
.zp h3,
.zp p {
  margin: 0;
}

.zp a {
  color: inherit;
  text-decoration: none;
}

.zp button {
  font: inherit;
}

.zp :focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 8px;
}

.zp-wrap {
  width: min(100% - 40px, 1000px);
  margin-inline: auto;
}

/* NAVBAR */

.zp-header {
  position: sticky;
  top: 0;
  z-index: 100;

  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  border-bottom: 1px solid var(--line);
}

.zp-bar {
  height: 74px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 24px;
}

.zp-logo {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  font-size: 1.35rem;
  font-weight: 850;
  letter-spacing: -1px;
}

.zp-logo span {
  color: var(--accent);
}

.zp-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 26px;

  color: var(--muted);
  font-size: .94rem;
}

.zp-nav a {
  transition: color .2s;
  white-space: nowrap;
}

.zp-nav a:hover {
  color: var(--accent);
}

.zp-theme {
  width: 42px;
  height: 42px;
  flex-shrink: 0;

  border-radius: 50%;
  border: 1px solid var(--line);

  background: var(--surface);
  color: var(--text);

  display: grid;
  place-items: center;

  cursor: pointer;
  transition: .2s;
}

.zp-theme:hover {
  border-color: var(--accent);
  transform: rotate(8deg);
}

.zp-mobile-toggle {
  display: none;

  width: 44px;
  height: 44px;

  border: 1px solid var(--line);
  border-radius: 12px;

  background: var(--surface);
  color: var(--text);

  place-items: center;
  cursor: pointer;
}

/* HERO */

.zp-section {
  padding: 5rem 0;
}

.zp h1,
.zp h2,
.zp h3 {
  letter-spacing: -.04em;
  line-height: 1.15;
}

.zp h2 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 1.8rem;
}

.zp-hero {
  padding: clamp(4rem, 11vw, 8rem) 0 5rem;
}

.zp-hero-inner {
  max-width: 800px;
}

.zp-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 9px 15px;

  border: 1px solid var(--line);
  border-radius: 999px;

  background: var(--surface);
  color: var(--muted);

  font-size: .88rem;
  margin-bottom: 1.8rem;
}

.zp-dot {
  width: 8px;
  height: 8px;

  background: #22c55e;
  border-radius: 50%;

  box-shadow: 0 0 12px #22c55e66;
}

.zp-hero h1 {
  font-size: clamp(2.8rem, 8vw, 6rem);
  font-weight: 850;

  letter-spacing: -.065em;
  line-height: 1.08;

  margin-bottom: 1.5rem;
}

.zp-hero em {
  font-style: normal;
  color: var(--accent);
}

.zp-lead {
  color: var(--muted);
  font-size: clamp(1.05rem, 2.5vw, 1.3rem);
  max-width: 600px;
  line-height: 1.8;
}

.zp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  margin-top: 2.3rem;
}

.zp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-height: 52px;
  padding: 0 1.5rem;

  border-radius: 14px;
  border: 1px solid var(--line);

  font-weight: 650;
  font-size: .95rem;

  background: var(--surface);
  color: var(--text);

  transition: transform .2s, border-color .2s, filter .2s;
}

.zp-btn:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}

.zp-btn.primary {
  background: var(--accent);
  color: var(--accent-text);
  border-color: var(--accent);
}

.zp-btn.primary:hover {
  filter: brightness(1.08);
}

/* ABOUT */

.zp-about p {
  color: var(--muted);
  max-width: 720px;
  font-size: 1.08rem;
  line-height: 1.9;
}

.zp-about p + p {
  margin-top: 1rem;
}

/* SKILLS */

.zp-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.zp-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 22px;

  padding: 2rem 1.6rem;

  transition: transform .25s, border-color .25s;
}

.zp-card:hover {
  border-color: var(--accent);
  transform: translateY(-5px);
}

.zp-card h3 {
  font-size: 1.45rem;
  margin-bottom: .8rem;
}

.zp-card p {
  color: var(--muted);
  font-size: .97rem;
}

.zp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1.5rem;
}

.zp-chip {
  padding: 9px 15px;

  border-radius: 999px;
  border: 1px solid var(--line);

  background: var(--surface);
  color: var(--muted);

  font-size: .9rem;
}

/* PROJECT */

.zp-project {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  background: var(--accent);
  color: var(--accent-text);

  border-radius: 28px;
  padding: clamp(1.7rem, 5vw, 3rem);

  transition: transform .25s, filter .25s;
}

.zp-project:hover {
  transform: translateY(-4px);
  filter: brightness(1.08);
}

.zp-project small {
  opacity: .8;
  font-size: .95rem;
}

.zp-project strong {
  display: block;
  font-size: clamp(1.5rem, 5vw, 2.8rem);
  letter-spacing: -.05em;
  line-height: 1.2;

  margin-top: .5rem;
  overflow-wrap: anywhere;
}

.zp-arrow {
  width: 60px;
  height: 60px;
  flex-shrink: 0;

  border-radius: 50%;

  background: var(--accent-text);
  color: var(--accent);

  display: grid;
  place-items: center;

  transition: transform .25s;
}

.zp-project:hover .zp-arrow {
  transform: rotate(45deg);
}

/* CONTACT */

.zp-phone {
  display: inline-block;

  font-size: clamp(1.7rem, 6vw, 3rem);
  font-weight: 850;
  letter-spacing: -.04em;

  transition: color .2s;
}

.zp-phone:hover {
  color: var(--accent);
}

/* FOOTER */

.zp-footer {
  border-top: 1px solid var(--line);
  padding: 2rem 0;

  color: var(--muted);
  font-size: .9rem;
}

.zp-footer .zp-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

/* MOBILE NAV */

@media (max-width: 760px) {
  .zp-wrap {
    width: min(100% - 28px, 1000px);
  }

  .zp-bar {
    height: 68px;
  }

  .zp-mobile-toggle {
    display: grid;
  }

  .zp-nav {
    display: none;
  }

  .zp-mobile-menu {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;

    padding: 14px;

    background: var(--bg);
    border-bottom: 1px solid var(--line);

    display: flex;
    flex-direction: column;
    gap: 6px;

    animation: zpMenuIn .2s ease;
  }

  .zp-mobile-menu a {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 14px 16px;

    border-radius: 12px;

    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--line);

    font-size: .96rem;
  }

  .zp-mobile-menu a:hover {
    border-color: var(--accent);
  }

  .zp-mobile-menu-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 12px;
    padding: 12px 4px 4px;
  }

  .zp-mobile-menu-bottom span {
    color: var(--muted);
    font-size: .85rem;
  }

  .zp-section {
    padding: 3.5rem 0;
  }

  .zp-hero {
    padding: 4rem 0 3rem;
  }

  .zp-hero h1 {
    font-size: clamp(2.6rem, 11vw, 4.4rem);
  }

  .zp-grid {
    grid-template-columns: 1fr;
  }

  .zp-card {
    padding: 1.6rem;
  }

  .zp-project {
    border-radius: 22px;
  }

  .zp-arrow {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .zp-hero h1 {
    font-size: clamp(2.45rem, 12vw, 3.5rem);
  }

  .zp-actions {
    flex-direction: column;
  }

  .zp-btn {
    width: 100%;
  }

  .zp-project {
    flex-direction: column;
    align-items: flex-start;
  }

  .zp-project strong {
    font-size: 1.8rem;
  }

  .zp-phone {
    font-size: clamp(1.5rem, 8vw, 2.4rem);
  }

  .zp-footer .zp-wrap {
    flex-direction: column;
  }
}

@keyframes zpMenuIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .zp *,
  .zp *::before,
  .zp *::after {
    transition: none !important;
    animation: none !important;
  }

  html {
    scroll-behavior: auto;
  }
}
`;

// ================================
// HOME
// ================================

export function Home() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  const age = getAge(PROFILE.birthDate);

  useLayoutEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    document.title = "Erkinov Ziyodullo — dasturchi";
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="zp" data-theme={theme}>
      <style>{CSS}</style>

      {/* NAVBAR */}
      <header className="zp-header">
        <div className="zp-wrap zp-bar">
          <a className="zp-logo" href="#top" onClick={closeMenu}>
            Ziyodullo<span>.</span>
          </a>

          {/* DESKTOP */}
          <nav className="zp-nav" aria-label="Asosiy menyu">
            <a href="#about">Men haqimda</a>
            <a href="#skills">Ko‘nikmalar</a>
            <a href="#project">Loyiha</a>
            <a href="#contact">Aloqa</a>
            <Link to="/news">Yangiliklar</Link>

            <button
              type="button"
              className="zp-theme"
              onClick={toggleTheme}
              aria-label="Tema almashtirish"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            className="zp-mobile-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <nav className="zp-mobile-menu" aria-label="Mobil menyu">
            <a href="#about" onClick={closeMenu}>
              Men haqimda <ArrowUpRight size={18} />
            </a>

            <a href="#skills" onClick={closeMenu}>
              Ko‘nikmalar <ArrowUpRight size={18} />
            </a>

            <a href="#project" onClick={closeMenu}>
              Loyiha <ArrowUpRight size={18} />
            </a>

            <a href="#contact" onClick={closeMenu}>
              Aloqa <ArrowUpRight size={18} />
            </a>

            <Link to="/news" onClick={closeMenu}>
              Yangiliklar <ArrowUpRight size={18} />
            </Link>

            <div className="zp-mobile-menu-bottom">
              <span>Ko‘rinishni o‘zgartirish</span>

              <button
                type="button"
                className="zp-theme"
                onClick={toggleTheme}
                aria-label="Tema almashtirish"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="zp-section zp-hero">
          <div className="zp-wrap zp-hero-inner">
            <div className="zp-badge">
              <span className="zp-dot" />
              Dasturchi · Developer
            </div>

            <h1>
              Salom, men
              <br />
              <em>Ziyodullo.</em>
            </h1>

            <p className="zp-lead">
              {age} yoshdaman. React, Django va Flutter bilan
              veb-saytlar hamda mobil ilovalar yarataman.
              G‘oyalarni zamonaviy va foydali loyihalarga aylantiraman.
            </p>

            <div className="zp-actions">
              <a
                className="zp-btn primary"
                href={PROFILE.mainProject}
                target="_blank"
                rel="noopener noreferrer"
              >
                Asosiy loyiham
                <ArrowUpRight size={18} />
              </a>

              <a className="zp-btn" href={`tel:${PROFILE.phone}`}>
                <Phone size={18} />
                Bog‘lanish
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="zp-section zp-about">
          <div className="zp-wrap">
            <h2>Men haqimda</h2>

            <p>
              Ismim Erkinov Ziyodullo, 2005-yil 29-iyunda
              tug‘ilganman. Dasturlashni amaliy loyihalar orqali
              o‘rganaman. Har bir yangi g‘oya — yangi tajriba
              va imkoniyat.
            </p>

            <p>
              Maqsadim — tez ishlaydigan, qulay, zamonaviy va
              odamlarga haqiqatan foydali mahsulotlar yaratish.
            </p>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="zp-section">
          <div className="zp-wrap">
            <h2>Ko‘nikmalar</h2>

            <div className="zp-grid">
              {SKILLS.map((s) => (
                <article key={s.title} className="zp-card">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>

            <div className="zp-chips" aria-label="Dasturlash tillari">
              {LANGUAGES.map((l) => (
                <span key={l} className="zp-chip">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECT */}
        <section id="project" className="zp-section">
          <div className="zp-wrap">
            <h2>Asosiy loyiham</h2>

            <a
              className="zp-project"
              href={PROFILE.mainProject}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asosiy loyiha saytini ochish"
            >
              <div>
                <small>Shaxsiy portfolio va loyiha</small>
                <strong>erkinov-ziyodullo.uz</strong>
              </div>

              <span className="zp-arrow" aria-hidden="true">
                <ArrowUpRight size={26} />
              </span>
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="zp-section">
          <div className="zp-wrap">
            <h2>Aloqa</h2>

            <a className="zp-phone" href={`tel:${PROFILE.phone}`}>
              {PROFILE.phoneView}
            </a>

            <div className="zp-actions">
              <a
                className="zp-btn"
                href={PROFILE.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send size={18} />
                Telegram
              </a>

              <a
                className="zp-btn"
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="zp-footer">
        <div className="zp-wrap">
          <span>© {new Date().getFullYear()} Erkinov Ziyodullo</span>
          <span>Barcha huquqlar himoyalangan</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
