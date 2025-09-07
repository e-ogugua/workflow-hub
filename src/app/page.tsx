'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    setIsLoading(true)
    // Placeholder functionality
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI Utility Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Comprehensive hub of AI tools and utilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Get Started'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Feature 1</h3>
            <p className="text-gray-600">Core functionality description</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Feature 2</h3>
            <p className="text-gray-600">Additional feature description</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Feature 3</h3>
            <p className="text-gray-600">Premium feature description</p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
