<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Adefemi & Percyline</h1>
        <p class="hero-subtitle">Join us as we celebrate our journey together</p>
        <div class="hero-buttons">
          <router-link to="/roora" class="btn btn-primary">Roora</router-link>
          <router-link to="/wedding" class="btn btn-secondary">Wedding</router-link>
        </div>
      </div>
    </section>

    <!-- Events Overview -->
    <section class="section events-overview">
      <div class="container">
        <h2 class="section-title">Upcoming Events</h2>
        <div class="events-grid">
          <div class="event-card">
            <div class="event-card-image roora-bg"></div>
            <div class="event-card-content">
              <h3>Roora</h3>
              <p>Our engagement celebration</p>
              <router-link to="/roora" class="btn btn-primary">Learn More</router-link>
            </div>
          </div>
          
          <div class="event-card">
            <div class="event-card-image wedding-bg"></div>
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
          <router-link to="/gallery" class="nav-card">
            <div class="nav-card-icon">📸</div>
            <h3>Gallery</h3>
            <p>View our memories</p>
          </router-link>
          
          <router-link to="/our-story" class="nav-card">
            <div class="nav-card-icon">💕</div>
            <h3>Our Story</h3>
            <p>Our journey together</p>
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
// HomePage component
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  background-size: cover;
  background-position: center;
  color: var(--text-light);
  text-align: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: var(--spacing-lg);
}

.hero-title {
  font-size: var(--font-size-6xl);
  margin-bottom: var(--spacing-lg);
  color: var(--text-light);
  animation: fadeInUp 1s ease;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-3xl);
  opacity: 0.9;
  animation: fadeInUp 1s ease 0.2s both;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  animation: fadeInUp 1s ease 0.4s both;
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

.event-card-image {
  height: 250px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

.roora-bg {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
}

.wedding-bg {
  background: linear-gradient(135deg, var(--secondary-color), var(--accent-rose));
}

.event-card-content {
  padding: var(--spacing-xl);
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
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
