<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">Adefemi & Percyline</h3>
          <p class="footer-text">Celebrating our journey together</p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/roora">Roora</router-link></li>
            <li><router-link to="/wedding">Wedding</router-link></li>
            <li><router-link to="/gallery">Gallery</router-link></li>
            <li><router-link to="/our-story">Our Story</router-link></li>
            <li><router-link to="/love-jar">Love Jar</router-link></li>
            <li><router-link to="/faqs">FAQs</router-link></li>
            <li><router-link to="/registry">Registry</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-heading">Contact</h4>
          <p class="footer-text">For any questions, please reach out</p>
          <!-- Add contact information here -->
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Adefemi & Percyline. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: var(--neutral-charcoal);
  color: var(--text-light);
  padding: var(--spacing-4xl) 0 var(--spacing-lg);
  margin-top: var(--spacing-4xl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-3xl);
  margin-bottom: var(--spacing-3xl);
}

.footer-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  color: var(--text-light);
  margin-bottom: var(--spacing-md);
}

.footer-heading {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--secondary-color);
}

.footer-text {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: var(--spacing-sm);
}

.footer-links a {
  color: var(--text-secondary);
  transition: color var(--transition-base);
}

.footer-links a:hover {
  color: var(--text-light);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}
</style>
