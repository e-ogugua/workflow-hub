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
import { Bot, Layers, Users, TrendingUp, ArrowUpDown, Star, GitCompare } from 'lucide-react'

// Simple debounce hook
function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay]) as T
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
          const pricingOrder = { 'Free': 1, 'Freemium': 2, 'Paid': 3 }
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
    { label: 'AI Tools', value: aiTools.length.toString(), icon: Bot },
    { label: 'Categories', value: categories.length.toString(), icon: Layers },
    { label: 'Users Served', value: '50K+', icon: Users },
    { label: 'Success Rate', value: '98%', icon: TrendingUp }
  ]

  const handleSubmitTool = () => {
    // TODO: Implement tool submission
    console.log('Submit tool clicked')
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

            {/* Sort and Compare Controls */}
            <div className="container mx-auto px-6 mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sort Tools</h3>
                <div className="flex space-x-2">
                  {[
                    { key: 'name', label: 'Name', icon: ArrowUpDown },
                    { key: 'rating', label: 'Rating', icon: Star },
                    { key: 'users', label: 'Popularity', icon: Users },
                    { key: 'pricing', label: 'Pricing', icon: TrendingUp }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => handleSort(key as SortOption)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                        sortBy === key ? 'bg-ai-primary text-white' : 'bg-white/10 hover:bg-white/20 text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                      {sortBy === key && (
                        <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  ))}
                  <button
                    onClick={openComparison}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      comparisonTools.length > 0 ? 'bg-green-600 text-white' : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    <GitCompare className="w-4 h-4" />
                    <span className="text-sm">Compare ({comparisonTools.length})</span>
                  </button>
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
            <div id="about">
              {/* About section - could add more content here */}
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
              author: 'AI Hub Team',
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
