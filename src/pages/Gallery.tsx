import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

// Chiroyli manzara rasmlari
const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop",
    title: "Dengiz manzarasi",
    description: "Moviy suv va oq qum"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1470071459604-7b8ec44ffd0a?w=1200&h=800&fit=crop",
    title: "Yashil o'rmon",
    description: "Tabiat qo'ynida"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    title: "Quyosh botishi",
    description: "Oltin ranglar"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop",
    title: "Yulduzli osmon",
    description: "Kechki sehr"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
    title: "Tinch okean",
    description: "Sokinlik va go'zallik"
  }
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);

  // Avtomatik o'tish
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // KEYINGI SLIDE - funksiya nomi TO'G'RI
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // OLDIINGI SLIDE - funksiya nomi TO'G'RI
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // SLIDE GA O'TISH
  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Klaviatura boshqaruvi
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setIsAutoPlay(false);
      if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlay(!isAutoPlay);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAutoPlay]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-3">
          <Camera className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-gray-400 text-xs font-light tracking-[0.2em]">GALLERY</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-light text-white tracking-wider">
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            Manzaralar
          </span>
        </h2>
      </motion.div>

      {/* Main Carousel */}
      <div className="relative w-full max-w-5xl mx-auto z-10">
        <div className="relative overflow-visible">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ 
                opacity: 0,
                x: direction > 0 ? 300 : -300,
                rotateY: direction > 0 ? 30 : -30,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1,
                x: 0,
                rotateY: 0,
                scale: 1,
                transition: {
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }}
              exit={{ 
                opacity: 0,
                x: direction > 0 ? -300 : 300,
                rotateY: direction > 0 ? -30 : 30,
                scale: 0.8,
                transition: { duration: 0.5 }
              }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Image */}
              <div className="aspect-[16/9] md:aspect-[16/8] relative">
                <img
                  src={images[currentIndex].url}
                  alt={images[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                      {images[currentIndex].title}
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base font-light">
                      {images[currentIndex].description}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-purple-400 text-xs tracking-widest">✦</span>
                      <span className="text-gray-500 text-xs tracking-wider">
                        {currentIndex + 1} / {images.length}
                      </span>
                      <span className="text-purple-400 text-xs tracking-widest">✦</span>
                    </div>
                  </motion.div>
                </div>

                {/* Auto-play indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${isAutoPlay ? 'bg-green-400' : 'bg-gray-600'}`}
                  />
                  <span className="text-[10px] text-gray-400 tracking-widest">
                    {isAutoPlay ? 'LIVE' : 'PAUSED'}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={nextSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 hover:border-purple-500/30 group"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:text-purple-400 transition-colors" />
        </button>

        <button
          onClick={prevSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 hover:border-purple-500/30 group"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:text-purple-400 transition-colors" />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? 'w-8 h-2 bg-gradient-to-r from-purple-500 to-blue-500'
                  : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Play/Pause button */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-300 text-xs tracking-widest flex items-center gap-2"
        >
          <span>{isAutoPlay ? '⏸' : '▶'}</span>
          <span>{isAutoPlay ? 'PAUSE' : 'PLAY'}</span>
        </button>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-gray-700/50 text-[10px] font-mono z-10"
      >
        <span className="w-4 h-px bg-gradient-to-r from-transparent to-gray-700/50" />
        <span className="tracking-[0.2em]">✦ GALLERY ✦</span>
        <span className="w-4 h-px bg-gradient-to-l from-transparent to-gray-700/50" />
      </motion.div>
    </div>
  );
}