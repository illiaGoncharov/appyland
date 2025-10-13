import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	// Базовый путь:
	// - По умолчанию: / (корень)
	// - Для GitHub Pages используй: npm run build:gh
	// - Для обычного хостинга: npm run build:hosting
	base: '/',
	
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
					// Видео файлы
					if (/\.(mp4|webm|ogg|mov)$/.test(assetInfo.name)) {
						return 'assets/[name]-[hash][extname]'
					}
					// JSON файлы (анимации)
					if (assetInfo.name.endsWith('.json')) {
						return 'assets/[name]-[hash][extname]'
					}
					// Остальное
					return 'assets/[name]-[hash][extname]'
				}
			}
		},
		
		// Размер чанков (увеличен для больших видео)
		chunkSizeWarningLimit: 5000,
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

