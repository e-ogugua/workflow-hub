import { motion } from 'framer-motion'

interface Category {
  id: string
  name: string
  icon: any
}

interface CategoriesProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function Categories({ categories, activeCategory, onCategoryChange }: CategoriesProps) {
  return (
    <motion.section
      className="container mx-auto px-6 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
              activeCategory === category.id
                ? 'bg-ai-primary text-white'
                : 'bg-white/10 hover:bg-white/20 text-gray-300'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  )
}
