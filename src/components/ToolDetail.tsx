import { motion } from "framer-motion";
import React, { useMemo } from "react";
import {
  ArrowLeft,
  Star,
  Users,
  ExternalLink,
  Plus,
  CheckCircle,
  XCircle,
  Target,
} from "lucide-react";
import { getIconComponent, Tool } from "../data/tools";

interface ToolDetailProps {
  tool: Tool;
  onBack: () => void;
  onAddToComparison?: (tool: Tool) => void;
  isInComparison?: boolean;
}

// PERFORMANCE OPTIMIZATION: Memoize the entire component to prevent unnecessary re-renders
// This component is heavy with animations and complex UI, so memoization prevents performance issues
const ToolDetail = React.memo(({ tool, onBack, onAddToComparison, isInComparison }: ToolDetailProps) => {
  // PERFORMANCE OPTIMIZATION: Memoize expensive calculations
  const getDifficultyColor = useMemo(() => (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  }, []);

  const getPricingColor = useMemo(() => (pricing: string) => {
    switch (pricing) {
      case 'Free': return 'bg-green-500/20 text-green-400';
      case 'Freemium': return 'bg-blue-500/20 text-blue-400';
      case 'Paid': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  }, []);

  // PERFORMANCE OPTIMIZATION: Memoize icon component to prevent recreation on each render
  const IconComponent = useMemo(() => getIconComponent(tool.icon), [tool.icon]);

  // PERFORMANCE OPTIMIZATION: Memoize arrays to prevent recreation on each render
  const featureList = useMemo(() => tool.features || [], [tool.features]);
  const useCaseList = useMemo(() => tool.useCases || [], [tool.useCases]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Tools</span>
            </button>
            <div className="flex items-center space-x-4">
              {onAddToComparison && (
                <button
                  onClick={() => onAddToComparison(tool)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isInComparison
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">
                    {isInComparison ? "In Comparison" : "Add to Compare"}
                  </span>
                </button>
              )}
              {tool.demoUrl && (
                <button
                  onClick={() => window.open(tool.demoUrl, "_blank")}
                  className="bg-ai-primary hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Try Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tool Header */}
          <div className="flex items-start space-x-6 mb-8">
            <div
              className={`w-20 h-20 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center`}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
              <p className="text-xl text-gray-300 mb-4">{tool.description}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold">{tool.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{tool.users} users</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getPricingColor(tool.pricing)}`}
                >
                  {tool.pricing}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(tool.difficulty)}`}
                >
                  {tool.difficulty}
                </span>
                {tool.region && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                    {tool.region}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-white/20">
              <nav className="flex space-x-8">
                <button className="py-4 px-1 border-b-2 border-ai-primary text-ai-primary font-medium">
                  Overview
                </button>
                <button className="py-4 px-1 text-gray-400 hover:text-white transition-colors">
                  Features
                </button>
                <button className="py-4 px-1 text-gray-400 hover:text-white transition-colors">
                  Use Cases
                </button>
                <button className="py-4 px-1 text-gray-400 hover:text-white transition-colors">
                  Alternatives
                </button>
              </nav>
            </div>
          </div>

          {/* Overview Tab */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About {tool.name}</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {tool.description} This powerful AI tool is designed to help
                users of all skill levels achieve their goals efficiently and
                effectively.
              </p>

              <h3 className="text-xl font-semibold mb-3">Key Benefits</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Easy to use for beginners
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Powerful features for professionals
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Fast and reliable performance
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Regular updates and improvements
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Category</h4>
                    <p className="text-white capitalize">
                      {tool.category.replace("-", " & ")}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Rating</h4>
                    <p className="text-white">{tool.rating}/5.0</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Users</h4>
                    <p className="text-white">{tool.users}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Pricing</h4>
                    <p className="text-white">{tool.pricing}</p>
                  </div>
                </div>
              </div>

              {tool.tags && (
                <>
                  <h3 className="text-xl font-semibold mb-4 mt-6">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Features Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featureList.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Use Cases Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCaseList.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{useCase}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Alternatives Section */}
          {tool.alternatives && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6">Alternatives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.alternatives.map((alternative, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  >
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-gray-300">{alternative}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
});

ToolDetail.displayName = 'ToolDetail';

export default ToolDetail;
