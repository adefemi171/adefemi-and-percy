#!/usr/bin/env node

/**
 * Image & Video Optimization and Renaming Script
 * - Optimizes images (JPEG, PNG, HEIC, DNG)
 * - Compresses videos (MP4, MOV)
 * - Renames files based on folder structure (Place/Activity/Event)
 * 
 * Usage:
 *   node scripts/optimize-and-rename.js              Process all folders under src/assets/images
 *   node scripts/optimize-and-rename.js <folderName>   Process only that folder (e.g. Amsterdam)
 *
 * Requirements: npm install sharp --save-dev
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

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
  maxWidth: 2000,
  maxHeight: 2000,
  video: {
    crf: 28, // Quality: lower = better quality but larger file (18-28 is good range)
    preset: 'medium' // Encoding speed
  }
}

// Create backup directory
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true })
  console.log('Created backup directory:', backupDir)
}

// Check if ffmpeg is available
function hasFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

const ffmpegAvailable = hasFFmpeg()

// Sanitize folder name for use in filename
function sanitizeName(name) {
  return name
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase()
}

// Get file extension (normalized to lowercase)
function getExtension(filename) {
  return path.extname(filename).toLowerCase()
}

// Convert HEIC to JPEG using sips
async function convertHeicToJpeg(filePath, outputPath, originalSize) {
  try {
    const dir = path.dirname(filePath)
    const tempConvertPath = path.join(dir, `.heic_convert_${Date.now()}.jpg`)
    
    // Use sips to convert HEIC to JPEG (macOS built-in)
    // Convert to temporary file first
    execSync(`sips -s format jpeg "${filePath}" --out "${tempConvertPath}"`, { stdio: 'pipe' })
    
    if (!fs.existsSync(tempConvertPath)) {
      throw new Error('sips conversion failed - file not created')
    }
    
    // Now optimize the converted JPEG with Sharp
    const convertedImage = sharp(tempConvertPath)
    const convMetadata = await convertedImage.metadata()
    
    let optImage = convertedImage
    if (convMetadata.width > config.maxWidth || convMetadata.height > config.maxHeight) {
      optImage = optImage.resize(config.maxWidth, config.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }
    
    const optTempPath = outputPath + '.tmp'
    await optImage.jpeg(config.jpeg).toFile(optTempPath)
    
    // Clean up temporary conversion file
    if (fs.existsSync(tempConvertPath)) fs.unlinkSync(tempConvertPath)
    
    // Replace original file if it's different from output
    if (filePath !== outputPath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    
    // Replace output if it exists (in case outputPath === filePath)
    if (fs.existsSync(outputPath) && outputPath !== optTempPath) {
      fs.unlinkSync(outputPath)
    }
    
    fs.renameSync(optTempPath, outputPath)
    
    const newStats = fs.statSync(outputPath)
    const newSize = newStats.size
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1)
    
    console.log(`✓ ${path.basename(filePath)} → ${path.basename(outputPath)} [converted & optimized]`)
    console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% reduction)`)
    
    return { optimized: true, converted: true, savings }
  } catch (error) {
    console.error(`✗ Error converting HEIC ${path.basename(filePath)}:`, error.message)
    return { optimized: false, error: 'HEIC conversion failed' }
  }
}

// Convert DNG to JPEG using sips
async function convertDngToJpeg(filePath, outputPath, originalSize) {
  try {
    const dir = path.dirname(filePath)
    const tempConvertPath = path.join(dir, `.dng_convert_${Date.now()}.jpg`)
    
    // Use sips to convert DNG to JPEG (macOS built-in)
    // Convert to temporary file first
    execSync(`sips -s format jpeg "${filePath}" --out "${tempConvertPath}"`, { stdio: 'pipe' })
    
    if (!fs.existsSync(tempConvertPath)) {
      throw new Error('sips conversion failed - file not created')
    }
    
    // Now optimize the converted JPEG with Sharp
    const convertedImage = sharp(tempConvertPath)
    const convMetadata = await convertedImage.metadata()
    
    let optImage = convertedImage
    if (convMetadata.width > config.maxWidth || convMetadata.height > config.maxHeight) {
      optImage = optImage.resize(config.maxWidth, config.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }
    
    const optTempPath = outputPath + '.tmp'
    await optImage.jpeg(config.jpeg).toFile(optTempPath)
    
    // Clean up temporary conversion file
    if (fs.existsSync(tempConvertPath)) fs.unlinkSync(tempConvertPath)
    
    // Replace original file if it's different from output
    if (filePath !== outputPath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    
    // Replace output if it exists (in case outputPath === filePath)
    if (fs.existsSync(outputPath) && outputPath !== optTempPath) {
      fs.unlinkSync(outputPath)
    }
    
    fs.renameSync(optTempPath, outputPath)
    
    const newStats = fs.statSync(outputPath)
    const newSize = newStats.size
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1)
    
    console.log(`✓ ${path.basename(filePath)} → ${path.basename(outputPath)} [converted & optimized]`)
    console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% reduction)`)
    
    return { optimized: true, converted: true, savings }
  } catch (error) {
    console.error(`✗ Error converting DNG ${path.basename(filePath)}:`, error.message)
    return { optimized: false, error: 'DNG conversion failed' }
  }
}

// Check if file is actually HEIC (even if extension is .jpg)
function isHeicFile(filePath) {
  try {
    const ext = getExtension(filePath)
    if (ext === '.heic' || ext === '.HEIC') {
      return true
    }
    // Check actual file type using file command
    const result = execSync(`file -b "${filePath}"`, { encoding: 'utf8', stdio: 'pipe' })
    return result.includes('HEIF') || result.includes('HEIC')
  } catch (error) {
    // If file command fails, try to detect by attempting to read with Sharp
    // If Sharp fails with HEIC error, it's likely HEIC
    return false
  }
}

// Check if file is DNG
function isDngFile(filePath) {
  try {
    const ext = getExtension(filePath)
    if (ext === '.dng' || ext === '.DNG') {
      return true
    }
    // Check actual file type using file command
    const result = execSync(`file -b "${filePath}"`, { encoding: 'utf8', stdio: 'pipe' })
    return result.includes('DNG') || result.includes('Digital Negative')
  } catch (error) {
    return false
  }
}

// Optimize image
async function optimizeImage(filePath, outputPath, placeName) {
  try {
    // Check if already optimized
    if (isAlreadyOptimized(filePath, null)) {
      console.log(`⊘ ${path.basename(filePath)} [already optimized, skipping]`)
      // Still rename if needed
      if (filePath !== outputPath && !fs.existsSync(outputPath)) {
        fs.renameSync(filePath, outputPath)
      }
      return { optimized: true, skipped: true }
    }
    
    // Check if output already exists and is optimized
    if (fs.existsSync(outputPath) && isAlreadyOptimized(outputPath, null)) {
      console.log(`⊘ ${path.basename(filePath)} → ${path.basename(outputPath)} [already optimized, skipping]`)
      if (filePath !== outputPath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      return { optimized: true, skipped: true }
    }
    
    const stats = fs.statSync(filePath)
    const originalSize = stats.size
    const ext = getExtension(filePath)
    const dir = path.dirname(filePath)
    
    // Check if file is DNG (needs conversion)
    if (isDngFile(filePath)) {
      console.log(`  ℹ️  Detected DNG file (${path.basename(filePath)}) - converting first...`)
      return await convertDngToJpeg(filePath, outputPath, originalSize)
    }
    
    // Check if file is actually HEIC (even if extension suggests otherwise)
    if (isHeicFile(filePath)) {
      console.log(`  ℹ️  Detected HEIC file (${path.basename(filePath)}) - converting first...`)
      return await convertHeicToJpeg(filePath, outputPath, originalSize)
    }
    
    // Create temporary file path
    const tempPath = path.join(dir, `.tmp_${path.basename(filePath)}`)
    
    let image
    try {
      image = sharp(filePath)
      await image.metadata() // Test if we can read it
    } catch (error) {
      // If Sharp fails, it might be a HEIC file with wrong extension
      if (error.message.includes('HEIF') || error.message.includes('heif') || error.message.includes('bad seek')) {
        console.log(`  ℹ️  File appears to be HEIC (${path.basename(filePath)}) - converting first...`)
        return await convertHeicToJpeg(filePath, outputPath, originalSize)
      }
      throw error
    }
    
    const metadata = await image.metadata()
    
    // Resize if too large
    if (metadata.width > config.maxWidth || metadata.height > config.maxHeight) {
      image = image.resize(config.maxWidth, config.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }
    
    let finalPath = outputPath
    let converted = false
    
    if (ext === '.jpg' || ext === '.jpeg') {
      await image.jpeg(config.jpeg).toFile(tempPath)
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
      fs.renameSync(tempPath, finalPath)
    } else if (ext === '.png') {
      if (!metadata.hasAlpha) {
        // Convert PNG to JPEG
        finalPath = outputPath.replace(/\.png$/i, '.jpg')
        await image.jpeg(config.jpeg).toFile(finalPath)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        converted = true
      } else {
        // Keep PNG with transparency
        await image.png(config.png).toFile(tempPath)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        fs.renameSync(tempPath, finalPath)
      }
    } else {
      return { optimized: false, error: 'Unsupported format' }
    }
    
    const newStats = fs.statSync(finalPath)
    const newSize = newStats.size
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1)
    
    const action = converted ? 'converted & optimized' : 'optimized'
    console.log(`✓ ${path.basename(filePath)} → ${path.basename(finalPath)} [${action}]`)
    console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% reduction)`)
    
    return { optimized: true, converted, savings, finalPath }
  } catch (error) {
    console.error(`✗ Error optimizing ${filePath}:`, error.message)
    return { optimized: false, error: error.message }
  }
}

// Check if file is already optimized (matches naming pattern and is reasonably small)
function isAlreadyOptimized(filePath, expectedPattern) {
  const filename = path.basename(filePath)
  const ext = getExtension(filePath)
  
  // Check if filename matches the expected pattern (e.g., place_name_001.jpg)
  const patternMatch = filename.match(/^[a-z0-9_]+_\d{3}\.(jpg|jpeg|mp4)$/i)
  if (!patternMatch) {
    return false
  }
  
  // Check file size - if it's already small, it's likely optimized
  try {
    const stats = fs.statSync(filePath)
    const sizeMB = stats.size / 1024 / 1024
    
    // Images: if < 1MB, likely optimized. Videos: if < 10MB, might be optimized
    if (ext === '.jpg' || ext === '.jpeg') {
      return sizeMB < 1.0
    } else if (ext === '.mp4') {
      return sizeMB < 10.0
    }
  } catch (error) {
    return false
  }
  
  return false
}

// Helper function to extract FFmpeg error message from execSync error
function extractFFmpegError(error) {
  // Try to get stderr/stdout from the error object
  const stderr = error.stderr || ''
  const stdout = error.stdout || ''
  const errorOutput = (stderr + stdout).trim()
  
  // If we have FFmpeg output, find the actual error line
  if (errorOutput) {
    const lines = errorOutput.split('\n')
    // Look for error lines (usually contain "Error", "error:", or are at the end)
    const errorLines = lines.filter(line => 
      line.toLowerCase().includes('error') || 
      line.includes(':') && line.length > 20
    )
    if (errorLines.length > 0) {
      // Return the last meaningful error line
      return errorLines[errorLines.length - 1].trim()
    }
    // If no specific error line found, return last few lines
    const lastLines = lines.slice(-3).join(' ').trim()
    if (lastLines) return lastLines
  }
  
  // Fallback to error message
  return error.message || 'Unknown error'
}

// Optimize video using ffmpeg
function optimizeVideo(filePath, outputPath) {
  try {
    if (!ffmpegAvailable) {
      console.warn(`⚠ FFmpeg not available. Skipping video: ${path.basename(filePath)}`)
      return { optimized: false, error: 'FFmpeg not available' }
    }
    
    // Check if already optimized
    if (isAlreadyOptimized(filePath, null)) {
      console.log(`⊘ ${path.basename(filePath)} [already optimized, skipping]`)
      // Still rename if needed
      if (filePath !== outputPath && !fs.existsSync(outputPath)) {
        fs.renameSync(filePath, outputPath)
      }
      return { optimized: true, skipped: true }
    }
    
    const stats = fs.statSync(filePath)
    const originalSize = stats.size
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // Use a simpler temp file path - just add .tmp extension
    // This avoids issues with long filenames or special characters
    const tempPath = outputPath + '.tmp'
    
    // Clean up any existing temp files from previous failed runs
    if (fs.existsSync(tempPath)) {
      try {
        fs.unlinkSync(tempPath)
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }
    
    // Check if output already exists and is optimized
    if (fs.existsSync(outputPath) && isAlreadyOptimized(outputPath, null)) {
      console.log(`⊘ ${path.basename(filePath)} → ${path.basename(outputPath)} [already optimized, skipping]`)
      if (filePath !== outputPath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      return { optimized: true, skipped: true }
    }
    
    // Compress video with better error handling
    const command = `ffmpeg -i "${filePath}" -f mp4 -c:v libx264 -crf ${config.video.crf} -preset ${config.video.preset} -c:a aac -b:a 128k -movflags +faststart -y "${tempPath}" 2>&1`
    
    try {
      const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' })
      // Check if temp file was created
      if (!fs.existsSync(tempPath)) {
        // Try to get more info from error
        throw new Error('FFmpeg did not create output file')
      }
    } catch (error) {
      // FFmpeg outputs to stderr even on success sometimes
      if (!fs.existsSync(tempPath)) {
        // Extract actual FFmpeg error
        const ffmpegError = extractFFmpegError(error)
        
        // Clean up temp file if it exists
        if (fs.existsSync(tempPath)) {
          try {
            fs.unlinkSync(tempPath)
          } catch (cleanupError) {
            // Ignore cleanup errors
          }
        }
        
        // Check if video might already be in a compatible format
        const fileInfo = execSync(`file -b "${filePath}"`, { encoding: 'utf8', stdio: 'pipe' })
        if (fileInfo.includes('MP4') || fileInfo.includes('QuickTime')) {
          // Video might already be optimized or in a format that's hard to re-encode
          console.warn(`⚠ Skipping video ${path.basename(filePath)}: ${ffmpegError}`)
          // Just rename if needed
          if (filePath !== outputPath && !fs.existsSync(outputPath)) {
            fs.renameSync(filePath, outputPath)
          }
          return { optimized: false, error: 'Video encoding failed, renamed only' }
        }
        throw error
      }
    }
    
    if (fs.existsSync(tempPath)) {
      // Replace original
      if (fs.existsSync(filePath) && filePath !== outputPath) fs.unlinkSync(filePath)
      if (fs.existsSync(outputPath) && outputPath !== tempPath) fs.unlinkSync(outputPath)
      fs.renameSync(tempPath, outputPath)
      
      const newStats = fs.statSync(outputPath)
      const newSize = newStats.size
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1)
      
      console.log(`✓ ${path.basename(filePath)} → ${path.basename(outputPath)} [optimized]`)
      console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% reduction)`)
      
      return { optimized: true, savings }
    }
    
    return { optimized: false, error: 'FFmpeg failed' }
  } catch (error) {
    // Extract and display actual FFmpeg error
    const ffmpegError = extractFFmpegError(error)
    console.warn(`⚠ Video optimization failed for ${path.basename(filePath)}:`)
    console.warn(`   ${ffmpegError}`)
    
    // Clean up temp file if it exists
    try {
      const outputDir = path.dirname(outputPath)
      const tempFiles = fs.readdirSync(outputDir).filter(f => f.startsWith('.tmp_') && f.includes(path.basename(outputPath)))
      tempFiles.forEach(tempFile => {
        try {
          fs.unlinkSync(path.join(outputDir, tempFile))
        } catch (cleanupError) {
          // Ignore cleanup errors
        }
      })
    } catch (cleanupError) {
      // Ignore cleanup errors
    }
    
    if (filePath !== outputPath && !fs.existsSync(outputPath)) {
      fs.renameSync(filePath, outputPath)
      return { optimized: false, error: 'Renamed only (optimization failed)' }
    }
    return { optimized: false, error: ffmpegError }
  }
}

// Process directory and rename files
async function processDirectory(dir, relativePath = '', placeName = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  // Determine place/activity/event name from folder
  // For Activities folder, use nested folder names instead of "Activities"
  const currentFolderName = path.basename(dir)
  let sanitizedPlaceName
  
  // If placeName is provided (from parent), use it (for nested folders in Activities)
  // Otherwise, use current folder name
  if (placeName) {
    sanitizedPlaceName = placeName
  } else if (currentFolderName === 'Activities') {
    // If we're in Activities root, we'll use nested folder names when processing subdirectories
    sanitizedPlaceName = sanitizeName(currentFolderName)
  } else {
    sanitizedPlaceName = sanitizeName(currentFolderName)
  }
  
  // Count files by type for numbering
  const imageFiles = []
  const videoFiles = []
  
  // First pass: collect files
  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = getExtension(entry.name)
      if (['.jpg', '.jpeg', '.png', '.heic', '.dng', '.JPG', '.JPEG', '.PNG', '.HEIC', '.DNG'].includes(ext)) {
        imageFiles.push(entry.name)
      } else if (['.mp4', '.mov', '.MP4', '.MOV'].includes(ext)) {
        videoFiles.push(entry.name)
      }
    }
  }
  
  // Sort files for consistent numbering
  imageFiles.sort()
  videoFiles.sort()
  
  let imageCounter = 1
  let videoCounter = 1
  
  // Second pass: process files
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relPath = path.join(relativePath, entry.name)
    
    if (entry.isDirectory()) {
      const backupSubDir = path.join(backupDir, relPath)
      if (!fs.existsSync(backupSubDir)) {
        fs.mkdirSync(backupSubDir, { recursive: true })
      }
      // For nested directories in Activities, use the nested folder name
      const nestedPlaceName = sanitizeName(entry.name)
      await processDirectory(fullPath, relPath, nestedPlaceName)
    } else if (entry.isFile()) {
      const ext = getExtension(entry.name)
      
      // Determine new filename first
      let newFilename
      if (['.jpg', '.jpeg', '.png', '.heic', '.dng', '.JPG', '.JPEG', '.PNG', '.HEIC', '.DNG'].includes(ext)) {
        // Images: place_name_001.jpg
        const paddedNum = String(imageCounter).padStart(3, '0')
        // DNG and HEIC will be converted to JPEG, PNG without alpha will be converted to JPEG
        const finalExt = (ext === '.heic' || ext === '.HEIC' || ext === '.dng' || ext === '.DNG' || ext === '.png' || ext === '.PNG') ? '.jpg' : '.jpg'
        newFilename = `${sanitizedPlaceName}_${paddedNum}${finalExt}`
        imageCounter++
      } else if (['.mp4', '.mov', '.MP4', '.MOV'].includes(ext)) {
        // Videos: place_name_001.mp4
        const paddedNum = String(videoCounter).padStart(3, '0')
        newFilename = `${sanitizedPlaceName}_${paddedNum}.mp4`
        videoCounter++
      } else {
        // Skip unsupported files
        continue
      }
      
      const newPath = path.join(dir, newFilename)
      
      // Skip if already has correct name and is optimized
      if (entry.name === newFilename && isAlreadyOptimized(fullPath, null)) {
        console.log(`⊘ ${entry.name} [already optimized, skipping]`)
        continue
      }
      
      // Backup original (only backup if file will be modified)
      const backupPath = path.join(backupDir, relPath)
      const backupDirPath = path.dirname(backupPath)
      if (!fs.existsSync(backupDirPath)) {
        fs.mkdirSync(backupDirPath, { recursive: true })
      }
      // Only backup if file doesn't exist in backup or is different
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(fullPath, backupPath)
      }
      
      // Skip if already renamed and optimized
      if (entry.name === newFilename) {
        // File already has correct name, check if it needs optimization
        if (['.jpg', '.jpeg', '.png', '.heic', '.dng', '.JPG', '.JPEG', '.PNG', '.HEIC', '.DNG'].includes(ext)) {
          const result = await optimizeImage(fullPath, newPath, sanitizedPlaceName)
          if (result.skipped) {
            continue // Already optimized, skip
          }
        } else if (['.mp4', '.mov', '.MP4', '.MOV'].includes(ext)) {
          // Videos: Try to optimize, fallback to rename if optimization fails
          const result = optimizeVideo(fullPath, newPath)
          if (result.skipped) {
            continue // Already optimized, skip
          }
        }
        continue
      }
      
      // Optimize and rename
      if (['.jpg', '.jpeg', '.png', '.heic', '.dng', '.JPG', '.JPEG', '.PNG', '.HEIC', '.DNG'].includes(ext)) {
        const result = await optimizeImage(fullPath, newPath, sanitizedPlaceName)
        if (!result.optimized && fs.existsSync(fullPath)) {
          // If optimization failed, just rename
          fs.renameSync(fullPath, newPath)
        }
      } else if (['.mp4', '.mov', '.MP4', '.MOV'].includes(ext)) {
        // Videos: Try to optimize, fallback to rename if optimization fails
        const result = optimizeVideo(fullPath, newPath)
        if (!result.optimized && fs.existsSync(fullPath)) {
          // If optimization failed, just rename
          if (entry.name !== newFilename && !fs.existsSync(newPath)) {
            fs.renameSync(fullPath, newPath)
          }
        }
      }
    }
  }
}

async function main() {
  const folderArg = process.argv[2]
  const targetDir = folderArg ? path.join(imagesDir, folderArg) : imagesDir

  if (folderArg) {
    if (!fs.existsSync(targetDir)) {
      console.error(`❌ Folder not found: ${targetDir}`)
      console.error(`   Expected a folder inside: ${imagesDir}`)
      process.exit(1)
    }
    if (!fs.statSync(targetDir).isDirectory()) {
      console.error(`❌ Not a directory: ${targetDir}`)
      process.exit(1)
    }
  }

  console.log('🖼️  Starting image & video optimization and renaming...\n')
  if (folderArg) {
    console.log('📁 Targeting single folder:', folderArg)
  }
  console.log('Backing up originals to:', backupDir)
  if (!ffmpegAvailable) {
    console.log('⚠️  FFmpeg not found. Videos will be renamed but not optimized.')
    console.log('   Install FFmpeg to enable video compression.\n')
  } else {
    console.log('✅ FFmpeg found. Videos will be optimized.\n')
  }
  console.log('')

  const relativePath = folderArg || ''
  await processDirectory(targetDir, relativePath, '')

  console.log('\n✅ Optimization and renaming complete!')
  console.log(`📦 Original files backed up to: ${backupDir}`)
  console.log('💡 Files renamed as: [place_name]_[001].jpg/mp4')
  console.log('💡 You can delete the backup folder after verifying everything looks good.')
}

main().catch(console.error)
