#!/usr/bin/env node

/**
 * Скрипт для оптимизации Lottie анимаций
 * - Удаляет лишние пробелы и форматирование
 * - Округляет координаты до 2 знаков после запятой
 * - Сжимает JSON
 */

const fs = require('fs');
const path = require('path');

const ANIMATIONS_DIR = path.join(__dirname, '../public/assets/animations');

// Округление чисел до N знаков после запятой
function roundNumber(num, decimals = 2) {
	return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Рекурсивная оптимизация объекта
function optimizeObject(obj) {
	if (Array.isArray(obj)) {
		return obj.map(optimizeObject);
	}
	
	if (obj !== null && typeof obj === 'object') {
		const result = {};
		for (const key in obj) {
			result[key] = optimizeObject(obj[key]);
		}
		return result;
	}
	
	// Округляем числа с плавающей точкой
	if (typeof obj === 'number' && !Number.isInteger(obj)) {
		return roundNumber(obj, 2);
	}
	
	return obj;
}

// Оптимизация одного файла
function optimizeFile(filePath) {
	console.log(`Оптимизирую: ${path.basename(filePath)}`);
	
	const originalSize = fs.statSync(filePath).size;
	const content = fs.readFileSync(filePath, 'utf8');
	
	let data;
	try {
		data = JSON.parse(content);
	} catch (e) {
		console.error(`  ❌ Ошибка парсинга: ${e.message}`);
		return;
	}
	
	// Оптимизируем
	const optimized = optimizeObject(data);
	
	// Сохраняем без лишних пробелов
	const optimizedContent = JSON.stringify(optimized);
	fs.writeFileSync(filePath, optimizedContent);
	
	const newSize = fs.statSync(filePath).size;
	const saved = ((1 - newSize / originalSize) * 100).toFixed(1);
	
	console.log(`  ✓ ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (сэкономлено ${saved}%)`);
}

// Обработка всех файлов
function optimizeAll() {
	const files = fs.readdirSync(ANIMATIONS_DIR)
		.filter(file => file.endsWith('.json'));
	
	console.log(`Найдено ${files.length} файлов для оптимизации\n`);
	
	files.forEach(file => {
		const filePath = path.join(ANIMATIONS_DIR, file);
		optimizeFile(filePath);
	});
	
	console.log('\n✓ Оптимизация завершена!');
}

optimizeAll();

