<template>
  <div class="thank-you-page">
    <section class="section thank-you-section">
      <div class="container thank-you-card">
        <div class="thank-you-icon">✓</div>
        <h1 class="thank-you-title">Thank You!</h1>
        <p class="thank-you-message">
          Your RSVP has been received. We're so happy you'll be celebrating with us.
        </p>
        <p class="thank-you-see-you">
          See you at the event!
        </p>
        <p class="thank-you-date">August 28–29, 2026 · Roora Celebration</p>
        <router-link to="/roora" class="btn btn-primary">Back to Roora</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.thank-you-page {
  padding-top: 100px;
  min-height: 100vh;
}

.thank-you-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
}

.thank-you-card {
  max-width: 520px;
  padding: var(--spacing-4xl);
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  text-align: center;
}

.thank-you-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-xl);
  background: var(--primary-light);
  color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
}

.thank-you-title {
  font-size: var(--font-size-4xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
}

.thank-you-message {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-xl);
}

.thank-you-see-you {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.thank-you-date {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
}

.thank-you-card .btn {
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-2xl);
  text-decoration: none;
}

@media (max-width: 768px) {
  .thank-you-card {
    padding: var(--spacing-2xl);
  }

  .thank-you-title {
    font-size: var(--font-size-3xl);
  }
}
</style>
