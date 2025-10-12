import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	// Базовый путь для продакшна (GitHub Pages)
	base: process.env.NODE_ENV === 'production' ? '/appyland/' : '/',
	
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		
		// Минификация
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true, // убираем console.log в продакшне
			}
		},
		
		// Оптимизация
		rollupOptions: {
			output: {
				// Названия для выходных файлов
				entryFileNames: 'js/[name]-[hash].js',
				chunkFileNames: 'js/[name]-[hash].js',
				assetFileNames: (assetInfo) => {
					// CSS в отдельную папку
					if (assetInfo.name.endsWith('.css')) {
						return 'css/[name]-[hash][extname]'
					}
					// Шрифты
					if (/\.(woff2?|ttf|otf|eot)$/.test(assetInfo.name)) {
						return 'assets/fonts/[name]-[hash][extname]'
					}
					// Картинки
					if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.name)) {
						return 'assets/img/[name]-[hash][extname]'
					}
					// Остальное
					return 'assets/[name]-[hash][extname]'
				}
			}
		},
		
		// Размер чанков
		chunkSizeWarningLimit: 1000,
	},
	
	// Dev server
	server: {
		port: 3000,
		open: true,
		host: true
	},
	
	// Оптимизация изображений и CSS
	css: {
		devSourcemap: true
	}
})

