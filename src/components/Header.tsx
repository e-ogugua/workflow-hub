import { motion } from 'framer-motion'
import { Cpu, Sparkles, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

interface HeaderProps {
  onSubmitTool: () => void
}

export default function Header({ onSubmitTool }: HeaderProps) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <motion.header
      className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif gradient-text group-hover:scale-105 transition-transform duration-300">
                Workflow Hub
              </h1>
              <p className="text-sm text-ai-primary font-medium">Premium AI Tools</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { id: 'tools', label: 'Tools', icon: Cpu },
              { id: 'categories', label: 'Categories', icon: Sparkles },
              { id: 'trending', label: 'Trending', icon: Cpu },
              { id: 'about', label: 'About', icon: Cpu }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="group flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 hover:text-ai-primary transition-all duration-300 relative overflow-hidden"
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-ai-primary/0 to-ai-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Submit Tool Button */}
            <motion.button
              onClick={onSubmitTool}
              className="btn-primary bg-gradient-to-r from-ai-primary to-ai-secondary hover:from-ai-secondary hover:to-ai-accent px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Tool</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass rounded-xl p-4 border border-white/10">
            <nav className="flex flex-col space-y-3">
              {[
                { id: 'tools', label: 'Tools', icon: Cpu },
                { id: 'categories', label: 'Categories', icon: Sparkles },
                { id: 'trending', label: 'Trending', icon: Cpu },
                { id: 'about', label: 'About', icon: Cpu }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-ai-primary transition-colors text-left"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
