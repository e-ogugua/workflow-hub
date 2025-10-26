import { motion } from "framer-motion";
import React from "react";

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface CategoriesProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Categories({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoriesProps) {
  return (
    <motion.section
      className="container mx-auto px-4 sm:px-6 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-4">
          Explore AI Categories
        </h3>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          Discover powerful AI tools organized by category to find exactly what
          you need for your workflow
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`group flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-ai-primary to-ai-secondary text-white shadow-lg hover:shadow-xl"
                : "glass hover:bg-white/10 text-gray-300 hover:text-white border border-white/10"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <category.icon
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                activeCategory === category.id
                  ? "text-white"
                  : "text-ai-primary group-hover:text-ai-secondary"
              }`}
            />
            <span className="font-medium text-sm sm:text-base">
              {category.name}
            </span>

            {/* Active indicator */}
            {activeCategory === category.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-ai-primary/20 to-ai-secondary/20 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-ai-primary/0 to-ai-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </motion.button>
        ))}
      </div>

      {/* Mobile scroll indicator */}
      <div className="flex justify-center mt-6 sm:hidden">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-ai-primary rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-gray-600 rounded-full" />
          <div className="w-2 h-2 bg-gray-600 rounded-full" />
        </div>
      </div>
    </motion.section>
  );
}
