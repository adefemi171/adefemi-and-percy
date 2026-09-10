<template>
  <div class="dress-code-page">
    <section class="section dress-hero">
      <div class="container">
        <h1 class="page-title">Dress Code</h1>
        <p class="page-subtitle">What to wear to celebrate with us</p>
      </div>
    </section>

    <section class="section dress-content">
      <div class="container">
        <div
          v-for="(guide, index) in guides"
          :key="index"
          class="dress-guide"
        >
          <h2 class="dress-guide-title">{{ guide.title }}</h2>
          <p class="dress-guide-note">{{ guide.note }}</p>
          <a
            class="dress-guide-image-link"
            :href="guide.image"
            target="_blank"
            rel="noopener"
            :aria-label="`Open the ${guide.title} guide in full size`"
          >
            <img
              :src="guide.image"
              :alt="guide.alt"
              class="dress-guide-image"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const guides = [
  {
    title: 'Welcome Dinner for Friends and Visiting Guests',
    note: "If you're joining us for the welcome dinner, we'd love for you to dress in line with the colour palette below. Think elegant, polished and celebratory, in soft earthy and refined tones.",
    image: '/welcome-dinner-dress-code.png',
    alt: 'Welcome dinner dress code guide showing the colour palette and outfit inspiration for ladies and gentlemen'
  },
  {
    title: 'Roora Day',
    note: 'Please feel free to wear traditional attire or semi-formal clothing that makes you feel comfortable and celebratory. Our colour theme is neutrals and earth tones. See the palette below for inspiration.',
    image: '/color_palette.jpeg?v=2',
    alt: 'Natural earth tone colour palette for the Roora day dress code'
  }
]
</script>

<style scoped>
.dress-code-page {
  padding-top: 100px;
  min-height: 100vh;
}

.dress-hero {
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
}

.dress-content {
  background-color: var(--bg-primary);
}

.dress-guide {
  max-width: 760px;
  margin: 0 auto var(--spacing-4xl);
  text-align: center;
}

.dress-guide:last-child {
  margin-bottom: 0;
}

.dress-guide-title {
  font-size: var(--font-size-3xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.dress-guide-note {
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-xl);
}

.dress-guide-image-link {
  display: block;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.dress-guide-image-link:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.dress-guide-image {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .page-title {
    font-size: var(--font-size-4xl);
  }
}
</style>
