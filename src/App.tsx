import { useState, useCallback, useMemo, useRef } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import ToolsGrid from './components/ToolsGrid'
import ToolComparison from './components/ToolComparison'
import ContentHub from './components/ContentHub'
import ToolDetail from './components/ToolDetail'
import ContentDetail from './components/ContentDetail'
import Footer from './components/Footer'
import { aiTools, categories, Tool } from './data/tools'
import { Layers, Users, TrendingUp, ArrowUpDown, Star, GitCompare, Sparkles } from 'lucide-react'

// Simple debounce hook
function useDebounce(callback: (value: string) => void, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback((value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(value)
    }, delay)
  }, [callback, delay])
}

type SortOption = 'name' | 'rating' | 'users' | 'pricing'

function App() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [comparisonTools, setComparisonTools] = useState<Tool[]>([])
  const [showComparison, setShowComparison] = useState(false)

  // Debounced search function
  const debouncedSearch = useDebounce((value: string) => {
    setSearchTerm(value)
  }, 300)

  const handleSearchChange = (value: string) => {
    debouncedSearch(value)
  }

  const filteredAndSortedTools = useMemo(() => {
    let filtered = aiTools.filter(tool => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })

    // Sort tools
    const pricingOrder = { 'Free': 1, 'Freemium': 2, 'Paid': 3 }
    filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'users':
          aValue = parseInt(a.users.replace(/[^0-9]/g, '')) || 0
          bValue = parseInt(b.users.replace(/[^0-9]/g, '')) || 0
          break
        case 'pricing':
          aValue = pricingOrder[a.pricing as keyof typeof pricingOrder] || 4
          bValue = pricingOrder[b.pricing as keyof typeof pricingOrder] || 4
          break
        default:
          return 0
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
      }
    })

    return filtered
  }, [activeCategory, searchTerm, sortBy, sortOrder])

  const stats = [
    { label: 'Premium AI Tools', value: aiTools.length.toString(), icon: Sparkles },
    { label: 'Categories', value: categories.length.toString(), icon: Layers },
    { label: 'Happy Users', value: '50K+', icon: Users },
    { label: 'Success Rate', value: '99%', icon: TrendingUp }
  ]

  const handleSubmitTool = () => {
    // Enhanced tool submission with user feedback
    alert('Thank you for your interest! Tool submission feature coming soon. Please check back later.')
  }

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(option)
      setSortOrder('asc')
    }
  }

  const handleAddToComparison = (tool: Tool) => {
    if (comparisonTools.length < 4 && !comparisonTools.find(t => t.id === tool.id)) {
      setComparisonTools([...comparisonTools, tool])
    }
  }

  const handleRemoveFromComparison = (toolId: number) => {
    setComparisonTools(comparisonTools.filter(tool => tool.id !== toolId))
  }

  const handleCloseComparison = () => {
    setShowComparison(false)
  }

  const openComparison = () => {
    if (comparisonTools.length > 0) {
      setShowComparison(true)
    }
  }

  const handleToolClick = (tool: Tool) => {
    navigate(`/tool/${tool.id}`)
  }

  const handleContentClick = (contentId: number) => {
    navigate(`/content/${contentId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      <Routes>
        <Route path="/" element={
          <>
            <Header onSubmitTool={handleSubmitTool} />
            <Hero
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              stats={stats}
            />
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Enhanced Sort and Compare Controls */}
            <div className="container mx-auto px-4 sm:px-6 mb-12">
              <div className="glass-strong rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold gradient-text mb-2">Sort & Filter Tools</h3>
                    <p className="text-gray-400 text-sm">Find the perfect AI tools for your workflow</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {[
                      { key: 'name', label: 'Name', icon: ArrowUpDown },
                      { key: 'rating', label: 'Rating', icon: Star },
                      { key: 'users', label: 'Popularity', icon: Users },
                      { key: 'pricing', label: 'Pricing', icon: TrendingUp }
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => handleSort(key as SortOption)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                          sortBy === key
                            ? 'bg-gradient-to-r from-ai-primary to-ai-secondary text-white shadow-lg'
                            : 'glass hover:bg-white/10 text-gray-300 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{label}</span>
                        {sortBy === key && (
                          <span className="text-xs ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    ))}

                    <div className="h-6 w-px bg-white/20" />

                    <button
                      onClick={openComparison}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        comparisonTools.length > 0
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                          : 'glass hover:bg-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      <GitCompare className="w-4 h-4" />
                      <span className="text-sm font-medium">Compare ({comparisonTools.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div id="tools">
              <ToolsGrid
                tools={filteredAndSortedTools}
                onTryNow={handleToolClick}
                onAddToComparison={handleAddToComparison}
                comparisonTools={comparisonTools}
              />
            </div>
            <div id="categories">
              <ContentHub onContentClick={handleContentClick} />
            </div>
            <div id="trending">
              <Footer />
            </div>
          </>
        } />
        <Route path="/tool/:id" element={
          <ToolDetail
            tool={aiTools.find(t => t.id === parseInt(window.location.pathname.split('/').pop() || '0')) || aiTools[0]}
            onBack={() => navigate('/')}
            onAddToComparison={handleAddToComparison}
            isInComparison={comparisonTools.some(t => t.id === parseInt(window.location.pathname.split('/').pop() || '0'))}
          />
        } />
        <Route path="/content/:id" element={
          <ContentDetail
            content={{
              id: 1,
              title: 'Getting Started with AI Tools',
              type: 'tutorial',
              category: 'General',
              description: 'A comprehensive guide to getting started with AI tools for beginners.',
              readTime: '15 min',
              difficulty: 'Beginner',
              rating: 4.7,
              author: 'Workflow Hub Team',
              tags: ['AI', 'Beginner', 'Tutorial'],
              content: 'Full article content here...',
              publishedDate: '2025-01-15'
            }}
            onBack={() => navigate('/')}
          />
        } />
      </Routes>

      {showComparison && (
        <ToolComparison
          tools={comparisonTools}
          onRemoveTool={handleRemoveFromComparison}
          onClose={handleCloseComparison}
        />
      )}
    </div>
  )
}

export default App
