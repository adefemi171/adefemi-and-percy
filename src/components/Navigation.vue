<template>
  <nav class="navigation" :class="{ 'nav-scrolled': isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <span class="logo-text">Adefemi & Percyline</span>
      </router-link>
      
      <button 
        class="nav-toggle" 
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span class="hamburger" :class="{ 'active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      
      <ul class="nav-menu" :class="{ 'active': isMenuOpen }">
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/roora" @click="closeMenu">Roora</router-link></li>
        <li><router-link to="/wedding" @click="closeMenu">Wedding</router-link></li>
        <li><router-link to="/gallery" @click="closeMenu">Gallery</router-link></li>
        <li><router-link to="/our-story" @click="closeMenu">Our Story</router-link></li>
        <li><router-link to="/love-jar" @click="closeMenu">Love Jar</router-link></li>
        <li><router-link to="/faqs" @click="closeMenu">FAQs</router-link></li>
        <li><router-link to="/registry" @click="closeMenu">Registry</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.nav-scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: var(--shadow-md);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: var(--spacing-xl);
  align-items: center;
}

.nav-menu li a {
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  transition: color var(--transition-base);
  position: relative;
}

.nav-menu li a:hover,
.nav-menu li a.router-link-active {
  color: var(--primary-color);
}

.nav-menu li a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--primary-color);
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 24px;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-base);
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }
  
  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--bg-primary);
    flex-direction: column;
    padding: var(--spacing-xl);
    gap: var(--spacing-lg);
    box-shadow: var(--shadow-lg);
    transform: translateX(-100%);
    transition: transform var(--transition-base);
  }
  
  .nav-menu.active {
    transform: translateX(0);
  }
}
</style>
