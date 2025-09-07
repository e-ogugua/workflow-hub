/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ai-primary': '#6366F1',
        'ai-secondary': '#8B5CF6',
        'ai-accent': '#06B6D4',
        'ai-success': '#10B981',
        'ai-warning': '#F59E0B',
        'ai-error': '#EF4444',
        'gold': {
          300: '#FCD34D',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #6366F1' },
          '100%': { boxShadow: '0 0 20px #6366F1, 0 0 30px #6366F1' }
        }
      }
    },
  },
  plugins: [],
}
