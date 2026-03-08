<template>
  <div class="roora-page">
    <section class="section roora-hero">
      <div class="container">
        <h1 class="page-title">Roora Celebration</h1>
        <p class="page-subtitle">Join Adefemi & Percyline for our engagement celebration</p>
        
        <!-- Countdown Timer -->
        <CountdownTimer :target-date="rooraDate" />
      </div>
    </section>

    <!-- Itinerary Section -->
    <section class="section itinerary-section">
      <div class="container">
        <h2 class="section-title">Event Itinerary</h2>
        <div class="timeline">
          <div 
            v-for="(event, index) in itinerary" 
            :key="index"
            class="timeline-item"
            :class="{ 'timeline-item-right': index % 2 === 1 }"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-date">{{ event.date }}</div>
              <div class="timeline-time">{{ event.time }}</div>
              <h3 class="timeline-title">{{ event.title }}</h3>
              <p class="timeline-description">{{ event.description }}</p>
              <div class="timeline-location">
                <span class="location-icon">📍</span>
                {{ event.location }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- RSVP Section -->
    <section class="section rsvp-section">
      <div class="container">
        <RSVPForm />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CountdownTimer from '../components/CountdownTimer.vue'
import RSVPForm from '../components/RSVPForm.vue'

// Set the Roora date - update this with the actual date
const rooraDate = ref('2026-08-28T18:00:00') // Format: YYYY-MM-DDTHH:mm:ss

// Itinerary data - update with actual event details
const itinerary = ref([
  {
    date: 'August 28, 2026',
    time: '6:00 PM',
    title: 'Welcome Reception',
    description: 'Join us for a warm welcome as we begin our celebration together.',
    location: '957 Shawasha Hills, Harare, Zimbabwe'
  },
  {
    date: 'August 28, 2026',
    time: '7:30 PM',
    title: 'Dinner & Celebration',
    description: 'Enjoy a delightful dinner followed by traditional celebrations and music.',
    location: '957 Shawasha Hills, Harare, Zimbabwe'
  },
  {
    date: 'August 29, 2026',
    time: '10:00 AM',
    title: 'Traditional Ceremony',
    description: 'Experience the beautiful traditional Roora ceremony.',
    location: '957 Shawasha Hills, Harare, Zimbabwe'
  }
])
</script>

<style scoped>
.roora-page {
  padding-top: 100px;
  min-height: 100vh;
}

.roora-hero {
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
  margin-bottom: var(--spacing-4xl);
}

.itinerary-section {
  background-color: var(--bg-primary);
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-3xl) 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary-color);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--spacing-4xl);
  display: flex;
  align-items: center;
  width: 50%;
}

.timeline-item-right {
  margin-left: auto;
  flex-direction: row-reverse;
}

.timeline-marker {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border: 4px solid var(--bg-primary);
  border-radius: 50%;
  z-index: 1;
}

.timeline-item:not(.timeline-item-right) .timeline-marker {
  right: -10px;
}

.timeline-item-right .timeline-marker {
  left: -10px;
}

.timeline-content {
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  width: calc(100% - 40px);
  margin: 0 var(--spacing-xl);
}

.timeline-item-right .timeline-content {
  text-align: right;
}

.timeline-date {
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
}

.timeline-time {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.timeline-title {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.timeline-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: var(--line-height-relaxed);
}

.timeline-location {
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.timeline-item-right .timeline-location {
  justify-content: flex-end;
}

.location-icon {
  font-size: var(--font-size-lg);
}

.rsvp-section {
  background-color: var(--bg-secondary);
}

@media (max-width: 768px) {
  .page-title {
    font-size: var(--font-size-4xl);
  }
  
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    width: 100%;
    margin-left: 0;
  }
  
  .timeline-item-right {
    margin-left: 0;
    flex-direction: row;
  }
  
  .timeline-marker {
    left: 10px !important;
    right: auto !important;
  }
  
  .timeline-content {
    margin-left: var(--spacing-3xl);
    margin-right: 0;
    width: calc(100% - 60px);
  }
  
  .timeline-item-right .timeline-content {
    text-align: left;
  }
  
  .timeline-item-right .timeline-location {
    justify-content: flex-start;
  }
}
</style>
