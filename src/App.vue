<template>
  <div id="app" :data-page="pageClass">
    <Navigation />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
    <BackgroundMusic />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import BackgroundMusic from './components/BackgroundMusic.vue'

const route = useRoute()
const pageClass = computed(() => {
  const name = String(route.name || '')
  if (!name) return 'default'
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
})
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 0;
}
</style>
