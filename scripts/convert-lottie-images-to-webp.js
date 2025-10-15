#!/usr/bin/env node

/**
 * Convert Embedded PNG Images to WebP in Lottie Animations
 * 
 * This script finds all base64-encoded PNG images inside Lottie JSON files
 * and converts them to WebP format, significantly reducing file size.
 * 
 * Expected reduction: 60-80% for animations with embedded images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANIMATIONS_DIR = path.join(__dirname, '../assets/animations');
const WEBP_QUALITY = 85; // 85 = high quality, smaller file size

// Statistics
const stats = {
	filesProcessed: 0,
	imagesConverted: 0,
	originalSize: 0,
	optimizedSize: 0
};

/**
 * Convert base64 PNG to base64 WebP
 */
async function convertBase64PngToWebp(base64Data, originalWidth, originalHeight) {
	try {
		// Remove data URI prefix if present
		const base64Only = base64Data.includes(',') 
			? base64Data.split(',')[1] 
			: base64Data;
		
		// Decode base64 to buffer
		const pngBuffer = Buffer.from(base64Only, 'base64');
		const originalSize = pngBuffer.length;
		
		// Convert to WebP using sharp
		const webpBuffer = await sharp(pngBuffer)
			.webp({ quality: WEBP_QUALITY })
			.toBuffer();
		
		const optimizedSize = webpBuffer.length;
		
		// Convert back to base64
		const webpBase64 = webpBuffer.toString('base64');
		const webpDataUri = `data:image/webp;base64,${webpBase64}`;
		
		const savedPercent = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
		
		return {
			dataUri: webpDataUri,
			originalSize,
			optimizedSize,
			savedPercent
		};
	} catch (error) {
		console.error(`    ❌ Conversion failed: ${error.message}`);
		return null;
	}
}

/**
 * Process a single Lottie animation file
 */
async function processLottieFile(filePath) {
	const fileName = path.basename(filePath);
	console.log(`\n🎨 Processing: ${fileName}`);
	
	try {
		// Read and parse JSON
		const originalContent = fs.readFileSync(filePath, 'utf8');
		const originalFileSize = Buffer.byteLength(originalContent, 'utf8');
		const data = JSON.parse(originalContent);
		
		// Find all embedded images
		const assets = data.assets || [];
		const imageAssets = assets.filter(asset => 
			asset.p && typeof asset.p === 'string' && asset.p.startsWith('data:image/png')
		);
		
		if (imageAssets.length === 0) {
			console.log(`  ℹ️  No embedded PNG images found`);
			return false;
		}
		
		console.log(`  📸 Found ${imageAssets.length} embedded PNG images`);
		console.log(`  🔄 Converting to WebP...`);
		
		let convertedCount = 0;
		let totalOriginalSize = 0;
		let totalOptimizedSize = 0;
		
		// Convert each image
		for (let i = 0; i < imageAssets.length; i++) {
			const asset = imageAssets[i];
			
			// Show progress for large batches
			if (imageAssets.length > 20 && i % 20 === 0) {
				console.log(`    ... ${i}/${imageAssets.length} images converted`);
			}
			
			const result = await convertBase64PngToWebp(
				asset.p,
				asset.w,
				asset.h
			);
			
			if (result) {
				// Replace PNG with WebP
				asset.p = result.dataUri;
				
				totalOriginalSize += result.originalSize;
				totalOptimizedSize += result.optimizedSize;
				convertedCount++;
			}
		}
		
		if (convertedCount === 0) {
			console.log(`  ⚠️  No images were successfully converted`);
			return false;
		}
		
		console.log(`  ✅ Converted ${convertedCount}/${imageAssets.length} images`);
		
		// Save optimized file
		const optimizedContent = JSON.stringify(data);
		const optimizedFileSize = Buffer.byteLength(optimizedContent, 'utf8');
		
		// Create backup
		const backupPath = filePath.replace('.json', '.png-backup.json');
		fs.writeFileSync(backupPath, originalContent);
		
		// Write optimized file
		fs.writeFileSync(filePath, optimizedContent);
		
		// Update statistics
		stats.filesProcessed++;
		stats.imagesConverted += convertedCount;
		stats.originalSize += originalFileSize;
		stats.optimizedSize += optimizedFileSize;
		
		// Calculate savings
		const fileSavedBytes = originalFileSize - optimizedFileSize;
		const fileSavedPercent = ((fileSavedBytes / originalFileSize) * 100).toFixed(1);
		const imageSavedPercent = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
		
		console.log(`  💾 Backup created: ${path.basename(backupPath)}`);
		console.log(`  📊 File size: ${(originalFileSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedFileSize / 1024 / 1024).toFixed(2)}MB`);
		console.log(`  💰 Saved: ${(fileSavedBytes / 1024 / 1024).toFixed(2)}MB (${fileSavedPercent}%)`);
		console.log(`  🖼️  Images saved: ${imageSavedPercent}% on average`);
		
		return true;
		
	} catch (error) {
		console.error(`  ❌ Error processing file: ${error.message}`);
		return false;
	}
}

/**
 * Process multiple files
 */
async function processFiles(targetFiles = []) {
	console.log('🚀 Lottie PNG → WebP Converter\n');
	console.log(`📁 Directory: ${ANIMATIONS_DIR}`);
	console.log(`🎯 WebP Quality: ${WEBP_QUALITY}%\n`);
	
	// Find all JSON files
	let files = fs.readdirSync(ANIMATIONS_DIR)
		.filter(file => file.endsWith('.json') && !file.includes('.backup'));
	
	// Filter by target if specified
	if (targetFiles.length > 0) {
		console.log(`🎯 Targeting files matching: ${targetFiles.join(', ')}`);
		files = files.filter(file => 
			targetFiles.some(target => file.includes(target))
		);
	}
	
	if (files.length === 0) {
		console.log('⚠️  No matching files found!');
		return;
	}
	
	console.log(`📦 Found ${files.length} animation files to process\n`);
	
	// Process each file
	for (const file of files) {
		const filePath = path.join(ANIMATIONS_DIR, file);
		await processLottieFile(filePath);
	}
	
	// Print summary
	console.log('\n' + '='.repeat(70));
	console.log('📊 CONVERSION SUMMARY');
	console.log('='.repeat(70));
	console.log(`Files processed:     ${stats.filesProcessed}`);
	console.log(`Images converted:    ${stats.imagesConverted}`);
	console.log(`Original size:       ${(stats.originalSize / 1024 / 1024).toFixed(2)}MB`);
	console.log(`Optimized size:      ${(stats.optimizedSize / 1024 / 1024).toFixed(2)}MB`);
	console.log(`Total saved:         ${((stats.originalSize - stats.optimizedSize) / 1024 / 1024).toFixed(2)}MB`);
	console.log(`Reduction:           ${(((stats.originalSize - stats.optimizedSize) / stats.originalSize) * 100).toFixed(1)}%`);
	console.log('='.repeat(70));
	console.log('\n✨ Conversion complete!\n');
	console.log('💡 Test the animations in your browser to ensure quality is acceptable.');
	console.log('💡 Original files backed up with .png-backup.json extension');
	console.log('💡 If quality is too low, adjust WEBP_QUALITY in the script and re-run.\n');
}

// Parse command line arguments
const args = process.argv.slice(2);
const targetFiles = args.filter(arg => !arg.startsWith('-'));

// Run conversion
processFiles(targetFiles).catch(error => {
	console.error('Fatal error:', error);
	process.exit(1);
});

