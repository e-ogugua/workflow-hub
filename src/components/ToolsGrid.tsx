import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import ToolCard from "./ToolCard";
import { Tool } from "../data/tools";

interface ToolsGridProps {
  tools: Tool[];
  onTryNow: (tool: Tool) => void;
  onAddToComparison?: (tool: Tool) => void;
  comparisonTools?: Tool[];
}

export default function ToolsGrid({
  tools,
  onTryNow,
  onAddToComparison,
  comparisonTools,
}: ToolsGridProps) {
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
      className="container mx-auto px-6 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
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
              isInComparison={comparisonTools?.some((t) => t.id === tool.id)}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
