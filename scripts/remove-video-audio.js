#!/usr/bin/env node

/**
 * Removes audio tracks from videos in one gallery folder.
 *
 * Usage:
 *   node scripts/remove-video-audio.js <folderName> [--dry-run]
 *   npm run remove-video-audio -- <folderName> [--dry-run]
 *
 * Originals are backed up to src/assets/images-backup/<folderName>/ before
 * their muted replacements are written.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const imagesDir = path.resolve(__dirname, '../src/assets/images')
const backupDir = path.resolve(__dirname, '../src/assets/images-backup')
const [folderName, ...flags] = process.argv.slice(2)
const dryRun = flags.includes('--dry-run')

const usage = () => {
  console.error('Usage: npm run remove-video-audio -- <folderName> [--dry-run]')
  process.exit(1)
}

if (!folderName || flags.some((flag) => flag !== '--dry-run')) usage()

// Only permit a direct child of the gallery root; this prevents path traversal
// or changes outside the requested album.
if (path.basename(folderName) !== folderName || folderName === '.' || folderName === '..') {
  console.error('Folder name must be a direct folder under src/assets/images.')
  process.exit(1)
}

const targetDir = path.resolve(imagesDir, folderName)
if (!targetDir.startsWith(`${imagesDir}${path.sep}`) || !fs.statSync(targetDir, { throwIfNoEntry: false })?.isDirectory()) {
  console.error(`Gallery folder not found: ${folderName}`)
  process.exit(1)
}

const ffmpegCheck = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' })
if (ffmpegCheck.status !== 0) {
  console.error('FFmpeg is required to remove video audio tracks.')
  process.exit(1)
}

const videoFiles = fs.readdirSync(targetDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(mp4|mov)$/i.test(entry.name))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b))

if (videoFiles.length === 0) {
  console.log(`No MP4 or MOV files found in ${folderName}.`)
  process.exit(0)
}

console.log(`${dryRun ? 'Would mute' : 'Muting'} ${videoFiles.length} video(s) in ${folderName}.`)

for (const filename of videoFiles) {
  const source = path.join(targetDir, filename)
  const backup = path.join(backupDir, folderName, filename)
  const extension = path.extname(filename)
  const temporary = path.join(targetDir, `.${path.basename(filename, extension)}.muted${extension}`)

  if (dryRun) {
    console.log(`• ${filename}`)
    continue
  }

  fs.mkdirSync(path.dirname(backup), { recursive: true })
  fs.copyFileSync(source, backup)

  const result = spawnSync(
    'ffmpeg',
    ['-v', 'error', '-i', source, '-map', '0:v?', '-map_metadata', '0', '-c:v', 'copy', '-an', '-movflags', '+faststart', '-y', temporary],
    { encoding: 'utf8' }
  )

  if (result.status !== 0 || !fs.existsSync(temporary)) {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary)
    console.error(`✗ ${filename}: ${result.stderr.trim() || 'FFmpeg did not create a muted video.'}`)
    continue
  }

  fs.renameSync(temporary, source)
  console.log(`✓ ${filename} (original backed up)`)
}

if (!dryRun) {
  console.log(`Originals saved to: ${path.relative(process.cwd(), backupDir)}/${folderName}`)
}
