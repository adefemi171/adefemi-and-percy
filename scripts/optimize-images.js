#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses images in src/assets/images while preserving originals
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Requirements: npm install sharp --save-dev
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imagesDir = path.join(__dirname, '../src/assets/images')
const backupDir = path.join(__dirname, '../src/assets/images-backup')

// Configuration
const config = {
  jpeg: {
    quality: 85,
    mozjpeg: true
  },
  png: {
    quality: 85,
    compressionLevel: 9
  },
  maxWidth: 2000, // Max width in pixels
  maxHeight: 2000 // Max height in pixels
}

// Create backup directory
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true })
  console.log('Created backup directory:', backupDir)
}

async function optimizeImage(filePath) {
  try {
    const stats = fs.statSync(filePath)
    const originalSize = stats.size
    const ext = path.extname(filePath).toLowerCase()
    const dir = path.dirname(filePath)
    const basename = path.basename(filePath, ext)
    
    // Create temporary file path
    const tempPath = path.join(dir, `${basename}.tmp${ext}`)
    
    let image = sharp(filePath)
    const metadata = await image.metadata()
    
    // Resize if too large
    if (metadata.width > config.maxWidth || metadata.height > config.maxHeight) {
      image = image.resize(config.maxWidth, config.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }
    
    let finalPath = filePath
    let converted = false
    
    // Optimize based on format
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.JPG' || ext === '.JPEG') {
      // Write to temp file first
      await image
        .jpeg(config.jpeg)
        .toFile(tempPath)
      
      // Replace original with optimized version
      fs.unlinkSync(filePath)
      fs.renameSync(tempPath, filePath)
      finalPath = filePath
      
    } else if (ext === '.png' || ext === '.PNG') {
      // Try converting PNG to JPEG if it's a photo (not transparent)
      if (!metadata.hasAlpha) {
        // Convert to JPEG for better compression
        const jpegPath = path.join(dir, `${basename}.jpg`)
        await image
          .jpeg(config.jpeg)
          .toFile(jpegPath)
        
        // Delete original PNG
        fs.unlinkSync(filePath)
        
        const newStats = fs.statSync(jpegPath)
        const newSize = newStats.size
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1)
        
        console.log(`✓ ${path.basename(filePath)} → ${path.basename(jpegPath)}`)
        console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% reduction)`)
        return { optimized: true, converted: true, savings, newPath: jpegPath }
      } else {
        // Keep PNG if it has transparency - write to temp first
        await image
          .png(config.png)
          .toFile(tempPath)
        
        // Replace original with optimized version
        fs.unlinkSync(filePath)
        fs.renameSync(tempPath, filePath)
        finalPath = filePath
      }
    } else {
      // Copy other formats as-is (no optimization)
      return { optimized: false }
    }
    
    const newStats = fs.statSync(finalPath)
    const newSize = newStats.size
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1)
    
    console.log(`✓ ${path.basename(filePath)}`)
    console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% reduction)`)
    
    return { optimized: true, savings }
  } catch (error) {
    console.error(`✗ Error optimizing ${filePath}:`, error.message)
    return { optimized: false, error: error.message }
  }
}

async function processDirectory(dir, relativePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relPath = path.join(relativePath, entry.name)
    
    if (entry.isDirectory()) {
      // Create corresponding backup directory
      const backupSubDir = path.join(backupDir, relPath)
      if (!fs.existsSync(backupSubDir)) {
        fs.mkdirSync(backupSubDir, { recursive: true })
      }
      
      await processDirectory(fullPath, relPath)
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'].includes(ext)) {
        // Backup original
        const backupPath = path.join(backupDir, relPath)
        const backupDirPath = path.dirname(backupPath)
        if (!fs.existsSync(backupDirPath)) {
          fs.mkdirSync(backupDirPath, { recursive: true })
        }
        fs.copyFileSync(fullPath, backupPath)
        
        // Optimize (writes to temp file then replaces original)
        await optimizeImage(fullPath)
      }
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n')
  console.log('Backing up originals to:', backupDir)
  console.log('')
  
  await processDirectory(imagesDir)
  
  console.log('\n✅ Image optimization complete!')
  console.log(`📦 Original images backed up to: ${backupDir}`)
  console.log('💡 You can delete the backup folder after verifying the optimized images look good.')
}

main().catch(console.error)
