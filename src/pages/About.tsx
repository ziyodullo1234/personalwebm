// pages/About.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Code, 
  Briefcase,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Heart,
  Award,
  Clock,
  Coffee,
  Sparkles,
  Zap,
  Star,
  Users,
  Rocket,
  BookOpen,
  Music,
  Camera,
  Palette
} from "lucide-react";
import { useState, useEffect } from "react";

export function About() {
  const [showPopup, setShowPopup] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { name: 'React', icon: '⚛️', level: 90, color: 'from-blue-400 to-blue-600' },
    { name: 'TypeScript', icon: '📘', level: 85, color: 'from-blue-500 to-blue-700' },
    { name: 'Tailwind CSS', icon: '🎨', level: 95, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Framer Motion', icon: '🎬', level: 80, color: 'from-purple-400 to-purple-600' },
    { name: 'Next.js', icon: '🚀', level: 75, color: 'from-gray-400 to-gray-600' },
    { name: 'Git', icon: '🔀', level: 85, color: 'from-orange-400 to-orange-600' },
  ];

  const stats = [
    { icon: Award, label: "Loyihalar", value: "50+" },
    { icon: Users, label: "Mijozlar", value: "30+" },
    { icon: Coffee, label: "Kofe ichilgan", value: "1000+" },
    { icon: Rocket, label: "Yillar tajriba", value: "3+" },
  ];

  const hobbies = [
    { icon: BookOpen, label: "Kitob o'qish", emoji: "📚" },
    { icon: Music, label: "Musiqa tinglash", emoji: "🎵" },
    { icon: Camera, label: "Suratga olish", emoji: "📸" },
    { icon: Palette, label: "Dizayn", emoji: "🎨" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 dark:bg-purple-400/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated gradient mouse effect */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-24 relative z-10">
        {/* Orqaga */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-8 group">
          <motion.span
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.span>
          <span className="text-sm">Orqaga</span>
        </Link>

        {/* Main Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background gradient effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-3xl blur-xl" />

          <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 dark:border-gray-700/50 shadow-2xl">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-4xl text-white shadow-xl relative">
                  <User className="w-12 h-12" />
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              <div className="text-center md:text-left">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Erkinov Ziyodullo
                </motion.h1>
                <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Code className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Frontend Dasturchi</span>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.span>
                </p>
              </div>
            </div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-gray-600 dark:text-gray-300 mb-8"
            >
              <p className="text-lg leading-relaxed">
                👋 Salom! Men <span className="font-semibold text-purple-600 dark:text-purple-400">Erkinov Ziyodullo</span>, 
                frontend dasturchiman. Veb-saytlar va ilovalar yaratishga ixtisoslashganman.
                <span className="inline-block ml-2">🚀</span>
              </p>
              <p className="text-lg leading-relaxed">
                💡 Hozirda o'z loyiham ustida ishlayapman va sizga eng yaxshi xizmatlarni taqdim etishga tayyorman.
                <motion.span
                  className="inline-block ml-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              {[
                { icon: Mail, text: "ziyodulloerkinov906@gmail.com", color: "from-blue-500 to-blue-600" },
                { icon: Phone, text: "+998 95 057 10 17", color: "from-green-500 to-green-600" },
                { icon: MapPin, text: "O'zbekiston, Mars", color: "from-red-500 to-red-600" },
                { icon: Globe, text: "erkinov.uz", color: "from-purple-500 to-purple-600" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex items-center gap-3 text-gray-600 dark:text-gray-300 bg-gradient-to-r ${item.color}/10 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-300 cursor-pointer group`}
                >
                  <div className={`p-2 bg-gradient-to-r ${item.color} rounded-lg text-white`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-700/30 dark:to-gray-800/30 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 dark:border-gray-700/50"
                >
                  <stat.icon className="w-6 h-6 text-purple-500 dark:text-purple-400 mx-auto mb-2" />
                  <motion.p 
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Ko'nikmalar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hobbies & Social */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">🎯 Hobbilar:</span>
                {hobbies.map((hobby, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <hobby.icon className="w-4 h-4 text-purple-500" />
                    <span className="hidden sm:inline">{hobby.emoji}</span>
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: "https://github.com/erkinovziyodullo", color: "from-gray-700 to-gray-900" },
                  { icon: Linkedin, href: "https://linkedin.com/in/erkinovziyodullo", color: "from-blue-600 to-blue-700" },
                  { icon: Twitter, href: "#", color: "from-sky-500 to-sky-600" },
                  { icon: Instagram, href: "#", color: "from-pink-500 to-orange-500" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-gradient-to-r ${social.color} rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPopup(true)}
                  className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 relative"
                >
                  <Heart className="w-4 h-4" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 text-center"
            >
              <p className="text-sm text-gray-400 dark:text-gray-500">
                ⚡ "Kod yozish - bu san'at, men esa bu san'atni sevaman" 
                <span className="inline-block ml-2">✨</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Popup - Sevgi xati */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-pink-200 dark:border-pink-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  ❤️
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Rahmat!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Meni qo'llab-quvvatlaganingiz uchun katta rahmat! 
                  <br />
                  <span className="text-pink-500 font-semibold">Erkinov Ziyodullo</span> 
                  {' '}sizni sevadi! 💕
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-2xl">
                  <span>😊</span>
                  <span>🌟</span>
                  <span>💪</span>
                  <span>🚀</span>
                  <span>🎉</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPopup(false)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Yopish ✨
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}