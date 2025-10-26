import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  Wand2,
  ArrowRight,
  Star,
  Zap,
  TrendingUp,
} from "lucide-react";
import React from "react";

interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  stats: Array<{
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

export default function Hero({ searchTerm, onSearchChange, stats }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="main"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ai-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ai-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-ai-primary/5 to-ai-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main heading */}
        <motion.div
          className="flex flex-col items-center space-y-6 mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center justify-center space-x-3 mb-4"
            variants={itemVariants}
          >
            <div className="relative">
              <Sparkles
                className="w-8 h-8 text-ai-accent animate-pulse"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 w-8 h-8 text-ai-accent animate-ping opacity-20"
                aria-hidden="true"
              >
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <h2
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="gradient-text">Discover Premium</span>
              <br />
              <span className="relative">
                <span className="gradient-text">Innovations</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  aria-hidden="true"
                />
              </span>
            </h2>
            <motion.div
              className="relative"
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              <Wand2 className="w-8 h-8 text-ai-secondary animate-bounce" />
            </motion.div>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
            aria-describedby="hero-description"
          >
            Unlock the power of AI technology with our curated collection of
            tools. From creative design to business automation, discover
            solutions that transform how you work.
          </motion.p>
          <div id="hero-description" className="sr-only">
            Workflow Hub showcases AI tools that enhance productivity and
            creativity across various industries and use cases.
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="max-w-3xl mx-auto mb-16" variants={itemVariants}>
          <div className="relative group">
            <div
              className="absolute inset-0 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div className="relative glass-strong rounded-2xl p-2">
              <div className="flex items-center">
                <Search
                  className="w-6 h-6 text-gray-400 ml-4 mr-4 group-focus-within:text-ai-primary transition-colors"
                  aria-hidden="true"
                />
                <motion.input
                  type="text"
                  placeholder="Search AI tools, features, or categories..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-4 text-white placeholder-gray-400 outline-none text-lg focus:ring-0"
                  whileFocus={{ scale: 1.02 }}
                  aria-label="Search for AI tools by name, description, or category"
                  role="searchbox"
                  aria-describedby="search-help"
                />
                <div id="search-help" className="sr-only">
                  Search through our collection of AI tools. Results update as
                  you type.
                </div>
                <motion.button
                  className="mr-2 p-3 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Execute search query"
                >
                  <span className="text-white font-medium hidden sm:block">
                    Search
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
          variants={containerVariants}
          role="region"
          aria-labelledby="stats-heading"
        >
          <h3 id="stats-heading" className="sr-only">
            Platform Statistics
          </h3>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-strong rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-primary"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              role="article"
              aria-labelledby={`stat-${index}-value`}
              tabIndex={0}
            >
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{ rotate: 10 }}
                aria-hidden="true"
              >
                <stat.icon className="w-10 h-10 text-ai-accent group-hover:text-white transition-colors" />
              </motion.div>
              <div
                id={`stat-${index}-value`}
                className="text-3xl font-bold gradient-text mb-2"
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-300 font-medium">
                {stat.label}
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 to-ai-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm text-gray-400"
          variants={itemVariants}
          role="region"
          aria-labelledby="trust-indicators"
        >
          <h3 id="trust-indicators" className="sr-only">
            Trust and Reliability Indicators
          </h3>
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              aria-hidden="true"
            />
            <span>50,000+ Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star
              className="w-4 h-4 text-yellow-400 fill-current"
              aria-hidden="true"
            />
            <span>4.8/5 Rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" aria-hidden="true" />
            <span>99% Uptime</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span>Production Ready</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
