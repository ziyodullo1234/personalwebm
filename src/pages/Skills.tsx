// pages/Skills.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Bot, User, Sparkles, MessageCircle, Cpu, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Robot komponenti - qo'sh, ko'z va antennalar bilan
function RobotAvatar({ isAnimating }: { isAnimating: boolean }) {
  return (
    <div className="relative w-16 h-16">
      {/* Robot tanasi */}
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg relative"
        animate={{
          scale: isAnimating ? [1, 1.05, 1] : [1, 1, 1],
          rotate: isAnimating ? [0, 5, -5, 0] : [0, 0, 0, 0]
        }}
        transition={{ duration: 0.5 }}
      >
        <Bot className="w-8 h-8 text-white" />
        
        {/* Robot ko'zlari */}
        <motion.div
          className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-3"
          animate={{
            scale: isAnimating ? [1, 0.3, 1] : [1, 1, 1]
          }}
          transition={{ duration: 0.3, repeat: isAnimating ? 1 : 0 }}
        >
          <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50" />
          <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50" />
        </motion.div>

        {/* Robot qo'shlari (antena) */}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-3"
          animate={{
            y: isAnimating ? [-2, 2, -2] : [0, 0, 0]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-1 h-5 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full" />
          <div className="w-1 h-5 bg-gradient-to-t from-purple-500 to-blue-400 rounded-full" />
        </motion.div>

        {/* Robot qo'llari */}
        <motion.div
          className="absolute -left-3 top-1/2 -translate-y-1/2"
          animate={{
            rotate: isAnimating ? [-10, 10, -10] : [0, 0, 0]
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-3 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
        </motion.div>
        <motion.div
          className="absolute -right-3 top-1/2 -translate-y-1/2"
          animate={{
            rotate: isAnimating ? [10, -10, 10] : [0, 0, 0]
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-3 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
        </motion.div>

        {/* Robot og'zi */}
        <motion.div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-1 bg-white/50 rounded-full"
          animate={{
            width: isAnimating ? [4, 6, 4] : [4, 4, 4]
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Yorug'lik effekti */}
      <motion.div
        className="absolute -inset-2 bg-blue-500/20 rounded-2xl blur-xl"
        animate={{
          opacity: isAnimating ? [0.5, 1, 0.5] : [0.5, 0.5, 0.5],
          scale: isAnimating ? [1, 1.1, 1] : [1, 1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

export function Skills() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Salom! Men Erkinov Ziyodullo yordamchisiman 🤖\nKasb nomi yoki so'rovni yozing – sizga mos ishlarni topaman.\n\n• O'qishga mos yarim stavkali ishlar\n• O'qituvchilik yoki repetitorlik\n• Amaliyot o'tash imkoniyatlari\n• Imkoniyati cheklanganlar uchun vakansiyalar\n\nQanday ish izlayapsiz?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRobotAnimating, setIsRobotAnimating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Avtomatik scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Robot animatsiyasi - har doim harakatlanadi
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRobotAnimating(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Foydalanuvchi xabari
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Robot javobi (simulyatsiya)
    setTimeout(() => {
      const botResponses = [
        "Sizning so'rovingiz bo'yicha quyidagi vakansiyalarni topdim:\n• Frontend Dasturchi (stajyor)\n• Backend Dasturchi (stajyor)\n• UX/UI Dizayner",
        "O'qishga mos yarim stavkali ishlar:\n• Kechki smenada ishlash\n• Masofaviy ish\n• Talabalar uchun moslashuvchan grafik",
        "Amaliyot o'tash imkoniyatlari:\n• IT kompaniyalarda 3 oylik amaliyot\n• Davlat tashkilotlarida amaliyot\n• Xalqaro loyihalarda ishtirok etish",
        "Imkoniyati cheklanganlar uchun:\n• Masofaviy ish imkoniyatlari\n• Moslashtirilgan ish o'rinlari\n• Ijtimoiy yordam dasturlari",
        "Sizga qanday yo'nalish bo'yicha yordam bera olaman? 📚",
        "Ajoyib tanlov! Men sizga eng mos variantlarni topib beraman 🚀",
        "Karyera bo'yicha maslahat kerakmi? Men yordam berishga tayyorman! 💪",
        "Sizning so'rovingiz qiziqarli. Keling, buni birgalikda ko'rib chiqamiz! 🤝"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Tez javoblar
  const quickReplies = [
    'Yarim stavkali ishlar',
    'Amaliyot o\'tash',
    'O\'qituvchilik',
    'Imkoniyati cheklanganlar'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 py-24">
        {/* Orqaga tugmasi */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Orqaga</span>
        </Link>

        {/* Sarlavha - Erkinov Ziyodullo yordamchisi */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <RobotAvatar isAnimating={isRobotAnimating} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Erkinov Ziyodullo yordamchisi
              <motion.span
                animate={{ rotate: isRobotAnimating ? [0, 360] : [0, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
              </motion.span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Online • Javob berishga tayyor
            </p>
          </div>
        </motion.div>

        {/* Chat konteyneri */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
        >
          {/* Chat header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <RobotAvatar isAnimating={isRobotAnimating} />
              </div>
              <div>
                <span className="text-white font-semibold">AI Yordamchi</span>
                <p className="text-xs text-white/70">Erkinov Ziyodullo tomonidan</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-white/70" />
              <Sparkles className="w-4 h-4 text-white/70" />
            </div>
          </div>

          {/* Xabarlar maydoni */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900/50">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ x: message.sender === 'user' ? 20 : -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-start gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                {message.sender === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                      animate={{ scale: isRobotAnimating ? [1, 1.3, 1] : [1, 1, 1] }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}

                {/* Xabar */}
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-tr-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                  <p className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                    {message.timestamp.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Yozmoqda animatsiyasi */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Tez javoblar */}
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <motion.button
                  key={reply}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInputValue(reply);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="px-4 py-2 text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
                >
                  {reply}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input maydoni */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="So'rovingizni yozing..."
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Yuborish</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 flex items-center justify-center gap-1"
        >
          <MessageCircle className="w-3 h-3" />
          Savollaringizni yuboring, men yordam berishga tayyorman!
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🤖
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
}