# API Reference

Comprehensive reference for Workflow Hub components, data structures, and public APIs.

## Component API

### Header Component

Navigation component with responsive mobile menu and branding.

```typescript
interface HeaderProps {
  onSubmitTool?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSubmitTool }) => {
  // Component implementation
};
```

#### Props
- `onSubmitTool?: () => void` - Optional callback for tool submission

### Hero Component

Landing section with search functionality and platform statistics.

```typescript
interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  stats: Array<{
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

const Hero: React.FC<HeroProps> = ({ searchTerm, onSearchChange, stats }) => {
  // Component implementation
};
```

#### Props
- `searchTerm: string` - Current search query value
- `onSearchChange: (value: string) => void` - Search input change handler
- `stats: StatsArray` - Platform statistics for display

### Categories Component

Category filtering interface with visual feedback.

```typescript
interface CategoriesProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  // Component implementation
};
```

#### Props
- `categories: Category[]` - Available categories array
- `activeCategory: string` - Currently selected category ID
- `onCategoryChange: (category: string) => void` - Category selection handler

### ToolsGrid Component

Responsive grid display for tool cards with sorting and filtering.

```typescript
interface ToolsGridProps {
  tools: Tool[];
  onTryNow: (tool: Tool) => void;
  onAddToComparison?: (tool: Tool) => void;
  comparisonTools?: Tool[];
}

const ToolsGrid: React.FC<ToolsGridProps> = ({
  tools,
  onTryNow,
  onAddToComparison,
  comparisonTools
}) => {
  // Component implementation
};
```

#### Props
- `tools: Tool[]` - Array of tools to display
- `onTryNow: (tool: Tool) => void` - Tool selection handler
- `onAddToComparison?: (tool: Tool) => void` - Optional comparison handler
- `comparisonTools?: Tool[]` - Currently compared tools

## Data Structures

### Tool Interface

Comprehensive tool metadata structure used throughout the application.

```typescript
interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;              // Icon identifier for component mapping
  color: string;             // Gradient color scheme
  rating: number;           // User rating (0-5)
  users: string;            // User count (formatted string)
  pricing: 'Free' | 'Freemium' | 'Paid';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  features: string[];       // Key features list
  useCases: string[];       // Practical use cases
  alternatives: string[];   // Alternative tools
  region?: string;          // Geographic focus
  tags?: string[];         // Descriptive tags
  url: string;              // Official website
  apiUrl?: string;          // API documentation URL
}
```

### Category Interface

Category definition with icon mapping and metadata.

```typescript
interface Category {
  id: string;
  name: string;
  icon: string;              // Icon identifier for component mapping
  description?: string;      // Category description
  toolCount?: number;        // Number of tools in category
}
```

### Statistics Interface

Platform metrics for dashboard display.

```typescript
interface PlatformStats {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}
```

## Utility Functions

### Data Loading

Asynchronous data loading from JSON files.

```typescript
// Load tools and categories data
export const loadToolsData = async (): Promise<{
  tools: Tool[];
  categories: Category[];
}> => {
  try {
    const toolsResponse = await fetch("/data/tools.json");
    const categoriesResponse = await fetch("/data/categories.json");
    return {
      tools: await toolsResponse.json(),
      categories: await categoriesResponse.json()
    };
  } catch (error) {
    console.error("Failed to load tools data:", error);
    return { tools: [], categories: [] };
  }
};
```

### Icon Mapping

Icon component resolution from string identifiers.

```typescript
// Map string identifiers to React components
export const getIconComponent = (iconName: string): React.ComponentType<{
  className?: string;
}> => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    Bot,
    Sparkles,
    Code,
    Image,
    Video,
    Music,
    Search,
    Palette,
    Zap,
    // Additional icon mappings
  };

  return iconMap[iconName] || Layers; // Default fallback
};
```

## Hooks API

### useReducedMotion

Accessibility hook for respecting user motion preferences.

```typescript
// Usage in components
const prefersReducedMotion = useReducedMotion();

// Conditional animation implementation
const variants = prefersReducedMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
```

## Environment Variables

### Development Configuration

```bash
# .env.local
VITE_APP_TITLE="Workflow Hub"
VITE_API_URL="https://api.workflow-hub.com"
VITE_ENABLE_ANALYTICS=false
VITE_DEBUG_MODE=true
```

### Production Configuration

```bash
# .env.production
VITE_APP_TITLE="Workflow Hub"
VITE_API_URL="https://api.workflow-hub.com"
VITE_ENABLE_ANALYTICS=true
VITE_DEBUG_MODE=false
```

## Error Handling

### Component Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

### API Error Handling

```typescript
const fetchWithErrorHandling = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error: ${url}`, error);
    throw error;
  }
};
```

## Performance Metrics

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Bundle Size Limits
- **Main bundle**: < 50 kB gzipped
- **Vendor chunks**: < 100 kB gzipped
- **Total application**: < 150 kB gzipped

## Browser Support

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Feature Detection
```typescript
// Check for required browser features
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const supportsWebP = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
```

## Accessibility API

### Screen Reader Support
- Semantic HTML structure
- ARIA labels and descriptions
- Live region announcements
- Keyboard navigation support

### Motion Preferences
- Respects `prefers-reduced-motion`
- Provides static alternatives
- Maintains functionality without animations

## Testing API

### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ToolCard } from './ToolCard';

test('renders tool information', () => {
  const mockTool: Tool = {
    id: 1,
    name: 'Test Tool',
    description: 'Test description',
    // ... other properties
  };

  render(<ToolCard tool={mockTool} onTryNow={jest.fn()} />);

  expect(screen.getByText('Test Tool')).toBeInTheDocument();
  expect(screen.getByText('Test description')).toBeInTheDocument();
});
```

### Hook Testing
```typescript
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

test('respects motion preferences', () => {
  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const { result } = renderHook(() => useReducedMotion());
  expect(result.current).toBe(true);
});
```

## Migration Guides

### Version Upgrade Procedures

#### React 18 Migration
1. Update React and React DOM to version 18
2. Verify Strict Mode compatibility
3. Test concurrent features impact
4. Update TypeScript types

#### Vite Migration
1. Update Vite to latest version
2. Review build configuration changes
3. Test development server functionality
4. Verify production builds

## API Changelog

### v4.0.0 (Current)
- Added useReducedMotion hook for accessibility
- Enhanced responsive breakpoints (320px - 1920px+)
- Improved glass morphism effects
- Added comprehensive error boundaries

### v3.0.0
- Complete component architecture redesign
- TypeScript migration completion
- Performance optimization implementation
- Accessibility features introduction

### v2.0.0
- Initial React component structure
- Basic TypeScript implementation
- Tailwind CSS integration
- Framer Motion animations

### v1.0.0
- Initial vanilla JavaScript implementation
- Basic HTML/CSS structure
- Simple tool directory functionality

## Support and Maintenance

For API support and questions:
- Review component documentation
- Check TypeScript definitions
- Test with provided examples
- Report issues with reproduction steps
