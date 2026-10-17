import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Send } from "lucide-react";

export function News() {
  return (
    <div className="relative min-h-screen bg-[#fafbfc] dark:bg-[#06070a] text-neutral-900 dark:text-neutral-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-300">
      
      {/* Фоновые градиенты */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[55rem] h-[30rem] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_15%,#000_70%,transparent_100%)]" />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-12 pb-28">
        
        {/* Кнопка возврата */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 backdrop-blur-md transition-all hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Bosh sahifaga qaytish</span>
        </Link>

        {/* Заголовок без иконки */}
        <div className="mt-8">
          <div className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
            <span className="uppercase tracking-wider">Rasmiy xabarlar</span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Yangiliklar
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            Erkinov platformasi va o'quv markazi bo'yicha e'lonlar.
          </p>
        </div>

        {/* Информационный блок */}
        <div className="mt-12 rounded-3xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 p-8 sm:p-12 text-center backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-none">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400">
            <Bell className="size-6 animate-bounce" />
          </div>

          <h2 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Hozircha yangiliklar yo'q
          </h2>
          
          <p className="mx-auto mt-2 max-w-md text-base text-neutral-600 dark:text-neutral-400">
            Yangilik bo'lsa aytaman. Barcha muhim yangilanishlar va e'lonlar aynan shu yerda e'lon qilinadi.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="https://t.me/erkinovziyodullo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Send className="size-3.5" />
              <span>Telegram orqali kuzatish</span>
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}