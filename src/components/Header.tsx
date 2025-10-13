import { motion } from 'framer-motion'
import { Cpu, Sparkles, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

interface HeaderProps {
  onSubmitTool: () => void
}

export default function Header({ onSubmitTool }: HeaderProps) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const handleNavClick = (sectionId: string) => {
    if (location.pathname === '/') {
      // If we're on the main page, scroll to the section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        console.warn(`Section with id "${sectionId}" not found`)
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

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const firstFocusableElement = mobileMenuRef.current.querySelector('button')
      firstFocusableElement?.focus()
    }
  }, [isMobileMenuOpen])

  return (
    <motion.header
      className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-primary rounded-lg"
            aria-label="Workflow Hub - Home"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif gradient-text group-hover:scale-105 transition-transform duration-300">
                Workflow Hub
              </h1>
              <p className="text-sm text-ai-primary font-medium">Premium AI Tools</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            {[
              { id: 'tools', label: 'Tools', icon: Cpu, ariaLabel: 'Browse AI tools' },
              { id: 'categories', label: 'Categories', icon: Sparkles, ariaLabel: 'Browse tool categories' },
              { id: 'trending', label: 'Trending', icon: Cpu, ariaLabel: 'View trending tools' },
              { id: 'about', label: 'About', icon: Cpu, ariaLabel: 'About Workflow Hub' }
            ].map(({ id, label, icon: Icon, ariaLabel }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-primary ${
                  location.pathname === '/' && location.hash === `#${id}`
                    ? 'bg-ai-primary/20 text-ai-primary border border-ai-primary/30'
                    : 'hover:bg-white/10 hover:text-ai-primary'
                }`}
                aria-label={ariaLabel}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">{label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-ai-primary/0 to-ai-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Submit Tool Button */}
            <motion.button
              onClick={onSubmitTool}
              className="btn-primary bg-gradient-to-r from-ai-primary to-ai-secondary hover:from-ai-secondary hover:to-ai-accent px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Submit a new AI tool to our directory"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Submit Tool</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-primary"
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          ref={mobileMenuRef}
          id="mobile-navigation"
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="glass rounded-xl p-4 border border-white/10">
            <nav className="flex flex-col space-y-3" role="menubar">
              {[
                { id: 'tools', label: 'Tools', icon: Cpu, ariaLabel: 'Browse AI tools' },
                { id: 'categories', label: 'Categories', icon: Sparkles, ariaLabel: 'Browse tool categories' },
                { id: 'trending', label: 'Trending', icon: Cpu, ariaLabel: 'View trending tools' },
                { id: 'about', label: 'About', icon: Cpu, ariaLabel: 'About Workflow Hub' }
              ].map(({ id, label, icon: Icon, ariaLabel }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-primary ${
                    location.pathname === '/' && location.hash === `#${id}`
                      ? 'bg-ai-primary/20 text-ai-primary border border-ai-primary/30'
                      : 'hover:bg-white/10 hover:text-ai-primary'
                  }`}
                  role="menuitem"
                  aria-label={ariaLabel}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
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
