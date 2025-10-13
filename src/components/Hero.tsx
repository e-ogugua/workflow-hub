import { motion } from 'framer-motion'
import { Search, Sparkles, Wand2 } from 'lucide-react'

interface HeroProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  stats: Array<{ label: string; value: string; icon: any }>
}

export default function Hero({ searchTerm, onSearchChange, stats }: HeroProps) {
  return (
    <motion.section
      className="container mx-auto px-6 py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-center space-x-2 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Sparkles className="w-8 h-8 text-ai-accent animate-pulse" />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-ai-primary to-ai-accent bg-clip-text text-transparent">
            Discover AI Tools
          </h2>
          <Wand2 className="w-8 h-8 text-ai-secondary animate-pulse" />
        </motion.div>
        <motion.p
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Comprehensive collection of cutting-edge AI tools, utilities, and productivity features
          to supercharge your workflow and unleash your creativity.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-ai-primary transition-colors" />
            <motion.input
              type="text"
              placeholder="Search AI tools, features, or categories..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 outline-none focus:border-ai-primary focus:bg-white/15 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <stat.icon className="w-8 h-8 text-ai-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-ai-primary">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
