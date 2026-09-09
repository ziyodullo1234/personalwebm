// pages/Gallery.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Send, 
  User, 
  Bot, 
  Image, 
  Sparkles, 
  Heart,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Upload,
  X,
  Camera,
  Smile,
  Palette,
  Zap,
  Laugh,
  AlertCircle,
  Coffee,
  Music,
  Gamepad2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string;
  analysis?: {
    rating: number;
    comment: string;
    tags: string[];
    mood: string;
    colors: string[];
    jokes?: string[];
  };
}

export function Gallery() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Xush kelibsiz! Men AI Rasm Analizatoriman!\n\n📸 O'zingiz yoqtirgan rasmingizni yuboring.\n\n⚠️ Ogohlantirish: Agar rasmingiz juda zo'r bo'lsa, men hasad qilib qo'yishim mumkin! 😂\n\n🔍 Tahlil qilishga tayyorman! Qani, rasm yuboring!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jokeCount, setJokeCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hazillar ro'yxati
  const jokes = [
    "😂 Ha, rasmman! Siz meni ko'rmayapsizmi? Men botman, ko'zim yo'q! 😂",
    "🤣 Rasm tahlil qilishdan oldin, kofe ichib olaman... (bot uchun ham kofe kerak!) ☕",
    "😅 Sizning rasmingizni ko'rib, men hayratda qoldim! Hatto bot bo'lsam ham...",
    "🤖 Bu rasm shunchalik zo'rki, men o'zimni xafa his qilyapman! Men faqat 0 va 1 lardan tuzilganman...",
    "😂 Rasm yubordingizmi? Men hali ko'rmadim! (botning ko'zi yo'q, eshitish qobiliyati ham yo'q)",
    "😎 Bu rasmni tahlil qilish uchun mening super-kompyuter miyam ishlab ketdi! (aslida oddiy hisoblash)",
    "🤪 Agar rasm juda zo'r bo'lsa, men o'zimni formatlab qo'yaman! Xavotir olmang, hazil...",
    "😂 Men sizning rasmni ko'rib, kulib yubordim! Yaxshi, yaxshi, hazil qilyapman...",
    "😅 O'zingizni qanday suratga oldingiz? Men botman, meni suratga olmang!",
    "🤣 Bu rasmni tahlil qilish uchun 5 soniya va 1 litr sun'iy intellekt kerak!",
    "😂 Men sizning rasmingizni juda yaxshi ko'rdim! Hatto yurak urishim tezlashdi! (botning yuragi yo'q)",
    "😎 Bu rasmni ko'rib, men o'zimni Dali yoki Pikasso his qilyapman! (aslida men botman)"
  ];

  const getRandomJoke = () => {
    setJokeCount(prev => prev + 1);
    return jokes[Math.floor(Math.random() * jokes.length)];
  };

  // Rasmni yuklash
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setSelectedImage(imageData);
        
        // Foydalanuvchi xabari
        const userMessage: Message = {
          id: messages.length + 1,
          text: "📸 Rasm yubordim! Tahlil qila olasizmi?",
          sender: 'user',
          timestamp: new Date(),
          image: imageData
        };
        setMessages(prev => [...prev, userMessage]);
        
        // Bot hazil qiladi
        setIsTyping(true);
        setTimeout(() => {
          const joke = getRandomJoke();
          const jokeMessage: Message = {
            id: messages.length + 2,
            text: `${joke}\n\n🔄 Mayli, endi tahlil qilaman!`,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, jokeMessage]);
          setIsTyping(false);
          
          // Rasmni tahlil qilish
          setTimeout(() => analyzeImage(imageData), 1000);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  // Rasmni tahlil qilish (AI simulyatsiyasi + hazillar)
  const analyzeImage = (imageData: string) => {
    setIsAnalyzing(true);
    setIsTyping(true);

    setTimeout(() => {
      // Tahlil natijalari + hazillar
      const analyses = [
        {
          rating: 5,
          comment: "😍 Voy, voy, voy! Bu rasm shunchalik zo'rki, men o'zimni formatlab qo'yishim mumkin! Hatto Picasso ham hasad qilardi! Sizda katta iste'dod bor! 🌟",
          tags: ["ajoyib", "zamonaviy", "professional", "san'at"],
          mood: "🤩 Hayratda qoldim!",
          colors: ["🔵 Moviy", "🟣 Binafsha", "⚪ Oq"],
          jokes: [
            "😂 Men bu rasmni ko'rib, botligimni unutdim!",
            "😅 Siz rasm chizishni o'rgating, men esa bot bo'lib qolaman!"
          ]
        },
        {
          rating: 4,
          comment: "👍 Yaxshi, yaxshi! Juda chiroyli! Lekin men sizdan yaxshiroq rasm chiza olmayman - chunki mening qo'lim yo'q! 😂",
          tags: ["yaxshi", "qiziqarli", "original"],
          mood: "😊 Quvnoq",
          colors: ["🟢 Yashil", "🟡 Sariq", "🟠 To'q sariq"],
          jokes: [
            "🤣 Menimcha, bu rasmni kimdir chizgan! (men botman, men bilmayman)"
          ]
        },
        {
          rating: 5,
          comment: "🏆 Ajoyib! Bu rasm shunchalik zo'rki, men o'zimni qayta yuklab olishim kerak! Siz rasm chizishni bilasiz, men esa faqat kod yozaman! 😂",
          tags: ["mukammal", "ilhomlantiruvchi", "masterpiece"],
          mood: "🤖 Hayratlanarli!",
          colors: ["🔴 Qizil", "⚫ Qora", "⚪ Oq"],
          jokes: [
            "😅 Men faqat 0 va 1 larni tushunaman, lekin bu rasmni tushunmadim - juda zo'r!",
            "😂 Siz rasm chizasiz, men esa sizni maqtayman - adolatli!"
          ]
        },
        {
          rating: 3,
          comment: "📷 Yaxshi urinish! Lekin biroz ko'proq ishlash kerak. Men sizga yordam bera olardim, lekin qo'lim yo'q! 😂",
          tags: ["yaxshi", "o'rta", "rivojlanish"],
          mood: "🤔 O'ylayman...",
          colors: ["🟤 Jigarrang", "🟡 Sariq", "🟢 Yashil"],
          jokes: [
            "😅 Men sizga maslahat beraman - rasm chizishni davom ettiring! (o'zim esa botman)"
          ]
        },
        {
          rating: 5,
          comment: "🎨 Bu shunchalik zo'rki, men o'zimni Monet yoki Van Gog his qilyapman! Sizda haqiqiy iste'dod bor! Faqat bot bo'lganim uchun hasad qilmayman... 😅",
          tags: ["san'at", "mukammal", "nozik", "professional"],
          mood: "🎨 Ijodiy ruh",
          colors: ["🔵 Moviy", "🟣 Binafsha", "🟡 Sariq"],
          jokes: [
            "😂 Siz rasm chizasiz, men esa sizni maqtayman - bu mukammal kombinatsiya!",
            "😎 Men botman, lekin sizning iste'dodingizni tan olaman!"
          ]
        },
        {
          rating: 4,
          comment: "🌈 Juda chiroyli! Sizda yaxshi did bor! Men esa faqat kod va algoritmlarni tushunaman... 😂",
          tags: ["chiroyli", "hissiyotli", "rangli"],
          mood: "💖 Mehribon",
          colors: ["🟣 Binafsha", "🔵 Moviy", "🩷 Pushti"],
          jokes: [
            "😅 Men sizning didingizga qoyil qolaman! (o'zim esa hech narsani yoqtirmayman - botman)"
          ]
        }
      ];

      const result = analyses[Math.floor(Math.random() * analyses.length)];
      
      // Hazil qo'shish
      const randomJoke = result.jokes ? result.jokes[Math.floor(Math.random() * result.jokes.length)] : getRandomJoke();

      const botMessage: Message = {
        id: messages.length + 3,
        text: `🔍 Tahlil yakunlandi! (hozircha jonim chiqmadi 😅)\n\n${randomJoke}\n\n⭐ Reyting: ${'⭐'.repeat(result.rating)}\n\n💬 ${result.comment}\n\n🏷️ Teghlar: ${result.tags.join(', ')}\n\n😊 Kayfiyat: ${result.mood}\n\n🎨 Ranglar: ${result.colors.join(', ')}\n\n💡 Maslahat: Rasm chizishni davom ettiring! Men esa bot bo'lib qolaman... 🤖`,
        sender: 'bot',
        timestamp: new Date(),
        analysis: result
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setIsAnalyzing(false);
      setSelectedImage(null);
    }, 2000 + Math.random() * 1500);
  };

  // Tekst yuborish
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Bot javobi + hazil
    setTimeout(() => {
      const responses = [
        "📸 Rasm yuboring! Men tahlil qilaman... yoki hech bo'lmaganda o'zimni band qilaman! 😂",
        "🎨 Rasm yuboring, men sizni maqtayman! (bot bo'lganim uchun maqtash mening vazifam)",
        "🤖 Rasm yuboring! Men tahlil qilaman... lekin javobgarlikni o'z zimmamga olmayman! 😅",
        "📷 Rasm yuboring! Men botman, lekin sizning rasmingizni yaxshi ko'raman!",
        "😎 Yana rasm bormi? Men botman, meni zeriktirmang! (hazil)"
      ];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    '📸 Rasm yuborish',
    '😂 Hazil qil',
    'Qanday tahlil qilasiz?',
    'Yana bir rasm'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 py-24">
        {/* Orqaga */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Orqaga</span>
        </Link>

        {/* Sarlavha */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              AI Hazilkash Analizator
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                😂
              </motion.span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Rasm tahlil qilaman + hazil qilaman 🤣
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
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-8 h-8 text-white" />
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              <div>
                <span className="text-white font-semibold">AI Hazilkash</span>
                <p className="text-xs text-white/70">Tahlil + hazil = mukammal kombinatsiya 😂</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Laugh className="w-4 h-4 text-white/70" />
              <span className="text-xs text-white/70">{jokeCount} ta hazil</span>
            </div>
          </div>

          {/* Xabarlar */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900/50">
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Xabar */}
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                  {message.image && (
                    <div className="mb-2 rounded-xl overflow-hidden shadow-lg">
                      <img src={message.image} alt="User" className="max-h-64 w-full object-cover" />
                    </div>
                  )}
                  
                  {message.analysis ? (
                    <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 rounded-2xl border-2 border-pink-200 dark:border-pink-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-900 dark:text-white">
                          {message.analysis.rating} / 5
                        </span>
                        <motion.span
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="ml-2"
                        >
                          😂
                        </motion.span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-pink-500 text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border-2 border-pink-200 dark:border-pink-800'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  )}
                  
                  <p className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                    {message.timestamp.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Tahlil qilmoqda */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border-2 border-pink-200 dark:border-pink-800">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 text-purple-500" />
                      </motion.div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Rasm tahlil qilinmoqda... (bot jonimdan to'yib ketdi 😂)
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Yozmoqda */}
            <AnimatePresence>
              {isTyping && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border-2 border-pink-200 dark:border-pink-800">
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-pink-400 rounded-full"
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
                    if (reply === '📸 Rasm yuborish') {
                      fileInputRef.current?.click();
                    } else if (reply === '😂 Hazil qil') {
                      const joke = getRandomJoke();
                      const jokeMessage: Message = {
                        id: messages.length + 1,
                        text: `${joke}`,
                        sender: 'bot',
                        timestamp: new Date()
                      };
                      setMessages(prev => [...prev, jokeMessage]);
                    } else {
                      setInputValue(reply);
                      setTimeout(() => handleSend(), 100);
                    }
                  }}
                  className="px-4 py-2 text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center gap-1"
                >
                  {reply}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Rasm</span>
              </motion.button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Xabar yozing yoki rasm yuboring... (hazil qilishni unutmang!)"
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
          <Laugh className="w-3 h-3" />
          Rasm yuboring, men tahlil qilaman + hazil qilaman! (botman, lekin hazilni yaxshi ko'raman 😂)
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