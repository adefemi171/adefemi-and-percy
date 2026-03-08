// Utility to dynamically load images and videos from assets folder
// Automatically discovers images and videos based on folder structure

// Use Vite's import.meta.glob to dynamically import all images
const imageModules = import.meta.glob('../assets/images/**/*.{jpg,jpeg,JPG,JPEG,png,PNG}', { eager: true })

// Use Vite's import.meta.glob to dynamically import all videos
const videoModules = import.meta.glob('../assets/images/**/*.{mp4,MP4,mov,MOV}', { eager: true })

// Helper to extract place name from file path
function getPlaceFromPath(filePath) {
  // For Activities, extract nested folder name (e.g., Activities/Bomb_Cocktails -> Bomb_Cocktails)
  // For other folders, extract the folder name directly
  if (filePath.includes('/Activities/')) {
    // Match: images/Activities/[nested_folder]/filename
    const match = filePath.match(/images\/Activities\/([^/]+)\//)
    return match ? match[1] : 'Activities'
  } else {
    // Extract folder name from path like: ../assets/images/Amsterdam/amsterdam_001.jpg
    const match = filePath.match(/images\/([^/]+)\//)
    return match ? match[1] : 'unknown'
  }
}

// Helper to get display name for place (aligned with current assets/images folders)
function getPlaceDisplayName(folderName) {
  const nameMap = {
    'Amsterdam': 'Amsterdam',
    'Bern': 'Bern',
    'Birthdays': 'Birthdays',
    'Gran_Canary': 'Gran Canary',
    'Gran Canary': 'Gran Canary',
    'Home': 'Home',
    'Innsbruck': 'Innsbruck',
    'Luxemborg': 'Luxemborg',
    'Munich': 'Munich',
    'Rome': 'Rome',
    'Rotterdam': 'Rotterdam',
    'The_Hague': 'The Hague',
    'The Hague': 'The Hague',
    'Vaduz': 'Vaduz'
  }

  if (!nameMap[folderName]) {
    return folderName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  return nameMap[folderName]
}

// Helper to determine if a file is a video
function isVideoFile(filePath) {
  const ext = filePath.toLowerCase()
  return ext.endsWith('.mp4') || ext.endsWith('.mov')
}

// Function to get all images and videos for gallery
export function getAllGalleryImages() {
  const media = []
  const placeGroups = {}
  
  // Group images by place
  Object.keys(imageModules).forEach(filePath => {
    const module = imageModules[filePath]
    const src = module.default || module
    const placeFolder = getPlaceFromPath(filePath)
    const placeName = getPlaceDisplayName(placeFolder)
    
    if (!placeGroups[placeName]) {
      placeGroups[placeName] = []
    }
    
    placeGroups[placeName].push({
      src,
      path: filePath,
      type: 'image'
    })
  })
  
  // Group videos by place
  Object.keys(videoModules).forEach(filePath => {
    const module = videoModules[filePath]
    const src = module.default || module
    const placeFolder = getPlaceFromPath(filePath)
    const placeName = getPlaceDisplayName(placeFolder)
    
    if (!placeGroups[placeName]) {
      placeGroups[placeName] = []
    }
    
    placeGroups[placeName].push({
      src,
      path: filePath,
      type: 'video'
    })
  })
  
  // Sort media within each place and create media objects
  Object.keys(placeGroups).sort().forEach(placeName => {
    const placeMedia = placeGroups[placeName]
      .sort((a, b) => a.path.localeCompare(b.path))
      .map((item, index) => ({
        src: item.src,
        type: item.type,
        alt: `${placeName} ${index + 1}`,
        title: `${placeName} ${index + 1}`,
        location: placeName,
        event: determineEventType(placeName),
        place: placeName
      }))
    
    media.push(...placeMedia)
  })
  
  return media
}

// Determine event type based on place name (aligned with current folders)
function determineEventType(placeName) {
  const homePlaces = ['Home', 'Rotterdam', 'The Hague', 'Amsterdam']
  if (homePlaces.includes(placeName)) {
    return 'Home'
  }
  return 'Trip'
}

// Function to get filter options based on available images
export function getFilterOptions() {
  const places = new Set()
  const events = new Set(['Trip', 'Home'])
  
  Object.keys(imageModules).forEach(filePath => {
    const placeFolder = getPlaceFromPath(filePath)
    const placeName = getPlaceDisplayName(placeFolder)
    places.add(placeName)
  })
  
  return {
    events: ['all', ...Array.from(events).sort()],
    places: ['all', ...Array.from(places).sort()]
  }
}

// Function to get first image from a location (aligned with current assets/images folders)
export function getFirstImageByLocation(location) {
  const locationMap = {
    'Amsterdam': 'Amsterdam',
    'Bern': 'Bern',
    'Birthdays': 'Birthdays',
    'Gran Canary, Spain': 'Gran Canary',
    'Gran Canary': 'Gran Canary',
    'Home': 'Home',
    'Innsbruck': 'Innsbruck',
    'Luxemborg': 'Luxemborg',
    'Munich, Germany': 'Munich',
    'Munich': 'Munich',
    'Rome, Italy': 'Rome',
    'Rome': 'Rome',
    'Rotterdam': 'Rotterdam',
    'The Hague': 'The Hague',
    'Vaduz': 'Vaduz'
  }

  const folderName = locationMap[location] || location

  for (const filePath in imageModules) {
    const placeFolder = getPlaceFromPath(filePath)
    const placeName = getPlaceDisplayName(placeFolder)

    if (placeName === folderName || placeFolder === folderName) {
      const module = imageModules[filePath]
      return module.default || module
    }
  }

  return null
}

export default { getAllGalleryImages, getFilterOptions, getFirstImageByLocation }
