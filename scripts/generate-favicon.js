#!/usr/bin/env node

/**
 * Generate a small favicon from public/logo.png using macOS sips.
 * Favicons work best at 32×32. Browsers often fail to show very large images.
 *
 * Usage: node scripts/generate-favicon.js
 * On macOS: uses sips (built-in). On other systems: ensure public/logo.png
 * is replaced with a 32×32 version named public/favicon.png.
 */

import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '../public')
const logoPath = path.join(publicDir, 'logo.png')
const faviconPath = path.join(publicDir, 'favicon.png')

try {
  if (!fs.existsSync(logoPath)) {
    console.error('public/logo.png not found.')
    process.exit(1)
  }
  execSync(`sips -z 32 32 "${logoPath}" --out "${faviconPath}"`, { stdio: 'inherit' })
  console.log('✓ Generated 32×32 favicon: public/favicon.png')
} catch (err) {
  console.error('Error generating favicon:', err.message)
  console.error('On non-macOS: resize public/logo.png to 32×32 and save as public/favicon.png')
  process.exit(1)
}
