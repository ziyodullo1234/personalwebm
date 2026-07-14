// pages/News.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function News() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Orqaga</span>
          </Link>
          <h1 className="text-white font-bold text-xl">⚽ Yangiliklar</h1>
          <div className="w-20" />
        </div>
        
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-white text-2xl font-light">Yangiliklar sahifasi</h2>
          <p className="text-gray-500 text-sm mt-2">Tez orada...</p>
        </div>
      </div>
    </div>
  );
}