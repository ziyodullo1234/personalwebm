// pages/About.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, User, MapPin, Calendar, Heart } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Orqaga</span>
          </Link>
          <h1 className="text-white font-bold text-xl">👤 About</h1>
          <div className="w-20" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
        >
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-2 border-purple-500/30 flex items-center justify-center">
              <span className="text-5xl">👨‍💻</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
            Erkinov Ziyodullo
          </h1>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-gray-500 text-[10px]">Tug'ilgan</span>
              </div>
              <div className="text-white text-sm font-medium">29-iyun 2005</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-500 text-[10px]">Joy</span>
              </div>
              <div className="text-white text-sm font-medium">Andijon</div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-white text-sm font-medium">Men haqimda</span>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Real Madrid muhlisi, Mbappé va Yamal ashadiy muhlisi. 
              100+ kitob o'qigan, to'xtab qolishni xohlamayman.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}