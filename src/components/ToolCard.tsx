import { motion } from 'framer-motion'
import { Star, ExternalLink, Plus } from 'lucide-react'
import { Tool } from '../data/tools'

interface ToolCardProps {
  tool: Tool
  onTryNow: (tool: Tool) => void
  onAddToComparison?: (tool: Tool) => void
  isInComparison?: boolean
}

export default function ToolCard({ tool, onTryNow, onAddToComparison, isInComparison }: ToolCardProps) {
  return (
    <motion.div
      className="tool-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center`}>
          <tool.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{tool.rating}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{tool.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
        <span>{tool.users} users</span>
        <span className={`px-2 py-1 rounded ${
          tool.pricing === 'Free' ? 'bg-green-500/20 text-green-400' :
          tool.pricing === 'Freemium' ? 'bg-blue-500/20 text-blue-400' :
          'bg-orange-500/20 text-orange-400'
        }`}>
          {tool.pricing}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {tool.features.slice(0, 2).map((feature, idx) => (
          <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded">
            {feature}
          </span>
        ))}
        {tool.features.length > 2 && (
          <span className="text-xs text-gray-400">+{tool.features.length - 2}</span>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onTryNow(tool)}
          className="flex-1 bg-ai-primary hover:bg-indigo-600 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          Try Now
        </button>
        {onAddToComparison && (
          <button
            onClick={() => onAddToComparison(tool)}
            className={`p-2 rounded-lg transition-colors ${
              isInComparison ? 'bg-green-600 hover:bg-green-700' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
