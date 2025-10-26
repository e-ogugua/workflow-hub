import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, FileText, Users, Star, Clock } from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  type: "article" | "tutorial" | "guide" | "video";
  category: string;
  description: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  author: string;
  tags: string[];
  url: string;
}

const contentItems: ContentItem[] = [
  {
    id: 1,
    title: "Getting Started with ChatGPT: A Beginner's Guide",
    type: "tutorial",
    category: "Text & Writing",
    description:
      "Learn how to use ChatGPT effectively for writing, coding, and problem-solving.",
    readTime: "10 min",
    difficulty: "Beginner",
    rating: 4.8,
    author: "AI Hub Team",
    tags: ["ChatGPT", "Beginner", "Writing"],
    url: "#",
  },
  {
    id: 2,
    title: "AI Ethics in Content Creation",
    type: "article",
    category: "Ethics",
    description:
      "Understanding the ethical implications of using AI for content generation.",
    readTime: "15 min",
    difficulty: "Intermediate",
    rating: 4.6,
    author: "Dr. Sarah Chen",
    tags: ["Ethics", "AI", "Content"],
    url: "#",
  },
  {
    id: 3,
    title: "Building Your First AI Model with Hugging Face",
    type: "guide",
    category: "Code & Development",
    description:
      "Step-by-step guide to training and deploying your first AI model.",
    readTime: "25 min",
    difficulty: "Advanced",
    rating: 4.7,
    author: "Alex Rodriguez",
    tags: ["Hugging Face", "ML", "Tutorial"],
    url: "#",
  },
  {
    id: 4,
    title: "AI Tools for Video Editing: Complete Workflow",
    type: "video",
    category: "Video & Animation",
    description:
      "Video tutorial on using AI tools for professional video editing.",
    readTime: "20 min",
    difficulty: "Intermediate",
    rating: 4.5,
    author: "Creative Studio",
    tags: ["Video Editing", "Workflow", "AI"],
    url: "#",
  },
  {
    id: 5,
    title: "Prompt Engineering: Mastering AI Conversations",
    type: "guide",
    category: "Text & Writing",
    description:
      "Advanced techniques for writing effective prompts for AI models.",
    readTime: "18 min",
    difficulty: "Intermediate",
    rating: 4.9,
    author: "Prompt Masters",
    tags: ["Prompt Engineering", "AI", "Tips"],
    url: "#",
  },
  {
    id: 6,
    title: "AI in Design: From Concept to Creation",
    type: "article",
    category: "Design & Creativity",
    description:
      "How AI is revolutionizing the design industry and creative workflows.",
    readTime: "12 min",
    difficulty: "Beginner",
    rating: 4.4,
    author: "Design Weekly",
    tags: ["Design", "Creativity", "AI"],
    url: "#",
  },
];

const categories = [
  "All",
  "Text & Writing",
  "Image Generation",
  "Code & Development",
  "Video & Animation",
  "Audio & Music",
  "Ethics",
  "Design & Creativity",
];

interface ContentHubProps {
  onContentClick?: (contentId: number) => void;
}

export default function ContentHub({ onContentClick }: ContentHubProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContent = contentItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "article":
        return FileText;
      case "tutorial":
        return BookOpen;
      case "guide":
        return Users;
      case "video":
        return Video;
      default:
        return FileText;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "Advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <motion.section
      className="container mx-auto px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Content Hub</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Learn, explore, and master AI tools with our comprehensive guides,
          tutorials, and resources.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-ai-primary transition-colors"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category
                    ? "bg-ai-primary text-white"
                    : "bg-white/10 hover:bg-white/20 text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item, index) => {
          const Icon = getIcon(item.type);
          return (
            <motion.div
              key={item.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onContentClick?.(item.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getDifficultyColor(item.difficulty)}`}
                    >
                      {item.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{item.readTime}</span>
                </div>
                <span>By {item.author}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/10 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full bg-ai-primary hover:bg-indigo-600 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                Read More
              </button>
            </motion.div>
          );
        })}
      </div>

      {filteredContent.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-300 mb-2">
            No content found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search or category filter
          </p>
        </motion.div>
      )}
    </motion.section>
  );
}
