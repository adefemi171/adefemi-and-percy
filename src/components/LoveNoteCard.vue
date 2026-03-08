<template>
  <div class="love-note-card" :class="{ 'revealed': isRevealed }">
    <div class="note-content">
      <div class="note-text">{{ note.content }}</div>
      <div class="note-footer">
        <span class="note-author">{{ note.author }}</span>
        <span class="note-date">{{ formattedDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  },
  isRevealed: {
    type: Boolean,
    default: false
  }
})

const formattedDate = computed(() => {
  if (!props.note.date) return ''
  const date = new Date(props.note.date)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})
</script>

<style scoped>
.love-note-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl);
  box-shadow: var(--shadow-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: all var(--transition-slow);
}

.love-note-card.revealed {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.note-content {
  text-align: center;
}

.note-text {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-relaxed);
  color: var(--text-primary);
  font-style: italic;
  margin-bottom: var(--spacing-xl);
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--neutral-light-gray);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.note-author {
  font-weight: var(--font-weight-medium);
  color: var(--primary-color);
}

.note-date {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .love-note-card {
    padding: var(--spacing-xl);
  }
  
  .note-text {
    font-size: var(--font-size-lg);
  }
  
  .note-footer {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: flex-start;
  }
}
</style>
