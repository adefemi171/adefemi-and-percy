<template>
  <div class="registry-page">
    <section class="section registry-hero">
      <div class="container">
        <h1 class="page-title">Gift Registry</h1>
        <p class="page-subtitle">Your presence is the greatest gift, but if you'd like to give something special...</p>
      </div>
    </section>

    <!-- Gifts: Physical, Cash & Experiences -->
    <section class="section registry-section">
      <div class="container">
        <h2 class="section-title">Ways to Give</h2>
        <p class="section-description">Ways to give—we appreciate your thoughtfulness.</p>
        <div class="registry-grid">
          <div 
            v-for="(item, index) in registryItems" 
            :key="index"
            class="registry-card"
            :class="`registry-card--${item.type}`"
          >
            <span class="registry-badge">{{ item.typeLabel }}</span>
            <div class="registry-icon">
              <img v-if="item.logo" :src="item.logo" :alt="item.name" />
              <span v-else>{{ item.icon }}</span>
            </div>
            <h3 class="registry-name">{{ item.name }}</h3>
            <div v-if="item.wallets" class="wallet-list">
              <div v-for="wallet in item.wallets" :key="wallet.symbol" class="wallet-item">
                <p class="wallet-label">{{ wallet.symbol }} ({{ wallet.network }})</p>
                <p class="wallet-address">{{ wallet.address }}</p>
              </div>
            </div>
            <p v-else-if="item.description || item.handle" class="registry-description">{{ item.description || item.handle }}</p>
            <div v-if="item.qrCode" class="qr-code">
              <img :src="item.qrCode" :alt="`${item.name} QR Code`" />
            </div>
            <a 
              v-if="item.link"
              :href="item.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              {{ item.buttonText }}
            </a>
            <p v-else class="registry-nolink">Use the details above to send.</p>
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
import { computed } from 'vue'

// Merged registry: physical items, cash funds, and experiences
const registryItems = computed(() => {
  const cash = [
    {
      type: 'cash',
      typeLabel: 'Cash',
      name: 'PayPal',
      icon: '💳',
      link: 'https://www.paypal.me/Adefemi171',
      buttonText: 'Send via PayPal',
      qrCode: null
    },
    {
      type: 'cash',
      typeLabel: 'Cash',
      name: 'Revolut',
      icon: '💳',
      link: 'https://revolut.me/adefemi171',
      buttonText: 'Send via Revolut',
      qrCode: null
    },
    {
      type: 'cash',
      typeLabel: 'Cash',
      name: 'Crypto (BTC, ETH, etc.)',
      wallets: [
        {
          symbol: 'ETH',
          network: 'Ethereum',
          address: '0x5D0b9def00f079a99a8Cd69183aD08195c167ea4'
        },
        {
          symbol: 'BTC',
          network: 'BTC',
          address: '3KugRpnJ7oU74yRGm1Ly87X7P8RWxNHE7M'
        },
        {
          symbol: 'USDC',
          network: 'Ethereum',
          address: '0xaCf0f97590a124B49Ae59707d898dBBB540C356b'
        }
      ],
      icon: '₿',
      link: null,
      buttonText: null,
      qrCode: null
    }
  ]
  return cash
})
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
  position: relative;
  background: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  border: 1px solid var(--neutral-light-gray);
}

.registry-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.registry-badge {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--primary-color);
  background: var(--primary-light);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
}

.registry-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-4xl);
}

.registry-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
  word-break: break-word;
}

.wallet-list {
  margin-bottom: var(--spacing-lg);
  text-align: left;
}

.wallet-item + .wallet-item {
  margin-top: var(--spacing-md);
}

.wallet-label {
  margin: 0 0 var(--spacing-xs);
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.wallet-address {
  margin: 0;
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  word-break: break-all;
}

.registry-nolink {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
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
  .registry-grid {
    grid-template-columns: 1fr;
  }
}
</style>
