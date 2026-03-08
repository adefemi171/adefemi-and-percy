<template>
  <div id="app">
    <Navigation />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
    <BackgroundMusic />
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import BackgroundMusic from './components/BackgroundMusic.vue'
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
