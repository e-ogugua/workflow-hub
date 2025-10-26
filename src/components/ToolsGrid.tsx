import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import React, { useMemo } from "react";
import ToolCard from "./ToolCard";
import { Tool } from "../data/tools";

interface ToolsGridProps {
  tools: Tool[];
  onTryNow: (tool: Tool) => void;
  onAddToComparison?: (tool: Tool) => void;
  comparisonTools?: Tool[];
}

// PERFORMANCE OPTIMIZATION: Memoize ToolsGrid component to prevent unnecessary re-renders
// This component renders many ToolCard components and handles large lists, so memoization is essential
const ToolsGrid = React.memo(({
  tools,
  onTryNow,
  onAddToComparison,
  comparisonTools,
}: ToolsGridProps) => {
  // PERFORMANCE OPTIMIZATION: Memoize comparison lookup to prevent array searching on each render
  const comparisonToolIds = useMemo(() => {
    return new Set(comparisonTools?.map(tool => tool.id) || []);
  }, [comparisonTools]);

  // PERFORMANCE OPTIMIZATION: Early return for empty state to avoid unnecessary rendering
  if (tools.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-300 mb-2">No tools found</h3>
        <p className="text-gray-400">
          Try adjusting your search or category filter
        </p>
      </motion.div>
    );
  }

  return (
    <motion.section
      className="container mx-auto px-4 sm:px-6 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {/* Enhanced responsive grid for all screen sizes */}
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 sm:gap-6">
        {tools.map((tool, index) => (
          // PERFORMANCE OPTIMIZATION: Staggered animations with optimized delays
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ToolCard
              tool={tool}
              onTryNow={onTryNow}
              onAddToComparison={onAddToComparison}
              isInComparison={comparisonToolIds.has(tool.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
});

ToolsGrid.displayName = 'ToolsGrid';

export default ToolsGrid;
