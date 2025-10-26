import { useEffect, useState } from 'react';

// Custom hook for respecting user's motion preferences
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

// Utility function for conditional animations
export const getAnimationProps = <T>(
  prefersReducedMotion: boolean,
  animatedProps: T,
  staticProps: Partial<T> = {}
): T => {
  return prefersReducedMotion ? (staticProps as T) : animatedProps;
};

// Performance-optimized animation variants with reduced motion support
export const createResponsiveVariants = (prefersReducedMotion: boolean) => ({
  hidden: prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 20 },
  visible: prefersReducedMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
});

// Container variants with reduced motion support
export const createContainerVariants = (prefersReducedMotion: boolean) => ({
  hidden: { opacity: prefersReducedMotion ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: prefersReducedMotion ? {} : {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
});
