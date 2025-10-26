import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import ToolComparison from '../../src/components/ToolComparison.js';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => React.createElement('div', props, children),
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: ({ className }) => React.createElement('div', { className }, '✕'),
  Star: ({ className }) => React.createElement('div', { className }, '⭐'),
  Users: ({ className }) => React.createElement('div', { className }, '👥'),
  DollarSign: ({ className }) => React.createElement('div', { className }, '💰'),
}));

describe('ToolComparison Component', () => {
  const mockTools = [
    {
      id: 1,
      name: 'Tool One',
      description: 'First AI tool for testing',
      category: 'Text & Writing',
      icon: 'Bot',
      color: 'from-blue-500 to-purple-500',
      rating: 4.5,
      users: '10K+',
      pricing: 'Free',
      difficulty: 'Beginner',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      useCases: ['Use case 1', 'Use case 2'],
      alternatives: ['Alt 1', 'Alt 2'],
      demoUrl: 'https://tool1.com',
    },
    {
      id: 2,
      name: 'Tool Two',
      description: 'Second AI tool for testing',
      category: 'Image Generation',
      icon: 'Image',
      color: 'from-green-500 to-teal-500',
      rating: 4.2,
      users: '5K+',
      pricing: 'Freemium',
      difficulty: 'Intermediate',
      features: ['Feature A', 'Feature B'],
      useCases: ['Use case A', 'Use case B', 'Use case C'],
      alternatives: ['Alt A', 'Alt B'],
      demoUrl: 'https://tool2.com',
    },
  ];

  const mockOnRemoveTool = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render comparison table when tools are provided', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.getByText('Tool Comparison')).toBeInTheDocument();
      expect(screen.getByText('Tool One')).toBeInTheDocument();
      expect(screen.getByText('Tool Two')).toBeInTheDocument();
    });

    it('should render empty state when no tools are provided', () => {
      render(React.createElement(ToolComparison, {
        tools: [],
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.queryByText('Tool Comparison')).not.toBeInTheDocument();
    });

    it('should display tool ratings correctly', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('4.2')).toBeInTheDocument();
    });

    it('should display pricing information correctly', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.getByText('Free')).toBeInTheDocument();
      expect(screen.getByText('Freemium')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onClose when close button is clicked', async () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    it('should call onRemoveTool when remove button is clicked', async () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      const removeButtons = screen.getAllByRole('button', { name: /remove/i });
      if (removeButtons.length > 0) {
        fireEvent.click(removeButtons[0]);

        await waitFor(() => {
          expect(mockOnRemoveTool).toHaveBeenCalledTimes(1);
          expect(mockOnRemoveTool).toHaveBeenCalledWith(1);
        });
      }
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.getByRole('heading', { level: 2, name: 'Tool Comparison' })).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      const closeButton = screen.getByRole('button');
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });
  });

  describe('Edge Cases', () => {
    it('should handle single tool comparison', () => {
      const singleTool = [mockTools[0]];

      render(React.createElement(ToolComparison, {
        tools: singleTool,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.getByText('Tool One')).toBeInTheDocument();
      expect(screen.queryByText('Tool Two')).not.toBeInTheDocument();
    });

    it('should handle tools with missing optional fields', () => {
      const incompleteTool = {
        id: 3,
        name: 'Incomplete Tool',
        description: 'Tool without optional fields',
        category: 'Productivity',
        icon: 'Zap',
        color: 'from-red-500 to-pink-500',
        rating: 4.0,
        users: '1K+',
        pricing: 'Paid',
        difficulty: 'Advanced',
        features: [],
        useCases: [],
        alternatives: [],
        demoUrl: 'https://incomplete.com',
      };

      render(React.createElement(ToolComparison, {
        tools: [incompleteTool],
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.getByText('Incomplete Tool')).toBeInTheDocument();
    });
  });

  describe('Feature Comparison', () => {
    it('should display all features from all tools', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Feature 3')).toBeInTheDocument();
      expect(screen.getByText('Feature A')).toBeInTheDocument();
      expect(screen.getByText('Feature B')).toBeInTheDocument();
    });

    it('should display all use cases from all tools', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      expect(screen.getByText('Use case 1')).toBeInTheDocument();
      expect(screen.getByText('Use case 2')).toBeInTheDocument();
      expect(screen.getByText('Use case A')).toBeInTheDocument();
      expect(screen.getByText('Use case B')).toBeInTheDocument();
      expect(screen.getByText('Use case C')).toBeInTheDocument();
    });

    it('should show checkmarks for features that tools have', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      const toolOneColumn = screen.getAllByText('Tool One').find(el =>
        el.closest && el.closest('th')
      )?.closest('th')?.nextElementSibling;

      expect(toolOneColumn).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should be responsive on different screen sizes', () => {
      render(React.createElement(ToolComparison, {
        tools: mockTools,
        onRemoveTool: mockOnRemoveTool,
        onClose: mockOnClose
      }));

      const container = screen.getByRole('dialog');
      expect(container).toHaveClass('max-w-6xl', 'w-full', 'max-h-[90vh]', 'overflow-y-auto');
    });
  });
});
