import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Calendar, 
  MapPin, 
  Code2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Award,
  Star
} from "lucide-react";

// Dasturlash tillari ma'lumotlari
const skills = [
  { 
    name: "Java", 
    icon: "☕", 
    color: "from-red-500 to-orange-500",
    glow: "shadow-red-500/30",
    bg: "from-red-500/20 to-orange-500/20",
    desc: "Backend dasturlash",
    level: "95%"
  },
  { 
    name: "React", 
    icon: "⚛️", 
    color: "from-cyan-400 to-blue-500",
    glow: "shadow-cyan-500/30",
    bg: "from-cyan-500/20 to-blue-500/20",
    desc: "Frontend framework",
    level: "90%"
  },
  { 
    name: "Python", 
    icon: "🐍", 
    color: "from-blue-400 to-yellow-400",
    glow: "shadow-blue-500/30",
    bg: "from-blue-500/20 to-yellow-500/20",
    desc: "Ko'p maqsadli til",
    level: "85%"
  },
  { 
    name: "Vite", 
    icon: "⚡", 
    color: "from-purple-400 to-pink-400",
    glow: "shadow-purple-500/30",
    bg: "from-purple-500/20 to-pink-500/20",
    desc: "Tez build tool",
    level: "88%"
  },
  { 
    name: "HTML", 
    icon: "🌐", 
    color: "from-orange-400 to-red-400",
    glow: "shadow-orange-500/30",
    bg: "from-orange-500/20 to-red-500/20",
    desc: "Web markup",
    level: "92%"
  }
];

export function Blog() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [rotation, setRotation] = useState(0);

  // Avtomatik aylanish
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skills.length);
      setRotation((prev) => prev + 72);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSkill = () => {
    setCurrentIndex((prev) => (prev + 1) % skills.length);
    setRotation((prev) => prev + 72);
  };

  const prevSkill = () => {
    setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length);
    setRotation((prev) => prev - 72);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-transparent rounded-full blur-[120px]"
          animate={{ 
            x: [0, 80, 0],
            y: [0, -50, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-indigo-600/10 via-purple-600/10 to-transparent rounded-full blur-[150px]"
          animate={{ 
            x: [0, -60, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-purple-500/5 via-blue-500/5 to-transparent rounded-full blur-[100px]" />
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(139,92,246,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-gray-300 text-xs font-light tracking-[0.3em]">✦ MEN HAQIMDA ✦</span>
            <Award className="w-4 h-4 text-blue-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-500/10 relative overflow-hidden"
        >
          {/* Card glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

          {/* Profile Section */}
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -8 }}
                className="relative"
              >
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 border-2 border-purple-500/40 flex items-center justify-center shadow-2xl shadow-purple-500/20">
                  <span className="text-6xl md:text-7xl">👨‍💻</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center shadow-lg shadow-green-500/20">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-ping" />
                  <div className="absolute w-3 h-3 rounded-full bg-green-400" />
                </div>
              </motion.div>

              <div className="text-center md:text-left flex-1">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
                >
                  Erkinov <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">Ziyodullo</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-gray-400 text-sm"
                >
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    2005 yil 29-iyun
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    Andijon
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <Code2 className="w-4 h-4 text-pink-400" />
                    IT sohasi
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-10"
            >
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed text-center max-w-2xl mx-auto">
                Hozirda IT sohasini mukammal o'rganyapman. 
                <span className="text-purple-400 font-medium"> Java</span>, 
                <span className="text-cyan-400 font-medium"> React</span>, 
                <span className="text-blue-400 font-medium"> Python</span>, 
                <span className="text-pink-400 font-medium"> Vite</span> va 
                <span className="text-orange-400 font-medium"> HTML</span> 
                tillarini mukammal bilaman.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-10"
            />
          </div>

          {/* Skills - Aylanuvchi */}
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Star className="w-4 h-4 text-yellow-400" />
              <h3 className="text-gray-300 text-sm font-light tracking-[0.3em]">BILADIGAN TILLARIM</h3>
              <Star className="w-4 h-4 text-yellow-400" />
            </div>

            <div className="relative flex items-center justify-center py-8">
              {/* Navigation Buttons */}
              <button
                onClick={prevSkill}
                className="absolute left-0 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:border-purple-500/50 shadow-lg shadow-purple-500/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSkill}
                className="absolute right-0 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:border-purple-500/50 shadow-lg shadow-purple-500/10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Aylanuvchi container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                {skills.map((skill, index) => {
                  const angle = (index / skills.length) * 360 + rotation;
                  const radius = 130;
                  const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                  const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

                  const isActive = currentIndex === index;

                  return (
                    <motion.div
                      key={skill.name}
                      className="absolute top-1/2 left-1/2 cursor-pointer"
                      animate={{
                        x: x,
                        y: y,
                        scale: isActive ? 1.2 : 0.9,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        duration: 0.6
                      }}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${skill.bg} border-2 ${
                          isActive 
                            ? `border-${skill.color.split(' ')[1].replace('to-', '')}/60 shadow-2xl ${skill.glow}` 
                            : 'border-white/20'
                        } flex items-center justify-center transition-all duration-300 backdrop-blur-sm group`}
                      >
                        <span className={`text-4xl md:text-5xl transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                          {skill.icon}
                        </span>
                        
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -inset-1 rounded-full border-2 border-purple-500/30 animate-ping"
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Current Skill Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="text-center mt-6"
              >
                <h4 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${skills[currentIndex].color} bg-clip-text text-transparent`}>
                  {skills[currentIndex].name}
                </h4>
                <p className="text-gray-400 text-sm mt-1 font-light">
                  {skills[currentIndex].desc}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: skills[currentIndex].level }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full bg-gradient-to-r ${skills[currentIndex].color} rounded-full`}
                    />
                  </div>
                  <span className="text-gray-500 text-xs font-mono">
                    {skills[currentIndex].level}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {skills.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? 'w-8 h-2 bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30'
                      : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Play/Pause */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="mt-6 text-gray-500 hover:text-gray-300 transition-colors duration-300 text-xs tracking-widest flex items-center gap-2 mx-auto"
            >
              <span className="w-4 h-px bg-gray-700" />
              <span>{isAutoPlay ? '⏸ PAUSE' : '▶ PLAY'}</span>
              <span className="w-4 h-px bg-gray-700" />
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <div className="flex items-center justify-center gap-4 text-gray-700/50 text-xs font-mono">
            <span className="w-6 h-px bg-gradient-to-r from-transparent to-gray-700/50" />
            <span className="tracking-[0.3em] flex items-center gap-3">
              <span>✧</span>
              Gap ko'p — amal qilish qiyin
              <span>✧</span>
            </span>
            <span className="w-6 h-px bg-gradient-to-l from-transparent to-gray-700/50" />
          </div>
          <p className="text-gray-600 text-xs font-light tracking-[0.3em]">
            lekin harakat qilish kerak ✦
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}