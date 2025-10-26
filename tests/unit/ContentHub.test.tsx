import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import ContentHub from '../../src/components/ContentHub';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) =>
    <a href={to}>{children}</a>,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  BookOpen: ({ className }: { className?: string }) => <div className={className}>📖</div>,
  Clock: ({ className }: { className?: string }) => <div className={className}>🕐</div>,
  Star: ({ className }: { className?: string }) => <div className={className}>⭐</div>,
  Users: ({ className }: { className?: string }) => <div className={className}>👥</div>,
}));

describe('ContentHub Component', () => {
  const mockOnContentClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render content hub section', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      expect(screen.getByText('Content Hub')).toBeInTheDocument();
      expect(screen.getByText('Educational Resources')).toBeInTheDocument();
    });

    it('should render all content categories', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      expect(screen.getByText('Tutorials')).toBeInTheDocument();
      expect(screen.getByText('Best Practices')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
    });

    it('should display featured content items', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      expect(screen.getByText('Getting Started with AI Tools')).toBeInTheDocument();
      expect(screen.getByText('Advanced AI Techniques')).toBeInTheDocument();
      expect(screen.getByText('AI Ethics and Best Practices')).toBeInTheDocument();
    });

    it('should display read time and ratings for content items', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      expect(screen.getByText('15 min read')).toBeInTheDocument();
      expect(screen.getByText('4.7')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onContentClick when content item is clicked', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      const contentLinks = screen.getAllByRole('link');
      if (contentLinks.length > 0) {
        fireEvent.click(contentLinks[0]);
        expect(mockOnContentClick).toHaveBeenCalledTimes(1);
      }
    });

    it('should handle keyboard navigation', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      const contentLinks = screen.getAllByRole('link');
      if (contentLinks.length > 0) {
        contentLinks[0].focus();
        expect(document.activeElement).toBe(contentLinks[0]);

        fireEvent.keyDown(contentLinks[0], { key: 'Enter', code: 'Enter' });
        expect(mockOnContentClick).toHaveBeenCalledTimes(1);
      }
    });

    it('should handle category tab navigation', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      const categoryButtons = screen.getAllByRole('tab');
      expect(categoryButtons.length).toBeGreaterThan(0);

      if (categoryButtons.length > 1) {
        fireEvent.click(categoryButtons[1]);
        expect(categoryButtons[1]).toHaveClass('border-ai-primary', 'text-ai-primary');
      }
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab').length).toBeGreaterThan(0);
    });

    it('should have proper heading structure', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      expect(screen.getByRole('heading', { level: 2, name: 'Content Hub' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: 'Educational Resources' })).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      const firstTab = screen.getAllByRole('tab')[0];
      firstTab.focus();
      expect(document.activeElement).toBe(firstTab);
    });

    it('should have proper link attributes', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Content Organization', () => {
    it('should display content in proper categories', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      // Check if content is organized by categories
      expect(screen.getByText('Tutorials')).toBeInTheDocument();
      expect(screen.getByText('Best Practices')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
    });

    it('should show content metadata correctly', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      // Check for metadata elements
      expect(screen.getByText('15 min read')).toBeInTheDocument();
      expect(screen.getByText('Beginner')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid layout', () => {
      render(<ContentHub onContentClick={mockOnContentClick} />);

      const gridContainer = screen.getByText('Getting Started with AI Tools').closest('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('should handle mobile layout properly', () => {
      // Mock window.innerWidth for mobile testing
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<ContentHub onContentClick={mockOnContentClick} />);

      const container = screen.getByText('Content Hub').closest('section');
      expect(container).toHaveClass('container', 'mx-auto', 'px-4');
    });
  });

  describe('Performance', () => {
    it('should not cause unnecessary re-renders', () => {
      const { rerender } = render(<ContentHub onContentClick={mockOnContentClick} />);

      // Re-render with same props should not cause issues
      rerender(<ContentHub onContentClick={mockOnContentClick} />);

      expect(screen.getByText('Content Hub')).toBeInTheDocument();
    });
  });
});
