// Инициализационный скрипт для корректной работы ассетов в Vite-билде
// Запускается ДО основного JS, заменяет пути к видео и готовит анимации

import { getVideoUrl, getAnimation, getI18n } from './assets.js'

// 1. Заменяем пути к видео на правильные из Vite
function initVideoSources() {
	const videos = document.querySelectorAll('video[src^="./video/"]')
	const isDev = import.meta.env.DEV
	
	videos.forEach(video => {
		const oldSrc = video.getAttribute('src')
		// Извлекаем имя файла (например, "A-Club PRO 02.mp4")
		const filename = oldSrc.replace('./video/', '')
		
		// Получаем новый URL из модуля assets
		const newSrc = getVideoUrl(filename)
		
		if (newSrc) {
			video.setAttribute('src', newSrc)
			video.setAttribute('data-original-src', oldSrc) // сохраняем для отладки
			if (isDev) console.log(`✓ Video updated: ${filename}`)
		} else {
			console.warn(`✗ Video not found: ${filename}`)
		}
	})
	
	if (isDev) console.log(`📹 Initialized ${videos.length} video elements`)
}

// 2. Создаем глобальный хелпер для загрузки анимаций
// Это позволит другим скриптам использовать нашу функцию вместо fetch
window.loadLottieAnimation = async function(animationName) {
	try {
		const data = await getAnimation(animationName)
		if (!data) {
			throw new Error(`Animation "${animationName}" not found`)
		}
		return data
	} catch (error) {
		console.error(`Failed to load animation "${animationName}":`, error)
		return null
	}
}

// 3. Создаем глобальный хелпер для загрузки локализации
window.loadI18n = async function(lang) {
	try {
		const data = await getI18n(lang)
		if (!data) {
			throw new Error(`I18n file "${lang}" not found`)
		}
		return data
	} catch (error) {
		console.error(`Failed to load i18n "${lang}":`, error)
		return null
	}
}

// 4. Перехватываем fetch для автоматической подмены путей к ассетам
const originalFetch = window.fetch
const isDev = import.meta.env.DEV

window.fetch = function(...args) {
	const url = args[0]
	
	// Если это запрос к анимации
	if (typeof url === 'string' && url.includes('/assets/animations/') && url.endsWith('.json')) {
		const filename = url.split('/').pop().replace('.json', '')
		if (isDev) console.log(`🎨 Intercepted animation fetch: ${filename}`)
		
		return getAnimation(filename).then(data => {
			if (!data) {
				throw new Error(`Animation not found: ${filename}`)
			}
			// Возвращаем фейковый Response объект с данными
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		})
	}
	
	// Если это запрос к локализации
	if (typeof url === 'string' && url.includes('/assets/i18n/') && url.endsWith('.json')) {
		const lang = url.split('/').pop().replace('.json', '')
		if (isDev) console.log(`🌐 Intercepted i18n fetch: ${lang}`)
		
		return getI18n(lang).then(data => {
			if (!data) {
				throw new Error(`I18n file not found: ${lang}`)
			}
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		})
	}
	
	// Для остальных запросов используем оригинальный fetch
	return originalFetch.apply(this, args)
}

// 5. Инициализация при загрузке DOM
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initVideoSources)
} else {
	// DOM уже загружен
	initVideoSources()
}

if (import.meta.env.DEV) {
	console.log('🚀 Assets init script loaded')
}

