<template>
  <div class="story-page">
    <section class="section story-hero">
      <div class="container">
        <h1 class="page-title">Our Story</h1>
        <p class="page-subtitle">The journey of Adefemi & Percyline</p>
      </div>
    </section>

    <section class="section story-content">
      <div class="container">
        <!-- Timeline Filter -->
        <div class="timeline-filter">
          <button 
            v-for="type in eventTypes" 
            :key="type.value"
            @click="activeFilter = type.value"
            class="filter-btn"
            :class="{ 'active': activeFilter === type.value }"
          >
            {{ type.label }}
          </button>
        </div>

        <!-- Timeline: rope with knots -->
        <div class="story-timeline">
          <div class="timeline-rope" aria-hidden="true"></div>
          <div 
            v-for="(milestone, index) in filteredMilestones" 
            :key="milestone.id || index"
            class="milestone"
            :class="{ 'milestone-right': index % 2 === 1 }"
          >
            <div class="milestone-knot" aria-hidden="true"></div>
            <div class="milestone-image">
              <img :src="milestone.image" :alt="milestone.title" />
              <div class="milestone-type-badge" :class="`type-${milestone.type}`">
                {{ getTypeLabel(milestone.type) }}
              </div>
            </div>
            <div class="milestone-content">
              <div class="milestone-date">{{ formatDate(milestone.date) }}</div>
              <h3 class="milestone-title">{{ milestone.title }}</h3>
              <p class="milestone-description">{{ milestone.description }}</p>
              <div v-if="milestone.location" class="milestone-location">
                <span class="location-icon">📍</span>
                {{ milestone.location }}
              </div>
              <div v-if="milestone.tags && milestone.tags.length > 0" class="milestone-tags">
                <span 
                  v-for="tag in milestone.tags" 
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredMilestones.length === 0" class="no-results">
          <p>No events found for this filter.</p>
        </div>

        <!-- Narrative Sections -->
        <div class="story-narrative">
          <div class="narrative-section">
            <h2>How We Met</h2>
            <p>
              Our story began when Adefemi and Percyline first crossed paths at Ayla, our first meeting was also our first date. With some heavy downpour of rainfall and wind (it’s the Netherlands), she even lost her umbrella along the way, but she made it. I was there sitting and wondering why she was not travelling with an umbrella. It was a moment that would change both of our lives forever.
            </p>
          </div>

          <div class="narrative-section">
            <h2>Our Journey Together</h2>
            <p>
              Since that first meeting, we've shared countless beautiful moments, 
              overcome challenges together, and grown stronger as a couple. 
              Every day has been a new chapter in our love story.
              <!-- Add your actual story here -->
            </p>
          </div>

          <div class="narrative-section">
            <h2>Looking Forward</h2>
            <p>
              As we prepare for our Roora and Wedding celebrations, we're excited 
              to share this journey with our family and friends. We can't wait to 
              create many more beautiful memories together.
              <!-- Add your actual story here -->
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getFirstImageByLocation } from '../utils/imageLoader.js'

const activeFilter = ref('all')

const eventTypes = [
  { value: 'all', label: 'All' },
  { value: 'date', label: 'Dates' },
  { value: 'event', label: 'Events' },
  { value: 'trip', label: 'Trips' },
  { value: 'milestone', label: 'Milestones' }
]

// Enhanced milestones data - in chronological order (month & year)
const milestones = ref([
  {
    id: '7',
    date: '2026-09-01',
    type: 'milestone',
    title: 'Engagement',
    description: 'The moment we decided to spend forever together. Surrounded by love and joy.',
    location: 'Special Location',
    image: 'https://via.placeholder.com/400x300?text=Engagement',
    tags: ['engagement', 'milestone', 'love']
  },
  {
    id: '2',
    date: '2024-04-15',
    type: 'date',
    title: 'First Date',
    description: "Our first meeting was also our first date at Ayla. There was heavy rain and wind, she even lost her umbrella on the way, but she made it, and I was there wondering why she wasn't travelling with one. We talked for hours and I knew this was something special.",
    location: 'Ayla Restaurant, Rotterdam',
    image: getFirstImageByLocation('Rotterdam') || 'https://via.placeholder.com/400x300?text=First+Date',
    tags: ['romantic', 'first']
  },
  {
    id: '3',
    date: '2024-06-15',
    type: 'trip',
    title: 'First Trip Together',
    description: 'Our first vacation together. We explored Munich and created beautiful memories.',
    location: 'Munich, Germany',
    image: getFirstImageByLocation('Munich') || 'https://via.placeholder.com/400x300?text=Munich',
    tags: ['travel', 'adventure']
  },
  {
    id: '6',
    date: '2024-09-14',
    type: 'trip',
    title: 'Rome Adventure',
    description: 'A trip to Rome for Percy\'s 24th birthday. Exploring the beautiful city together, every moment was magical.',
    location: 'Rome, Italy',
    image: getFirstImageByLocation('Rome, Italy') || 'https://via.placeholder.com/400x300?text=Rome',
    tags: ['birthday', 'travel', 'celebration']
  },
  {
    id: '9',
    date: '2025-09-01',
    type: 'trip',
    title: 'Gran Canary Escape',
    description: "A trip to Gran Canary for Percy's 25th birthday. Relaxing in the sun and enjoying each other's company.",
    location: 'Gran Canary, Spain',
    image: getFirstImageByLocation('Gran Canary') || 'https://via.placeholder.com/400x300?text=Gran+Canary',
    tags: ['birthday', 'travel', 'spain', 'relaxation']
  },
  {
    id: '4',
    date: '2025-12-25',
    type: 'event',
    title: 'First Christmas Together',
    description: 'Celebrating our first holiday season together in Innsbruck.',
    location: 'Innsbruck',
    image: getFirstImageByLocation('Innsbruck') || 'https://via.placeholder.com/400x300?text=Christmas',
    tags: ['holiday', 'family']
  }
])

const filteredMilestones = computed(() => {
  let list = activeFilter.value === 'all'
    ? milestones.value
    : milestones.value.filter(m => m.type === activeFilter.value)
  return [...list].sort((a, b) => new Date(a.date) - new Date(b.date))
})

const getTypeLabel = (type) => {
  const typeObj = eventTypes.find(t => t.value === type)
  return typeObj ? typeObj.label : type
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  })
}
</script>

<style scoped>
.story-page {
  padding-top: 100px;
  min-height: 100vh;
}

.story-hero {
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

.story-content {
  background-color: var(--bg-primary);
}

.timeline-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-4xl);
  padding: var(--spacing-xl) 0;
}

.filter-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 2px solid var(--neutral-light-gray);
  background: var(--bg-primary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.filter-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--text-light);
}

.story-timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto var(--spacing-4xl);
  padding: 0 var(--spacing-2xl);
}

/* Rope: twisted cord in warm terracotta/rose to match page */
.timeline-rope {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 14px;
  transform: translateX(-50%);
  border-radius: 7px;
  background:
    repeating-linear-gradient(
      -55deg,
      var(--primary-dark) 0,
      var(--primary-dark) 2px,
      var(--primary-light) 2px,
      var(--primary-light) 4px
    ),
    repeating-linear-gradient(
      55deg,
      transparent 0,
      transparent 2px,
      rgba(255,255,255,0.1) 2px,
      rgba(255,255,255,0.1) 4px
    ),
    linear-gradient(
      90deg,
      var(--primary-dark) 0%,
      var(--primary-color) 25%,
      var(--primary-light) 50%,
      var(--primary-color) 75%,
      var(--primary-dark) 100%
    );
  box-shadow:
    inset 2px 0 3px rgba(255,255,255,0.25),
    inset -2px 0 3px rgba(0,0,0,0.12),
    0 0 0 1px rgba(168, 93, 58, 0.25);
  z-index: 0;
}

.milestone {
  position: relative;
  display: flex;
  gap: var(--spacing-3xl);
  margin-bottom: var(--spacing-4xl);
  align-items: flex-start;
  width: 100%;
  z-index: 1;
}

/* Knot on the rope: wrapped, bulbous knot (warm tones) */
.milestone-knot {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background:
    repeating-linear-gradient(
      -40deg,
      var(--primary-dark) 0,
      var(--primary-dark) 1px,
      var(--primary-color) 1px,
      var(--primary-color) 3px
    ),
    radial-gradient(
      circle at 30% 30%,
      var(--primary-light),
      var(--primary-color) 45%,
      var(--primary-dark) 70%,
      var(--text-primary) 100%
    );
  box-shadow:
    inset -3px -3px 6px rgba(0,0,0,0.35),
    inset 2px 2px 5px rgba(255,255,255,0.25),
    0 2px 10px rgba(43, 17, 5, 0.2);
  border: 2px solid var(--primary-dark);
  flex-shrink: 0;
  z-index: 2;
}

.milestone-right {
  flex-direction: row-reverse;
}

.milestone-image {
  flex: 1;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  position: relative;
  min-width: 0;
  max-width: 100%;
}

.milestone-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  aspect-ratio: 4/3;
  background-color: var(--neutral-light-gray);
}

.milestone-type-badge {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--bg-primary);
  color: var(--primary-color);
  box-shadow: var(--shadow-md);
}

.milestone-content {
  flex: 1;
  min-width: 0;
}

.milestone-right .milestone-content {
  text-align: right;
}

.milestone-date {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.milestone-title {
  font-size: var(--font-size-2xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.milestone-description {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
}

.milestone-location {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
}

.milestone-right .milestone-location {
  justify-content: flex-end;
}

.location-icon {
  font-size: var(--font-size-base);
}

.milestone-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-md);
}

.milestone-right .milestone-tags {
  justify-content: flex-end;
}

.tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--primary-light);
  color: var(--primary-color);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.no-results {
  text-align: center;
  padding: var(--spacing-4xl);
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
}

.story-narrative {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-4xl) 0;
}

.narrative-section {
  margin-bottom: var(--spacing-4xl);
  text-align: center;
}

.narrative-section h2 {
  font-size: var(--font-size-3xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
}

.narrative-section p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}

@media (max-width: 768px) {
  .story-timeline {
    padding: 0 var(--spacing-md);
  }

  .timeline-rope {
    left: 26px;
    transform: none;
    width: 12px;
    border-radius: 6px;
  }

  .milestone {
    flex-direction: column !important;
    padding-left: 52px;
  }

  .milestone-knot {
    left: 26px;
    top: 2rem;
    transform: translate(-50%, 0);
    width: 30px;
    height: 30px;
  }
  
  .milestone-content {
    text-align: left !important;
  }
  
  .milestone-image {
    width: 100%;
  }
  
  .milestone-right .milestone-location,
  .milestone-right .milestone-tags {
    justify-content: flex-start;
  }
  
  .timeline-filter {
    gap: var(--spacing-sm);
  }
  
  .filter-btn {
    font-size: var(--font-size-sm);
    padding: var(--spacing-xs) var(--spacing-md);
  }
}
</style>
