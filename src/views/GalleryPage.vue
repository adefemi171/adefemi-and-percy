<template>
  <div class="gallery-page">
    <section class="section gallery-hero">
      <div class="container">
        <h1 class="page-title">Gallery</h1>
        <p class="page-subtitle">Our precious moments together</p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <GalleryFilter 
          :filters="filterOptions"
          @filter-change="handleFilterChange"
        />
      </div>
    </section>

    <!-- Gallery by Place -->
    <section class="section gallery-section">
      <div class="container">
        <div class="places-grid">
          <div 
            v-for="(placeGroup, placeName) in groupedImages" 
            :key="placeName"
            class="place-card"
            @click="openLightbox(placeName, 0)"
          >
            <div class="place-image-wrapper">
              <!-- Show first image if available, otherwise first video -->
              <img 
                v-if="getFirstImage(placeGroup.images)"
                :src="getFirstImage(placeGroup.images).src" 
                :alt="placeName"
                class="place-image"
                loading="lazy"
              />
              <video
                v-else-if="getFirstVideo(placeGroup.images)"
                :src="getFirstVideo(placeGroup.images).src"
                class="place-image"
                muted
                preload="metadata"
              />
              <div class="place-overlay">
                <h2 class="place-name">{{ placeName }}</h2>
                <p class="place-count">{{ getMediaCount(placeGroup.images) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="Object.keys(groupedImages).length === 0" class="no-results">
          <p>No media found matching your filters.</p>
        </div>
      </div>
    </section>

    <!-- Lightbox Slider -->
    <div 
      v-if="lightboxOpen" 
      class="lightbox" 
      @click="closeLightbox"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <button class="lightbox-close" @click.stop="closeLightbox">×</button>
      <button 
        class="lightbox-prev" 
        @click.stop="prevImage"
        :disabled="currentPlaceImages.length <= 1"
      >
        ‹
      </button>
      <button 
        class="lightbox-next" 
        @click.stop="nextImage"
        :disabled="currentPlaceImages.length <= 1"
      >
        ›
      </button>
      <div class="lightbox-content" @click.stop>
        <img 
          v-if="currentImage.type === 'image'"
          :src="currentImage.src" 
          :alt="currentImage.alt" 
          class="lightbox-media"
        />
        <video
          v-else-if="currentImage.type === 'video'"
          :src="currentImage.src"
          class="lightbox-media"
          controls
          autoplay
          @click.stop
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import GalleryFilter from '../components/GalleryFilter.vue'
import { getAllGalleryImages, getFilterOptions } from '../utils/imageLoader.js'

const activeFilters = ref({
  place: 'all'
})

// Load actual images from assets folder
const images = ref([])
const filterOptions = ref(getFilterOptions())

onMounted(() => {
  images.value = getAllGalleryImages()
  
  // Add keyboard navigation
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const filteredImages = computed(() => {
  return images.value.filter(image => {
    const placeMatch = activeFilters.value.place === 'all' || image.place === activeFilters.value.place
    return placeMatch
  })
})

// Group images by place
const groupedImages = computed(() => {
  const groups = {}
  
  filteredImages.value.forEach(image => {
    const place = image.place
    if (!groups[place]) {
      groups[place] = {
        name: place,
        images: []
      }
    }
    groups[place].images.push(image)
  })
  
  // Sort places alphabetically
  const sortedGroups = {}
  Object.keys(groups).sort().forEach(key => {
    sortedGroups[key] = groups[key]
  })
  
  return sortedGroups
})

const handleFilterChange = (filters) => {
  activeFilters.value = filters
}

// Lightbox functionality - grouped by place
const lightboxOpen = ref(false)
const currentPlace = ref('')
const currentImageIndex = ref(0)

const currentPlaceImages = computed(() => {
  if (!currentPlace.value || !groupedImages.value[currentPlace.value]) {
    return []
  }
  return groupedImages.value[currentPlace.value].images
})

const currentImage = computed(() => {
  return currentPlaceImages.value[currentImageIndex.value] || {}
})

const openLightbox = (placeName, index) => {
  currentPlace.value = placeName
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
  currentPlace.value = ''
  currentImageIndex.value = 0
}

const nextImage = () => {
  if (currentImageIndex.value < currentPlaceImages.value.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0 // Loop back to first
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = currentPlaceImages.value.length - 1 // Loop to last
  }
}

// Keyboard navigation
const handleKeyDown = (e) => {
  if (!lightboxOpen.value) return
  
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault()
    nextImage()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    prevImage()
  } else if (e.key === 'Escape') {
    e.preventDefault()
    closeLightbox()
  }
}

// Touch/swipe functionality
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!touchStartX.value || !touchEndX.value) return
  
  const swipeDistance = touchStartX.value - touchEndX.value
  const minSwipeDistance = 50 // Minimum distance for a swipe
  
  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Swipe left - next image
      nextImage()
    } else {
      // Swipe right - previous image
      prevImage()
    }
  }
  
  // Reset
  touchStartX.value = 0
  touchEndX.value = 0
}

// Helper functions for media display
const getFirstImage = (mediaArray) => {
  return mediaArray.find(item => item.type === 'image')
}

const getFirstVideo = (mediaArray) => {
  return mediaArray.find(item => item.type === 'video')
}

const getMediaCount = (mediaArray) => {
  const imageCount = mediaArray.filter(item => item.type === 'image').length
  const videoCount = mediaArray.filter(item => item.type === 'video').length
  
  if (imageCount > 0 && videoCount > 0) {
    return `${imageCount + videoCount} ${imageCount + videoCount === 1 ? 'item' : 'items'} (${imageCount} ${imageCount === 1 ? 'photo' : 'photos'}, ${videoCount} ${videoCount === 1 ? 'video' : 'videos'})`
  } else if (imageCount > 0) {
    return `${imageCount} ${imageCount === 1 ? 'photo' : 'photos'}`
  } else if (videoCount > 0) {
    return `${videoCount} ${videoCount === 1 ? 'video' : 'videos'}`
  }
  return '0 items'
}
</script>

<style scoped>
.gallery-page {
  padding-top: 100px;
  min-height: 100vh;
}

.gallery-hero {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  text-align: center;
}

.page-title {
  font-size: var(--font-size-5xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
}

.page-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
}

.filter-section {
  background: var(--bg-primary);
  padding: var(--spacing-xl) 0;
  border-bottom: 1px solid var(--neutral-light-gray);
}

.gallery-section {
  background: var(--bg-secondary);
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.place-card {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.place-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.place-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.place-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.place-image video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.place-card:hover .place-image {
  transform: scale(1.1);
}

.place-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  text-align: center;
  padding: var(--spacing-xl);
}

.place-name {
  font-size: var(--font-size-3xl);
  font-family: var(--font-heading);
  color: var(--text-light);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-bold);
}

.place-count {
  font-size: var(--font-size-lg);
  color: var(--text-light);
  opacity: 0.9;
  margin: 0;
}


.no-results {
  text-align: center;
  padding: var(--spacing-4xl);
  color: var(--text-secondary);
}

/* Lightbox Slider */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  touch-action: pan-y;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.lightbox-media {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-lg);
  user-select: none;
  -webkit-user-drag: none;
}

.lightbox-media video {
  width: 100%;
  height: auto;
  max-height: 90vh;
}

.lightbox-close {
  position: absolute;
  top: var(--spacing-xl);
  right: var(--spacing-xl);
  background: none;
  border: none;
  color: var(--text-light);
  font-size: var(--font-size-5xl);
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color var(--transition-base);
  z-index: 2001;
}

.lightbox-close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: var(--text-light);
  font-size: var(--font-size-5xl);
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color var(--transition-base);
  z-index: 2001;
}

.lightbox-prev:hover:not(:disabled),
.lightbox-next:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.3);
}

.lightbox-prev:disabled,
.lightbox-next:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.lightbox-prev {
  left: var(--spacing-xl);
}

.lightbox-next {
  right: var(--spacing-xl);
}


@media (max-width: 768px) {
  .places-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }
  
  .place-name {
    font-size: var(--font-size-2xl);
  }
  
  .place-count {
    font-size: var(--font-size-base);
  }
  
  .lightbox-prev,
  .lightbox-next {
    width: 40px;
    height: 40px;
    font-size: var(--font-size-3xl);
  }
  
  .lightbox-prev {
    left: var(--spacing-md);
  }
  
  .lightbox-next {
    right: var(--spacing-md);
  }
  
  .lightbox-close {
    top: var(--spacing-md);
    right: var(--spacing-md);
    width: 40px;
    height: 40px;
    font-size: var(--font-size-4xl);
  }
  
  .lightbox-media {
    max-height: 85vh;
  }
}
</style>
