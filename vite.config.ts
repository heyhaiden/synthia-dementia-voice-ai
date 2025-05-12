import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add TypeScript configuration to work around tsconfig reference issue
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      // Override problematic TS settings with a properly stringified configuration
      tsconfigRaw: JSON.stringify({
        compilerOptions: {
          composite: false,
          incremental: false,
          noEmit: false
        }
      })
    }
  },
  // Add this to bypass TypeScript errors during build
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  // Add support for raw imports of markdown files
  assetsInclude: ['**/*.md']
}));
