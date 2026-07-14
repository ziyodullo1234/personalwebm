import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";

export function BlogPost() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-600 mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog Post #{id}
        </h1>
        
        <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            March 15, 2026
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Ziyodullo Erkinov
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            This is a sample blog post content. Here you can write your amazing content about 
            web development, programming tips, or any topic you're passionate about.
          </p>
          <h2>Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
          </p>
          <h2>Main Content</h2>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
            ex ea commodo consequat.
          </p>
          <h2>Conclusion</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur.
          </p>
        </div>
      </motion.div>
    </div>
  );
}