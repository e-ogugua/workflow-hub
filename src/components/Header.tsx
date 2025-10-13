import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'

interface HeaderProps {
  onSubmitTool: () => void
}

export default function Header({ onSubmitTool }: HeaderProps) {
  return (
    <motion.header
      className="bg-black/20 backdrop-blur-sm border-b border-white/10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-lg flex items-center justify-center">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif">AI Utility Hub</h1>
              <p className="text-sm text-ai-primary">AI Tools Collection</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#tools" className="hover:text-ai-primary transition-colors">Tools</a>
            <a href="#categories" className="hover:text-ai-primary transition-colors">Categories</a>
            <a href="#trending" className="hover:text-ai-primary transition-colors">Trending</a>
            <a href="#about" className="hover:text-ai-primary transition-colors">About</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={onSubmitTool}
              className="bg-ai-primary hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors"
            >
              Submit Tool
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
