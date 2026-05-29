<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <img
        :src="heroBackground"
        alt="Adefemi and Percyline"
        class="hero-bg"
        fetchpriority="high"
      />
      <div class="hero-scrim" aria-hidden="true"></div>
      <div class="hero-content">
        <h1 class="hero-title">Adefemi & Percyline</h1>
        <p class="hero-subtitle">Join us as we celebrate our journey together</p>
        <div class="hero-buttons">
          <router-link to="/roora" class="btn btn-primary hero-btn">Roora</router-link>
          <router-link to="/wedding" class="btn hero-btn hero-btn-outline">Wedding</router-link>
        </div>
      </div>
    </section>

    <!-- Events Overview -->
    <section class="section events-overview">
      <div class="container">
        <h2 class="section-title">Upcoming Events</h2>
        <div class="events-grid">
          <div class="event-card">
            <div class="event-card-content">
              <h3>Roora</h3>
              <p>Our engagement celebration</p>
              <router-link to="/roora" class="btn btn-primary">Learn More</router-link>
            </div>
          </div>
          
          <div class="event-card">
            <div class="event-card-content">
              <h3>Wedding</h3>
              <p>Details coming soon</p>
              <router-link to="/wedding" class="btn btn-secondary">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Navigation -->
    <section class="section quick-nav">
      <div class="container">
        <h2 class="section-title">Explore</h2>
        <div class="nav-grid">
          <router-link to="/our-story" class="nav-card">
            <div class="nav-card-icon">💕</div>
            <h3>Our Story</h3>
            <p>Our journey together</p>
          </router-link>
          
          <router-link to="/gallery" class="nav-card">
            <div class="nav-card-icon">📸</div>
            <h3>Gallery</h3>
            <p>View our memories</p>
          </router-link>
          
          <router-link to="/love-jar" class="nav-card">
            <div class="nav-card-icon">💌</div>
            <h3>Love Jar</h3>
            <p>Reasons we love each other</p>
          </router-link>
          
          <router-link to="/registry" class="nav-card">
            <div class="nav-card-icon">🎁</div>
            <h3>Registry</h3>
            <p>Gift information</p>
          </router-link>
          
          <router-link to="/faqs" class="nav-card">
            <div class="nav-card-icon">❓</div>
            <h3>FAQs</h3>
            <p>Common questions</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import heroBackground from '../assets/images/China/china_001.jpg'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: start center;
  padding-top: clamp(6.5rem, 10vh, 8.5rem);
  background-color: var(--neutral-charcoal);
  color: var(--text-light);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Couple is mid-frame in the portrait — center on them, not the top drapes */
  object-position: center 42%;
  display: block;
}

/* Scrim only behind the headline band (not over faces) */
.hero-scrim {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: min(38vh, 22rem);
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.2) 55%,
    transparent 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 40rem;
  padding: 0 var(--spacing-lg);
  text-align: center;
}

.hero-title {
  font-size: clamp(2.25rem, 6vw, var(--font-size-6xl));
  margin-bottom: var(--spacing-md);
  color: var(--text-light);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.35);
  animation: fadeInUp 1s ease;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, var(--font-size-xl));
  margin-bottom: var(--spacing-lg);
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35);
  animation: fadeInUp 1s ease 0.2s both;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  justify-content: center;
  animation: fadeInUp 1s ease 0.4s both;
}

.hero-btn {
  min-width: 8.5rem;
}

.hero-btn-outline {
  background-color: rgba(255, 255, 255, 0.12);
  color: var(--text-light);
  border: 2px solid rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
}

.hero-btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.95);
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.95);
}

.events-overview {
  background-color: var(--bg-secondary);
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-3xl);
}

.event-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.event-card-content {
  padding: var(--spacing-2xl) var(--spacing-xl);
  text-align: center;
}

.event-card-content h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

.event-card-content p {
  margin-bottom: var(--spacing-lg);
  color: var(--text-secondary);
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
}

.nav-card {
  background: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  text-decoration: none;
  color: var(--text-primary);
}

.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.nav-card-icon {
  font-size: var(--font-size-5xl);
  margin-bottom: var(--spacing-md);
}

.nav-card h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
  color: var(--primary-color);
}

.nav-card p {
  color: var(--text-secondary);
  margin: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-bg {
    object-position: center 40%;
  }

  .hero {
    padding-top: 6.25rem;
  }

  .hero-scrim {
    height: min(42vh, 20rem);
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-btn {
    width: 100%;
    max-width: 16rem;
    margin: 0 auto;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-height: 740px) {
  .hero {
    padding-top: 5.75rem;
  }

  .hero-title {
    font-size: clamp(2rem, 5.2vw, 3.8rem);
    margin-bottom: var(--spacing-sm);
  }

  .hero-subtitle {
    margin-bottom: var(--spacing-md);
  }

  .hero-buttons {
    gap: var(--spacing-sm);
  }
}
</style>
