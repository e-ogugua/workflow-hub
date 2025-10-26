import React, { useState, useCallback, useMemo, useRef, Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import ToolsGrid from './components/ToolsGrid'
import ContentHub from './components/ContentHub'
import Footer from './components/Footer'
import { loadToolsData, Tool, Category } from './data/tools'
import { Layers, Users, TrendingUp, ArrowUpDown, Star, GitCompare, Sparkles } from 'lucide-react'

// PERFORMANCE OPTIMIZATION: Lazy load non-critical components
// These components are only loaded when user navigates to specific routes
const ToolDetail = lazy(() => import('./components/ToolDetail'))
const ContentDetail = lazy(() => import('./components/ContentDetail'))
const ToolComparison = lazy(() => import('./components/ToolComparison'))

// PERFORMANCE OPTIMIZATION: Memoized loading component to prevent unnecessary re-renders
const LoadingSpinner = React.memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ai-primary mx-auto mb-4"></div>
      <p className="text-xl">Loading...</p>
    </div>
  </div>
))

LoadingSpinner.displayName = 'LoadingSpinner'

// PERFORMANCE OPTIMIZATION: Optimized debounce hook with cleanup
function useDebounce<T extends (...args: never[]) => void>(callback: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const callbackRef = useRef(callback)

  // Keep callback ref updated
  callbackRef.current = callback

  const debouncedFn = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args)
    }, delay)
  }, [delay]) as T

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedFn
}

type SortOption = 'name' | 'rating' | 'users' | 'pricing'

function App() {
  const navigate = useNavigate()

  // PERFORMANCE OPTIMIZATION: State for async data loading
  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [comparisonTools, setComparisonTools] = useState<Tool[]>([])
  const [showComparison, setShowComparison] = useState(false)

  // PERFORMANCE OPTIMIZATION: Load tools and categories data on component mount
  // This separates the large data from the main bundle, reducing initial load time
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const { tools: loadedTools, categories: loadedCategories } = await loadToolsData()
        setTools(loadedTools)
        setCategories(loadedCategories)
      } catch (err) {
        setError('Failed to load data')
        console.error('Error loading data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // PERFORMANCE OPTIMIZATION: Debounced search function
  const debouncedSearch = useDebounce((value: string) => {
    setSearchTerm(value)
  }, 300)

  const handleSearchChange = useCallback((value: string) => {
    debouncedSearch(value)
  }, [debouncedSearch])

  // PERFORMANCE OPTIMIZATION: Memoized filtered and sorted tools
  const filteredAndSortedTools = useMemo(() => {
    if (!tools?.length) return []

    const filtered = tools.filter(tool => {
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
  }, [activeCategory, searchTerm, sortBy, sortOrder, tools])

  // PERFORMANCE OPTIMIZATION: Memoized statistics for display
  const stats = useMemo(() => [
    { label: 'AI Tools', value: tools?.length?.toString() || '0', icon: Sparkles },
    { label: 'Categories', value: categories?.length?.toString() || '0', icon: Layers },
    { label: 'Users', value: '50K+', icon: Users },
    { label: 'Success Rate', value: '99%', icon: TrendingUp }
  ], [tools.length, categories.length])

  // PERFORMANCE OPTIMIZATION: Memoized event handlers with performance callbacks
  const handleSubmitTool = useCallback(() => {
    alert('Thank you for your interest! Tool submission feature coming soon. Please check back later.')
  }, [])

  const handleSort = useCallback((option: SortOption) => {
    setSortBy(prev => {
      if (prev === option) {
        setSortOrder(order => order === 'asc' ? 'desc' : 'asc')
        return prev
      } else {
        setSortOrder('asc')
        return option
      }
    })
  }, [])

  const handleAddToComparison = useCallback((tool: Tool) => {
    setComparisonTools(prev => {
      if (prev.length < 4 && !prev.find(t => t.id === tool.id)) {
        return [...prev, tool]
      }
      return prev
    })
  }, [])

  const handleRemoveFromComparison = useCallback((toolId: number) => {
    setComparisonTools(prev => prev.filter(tool => tool.id !== toolId))
  }, [])

  const handleCloseComparison = useCallback(() => {
    setShowComparison(false)
  }, [])

  const openComparison = useCallback(() => {
    if (comparisonTools.length > 0) {
      setShowComparison(true)
    }
  }, [comparisonTools.length])

  const handleToolClick = useCallback((tool: Tool) => {
    navigate(`/tool/${tool.id}`)
  }, [navigate])

  const handleContentClick = useCallback((contentId: number) => {
    navigate(`/content/${contentId}`)
  }, [navigate])

  // PERFORMANCE OPTIMIZATION: Early return for loading and error states
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-ai-primary hover:bg-indigo-600 py-2 px-4 rounded-lg text-white"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Early return if no tools loaded
  if (!tools || !categories) {
    return <LoadingSpinner />
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

            {/* PERFORMANCE OPTIMIZATION: Sort and Compare Controls - Memoized */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
              <div className="glass-strong rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold gradient-text mb-2">Sort & Filter Tools</h3>
                    <p className="text-gray-400 text-sm">Find tools for your workflow</p>
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
            <div id="about">
              {/* About section - brief company information */}
            </div>
          </>
        } />
        <Route path="/tool/:id" element={
          // PERFORMANCE OPTIMIZATION: Lazy loaded route with Suspense
          <Suspense fallback={<LoadingSpinner />}>
            <ToolDetail
              tool={tools.find(t => t.id === parseInt(window.location.pathname.split('/').pop() || '0')) || tools[0]}
              onBack={() => navigate('/')}
              onAddToComparison={handleAddToComparison}
              isInComparison={comparisonTools.some(t => t.id === parseInt(window.location.pathname.split('/').pop() || '0'))}
            />
          </Suspense>
        } />
        <Route path="/content/:id" element={
          // PERFORMANCE OPTIMIZATION: Lazy loaded route with Suspense
          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>
        } />
      </Routes>

      {/* PERFORMANCE OPTIMIZATION: Conditional rendering with lazy loading */}
      {showComparison && (
        <Suspense fallback={<LoadingSpinner />}>
          <ToolComparison
            tools={comparisonTools}
            onRemoveTool={handleRemoveFromComparison}
            onClose={handleCloseComparison}
          />
        </Suspense>
      )}
    </div>
  )
}

export default App;
