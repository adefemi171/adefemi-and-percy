<template>
  <div class="add-note-form-container">
    <h3 class="form-title">Add a Love Note</h3>
    <p class="form-subtitle">Share a reason you love Adefemi & Percyline, or a memory you cherish</p>
    
    <form @submit.prevent="handleSubmit" class="add-note-form">
      <div class="form-group">
        <label for="note-content">Your Note *</label>
        <textarea 
          id="note-content"
          v-model="formData.content"
          required
          rows="5"
          class="form-input"
          placeholder="Write your love note or memory here..."
          :class="{ 'error': errors.content }"
        ></textarea>
        <span v-if="errors.content" class="error-message">{{ errors.content }}</span>
      </div>

      <div class="form-group">
        <label for="note-author">Your Name *</label>
        <input 
          type="text" 
          id="note-author"
          v-model="formData.author"
          required
          class="form-input"
          placeholder="Adefemi, Percyline, or your name"
          :class="{ 'error': errors.author }"
        />
        <span v-if="errors.author" class="error-message">{{ errors.author }}</span>
      </div>

      <div class="form-group">
        <label for="note-date">Date (Optional)</label>
        <input 
          type="date" 
          id="note-date"
          v-model="formData.date"
          class="form-input"
        />
        <small class="form-hint">Leave blank to use today's date</small>
      </div>

      <button 
        type="submit" 
        class="btn btn-primary submit-btn"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">Add Note</span>
        <span v-else>Adding...</span>
      </button>

      <div v-if="submitMessage" class="submit-message" :class="{ 'success': submitSuccess, 'error': !submitSuccess }">
        {{ submitMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase.js'

const emit = defineEmits(['note-added'])
const NOTES_COLLECTION = 'loveJarNotes'

const formData = reactive({
  content: '',
  author: '',
  date: ''
})

const errors = reactive({})
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

const validateForm = () => {
  errors.content = ''
  errors.author = ''

  if (!formData.content.trim()) {
    errors.content = 'Note content is required'
    return false
  }

  if (formData.content.trim().length < 10) {
    errors.content = 'Note must be at least 10 characters'
    return false
  }

  if (!formData.author.trim()) {
    errors.author = 'Name is required'
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitMessage.value = ''

  const date = formData.date || new Date().toISOString().split('T')[0]
  const timestamp = Date.now()

  try {
    const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
      content: formData.content.trim(),
      author: formData.author.trim(),
      date,
      timestamp
    })

    const note = {
      id: docRef.id,
      content: formData.content.trim(),
      author: formData.author.trim(),
      date,
      timestamp
    }

    submitSuccess.value = true
    submitMessage.value = 'Thank you! Your note has been added to the Love Jar.'

    formData.content = ''
    formData.author = ''
    formData.date = ''
    Object.keys(errors).forEach(key => (errors[key] = ''))

    emit('note-added', note)
  } catch (err) {
    console.error('Error adding note:', err)
    submitSuccess.value = false
    submitMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }

  setTimeout(() => {
    submitMessage.value = ''
  }, 5000)
}
</script>

<style scoped>
.add-note-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-3xl);
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.form-title {
  font-size: var(--font-size-2xl);
  color: var(--primary-color);
  text-align: center;
  margin-bottom: var(--spacing-sm);
}

.form-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-3xl);
  font-size: var(--font-size-base);
}

.add-note-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.form-input {
  padding: var(--spacing-md);
  border: 2px solid var(--neutral-light-gray);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-family: var(--font-body);
  transition: border-color var(--transition-base);
  width: 100%;
  resize: vertical;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-input.error {
  border-color: #dc3545;
}

.form-hint {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}

.error-message {
  color: #dc3545;
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}

.submit-btn {
  margin-top: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-lg);
  font-size: var(--font-size-lg);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-message {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  margin-top: var(--spacing-md);
}

.submit-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .add-note-form-container {
    padding: var(--spacing-xl);
  }
}
</style>
