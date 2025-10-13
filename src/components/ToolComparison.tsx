import { motion } from 'framer-motion'
import { X, Star, Users, DollarSign } from 'lucide-react'
import { Tool } from '../data/tools'

interface ToolComparisonProps {
  tools: Tool[]
  onRemoveTool: (toolId: number) => void
  onClose: () => void
}

export default function ToolComparison({ tools, onRemoveTool, onClose }: ToolComparisonProps) {
  if (tools.length === 0) return null

  const maxFeatures = Math.max(...tools.map(tool => tool.features.length))
  const maxUseCases = Math.max(...tools.map(tool => tool.useCases?.length || 0))

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-slate-900 rounded-xl border border-white/20 p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Tool Comparison</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 text-gray-300">Feature</th>
                {tools.map(tool => (
                  <th key={tool.id} className="text-center py-3 px-4 min-w-[200px]">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{tool.name}</span>
                      <button
                        onClick={() => onRemoveTool(tool.id)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Basic Info */}
              <tr className="border-b border-white/10">
                <td className="py-3 px-4 text-gray-300 font-medium">Description</td>
                {tools.map(tool => (
                  <td key={tool.id} className="py-3 px-4 text-gray-300 text-sm">
                    {tool.description}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4 text-gray-300 font-medium">Rating</td>
                {tools.map(tool => (
                  <td key={tool.id} className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{tool.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4 text-gray-300 font-medium">Users</td>
                {tools.map(tool => (
                  <td key={tool.id} className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{tool.users}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4 text-gray-300 font-medium">Pricing</td>
                {tools.map(tool => (
                  <td key={tool.id} className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className={`px-2 py-1 rounded text-xs ${
                        tool.pricing === 'Free' ? 'bg-green-500/20 text-green-400' :
                        tool.pricing === 'Freemium' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {tool.pricing}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 px-4 text-gray-300 font-medium">Difficulty</td>
                {tools.map(tool => (
                  <td key={tool.id} className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      tool.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      tool.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {tool.difficulty}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Features */}
              {Array.from({ length: maxFeatures }, (_, i) => (
                <tr key={`feature-${i}`} className="border-b border-white/10">
                  <td className="py-3 px-4 text-gray-300 font-medium">
                    Feature {i + 1}
                  </td>
                  {tools.map(tool => (
                    <td key={tool.id} className="py-3 px-4 text-center">
                      <span className="text-gray-300 text-sm">
                        {tool.features[i] || '-'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}

              {/* Use Cases */}
              {Array.from({ length: maxUseCases }, (_, i) => (
                <tr key={`usecase-${i}`} className="border-b border-white/10">
                  <td className="py-3 px-4 text-gray-300 font-medium">
                    Use Case {i + 1}
                  </td>
                  {tools.map(tool => (
                    <td key={tool.id} className="py-3 px-4 text-center">
                      <span className="text-gray-300 text-sm">
                        {tool.useCases?.[i] || '-'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}

              {/* Alternatives */}
              <tr className="border-b border-white/10">
                <td className="py-3 px-4 text-gray-300 font-medium">Alternatives</td>
                {tools.map(tool => (
                  <td key={tool.id} className="py-3 px-4 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {tool.alternatives?.slice(0, 2).map((alt, idx) => (
                        <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded">
                          {alt}
                        </span>
                      )) || '-'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Action Buttons */}
              <tr>
                <td className="py-3 px-4 text-gray-300 font-medium">Action</td>
                {tools.map(tool => (
                  <td key={tool.id} className="py-3 px-4 text-center">
                    <button
                      onClick={() => window.open(tool.demoUrl, '_blank')}
                      className="bg-ai-primary hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Try Now
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
