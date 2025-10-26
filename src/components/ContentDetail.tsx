import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  User,
  Tag,
  BookOpen,
  Video,
  FileText,
} from "lucide-react";

interface ContentDetailProps {
  content: {
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
    content: string;
    publishedDate: string;
  };
  onBack: () => void;
}

export default function ContentDetail({ content, onBack }: ContentDetailProps) {
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

  const getIcon = (type: string) => {
    switch (type) {
      case "article":
        return FileText;
      case "tutorial":
        return BookOpen;
      case "guide":
        return User;
      case "video":
        return Video;
      default:
        return FileText;
    }
  };

  const Icon = getIcon(content.type);

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
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Content Hub</span>
          </button>
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
          {/* Content Header */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(content.difficulty)}`}
                >
                  {content.difficulty}
                </span>
                <span className="text-gray-400 text-sm capitalize">
                  {content.type}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
              <p className="text-xl text-gray-300 mb-4">
                {content.description}
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>By {content.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{content.readTime} read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span>{content.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <motion.div
            className="prose prose-lg prose-invert max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2>Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to this comprehensive guide on{" "}
                {content.title.toLowerCase()}. In today's rapidly evolving AI
                landscape, understanding how to effectively use AI tools is
                crucial for both personal and professional development. This{" "}
                {content.type} will walk you through everything you need to know
                to get started and make the most of this powerful technology.
              </p>

              <h2>Getting Started</h2>
              <p className="text-gray-300 leading-relaxed">
                Whether you're a complete beginner or looking to enhance your
                existing skills, this section will provide you with the
                foundational knowledge needed to begin your journey with AI
                tools effectively.
              </p>

              <h3>Prerequisites</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Basic understanding of computers and internet usage</li>
                <li>• An account with the relevant AI platform</li>
                <li>• Willingness to experiment and learn</li>
              </ul>

              <h2>Step-by-Step Guide</h2>
              <p className="text-gray-300 leading-relaxed">
                Follow these detailed steps to get the most out of your AI tools
                experience. Each step includes practical examples and tips for
                optimal results.
              </p>

              <h3>Step 1: Setting Up Your Account</h3>
              <p className="text-gray-300 leading-relaxed">
                The first step in your AI journey is creating an account with
                your chosen platform. Most AI tools offer free tiers that are
                perfect for getting started without any financial commitment.
              </p>

              <h3>Step 2: Exploring the Interface</h3>
              <p className="text-gray-300 leading-relaxed">
                Once you're logged in, take some time to explore the interface.
                Familiarize yourself with the main features, navigation, and
                available options. Many platforms offer interactive tutorials to
                help you get started.
              </p>

              <h2>Best Practices</h2>
              <p className="text-gray-300 leading-relaxed">
                To maximize your success with AI tools, consider these proven
                best practices that experienced users swear by.
              </p>

              <h3>Tip 1: Start Small</h3>
              <p className="text-gray-300 leading-relaxed">
                Don't try to tackle complex projects right away. Start with
                simple tasks and gradually increase complexity as you become
                more comfortable with the tools.
              </p>

              <h3>Tip 2: Experiment Regularly</h3>
              <p className="text-gray-300 leading-relaxed">
                The best way to learn is through experimentation. Try different
                prompts, settings, and approaches to discover what works best
                for your specific needs.
              </p>

              <h2>Common Challenges and Solutions</h2>
              <p className="text-gray-300 leading-relaxed">
                Every learning journey has its challenges. Here are some common
                issues users face and how to overcome them.
              </p>

              <h3>Challenge: Getting Started</h3>
              <p className="text-gray-300 leading-relaxed">
                Many beginners feel overwhelmed. The solution is to break down
                your goals into smaller, manageable tasks and tackle them one at
                a time.
              </p>

              <h2>Conclusion</h2>
              <p className="text-gray-300 leading-relaxed">
                Congratulations on completing this {content.type}! You've taken
                an important step toward mastering AI tools. Remember that
                consistent practice and patience are key to becoming proficient.
                Keep experimenting, stay curious, and don't hesitate to explore
                other resources in our Content Hub.
              </p>

              <div className="mt-8 p-4 bg-ai-primary/10 rounded-lg border border-ai-primary/20">
                <p className="text-ai-primary font-medium">
                  💡 Pro Tip: Join our community forum to connect with other
                  learners and share your experiences!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Content */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6">Related Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder for related content */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-2">
                  Advanced AI Techniques
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Dive deeper into advanced AI methodologies and techniques for
                  power users.
                </p>
                <button className="text-ai-primary hover:text-indigo-300 transition-colors">
                  Read More →
                </button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-2">
                  AI Ethics and Best Practices
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Understanding the ethical implications and best practices in
                  AI usage.
                </p>
                <button className="text-ai-primary hover:text-indigo-300 transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
