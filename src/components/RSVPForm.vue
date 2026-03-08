<template>
  <div class="rsvp-form-container">
    <h2 class="form-title">RSVP</h2>
    <p class="form-subtitle">Please let us know if you'll be joining us for the Roora celebration</p>
    
    <form @submit.prevent="handleSubmit" class="rsvp-form">
      <div class="form-group">
        <label for="name">Full Name *</label>
        <input 
          type="text" 
          id="name"
          v-model="formData.name"
          required
          class="form-input"
          :class="{ 'error': errors.name }"
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email Address *</label>
        <input 
          type="email" 
          id="email"
          v-model="formData.email"
          required
          class="form-input"
          :class="{ 'error': errors.email }"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="guests">Number of Guests *</label>
        <input 
          type="number" 
          id="guests"
          v-model.number="formData.guests"
          min="1"
          required
          class="form-input"
          :class="{ 'error': errors.guests }"
        />
        <span v-if="errors.guests" class="error-message">{{ errors.guests }}</span>
      </div>

      <div class="form-group">
        <label for="dietary">Dietary Restrictions or Allergies</label>
        <textarea 
          id="dietary"
          v-model="formData.dietary"
          rows="3"
          class="form-input"
          placeholder="Please let us know of any dietary restrictions or allergies..."
        ></textarea>
      </div>

      <div class="form-group">
        <label for="message">Additional Message (Optional)</label>
        <textarea 
          id="message"
          v-model="formData.message"
          rows="4"
          class="form-input"
          placeholder="Any additional information or message..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        class="btn btn-primary submit-btn"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">Submit RSVP</span>
        <span v-else>Submitting...</span>
      </button>

      <div v-if="submitMessage" class="submit-message" :class="{ 'success': submitSuccess, 'error': !submitSuccess }">
        {{ submitMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formData = reactive({
  name: '',
  email: '',
  guests: 1,
  dietary: '',
  message: ''
})

const errors = reactive({})
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdazezv'

const validateForm = () => {
  errors.name = ''
  errors.email = ''
  errors.guests = ''

  if (!formData.name.trim()) {
    errors.name = 'Name is required'
    return false
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
    return false
  }

  if (formData.guests < 1) {
    errors.guests = 'Number of guests must be at least 1'
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

  try {
    // Using Formspree - replace FORMSPREE_ENDPOINT with your actual endpoint
    // For now, this is a placeholder that simulates submission
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        guests: formData.guests,
        dietary: formData.dietary,
        message: formData.message,
        event: 'Roora'
      })
    })

    if (response.ok) {
      resetForm()
      router.push('/rsvp/thank-you')
    } else {
      throw new Error('Submission failed')
    }
  } catch (error) {
    submitSuccess.value = false
    submitMessage.value = 'Sorry, there was an error submitting your RSVP. Please try again or contact us directly.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.guests = 1
  formData.dietary = ''
  formData.message = ''
  Object.keys(errors).forEach(key => errors[key] = '')
}
</script>

<style scoped>
.rsvp-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-3xl);
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.form-title {
  font-size: var(--font-size-3xl);
  color: var(--primary-color);
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.form-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-3xl);
}

.rsvp-form {
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
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-input.error {
  border-color: #dc3545;
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
  .rsvp-form-container {
    padding: var(--spacing-xl);
  }
}
</style>
