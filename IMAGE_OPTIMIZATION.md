# Image & Video Optimization Guide

Your images and videos need optimization for web use. Here's how to optimize and rename them.

## Option 1: Optimize and Rename (Recommended - All-in-One)

This script optimizes images AND videos, and renames them based on folder structure.

### Setup:
```bash
npm install sharp --save-dev
```

### Run:
```bash
# All folders under src/assets/images
npm run optimize-and-rename

# Single folder only (e.g. Amsterdam)
npm run optimize-and-rename -- Amsterdam
# or
node scripts/optimize-and-rename.js Amsterdam
```

This will:
- **Optimize Images**: Compress JPEGs, convert PNG/HEIC to JPEG, resize if needed
- **Optimize Videos**: Compress MP4/MOV files using FFmpeg (if available)
- **Rename Files**: Based on folder name + sequential number
  - Example: `Amsterdam/IMG_1234.JPG` → `amsterdam_001.jpg`
  - Example: `Activities/video.MOV` → `activities_001.mp4`
- **Backup Originals**: All originals saved to `src/assets/images-backup/`

### File Naming:
Files are renamed as: `[folder_name]_[001].jpg` or `[folder_name]_[001].mp4`
- Folder name is sanitized (spaces → underscores, lowercase)
- Sequential numbering (001, 002, 003...)
- Images: Always `.jpg` (HEIC/PNG converted to JPEG)
- Videos: Always `.mp4` (MOV converted to MP4)

## Option 2: Using Sharp (Images Only)

For images only, without renaming:

### Run:
```bash
npm run optimize-images
```

This will:
- Backup all original images to `src/assets/images-backup/`
- Compress JPEGs to 85% quality
- Convert PNGs to JPEG if they don't have transparency (much smaller!)
- Convert HEIC to JPEG
- Resize images larger than 2000px
- Show you the size reduction for each image

## Option 2: Using FFmpeg (What You Have)

Since you have FFmpeg installed, you can use this script:

### Run:
```bash
npm run optimize-images:ffmpeg
```

Or directly:
```bash
bash scripts/optimize-images-ffmpeg.sh
```

**Note:** FFmpeg works but isn't ideal for image compression. The Sharp method (Option 1) will give better results.

## What Gets Optimized

- **JPEG files**: Compressed to 85% quality, resized if > 2000px
- **PNG files**: 
  - If no transparency → Converted to JPEG (much smaller!)
  - If has transparency → Compressed PNG
- **HEIC files**: Converted to JPEG (much smaller!)
- **Video files** (MP4/MOV): Compressed using FFmpeg (if available)
  - Quality: CRF 28 (good balance)
  - Format: Always MP4
- **All originals**: Backed up to `src/assets/images-backup/`

## Expected Results

- Large PNGs (9MB) → Should become ~200-500KB JPEGs
- Large JPEGs (1-2MB) → Should become ~200-400KB
- HEIC files → Converted to JPEG (~80-90% smaller)
- Videos → Compressed (size depends on original, typically 50-70% reduction)
- Total size reduction: 80-90% smaller for images!

## File Renaming Examples

After running `optimize-and-rename`:

**Before:**
```
Amsterdam/
  - IMG_1234.JPG
  - IMG_5678.HEIC
  - video.MOV

Activities/
  - photo1.png
  - photo2.jpg
```

**After:**
```
Amsterdam/
  - amsterdam_001.jpg
  - amsterdam_002.jpg
  - amsterdam_001.mp4

Activities/
  - activities_001.jpg
  - activities_002.jpg
```

## After Optimization

1. Check the optimized images look good
2. Test the website - images should load much faster
3. Once verified, you can delete the backup folder:
   ```bash
   rm -rf src/assets/images-backup
   ```

## Manual Alternative

If you prefer manual control, use online tools:
- **TinyPNG.com** - Free, drag & drop
- **Squoosh.app** - Google's tool, very good
- **ImageOptim** - Mac app

Drag your largest images first (the 9MB PNGs)!
