<template>
  <div class="love-jar-page">
    <section class="section love-jar-hero">
      <div class="container">
        <h1 class="page-title">Reason I Love You Jar</h1>
        <p class="page-subtitle">A digital collection of memories, notes, and reasons we love each other</p>
        <div class="jar-icon">💕</div>
      </div>
    </section>

    <!-- Random Note Section -->
    <section class="section random-note-section">
      <div class="container">
        <div class="random-note-container">
          <h2 class="section-title">Pick a Note</h2>
          <p class="section-description">Click the button below to reveal a random love note from our collection</p>
          
          <button 
            @click="pickRandomNote" 
            class="btn btn-primary pick-note-btn"
            :disabled="notes.length === 0 || loading"
          >
            {{ currentNote ? 'Pick Another Note' : 'Pick a Note' }}
          </button>

          <div v-if="loadError" class="empty-state error-state">
            <p>Could not load notes. Please check your connection and try again.</p>
          </div>
          <div v-else-if="notes.length === 0 && !loading" class="empty-state">
            <p>No notes yet. Be the first to add one!</p>
          </div>
          <div v-if="loading" class="empty-state">
            <p>Loading notes...</p>
          </div>

          <div v-if="currentNote" class="note-display">
            <LoveNoteCard :note="currentNote" :is-revealed="noteRevealed" />
          </div>
        </div>
      </div>
    </section>

    <!-- Add Note Section -->
    <section class="section add-note-section">
      <div class="container">
        <AddNoteForm @note-added="handleNoteAdded" />
      </div>
    </section>

    <!-- All Notes Section (Optional) -->
    <section v-if="showAllNotes && notes.length > 0" class="section all-notes-section">
      <div class="container">
        <div class="notes-header">
          <h2 class="section-title">All Notes</h2>
          <button @click="toggleAllNotes" class="btn btn-secondary">
            {{ showAllNotes ? 'Hide All Notes' : 'Show All Notes' }}
          </button>
        </div>

        <div class="notes-grid">
          <div 
            v-for="note in sortedNotes" 
            :key="note.id"
            class="note-item"
          >
            <div class="note-item-content">{{ note.content }}</div>
            <div class="note-item-footer">
              <span class="note-item-author">{{ note.author }}</span>
              <span class="note-item-date">{{ formatDate(note.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Storage Notice -->
    <section class="section storage-notice">
      <div class="container">
        <div class="notice-box">
          <p class="notice-text">
            <strong>Saved online.</strong> Notes are stored securely and shared across all your devices.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase.js'
import LoveNoteCard from '../components/LoveNoteCard.vue'
import AddNoteForm from '../components/AddNoteForm.vue'

const NOTES_COLLECTION = 'loveJarNotes'

const notes = ref([])
const currentNote = ref(null)
const noteRevealed = ref(false)
const showAllNotes = ref(false)
const loading = ref(false)
const loadError = ref(false)

const loadNotes = async () => {
  loading.value = true
  loadError.value = false
  try {
    const snapshot = await getDocs(collection(db, NOTES_COLLECTION))
    notes.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    console.error('Error loading notes:', err)
    loadError.value = true
    notes.value = []
  } finally {
    loading.value = false
  }
}

const pickRandomNote = () => {
  if (notes.value.length === 0) return
  
  noteRevealed.value = false
  
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * notes.value.length)
    currentNote.value = notes.value[randomIndex]
    noteRevealed.value = true
  }, 300)
}

const handleNoteAdded = (note) => {
  loadNotes()
  // Optionally show the newly added note
  currentNote.value = note
  noteRevealed.value = true
}

const toggleAllNotes = () => {
  showAllNotes.value = !showAllNotes.value
}

const sortedNotes = computed(() => {
  return [...notes.value].sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp)
  })
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

onMounted(() => {
  loadNotes()
})
</script>

<style scoped>
.love-jar-page {
  padding-top: 100px;
  min-height: 100vh;
}

.love-jar-hero {
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
  max-width: 700px;
  margin: 0 auto var(--spacing-xl);
}

.jar-icon {
  font-size: var(--font-size-6xl);
  margin-top: var(--spacing-lg);
}

.random-note-section {
  background-color: var(--bg-primary);
}

.random-note-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: var(--font-size-3xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.section-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-3xl);
  font-size: var(--font-size-lg);
}

.pick-note-btn {
  padding: var(--spacing-lg) var(--spacing-3xl);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-3xl);
}

.pick-note-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  padding: var(--spacing-4xl);
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
}

.empty-state.error-state {
  color: var(--primary-dark);
}

.note-display {
  margin-top: var(--spacing-3xl);
  min-height: 200px;
}

.add-note-section {
  background-color: var(--bg-secondary);
}

.all-notes-section {
  background-color: var(--bg-primary);
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-3xl);
  flex-wrap: wrap;
  gap: var(--spacing-lg);
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.note-item {
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--neutral-light-gray);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.note-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.note-item-content {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-style: italic;
}

.note-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--neutral-light-gray);
  font-size: var(--font-size-sm);
}

.note-item-author {
  font-weight: var(--font-weight-medium);
  color: var(--primary-color);
}

.note-item-date {
  color: var(--text-secondary);
}

.storage-notice {
  background-color: var(--bg-secondary);
}

.notice-box {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--primary-color);
}

.notice-text {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.notice-text strong {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .page-title {
    font-size: var(--font-size-4xl);
  }
  
  .notes-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .notes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
