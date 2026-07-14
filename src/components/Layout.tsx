import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Image,
  BookOpen,
  Code,
  Sun,
  Moon,
  Newspaper,
  User,
  Github,
  Linkedin,
  Twitter,
  Send,
  ArrowUp,
} from "lucide-react";

/*
  DESIGN NOTE
  -----------
  Identity: "matchday scoreboard" — futbol (maydon yashili, projektor sariq,
  tungi stadion foni) va dasturlash (mono raqamlar, aniq gridlar) uyg'unligi.
  Add these to your index.html <head> for the intended type pairing:

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">

  Tailwind font stacks used below assume:
    font-display -> Oswald, ui-sans-serif
    font-body    -> Manrope, ui-sans-serif
    font-mono    -> "JetBrains Mono", ui-monospace
  If those aren't registered in tailwind.config, replace with font-['Oswald'] etc.
*/

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { path: "/", label: "Bosh sahifa", icon: Home },
    { path: "/news", label: "Yangiliklar", icon: Newspaper },
    { path: "/gallery", label: "Galereya", icon: Image },
    { path: "/blog", label: "Blog", icon: BookOpen },
    { path: "/skills", label: "Ko'nikmalar", icon: Code },
    { path: "/about", label: "Men haqimda", icon: User },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Send, href: "https://t.me/erkinovziyodullo", label: "Telegram" },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-body transition-colors duration-500 selection:bg-emerald-500/30">

        {/* Navbar */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/40 border-b border-zinc-200 dark:border-zinc-800"
              : "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-transparent"
          }`}
        >
          {/* pitch-line accent */}
          <div className="h-[3px] w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo — jersey badge */}
              <Link to="/" className="group flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 dark:bg-emerald-500 text-zinc-950 font-mono font-bold text-sm ring-2 ring-emerald-600/20 dark:ring-emerald-400/20 group-hover:ring-4 transition-all duration-300">
                  07
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-white dark:border-zinc-950" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-display font-semibold uppercase tracking-wide text-base lg:text-lg text-zinc-900 dark:text-white">
                    Ziyodullo <span className="text-emerald-600 dark:text-emerald-400">Erkinov</span>
                  </span>
                  <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                    Dev &amp; Football
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 ${
                        isActive
                          ? "text-zinc-950"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full bg-emerald-500"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <link.icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                      )}
                    </Link>
                  );
                })}

                {/* Theme Toggle — floodlight switch */}
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label="Mavzuni almashtirish"
                  className="ml-3 p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-colors duration-300"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-emerald-600" />
                  )}
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label="Mavzuni almashtirish"
                  className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-emerald-600" />
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Menyu"
                  className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 overflow-hidden"
              >
                <div className="px-4 py-4 space-y-1">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "bg-emerald-500 text-zinc-950"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        }`}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-300" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Main Content */}
        <main className="pt-[76px] lg:pt-[84px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              aria-label="Tepaga qaytish"
              className="fixed bottom-24 right-6 z-40 p-3 rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-500 transition-colors duration-300"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="relative mt-32 bg-zinc-950 text-zinc-300 border-t border-emerald-900/40 overflow-hidden"
        >
          {/* center-circle motif */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-emerald-800/40" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 text-zinc-950 font-mono font-bold text-xs">
                    07
                  </div>
                  <h3 className="font-display uppercase tracking-wide text-lg text-white">
                    Ziyodullo Erkinov
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
                  Zamonaviy texnologiyalar yordamida ajoyib veb-tajribalar yarataman.
                  Futbol, dasturlash va cheksiz imkoniyatlar.
                </p>
                <div className="flex items-center gap-2 mt-5">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      aria-label={social.label}
                      className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-700/60 transition-colors duration-300"
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-500 mb-4">
                  Sahifalar
                </h4>
                <ul className="space-y-2.5 text-sm text-zinc-400">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-emerald-400 transition-colors" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-500 mb-4">
                  Bog'lanish
                </h4>
                <ul className="space-y-2.5 text-sm text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <a
                      href="https://t.me/erkinovziyodullo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Telegram
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <a href="#" className="hover:text-emerald-400 transition-colors">
                      GitHub
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <a href="#" className="hover:text-emerald-400 transition-colors">
                      LinkedIn
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <a href="#" className="hover:text-emerald-400 transition-colors">
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar — scoreboard strip */}
            <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
              <p className="flex items-center gap-2">
                <span>© 2026 Ziyodullo Erkinov</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>Barcha huquqlar himoyalangan</span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <span className="px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-400 border border-emerald-800/60">
                  FT
                </span>
                <span>React &amp; Tailwind CSS bilan yaratilgan</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>v3.0</span>
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}