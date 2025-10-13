import { motion } from 'framer-motion'
import { Cpu, Zap, Globe, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <motion.footer
      className="bg-black/20 backdrop-blur-sm border-t border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Cpu className="w-6 h-6 text-ai-primary" />
              <span className="font-bold">AI Utility Hub</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Your comprehensive destination for discovering and utilizing the latest AI tools and technologies.
            </p>
            <div className="flex space-x-4">
              <Globe className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Shield className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Zap className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Text & Writing Tools</li>
              <li>• Image Generation</li>
              <li>• Code & Development</li>
              <li>• Video & Animation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Tool Discovery</li>
              <li>• User Reviews</li>
              <li>• Pricing Comparison</li>
              <li>• Feature Analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• AI Tool Guides</li>
              <li>• Best Practices</li>
              <li>• Industry News</li>
              <li>• Community Forum</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2025 AI Utility Hub by Emmanuel Chukwuka Ogugua. Part of EmmanuelOS Digital Empire.</p>
        </div>
      </div>
    </motion.footer>
  )
}
