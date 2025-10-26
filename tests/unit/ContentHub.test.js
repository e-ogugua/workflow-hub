const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { describe, it, expect, jest, beforeEach } = require('@jest/globals');
const ContentHub = require('../../src/components/ContentHub.js').default;

describe('ContentHub Component', () => {
  const mockOnContentClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render content hub section', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      expect(screen.getByText('Content Hub')).toBeInTheDocument();
      expect(screen.getByText('Educational Resources')).toBeInTheDocument();
    });

    it('should render all content categories', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      expect(screen.getByText('Tutorials')).toBeInTheDocument();
      expect(screen.getByText('Best Practices')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
    });

    it('should display featured content items', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      expect(screen.getByText('Getting Started with AI Tools')).toBeInTheDocument();
      expect(screen.getByText('Advanced AI Techniques')).toBeInTheDocument();
      expect(screen.getByText('AI Ethics and Best Practices')).toBeInTheDocument();
    });

    it('should display read time and ratings for content items', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      expect(screen.getByText('15 min read')).toBeInTheDocument();
      expect(screen.getByText('4.7')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onContentClick when content item is clicked', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      const contentLinks = screen.getAllByRole('link');
      if (contentLinks.length > 0) {
        fireEvent.click(contentLinks[0]);
        expect(mockOnContentClick).toHaveBeenCalledTimes(1);
      }
    });

    it('should handle keyboard navigation', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      const contentLinks = screen.getAllByRole('link');
      if (contentLinks.length > 0) {
        contentLinks[0].focus();
        expect(document.activeElement).toBe(contentLinks[0]);

        fireEvent.keyDown(contentLinks[0], { key: 'Enter', code: 'Enter' });
        expect(mockOnContentClick).toHaveBeenCalledTimes(1);
      }
    });

    it('should handle category tab navigation', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

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
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab').length).toBeGreaterThan(0);
    });

    it('should have proper heading structure', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      expect(screen.getByRole('heading', { level: 2, name: 'Content Hub' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: 'Educational Resources' })).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      const firstTab = screen.getAllByRole('tab')[0];
      firstTab.focus();
      expect(document.activeElement).toBe(firstTab);
    });

    it('should have proper link attributes', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Content Organization', () => {
    it('should display content in proper categories', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      // Check if content is organized by categories
      expect(screen.getByText('Tutorials')).toBeInTheDocument();
      expect(screen.getByText('Best Practices')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
    });

    it('should show content metadata correctly', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      // Check for metadata elements
      expect(screen.getByText('15 min read')).toBeInTheDocument();
      expect(screen.getByText('Beginner')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid layout', () => {
      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

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

      render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      const container = screen.getByText('Content Hub').closest('section');
      expect(container).toHaveClass('container', 'mx-auto', 'px-4');
    });
  });

  describe('Performance', () => {
    it('should not cause unnecessary re-renders', () => {
      const { rerender } = render(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      // Re-render with same props should not cause issues
      rerender(React.createElement(ContentHub, { onContentClick: mockOnContentClick }));

      expect(screen.getByText('Content Hub')).toBeInTheDocument();
    });
  });
});
