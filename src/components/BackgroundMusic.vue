<template>
  <div class="background-music">
    <audio
      ref="audioEl"
      loop
      preload="metadata"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    >
      <source src="/La_Mer_Charles_Trenet.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <button
      type="button"
      class="music-toggle"
      :class="{ playing: isPlaying }"
      :aria-label="isPlaying ? 'Pause background music' : 'Play background music'"
      @click="toggle"
    >
      <span class="music-icon">{{ isPlaying ? '🔊' : '🔇' }}</span>
      <span class="music-label">{{ isPlaying ? 'Music on' : 'Music off' }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'backgroundMusicEnabled'

const audioEl = ref(null)
const isPlaying = ref(false)

const toggle = () => {
  if (!audioEl.value) return
  if (isPlaying.value) {
    audioEl.value.pause()
    localStorage.setItem(STORAGE_KEY, 'false')
  } else {
    audioEl.value.play().catch(() => {
      // Autoplay may be blocked; user can click again
    })
    localStorage.setItem(STORAGE_KEY, 'true')
  }
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'true' && audioEl.value) {
    // Try to resume; may be blocked until user interacts
    audioEl.value.play().catch(() => {})
  }
})
</script>

<style scoped>
.background-music {
  position: fixed;
  bottom: var(--spacing-xl);
  right: var(--spacing-xl);
  z-index: 1000;
}

.music-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-primary);
  border: 2px solid var(--primary-color);
  border-radius: var(--radius-full);
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: background-color var(--transition-base), color var(--transition-base),
    transform var(--transition-base);
}

.music-toggle:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
  transform: scale(1.05);
}

.music-toggle.playing {
  background: var(--primary-color);
  color: var(--text-light);
}

.music-icon {
  font-size: var(--font-size-xl);
}

@media (max-width: 768px) {
  .music-label {
    display: none;
  }

  .music-toggle {
    padding: var(--spacing-md);
  }
}
</style>
