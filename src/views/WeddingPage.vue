<template>
  <div class="wedding-page">
    <section class="section wedding-hero">
      <div class="container">
        <div class="wedding-content">
          <h1 class="wedding-title">Wedding Celebration</h1>
          <div class="under-review">
            <div class="review-icon">📅</div>
            <h2>Details Under Review</h2>
            <p>We're currently finalizing the details for our wedding celebration. 
               Please check back soon for more information about the date, venue, and itinerary.</p>
            <p class="wedding-note">We can't wait to celebrate with you!</p>
          </div>
          
          <div class="email-signup">
            <h3>Stay Updated</h3>
            <p>Want to be notified when wedding details are announced?</p>
            <form @submit.prevent="handleSignup" class="signup-form">
              <input 
                type="email" 
                v-model="email" 
                placeholder="Enter your email"
                required
                class="signup-input"
              />
              <button type="submit" class="btn btn-primary">Notify Me</button>
            </form>
            <p v-if="signupMessage" class="signup-message" :class="{ 'success': signupSuccess }">
              {{ signupMessage }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const signupMessage = ref('')
const signupSuccess = ref(false)

const handleSignup = () => {
  // Placeholder for email signup functionality
  // Can be integrated with Formspree or EmailJS later
  signupMessage.value = 'Thank you! We\'ll notify you when details are available.'
  signupSuccess.value = true
  email.value = ''
  
  setTimeout(() => {
    signupMessage.value = ''
  }, 5000)
}
</script>

<style scoped>
.wedding-page {
  min-height: 80vh;
  padding-top: 100px;
}

.wedding-hero {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}

.wedding-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.wedding-title {
  font-size: var(--font-size-5xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-3xl);
}

.under-review {
  background: var(--bg-primary);
  padding: var(--spacing-4xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--spacing-4xl);
}

.review-icon {
  font-size: var(--font-size-6xl);
  margin-bottom: var(--spacing-lg);
}

.under-review h2 {
  font-size: var(--font-size-3xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
}

.under-review p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
}

.wedding-note {
  font-size: var(--font-size-xl);
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  margin-top: var(--spacing-xl);
}

.email-signup {
  background: var(--bg-primary);
  padding: var(--spacing-3xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.email-signup h3 {
  font-size: var(--font-size-2xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.email-signup > p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.signup-form {
  display: flex;
  gap: var(--spacing-md);
  max-width: 500px;
  margin: 0 auto;
}

.signup-input {
  flex: 1;
  padding: var(--spacing-md);
  border: 2px solid var(--neutral-light-gray);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-family: var(--font-body);
  transition: border-color var(--transition-base);
}

.signup-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.signup-message {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  background-color: var(--accent-rose);
  color: var(--text-primary);
}

.signup-message.success {
  background-color: #d4edda;
  color: #155724;
}

@media (max-width: 768px) {
  .wedding-title {
    font-size: var(--font-size-4xl);
  }
  
  .under-review {
    padding: var(--spacing-2xl);
  }
  
  .signup-form {
    flex-direction: column;
  }
  
  .signup-input,
  .btn {
    width: 100%;
  }
}
</style>
