import React from "react";
import {
  MessageSquare,
  Image,
  Code,
  Video,
  FileText,
  Music,
  Search,
  Layers,
  Palette,
  Bot,
  Database,
  Mic,
  PenTool,
  GitBranch,
  Calculator,
  BookOpen,
  Globe,
  Languages,
} from "lucide-react";

// Updated interface for async loading with string icon names
export interface Tool {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  users: string;
  pricing: string;
  features: string[];
  icon: string; // Changed from React component to string name
  color: string;
  demoUrl?: string;
  tags?: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  useCases: string[];
  alternatives?: string[];
  region?: "Global" | "Africa" | "Local";
  trending?: boolean;
  year?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Icon mapping function for converting string names to React components
export const getIconComponent = (iconName: string): React.ComponentType<{ className?: string }> => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    MessageSquare,
    Image,
    Code,
    Video,
    FileText,
    Music,
    Search,
    Layers,
    Palette,
    Bot,
    Database,
    Mic,
    PenTool,
    GitBranch,
    Calculator,
    BookOpen,
    Globe,
    Languages,
  };

  return iconMap[iconName] || Layers; // Default to Layers if not found
};

// Async function to load tools data
export const loadToolsData = async (): Promise<{ tools: Tool[]; categories: Category[] }> => {
  try {
    // Load tools data from public folder (served at root by Vite)
    const toolsResponse = await fetch("/data/tools.json");
    if (!toolsResponse.ok) {
      throw new Error(`HTTP error! status: ${toolsResponse.status}`);
    }
    const tools: Tool[] = await toolsResponse.json();

    // Load categories data from public folder
    const categoriesResponse = await fetch("/data/categories.json");
    if (!categoriesResponse.ok) {
      throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
    }
    const categories: Category[] = await categoriesResponse.json();

    return { tools, categories };
  } catch (error) {
    console.error("Failed to load tools data:", error);
    // Fallback to empty arrays if loading fails
    return { tools: [], categories: [] };
  }
};

// Legacy exports for backward compatibility (will be updated to use async loading)
export const aiTools: Tool[] = [];
export const categories: Category[] = [];
