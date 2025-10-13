// Модуль для корректной работы с ассетами в Vite
// Vite обрабатывает import.meta.glob и правильно прописывает пути в билде

// Импортируем все JSON анимации
const animations = import.meta.glob('/assets/animations/*.json', { eager: true })

// Импортируем все видео файлы (query: '?url' - новый синтаксис Vite)
const videos = import.meta.glob('/video/*.mp4', { 
	eager: true, 
	query: '?url', 
	import: 'default' 
})

// Импортируем файл локализации
const i18n = import.meta.glob('/assets/i18n/*.json', { eager: true })

/**
 * Получить URL анимации по имени файла
 * @param {string} name - имя файла без расширения (например, 'letter-a')
 * @returns {Promise<Object>} - JSON данные анимации
 */
export async function getAnimation(name) {
	const path = `/assets/animations/${name}.json`
	const module = animations[path]
	
	if (!module) {
		console.warn(`Animation not found: ${name}`)
		return null
	}
	
	// Если это eager импорт, данные уже загружены
	return module.default || module
}

/**
 * Получить URL видео по имени файла
 * @param {string} filename - полное имя файла с расширением
 * @returns {string|null} - URL видео файла
 */
export function getVideoUrl(filename) {
	const path = `/video/${filename}`
	const url = videos[path]
	
	if (!url) {
		console.warn(`Video not found: ${filename}`)
		return null
	}
	
	return url
}

/**
 * Получить данные локализации
 * @param {string} lang - код языка (например, 'en')
 * @returns {Promise<Object>} - данные локализации
 */
export async function getI18n(lang) {
	const path = `/assets/i18n/${lang}.json`
	const module = i18n[path]
	
	if (!module) {
		console.warn(`I18n file not found: ${lang}`)
		return null
	}
	
	return module.default || module
}

// Экспортируем список всех доступных анимаций и видео для отладки
export const availableAnimations = Object.keys(animations).map(path => 
	path.replace('/assets/animations/', '').replace('.json', '')
)

export const availableVideos = Object.keys(videos).map(path => 
	path.replace('/video/', '')
)

// В режиме разработки выводим список доступных ассетов
if (import.meta.env.DEV) {
	console.log('📦 Available animations:', availableAnimations)
	console.log('🎬 Available videos:', availableVideos)
}

