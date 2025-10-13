import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface HeaderProps {
  onSubmitTool: () => void
}

export default function Header({ onSubmitTool }: HeaderProps) {
  const location = useLocation()

  const handleNavClick = (sectionId: string) => {
    if (location.pathname === '/') {
      // If we're on the main page, scroll to the section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If we're on a different page, navigate to main page and scroll
      window.location.href = `/#${sectionId}`
    }
  }

  return (
    <motion.header
      className="bg-black/20 backdrop-blur-sm border-b border-white/10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-lg flex items-center justify-center">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif">Workflow Hub</h1>
              <p className="text-sm text-ai-primary">AI Tools Collection</p>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => handleNavClick('tools')}
              className="hover:text-ai-primary transition-colors"
            >
              Tools
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="hover:text-ai-primary transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('trending')}
              className="hover:text-ai-primary transition-colors"
            >
              Trending
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-ai-primary transition-colors"
            >
              About
            </button>
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
