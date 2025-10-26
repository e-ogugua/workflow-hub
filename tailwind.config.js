/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // Enhanced breakpoints for better responsive design
        'xs': '320px',    // Low-end mobile devices
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',  // Enhanced xl for >1440px content
        '3xl': '1600px',  // Ultra-wide displays
        '4xl': '1920px',  // Very large displays
      },
      colors: {
        // Enhanced AI Workflow Hub Brand Colors
        "ai-primary": "#6366F1", // Indigo - Main brand color
        "ai-secondary": "#8B5CF6", // Purple - Secondary brand color
        "ai-accent": "#06B6D4", // Cyan - Accent color for highlights
        "ai-success": "#10B981", // Emerald - Success states
        "ai-warning": "#F59E0B", // Amber - Warning states
        "ai-error": "#EF4444", // Red - Error states

        // Enhanced neutral colors for better contrast and accessibility
        "ai-neutral": {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A",
        },

        // Enhanced glass morphism with better contrast
        'glass': {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',      // Increased opacity for better contrast
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.10)',
          strong: 'rgba(255, 255, 255, 0.15)',
        },
        'glass-border': {
          DEFAULT: 'rgba(255, 255, 255, 0.15)',      // Enhanced border contrast
          light: 'rgba(255, 255, 255, 0.10)',
          medium: 'rgba(255, 255, 255, 0.20)',
          strong: 'rgba(255, 255, 255, 0.30)',
        },
        'glass-bg': {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          light: 'rgba(255, 255, 255, 0.03)',
          medium: 'rgba(255, 255, 255, 0.08)',
        },

        // Enhanced gradient colors for better visual hierarchy
        "gradient-start": "#6366F1",
        "gradient-end": "#8B5CF6",
        "gradient-accent": "#06B6D4",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Enhanced typography scale for better legibility
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
        "gradient": "gradient 3s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #6366F1" },
          "100%": { boxShadow: "0 0 20px #6366F1, 0 0 30px #6366F1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "ai-gradient": "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      },
      // Enhanced spacing for better responsive design
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
