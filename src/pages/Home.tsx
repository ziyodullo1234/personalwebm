import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Moon, Sun } from "lucide-react";

// ================================
// MA'LUMOTLAR (shu yerdan o‘zgartirasiz)
// ================================

const PROFILE = {
  birthDate: new Date(2005, 5, 29), // 29.06.2005
  phone: "+998950571017",
  phoneView: "+998 95 057 10 17",
  telegram: "https://t.me/",
  github: "https://github.com/",
  mainProject: "https://erkinov-ziyodullo.uz/",
};

const SKILLS = [
  { title: "React", text: "Zamonaviy va tez veb-interfeyslar." },
  { title: "Django", text: "Server qismi, API va ma’lumotlar bazasi." },
  { title: "Flutter", text: "Android va iOS uchun mobil ilovalar." },
];

const LANGUAGES = ["Python", "JavaScript", "TypeScript", "Dart"];

type Theme = "light" | "dark";

function getAge(birth: Date) {
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const had =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  return had ? age : age - 1;
}

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* localStorage mavjud emas */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// ================================
// STILLAR (zp- prefiksi Tailwind bilan to‘qnashmaydi)
// ================================

const CSS = `
html { scroll-behavior: smooth; scroll-padding-top: 76px; }

.zp {
  --bg: #fafafa; --surface: #ffffff; --text: #111114; --muted: #5b5b66;
  --line: #e4e4ea; --accent: #2b50ff; --accent-text: #ffffff;
  min-height: 100vh; background: var(--bg); color: var(--text);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6; -webkit-font-smoothing: antialiased;
  transition: background-color .25s, color .25s;
}
.zp[data-theme="dark"] {
  --bg: #0b0b0f; --surface: #141419; --text: #f2f2f5; --muted: #9a9aa8;
  --line: #25252e; --accent: #6c85ff; --accent-text: #0b0b0f;
}
.zp *, .zp *::before, .zp *::after { box-sizing: border-box; }
.zp h1, .zp h2, .zp h3, .zp p { margin: 0; }
.zp a { color: inherit; text-decoration: none; }
.zp :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 6px; }

.zp-wrap { width: min(100% - 2rem, 960px); margin-inline: auto; }

.zp-header {
  position: sticky; top: 0; z-index: 10;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}
.zp-bar { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 1rem; }
.zp-logo { font-weight: 800; font-size: 1.1rem; letter-spacing: -.02em; }
.zp-logo span { color: var(--accent); }
.zp-nav { display: flex; align-items: center; gap: 1.4rem; font-size: .95rem; color: var(--muted); }
.zp-nav a:hover { color: var(--text); }
.zp-theme {
  width: 40px; height: 40px; border-radius: 50%; padding: 0;
  border: 1px solid var(--line); background: var(--surface); color: var(--text);
  display: grid; place-items: center; cursor: pointer; transition: border-color .2s;
}
.zp-theme:hover { border-color: var(--accent); }

.zp-section { padding: 4.5rem 0; }
.zp h1, .zp h2, .zp h3 { letter-spacing: -.03em; line-height: 1.1; }
.zp h2 { font-size: clamp(1.6rem, 4vw, 2.2rem); margin-bottom: 1.5rem; }
.zp-lead { color: var(--muted); font-size: clamp(1.05rem, 2.4vw, 1.25rem); max-width: 34rem; }

.zp-hero { padding: clamp(3.5rem, 12vw, 7rem) 0 3rem; }
.zp-hero h1 { font-size: clamp(2.6rem, 9vw, 5rem); font-weight: 800; margin-bottom: 1.2rem; }
.zp-hero em { font-style: normal; color: var(--accent); }
.zp-actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
.zp-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
  min-height: 48px; padding: 0 1.4rem; border-radius: 999px;
  font-weight: 600; font-size: .95rem; border: 1px solid var(--line);
  background: var(--surface); transition: transform .15s, border-color .2s, filter .2s;
}
.zp-btn:hover { border-color: var(--accent); }
.zp-btn:active { transform: scale(.97); }
.zp-btn.primary { background: var(--accent); color: var(--accent-text); border-color: var(--accent); }
.zp-btn.primary:hover { filter: brightness(1.08); }

.zp-about p { color: var(--muted); max-width: 40rem; font-size: 1.05rem; }
.zp-about p + p { margin-top: 1rem; }

.zp-grid { display: grid; gap: 1rem; grid-template-columns: repeat(3, 1fr); }
.zp-card {
  background: var(--surface); border: 1px solid var(--line);
  border-radius: 18px; padding: 1.5rem; transition: border-color .2s, transform .2s;
}
.zp-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.zp-card h3 { font-size: 1.3rem; margin-bottom: .4rem; }
.zp-card p { color: var(--muted); font-size: .95rem; }
.zp-chips { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1rem; }
.zp-chip {
  padding: .35rem .9rem; border-radius: 999px; font-size: .88rem;
  border: 1px solid var(--line); background: var(--surface); color: var(--muted);
}

.zp-project {
  display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
  background: var(--accent); color: var(--accent-text);
  border-radius: 26px; padding: clamp(1.5rem, 5vw, 2.8rem);
  transition: filter .2s, transform .2s;
}
.zp-project:hover { filter: brightness(1.07); transform: translateY(-2px); }
.zp-project small { opacity: .8; font-size: .95rem; }
.zp-project strong {
  display: block; font-size: clamp(1.4rem, 5vw, 2.4rem); letter-spacing: -.03em;
  line-height: 1.15; margin: .3rem 0; word-break: break-word;
}
.zp-arrow {
  flex-shrink: 0; width: 56px; height: 56px; border-radius: 50%;
  background: var(--accent-text); color: var(--accent);
  display: grid; place-items: center; transition: transform .25s;
}
.zp-project:hover .zp-arrow { transform: rotate(45deg); }

.zp-phone { display: inline-block; font-size: clamp(1.8rem, 7vw, 3rem); font-weight: 800; letter-spacing: -.03em; }
.zp-phone:hover { color: var(--accent); }

.zp-footer { border-top: 1px solid var(--line); padding: 1.8rem 0; color: var(--muted); font-size: .9rem; }
.zp-footer .zp-wrap { display: flex; justify-content: space-between; flex-wrap: wrap; gap: .5rem; }

@media (max-width: 720px) {
  .zp-section { padding: 3rem 0; }
  .zp-grid { grid-template-columns: 1fr; }
  .zp-nav { gap: 1rem; font-size: .9rem; }
  .zp-hide-sm { display: none; }
  .zp-btn { flex: 1 1 100%; }
  .zp-project { flex-direction: column; align-items: flex-start; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .zp * { transition: none !important; }
}
`;

// ================================
// SAHIFA
// ================================

export function Home() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const age = getAge(PROFILE.birthDate);

  useLayoutEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* e'tibor bermaymiz */
    }
  }, [theme]);

  useEffect(() => {
    document.title = "Erkinov Ziyodullo — dasturchi";
  }, []);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="zp" data-theme={theme}>
      <style>{CSS}</style>

      <header className="zp-header">
        <div className="zp-wrap zp-bar">
          <a className="zp-logo" href="#top">
            Ziyodullo<span>.</span>
          </a>

          <nav className="zp-nav" aria-label="Asosiy menyu">
            <a className="zp-hide-sm" href="#about">Men haqimda</a>
            <a href="#skills">Ko‘nikmalar</a>
            <a href="#project">Loyiha</a>
            <a href="#contact">Aloqa</a>
            <Link className="zp-hide-sm" to="/news">Yangiliklar</Link>

            <button
              type="button"
              className="zp-theme"
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Yorug‘ rejimga o‘tish" : "Qorong‘i rejimga o‘tish"
              }
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="zp-section zp-hero">
          <div className="zp-wrap">
            <h1>
              Salom, men <em>Ziyodullo</em>.
              <br />
              Dasturchiman.
            </h1>
            <p className="zp-lead">
              {age} yoshdaman. React, Django va Flutter bilan veb-saytlar va
              mobil ilovalar yarataman.
            </p>
            <div className="zp-actions">
              <a
                className="zp-btn primary"
                href={PROFILE.mainProject}
                target="_blank"
                rel="noopener noreferrer"
              >
                Asosiy loyihani ochish
              </a>
              <a className="zp-btn" href={`tel:${PROFILE.phone}`}>
                Qo‘ng‘iroq qilish
              </a>
            </div>
          </div>
        </section>

        {/* Men haqimda */}
        <section id="about" className="zp-section zp-about">
          <div className="zp-wrap">
            <h2>Men haqimda</h2>
            <p>
              Ismim Erkinov Ziyodullo, 2005-yil 29-iyunda tug‘ilganman.
              Dasturlashni amaliy loyihalar orqali o‘rganaman: har bir yangi
              g‘oya — yangi tajriba.
            </p>
            <p>
              Maqsadim — tez ishlaydigan, qulay va odamlarga haqiqatan foydali
              mahsulotlar yaratish.
            </p>
          </div>
        </section>

        {/* Ko'nikmalar */}
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
                <span key={l} className="zp-chip">{l}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Asosiy loyiha */}
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
                <small>Bosing va saytga kiring</small>
                <strong>erkinov-ziyodullo.uz</strong>
              </div>
              <span className="zp-arrow" aria-hidden="true">
                <ArrowUpRight size={24} />
              </span>
            </a>
          </div>
        </section>

        {/* Aloqa */}
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
                Telegram
              </a>
              <a
                className="zp-btn"
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

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