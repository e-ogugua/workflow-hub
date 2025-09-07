import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Zap, 
  Image, 
  FileText, 
  MessageSquare, 
  Code, 
  Palette, 
  Music, 
  Video,
  Search,
  Star,
  ExternalLink,
  Sparkles,
  Bot,
  Wand2,
  Layers,
  Globe,
  Shield,
  Users,
  TrendingUp
} from 'lucide-react'

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // AI Tools Data
  const aiTools = [
    {
      id: 1,
      name: 'ChatGPT',
      category: 'text',
      description: 'Advanced conversational AI for writing, coding, and problem-solving',
      rating: 4.9,
      users: '100M+',
      pricing: 'Freemium',
      features: ['Natural Language', 'Code Generation', 'Creative Writing'],
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      name: 'Midjourney',
      category: 'image',
      description: 'AI-powered image generation from text descriptions',
      rating: 4.8,
      users: '15M+',
      pricing: 'Paid',
      features: ['Text-to-Image', 'Art Styles', 'High Resolution'],
      icon: Image,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      name: 'GitHub Copilot',
      category: 'code',
      description: 'AI pair programmer that helps write code faster',
      rating: 4.7,
      users: '5M+',
      pricing: 'Paid',
      features: ['Code Completion', 'Multiple Languages', 'Context Aware'],
      icon: Code,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 4,
      name: 'Runway ML',
      category: 'video',
      description: 'AI-powered video editing and generation platform',
      rating: 4.6,
      users: '2M+',
      pricing: 'Freemium',
      features: ['Video Generation', 'AI Editing', 'Real-time Processing'],
      icon: Video,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 5,
      name: 'Jasper AI',
      category: 'text',
      description: 'AI writing assistant for marketing and content creation',
      rating: 4.5,
      users: '1M+',
      pricing: 'Paid',
      features: ['Content Templates', 'SEO Optimization', 'Brand Voice'],
      icon: FileText,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 6,
      name: 'DALL-E 3',
      category: 'image',
      description: 'OpenAI\'s advanced image generation model',
      rating: 4.8,
      users: '10M+',
      pricing: 'Paid',
      features: ['Photorealistic Images', 'Creative Control', 'Safety Features'],
      icon: Palette,
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 7,
      name: 'Mubert',
      category: 'audio',
      description: 'AI music generation for content creators',
      rating: 4.4,
      users: '500K+',
      pricing: 'Freemium',
      features: ['Royalty-free Music', 'Custom Moods', 'Real-time Generation'],
      icon: Music,
      color: 'from-teal-500 to-green-600'
    },
    {
      id: 8,
      name: 'Perplexity AI',
      category: 'search',
      description: 'AI-powered search engine with real-time answers',
      rating: 4.6,
      users: '3M+',
      pricing: 'Freemium',
      features: ['Real-time Search', 'Source Citations', 'Follow-up Questions'],
      icon: Search,
      color: 'from-violet-500 to-purple-600'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Tools', icon: Layers },
    { id: 'text', name: 'Text & Writing', icon: FileText },
    { id: 'image', name: 'Image Generation', icon: Image },
    { id: 'code', name: 'Code & Development', icon: Code },
    { id: 'video', name: 'Video & Animation', icon: Video },
    { id: 'audio', name: 'Audio & Music', icon: Music },
    { id: 'search', name: 'Search & Research', icon: Search }
  ]

  const filteredTools = aiTools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const stats = [
    { label: 'AI Tools', value: '500+', icon: Bot },
    { label: 'Categories', value: '12', icon: Layers },
    { label: 'Users Served', value: '50K+', icon: Users },
    { label: 'Success Rate', value: '98%', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
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
              <button className="bg-ai-primary hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors">
                Submit Tool
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
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
            <Sparkles className="w-8 h-8 text-ai-accent" />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-ai-primary to-ai-accent bg-clip-text text-transparent">
              Discover AI Tools
            </h2>
            <Wand2 className="w-8 h-8 text-ai-secondary" />
          </motion.div>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Comprehensive collection of cutting-edge AI tools, utilities, and productivity features 
            to supercharge your workflow and unleash your creativity.
          </p>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI tools, features, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 outline-none focus:border-ai-primary transition-colors"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-8 h-8 text-ai-accent mx-auto mb-3" />
                <div className="text-2xl font-bold text-ai-primary">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories */}
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
              onClick={() => setActiveCategory(category.id)}
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

      {/* Tools Grid */}
      <motion.section 
        className="container mx-auto px-6 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              className="tool-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                <button className="flex-1 bg-ai-primary hover:bg-indigo-600 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Try Now
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-300 mb-2">No tools found</h3>
            <p className="text-gray-400">Try adjusting your search or category filter</p>
          </motion.div>
        )}
      </motion.section>

      {/* Footer */}
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
    </div>
  )
}

export default App
