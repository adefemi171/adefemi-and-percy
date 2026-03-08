<template>
  <div class="gallery-filter">
    <div class="filter-group">
      <label for="place-filter">Place</label>
      <select 
        id="place-filter"
        v-model="localFilters.place"
        @change="updateFilters"
        class="filter-select"
      >
        <option value="all">All Places</option>
        <option v-for="place in filters.places" :key="place" :value="place">
          {{ place }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['filter-change'])

const localFilters = ref({
  place: 'all'
})

const updateFilters = () => {
  emit('filter-change', { ...localFilters.value })
}

watch(() => props.filters, () => {
  updateFilters()
}, { immediate: true })
</script>

<style scoped>
.gallery-filter {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

.filter-group label {
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.filter-select {
  padding: var(--spacing-md);
  border: 2px solid var(--neutral-light-gray);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: border-color var(--transition-base);
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .gallery-filter {
    flex-direction: column;
  }
  
  .filter-group {
    width: 100%;
  }
}
</style>
