
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
  // Add TypeScript configuration to help work around tsconfig reference issue
  optimizeDeps: {
    esbuildOptions: {
      // Set target to a value that's compatible with your Node.js version
      target: 'es2020',
      // Ignore TypeScript configuration errors
      tsconfigRaw: {
        compilerOptions: {
          // Override problematic settings
          composite: false,
          incremental: false,
          // Make sure noEmit is false
          noEmit: false
        }
      }
    }
  }
}));
