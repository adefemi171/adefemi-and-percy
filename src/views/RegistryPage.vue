<template>
  <div class="registry-page">
    <section class="section registry-hero">
      <div class="container">
        <h1 class="page-title">Gift Registry</h1>
        <p class="page-subtitle">Your presence is the greatest gift, but if you'd like to give something special...</p>
      </div>
    </section>

    <!-- Physical Items Section -->
    <section class="section registry-section">
      <div class="container">
        <h2 class="section-title">Physical Items</h2>
        <p class="section-description">We've registered at the following stores:</p>
        <div class="registry-grid">
          <div 
            v-for="(registry, index) in physicalRegistries" 
            :key="index"
            class="registry-card"
          >
            <div class="registry-logo">
              <img :src="registry.logo" :alt="registry.name" v-if="registry.logo" />
              <div v-else class="registry-placeholder">{{ registry.name.charAt(0) }}</div>
            </div>
            <h3 class="registry-name">{{ registry.name }}</h3>
            <p class="registry-description">{{ registry.description }}</p>
            <a 
              :href="registry.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              Visit Registry
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Cash Funds Section -->
    <section class="section registry-section cash-funds">
      <div class="container">
        <h2 class="section-title">Cash Funds</h2>
        <p class="section-description">If you prefer to contribute monetarily, you can use any of these options:</p>
        <div class="cash-funds-grid">
          <div 
            v-for="(payment, index) in cashFunds" 
            :key="index"
            class="payment-card"
          >
            <div class="payment-icon">{{ payment.icon }}</div>
            <h3 class="payment-name">{{ payment.name }}</h3>
            <div class="payment-info">
              <p class="payment-handle">{{ payment.handle }}</p>
              <div v-if="payment.qrCode" class="qr-code">
                <img :src="payment.qrCode" :alt="`${payment.name} QR Code`" />
              </div>
            </div>
            <a 
              v-if="payment.link"
              :href="payment.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-secondary"
            >
              Send via {{ payment.name }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Experiences Section -->
    <section class="section registry-section experiences">
      <div class="container">
        <h2 class="section-title">Experiences</h2>
        <p class="section-description">Help us create unforgettable memories:</p>
        <div class="registry-grid">
          <div 
            v-for="(experience, index) in experiences" 
            :key="index"
            class="registry-card"
          >
            <div class="experience-icon">{{ experience.icon }}</div>
            <h3 class="registry-name">{{ experience.name }}</h3>
            <p class="registry-description">{{ experience.description }}</p>
            <a 
              v-if="experience.url"
              :href="experience.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Thank You Message -->
    <section class="section thank-you-section">
      <div class="container">
        <div class="thank-you-content">
          <h2>Thank You</h2>
          <p>
            Your love, support, and presence mean the world to us. 
            We're grateful for your thoughtfulness and can't wait to celebrate with you!
          </p>
          <p class="signature">With love,<br>Adefemi & Percyline</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Physical registries - update with actual registry information
const physicalRegistries = ref([
  {
    name: 'Amazon',
    description: 'Browse our Amazon registry for household items and more.',
    url: 'https://www.amazon.com/wedding/registry',
    logo: null // Add logo URL if available
  },
  {
    name: 'Target',
    description: 'Find items from our Target registry.',
    url: 'https://www.target.com/gift-registry',
    logo: null
  },
  {
    name: 'Zola',
    description: 'Our curated Zola registry with items we love.',
    url: 'https://www.zola.com/registry',
    logo: null
  }
])

// Cash fund options - update with actual payment information
const cashFunds = ref([
  {
    name: 'Venmo',
    handle: '@YourVenmoHandle',
    icon: '💸',
    link: 'https://venmo.com',
    qrCode: null // Add QR code image URL if available
  },
  {
    name: 'PayPal',
    handle: 'your-email@example.com',
    icon: '💳',
    link: 'https://paypal.me',
    qrCode: null
  },
  {
    name: 'Zelle',
    handle: 'your-phone@zelle.com',
    icon: '📱',
    link: null,
    qrCode: null
  },
  {
    name: 'Cash App',
    handle: '$YourCashAppHandle',
    icon: '💵',
    link: 'https://cash.app',
    qrCode: null
  }
])

// Experience gifts - update with actual experience information
const experiences = ref([
  {
    name: 'Honeymoon Fund',
    description: 'Help us create amazing memories on our honeymoon.',
    icon: '✈️',
    url: 'https://www.honeyfund.com' // or Zola Cash Funds
  },
  {
    name: 'Date Night Experiences',
    description: 'Contribute to special date nights and adventures.',
    icon: '🍷',
    url: null
  },
  {
    name: 'Home Improvement',
    description: 'Help us make our home even more special.',
    icon: '🏠',
    url: null
  }
])
</script>

<style scoped>
.registry-page {
  padding-top: 100px;
  min-height: 100vh;
}

.registry-hero {
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
  margin: 0 auto;
}

.registry-section {
  background-color: var(--bg-primary);
}

.registry-section.cash-funds {
  background-color: var(--bg-secondary);
}

.registry-section.experiences {
  background-color: var(--bg-primary);
}

.section-description {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-3xl);
}

.registry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
}

.registry-card {
  background: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.registry-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.registry-logo {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.registry-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.registry-placeholder {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.registry-name {
  font-size: var(--font-size-xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.registry-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  line-height: var(--line-height-relaxed);
}

.cash-funds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.payment-card {
  background: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.payment-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.payment-icon {
  font-size: var(--font-size-5xl);
  margin-bottom: var(--spacing-md);
}

.payment-name {
  font-size: var(--font-size-xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.payment-handle {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  word-break: break-all;
}

.qr-code {
  margin: var(--spacing-lg) 0;
}

.qr-code img {
  width: 150px;
  height: 150px;
  border: 2px solid var(--neutral-light-gray);
  border-radius: var(--radius-md);
}

.experience-icon {
  font-size: var(--font-size-5xl);
  margin-bottom: var(--spacing-md);
}

.thank-you-section {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: var(--text-light);
  text-align: center;
}

.thank-you-content {
  max-width: 700px;
  margin: 0 auto;
}

.thank-you-content h2 {
  font-size: var(--font-size-4xl);
  color: var(--text-light);
  margin-bottom: var(--spacing-lg);
}

.thank-you-content p {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
}

.signature {
  font-size: var(--font-size-xl);
  font-family: var(--font-heading);
  margin-top: var(--spacing-xl);
}

@media (max-width: 768px) {
  .registry-grid,
  .cash-funds-grid {
    grid-template-columns: 1fr;
  }
}
</style>
