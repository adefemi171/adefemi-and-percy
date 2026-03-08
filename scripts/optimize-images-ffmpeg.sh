#!/bin/bash

# Image Optimization Script using FFmpeg
# Compresses images in src/assets/images while preserving originals
# 
# Usage: bash scripts/optimize-images-ffmpeg.sh

IMAGES_DIR="src/assets/images"
BACKUP_DIR="src/assets/images-backup"

# Create backup directory
mkdir -p "$BACKUP_DIR"
echo "Created backup directory: $BACKUP_DIR"
echo ""

# Function to optimize an image
optimize_image() {
    local file="$1"
    local rel_path="${file#$IMAGES_DIR/}"
    local backup_file="$BACKUP_DIR/$rel_path"
    local backup_dir=$(dirname "$backup_file")
    
    # Create backup directory structure
    mkdir -p "$backup_dir"
    
    # Backup original
    cp "$file" "$backup_file"
    
    # Get file extension
    ext="${file##*.}"
    ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    # Get original size
    original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    original_size_mb=$(echo "scale=2; $original_size / 1024 / 1024" | bc)
    
    if [ "$ext_lower" = "png" ]; then
        # For PNG: convert to JPEG if no transparency, otherwise compress PNG
        # Check if PNG has alpha channel (transparency)
        has_alpha=$(ffprobe -v error -select_streams v:0 -show_entries stream=has_alpha -of default=noprint_wrappers=1:nokey=1 "$file" 2>/dev/null || echo "0")
        
        if [ "$has_alpha" = "0" ] || [ -z "$has_alpha" ]; then
            # No transparency - convert to JPEG
            jpeg_file="${file%.*}.jpg"
            ffmpeg -i "$file" -q:v 3 -y "$jpeg_file" 2>/dev/null
            
            if [ -f "$jpeg_file" ]; then
                new_size=$(stat -f%z "$jpeg_file" 2>/dev/null || stat -c%s "$jpeg_file" 2>/dev/null)
                new_size_mb=$(echo "scale=2; $new_size / 1024 / 1024" | bc)
                savings=$(echo "scale=1; ($original_size - $new_size) / $original_size * 100" | bc)
                
                echo "✓ $(basename "$file") → $(basename "$jpeg_file")"
                echo "  ${original_size_mb}MB → ${new_size_mb}MB (${savings}% reduction)"
                
                # Remove original PNG
                rm "$file"
            fi
        else
            # Has transparency - compress PNG
            temp_file="${file}.tmp"
            ffmpeg -i "$file" -vf "scale='min(2000,iw)':'min(2000,ih)':force_original_aspect_ratio=decrease" -compression_level 9 -y "$temp_file" 2>/dev/null
            
            if [ -f "$temp_file" ]; then
                mv "$temp_file" "$file"
                new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
                new_size_mb=$(echo "scale=2; $new_size / 1024 / 1024" | bc)
                savings=$(echo "scale=1; ($original_size - $new_size) / $original_size * 100" | bc)
                
                echo "✓ $(basename "$file")"
                echo "  ${original_size_mb}MB → ${new_size_mb}MB (${savings}% reduction)"
            fi
        fi
    elif [ "$ext_lower" = "jpg" ] || [ "$ext_lower" = "jpeg" ]; then
        # For JPEG: compress and resize if needed
        temp_file="${file}.tmp"
        ffmpeg -i "$file" -vf "scale='min(2000,iw)':'min(2000,ih)':force_original_aspect_ratio=decrease" -q:v 3 -y "$temp_file" 2>/dev/null
        
        if [ -f "$temp_file" ]; then
            mv "$temp_file" "$file"
            new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            new_size_mb=$(echo "scale=2; $new_size / 1024 / 1024" | bc)
            savings=$(echo "scale=1; ($original_size - $new_size) / $original_size * 100" | bc)
            
            echo "✓ $(basename "$file")"
            echo "  ${original_size_mb}MB → ${new_size_mb}MB (${savings}% reduction)"
        fi
    fi
}

# Find and process all images
echo "🖼️  Starting image optimization with FFmpeg..."
echo ""

find "$IMAGES_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    optimize_image "$file"
done

echo ""
echo "✅ Image optimization complete!"
echo "📦 Original images backed up to: $BACKUP_DIR"
echo "💡 You can delete the backup folder after verifying the optimized images look good."
