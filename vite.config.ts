import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries - loaded immediately for fastest initial render
          "react-core": ["react", "react-dom"],
          // React Router - loaded on demand for routing
          "react-router": ["react-router-dom"],
          // Framer Motion - loaded separately for animations (can be lazy loaded)
          "framer-motion": ["framer-motion"],
          // Lucide icons - loaded separately as they're large and not immediately needed
          "lucide-icons": ["lucide-react"],
          // UI libraries - loaded separately to reduce main bundle size
          "ui-libs": [],
        },
        // Optimize chunk file names for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
      // External dependencies optimization
      external: [],
    },
    // Performance optimizations
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk size warnings - increased for better splitting
    chunkSizeWarningLimit: 1000,
  },
  // Development optimizations
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
