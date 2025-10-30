import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Increase chunk size warning limit to 1MB (from default 500KB)
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Manual chunk configuration for better code splitting
        manualChunks: {
          // Core React libraries - loaded once and cached
          'react-vendor': ['react', 'react-dom'],
          
          // Router - separate chunk since it's used throughout
          'router': ['react-router-dom'],
          
          // UI libraries - separate chunk for reusability
          'ui-vendor': ['lucide-react'],
          
          // Swiper - only loaded when needed
          'swiper': ['swiper'],
          
          // Main pages - group frequently accessed pages
          'main-pages': [
            './src/pages/Services',
            './src/pages/About',
            './src/pages/Contact'
          ],
          
          // Industry pages - group together as they're similar
          'industry-pages': [
            './src/industry/tech',
            './src/industry/man',
            './src/industry/Retail',
            './src/industry/professional',
            './src/industry/healthcare',
            './src/industry/construction',
            './src/industry/npo'
          ],
          
          // Tools and calculators - separate as they might be heavy
          'tools': [
            './src/pages/TaxCalculator',
            './src/pages/tools',
            './src/pages/checkout',
            './src/pages/tax-consultation'
          ],
          
          // Article detail component - separate from individual articles
          'article-detail': [
            './src/articles/ArticleDetail'
          ],
          
          // Articles page - separate from detail
          'articles-page': [
            './src/pages/Articles'
          ],
          
          // Individual article components - each gets its own chunk for optimal loading
          'article-1': ['./src/articles/1'],
          'article-2': ['./src/articles/2'],
          'article-3': ['./src/articles/3'],
          'article-4': ['./src/articles/4'],
          'article-5': ['./src/articles/5'],
          'article-6': ['./src/articles/6'],
          'article-7': ['./src/articles/7'],
          
          // Legal/utility pages - group together
          'utility-pages': [
            './src/pages/terms',
            './src/pages/privacy',
            './src/pages/sitemap',
            './src/pages/Careers'
          ]
        },
        
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            const moduleName = facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            
            // Special naming for article chunks
            if (facadeModuleId.includes('/articles/') && /^\d+$/.test(moduleName || '')) {
              return `chunks/article-${moduleName}-[hash].js`
            }
            
            return `chunks/${moduleName}-[hash].js`
          }
          return 'chunks/[name]-[hash].js'
        },
        
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash][extname]'
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          
          if (ext === 'css') {
            return 'assets/styles/[name]-[hash][extname]'
          }
          
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    
    // Optimize build performance
    target: 'esnext',
    minify: 'esbuild',
    
    // Optimize CSS
    cssMinify: true,
    
    // Source maps for production debugging (optional)
    sourcemap: false, // Set to true if you need source maps in production
    
    // Optimize for modern browsers
    modulePreload: {
      polyfill: false // Disable if you're targeting modern browsers only
    }
  },
  
  // Development server optimization
  server: {
    // Enable HMR for better dev experience
    hmr: true,
    
    // Optimize file watching
    watch: {
      // Ignore node_modules for better performance
      ignored: ['**/node_modules/**', '**/dist/**']
    }
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@industry': resolve(__dirname, 'src/industry'),
      '@articles': resolve(__dirname, 'src/articles'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },
  
  // Optimization for dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react'
    ],
    
    // Exclude heavy dependencies that should be lazy-loaded
    exclude: [
      'swiper'
    ]
  },
  
  // Preview configuration (for production builds)
  preview: {
    port: 3000,
    open: true
  }
})