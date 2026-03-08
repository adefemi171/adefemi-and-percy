<template>
  <div class="countdown-timer">
    <h2 class="countdown-title">Countdown to Roora</h2>
    <div class="countdown-grid">
      <div class="countdown-item">
        <div class="countdown-value">{{ days }}</div>
        <div class="countdown-label">Days</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">{{ hours }}</div>
        <div class="countdown-label">Hours</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">{{ minutes }}</div>
        <div class="countdown-label">Minutes</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">{{ seconds }}</div>
        <div class="countdown-label">Seconds</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  targetDate: {
    type: String,
    required: true
  }
})

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let interval = null

const updateCountdown = () => {
  const now = new Date().getTime()
  const target = new Date(props.targetDate).getTime()
  const distance = target - now

  if (distance < 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    return
  }

  days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
}

onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.countdown-timer {
  text-align: center;
  padding: var(--spacing-4xl) 0;
}

.countdown-title {
  font-size: var(--font-size-3xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-3xl);
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  max-width: 800px;
  margin: 0 auto;
}

.countdown-item {
  background: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-base);
}

.countdown-item:hover {
  transform: translateY(-4px);
}

.countdown-value {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  font-family: var(--font-heading);
  line-height: 1;
  margin-bottom: var(--spacing-sm);
}

.countdown-label {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: var(--font-weight-medium);
}

@media (max-width: 768px) {
  .countdown-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }
  
  .countdown-value {
    font-size: var(--font-size-4xl);
  }
  
  .countdown-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
