<template>
  <div class="story-page">
    <!-- Side chapter navigator (desktop) -->
    <nav class="chapter-nav" aria-label="Story chapters">
      <button
        v-for="(chapter, i) in chapters"
        :key="'dot-' + (chapter.id || i)"
        class="chapter-dot"
        :class="{ active: activeIndex === i }"
        type="button"
        @click="goToChapter(i)"
        :aria-label="`Go to ${chapter.title}`"
      >
        <span class="dot-label">{{ chapter.title }}</span>
      </button>
    </nav>

    <!-- Intro slide -->
    <section class="story-intro" ref="introRef">
      <div class="intro-inner">
        <p class="intro-eyebrow">Adefemi &amp; Percyline</p>
        <h1 class="intro-title">Our Story</h1>
        <p class="intro-sub">A love story, told one chapter at a time</p>
        <button class="scroll-cue" type="button" @click="goToChapter(0)" aria-label="Begin the story">
          <span class="scroll-cue-text">Begin</span>
          <span class="scroll-cue-arrow" aria-hidden="true"></span>
        </button>
      </div>
      <div class="intro-glow" aria-hidden="true"></div>
    </section>

    <!-- Chapters -->
    <section class="chapters">
      <article
        v-for="(chapter, index) in chapters"
        :key="chapter.id || index"
        class="chapter"
        :class="{ 'chapter--alt': index % 2 === 1, 'in-view': !!visible[index] }"
        :ref="(el) => setChapterRef(el, index)"
      >
        <div class="chapter-figure">
          <button
            class="chapter-figure-frame"
            type="button"
            @pointerdown="createRipple"
            @click="openInGallery(chapter)"
            :aria-label="`View ${chapter.title} photos in the gallery`"
          >
            <img :src="chapter.image" :alt="chapter.title" loading="lazy" />
            <span class="figure-overlay" aria-hidden="true">
              <span class="figure-overlay-text">View in gallery</span>
            </span>
          </button>
        </div>

        <div class="chapter-text">
          <div class="chapter-date">{{ formatDate(chapter.date) }}</div>
          <h2 class="chapter-title">{{ chapter.title }}</h2>
          <p v-if="chapter.location" class="chapter-location">
            <span class="location-icon" aria-hidden="true">📍</span>{{ chapter.location }}
          </p>
          <p class="chapter-description">{{ chapter.description }}</p>
        </div>
      </article>
    </section>

    <!-- Closing slide -->
    <section
      class="story-closing"
      ref="closingRef"
      :class="{ 'in-view': closingVisible }"
    >
      <div class="closing-inner">
        <span class="closing-mark" aria-hidden="true">&#10084;</span>
        <h2>And the story continues…</h2>
        <p>
          With our Roora celebration now a cherished memory, we are so grateful to
          have shared this chapter with the people we love. The best is yet to come.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, onBeforeUpdate, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { getFirstImageByLocation } from '../utils/imageLoader.js'

const router = useRouter()

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// --- Chapter data (chronological) ---
const milestones = ref([
  {
    id: '2',
    date: '2024-04-15',
    title: 'First Date',
    description:
      "Our first meeting was also our first date at Ayla. There was heavy rain and wind, and she even lost her umbrella on the way, but she made it, and I was there wondering why she wasn't travelling with one. We talked for hours, and I knew this was something special.",
    location: 'Ayla Restaurant, Rotterdam',
    gallery: 'Netherlands',
    image:
      getFirstImageByLocation('Netherlands') ||
      getFirstImageByLocation('Rotterdam') ||
      'https://via.placeholder.com/800x600?text=First+Date'
  },
  {
    id: '3',
    date: '2024-06-15',
    title: 'First Trip Together',
    description:
      'Our first vacation together. We explored Munich and created beautiful memories that we still talk about today.',
    location: 'Munich, Germany',
    gallery: 'Munich',
    image: getFirstImageByLocation('Munich') || 'https://via.placeholder.com/800x600?text=Munich'
  },
  {
    id: '6',
    date: '2024-09-14',
    title: 'Rome Adventure',
    description:
      "A trip to Rome for Percy's 24th birthday. Exploring the beautiful city together, every moment was magical.",
    location: 'Rome, Italy',
    gallery: 'Rome',
    image: getFirstImageByLocation('Rome, Italy') || 'https://via.placeholder.com/800x600?text=Rome'
  },
  {
    id: '8',
    date: '2025-05-01',
    title: "Croatia for Adefemi's Birthday",
    description:
      "A trip to Croatia to celebrate Adefemi's birthday. Stunning coastlines, sunshine, and unforgettable memories together.",
    location: 'Croatia',
    gallery: 'Croatia',
    image: getFirstImageByLocation('Croatia') || 'https://via.placeholder.com/800x600?text=Croatia'
  },
  {
    id: '9',
    date: '2025-09-01',
    title: 'Gran Canary Escape',
    description:
      "A trip to Gran Canary for Percy's 25th birthday. Relaxing in the sun and enjoying each other's company.",
    location: 'Gran Canary, Spain',
    gallery: 'Gran Canary',
    image: getFirstImageByLocation('Gran Canary') || 'https://via.placeholder.com/800x600?text=Gran+Canary'
  },
  {
    id: '4',
    date: '2025-12-25',
    title: 'First Christmas Together',
    description:
      'Celebrating our first holiday season together on a road trip through the Alpine countries.',
    location: 'Innsbruck',
    gallery: 'Innsbruck',
    image:
      getFirstImageByLocation('December 2025') ||
      getFirstImageByLocation('Innsbruck') ||
      'https://via.placeholder.com/800x600?text=Christmas'
  },
  {
    id: '10',
    date: '2026-05-01',
    title: 'Chongqing, China',
    description:
      "We travelled to Chongqing to celebrate love twice. Over standing beside our friend Chung and Xue on their wedding day, and marking Adefemi's birthday in one of China's most spectacular cities. New flavours, new sights, and the joy of celebrating the people we love far from home.",
    location: 'Chongqing, China',
    gallery: 'China',
    image: getFirstImageByLocation('China') || 'https://via.placeholder.com/800x600?text=Chongqing'
  },
  {
    id: '11',
    date: '2026-07-25',
    title: 'The Surprise Proposal',
    description:
      'A beautiful surprise proposal in Stockholm, filled with love, happy tears, and the beginning of our forever.',
    location: 'Stockholm, Sweden',
    gallery: 'Proposal',
    image: getFirstImageByLocation('Proposal') || 'https://via.placeholder.com/800x600?text=Proposal'
  }
])

const chapters = computed(() =>
  [...milestones.value].sort((a, b) => new Date(a.date) - new Date(b.date))
)

// --- Refs / reveal state ---
const introRef = ref(null)
const closingRef = ref(null)
const closingVisible = ref(false)
const activeIndex = ref(0)
const visible = reactive({})

let chapterEls = []
const setChapterRef = (el, index) => {
  if (el) chapterEls[index] = el
}
onBeforeUpdate(() => {
  chapterEls = []
})

let revealObserver = null
let activeObserver = null
let rippleObserver = null

const goToChapter = (i) => {
  const el = chapterEls[i]
  if (!el) return
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'center'
  })
}

const setupObservers = () => {
  if (typeof window === 'undefined') return

  // Reduced motion: reveal everything immediately, skip the active tracker
  if (prefersReducedMotion()) {
    chapters.value.forEach((_, i) => {
      visible[i] = true
    })
    closingVisible.value = true
    return
  }

  if (revealObserver) revealObserver.disconnect()
  if (activeObserver) activeObserver.disconnect()
  if (rippleObserver) rippleObserver.disconnect()

  // Reveal animation as each chapter enters the viewport
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = Number(entry.target.dataset.index)
        if (entry.isIntersecting) {
          if (entry.target === closingRef.value) {
            closingVisible.value = true
          } else if (!Number.isNaN(idx)) {
            visible[idx] = true
          }
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2, rootMargin: '0px 0px -12% 0px' }
  )

  // Ripple each photo every time it crosses a band near the middle of the
  // screen. Observing the photo (not the tall chapter) with a rootMargin band
  // makes this fire reliably on every pass, in both scroll directions.
  rippleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) rippleIn(entry.target)
      })
    },
    { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
  )

  // Track which chapter crosses the viewport's center to highlight the navigator
  activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index)
          if (!Number.isNaN(idx)) activeIndex.value = idx
        }
      })
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  )

  chapterEls.forEach((el, i) => {
    if (!el) return
    el.dataset.index = String(i)
    revealObserver.observe(el)
    activeObserver.observe(el)
    rippleObserver.observe(el)
  })

  if (closingRef.value) revealObserver.observe(closingRef.value)
}

const onKeydown = (e) => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
  // Only hijack arrows when the story page has focus context (no inputs)
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  e.preventDefault()
  const next =
    e.key === 'ArrowDown'
      ? Math.min(activeIndex.value + 1, chapters.value.length - 1)
      : Math.max(activeIndex.value - 1, 0)
  goToChapter(next)
}

onMounted(async () => {
  await nextTick()
  setupObservers()
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (revealObserver) revealObserver.disconnect()
  if (activeObserver) activeObserver.disconnect()
  if (rippleObserver) rippleObserver.disconnect()
  window.removeEventListener('keydown', onKeydown)
})

// Soft ripple that sweeps across a chapter section (behind the content) as it
// scrolls through the middle of the screen.
const rippleIn = (chapterEl) => {
  if (prefersReducedMotion()) return
  const rect = chapterEl.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 1.6

  const ripple = document.createElement('span')
  ripple.className = 'lane-ripple'
  Object.assign(ripple.style, {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    left: `${rect.width / 2 - size / 2}px`,
    top: `${rect.height / 2 - size / 2}px`,
    borderRadius: '50%',
    background:
      'radial-gradient(circle, color-mix(in srgb, var(--primary-color) 22%, transparent) 0%, color-mix(in srgb, var(--primary-color) 8%, transparent) 45%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: '0'
  })
  chapterEl.appendChild(ripple)

  const anim = ripple.animate(
    [
      { transform: 'scale(0)', opacity: 0.6 },
      { transform: 'scale(1)', opacity: 0 }
    ],
    { duration: 1200, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
  )
  anim.onfinish = () => ripple.remove()
}

const createRipple = (event) => {
  if (prefersReducedMotion()) return
  const button = event.currentTarget
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)

  const ripple = document.createElement('span')
  Object.assign(ripple.style, {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    left: `${event.clientX - rect.left - size / 2}px`,
    top: `${event.clientY - rect.top - size / 2}px`,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.45)',
    pointerEvents: 'none',
    zIndex: '2'
  })
  button.appendChild(ripple)

  const anim = ripple.animate(
    [
      { transform: 'scale(0)', opacity: 0.5 },
      { transform: 'scale(1)', opacity: 0 }
    ],
    { duration: 600, easing: 'ease-out' }
  )
  anim.onfinish = () => ripple.remove()
}

const openInGallery = (chapter) => {
  router.push({
    name: 'Gallery',
    query: chapter.gallery ? { place: chapter.gallery } : {}
  })
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' })
}
</script>

<style scoped>
.story-page {
  position: relative;
  min-height: 100vh;
  background-color: var(--bg-primary);
  overflow-x: clip;
}

/* ---------- Side chapter navigator ---------- */
.chapter-nav {
  position: fixed;
  top: 50%;
  right: clamp(12px, 2vw, 28px);
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 40;
}

.chapter-dot {
  position: relative;
  width: 12px;
  height: 12px;
  padding: 0;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: all var(--transition-base);
}

.chapter-dot:hover {
  background: var(--primary-light);
}

.chapter-dot.active {
  background: var(--primary-color);
  transform: scale(1.35);
  box-shadow: 0 0 0 4px var(--primary-light);
}

.dot-label {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%) translateX(8px);
  white-space: nowrap;
  background: var(--primary-color);
  color: var(--text-light);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.chapter-dot:hover .dot-label {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* ---------- Intro slide ---------- */
.story-intro {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px var(--spacing-lg) var(--spacing-4xl);
  background: linear-gradient(160deg, var(--bg-secondary) 0%, var(--bg-primary) 70%);
  overflow: hidden;
}

.intro-glow {
  position: absolute;
  width: 60vmax;
  height: 60vmax;
  top: -20vmax;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, var(--primary-light) 0%, transparent 60%);
  opacity: 0.5;
  pointer-events: none;
}

.intro-inner {
  position: relative;
  z-index: 1;
}

.intro-eyebrow {
  text-transform: uppercase;
  letter-spacing: 6px;
  font-size: var(--font-size-sm);
  color: var(--secondary-color);
  margin-bottom: var(--spacing-md);
  opacity: 0;
  animation: introFade 0.8s ease 0.1s forwards;
}

.intro-title {
  font-size: clamp(2.75rem, 9vw, 6rem);
  line-height: 1.05;
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
  opacity: 0;
  animation: introFade 0.9s ease 0.25s forwards;
}

.intro-sub {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  opacity: 0;
  animation: introFade 0.9s ease 0.4s forwards;
}

.scroll-cue {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color);
  opacity: 0;
  animation: introFade 0.9s ease 0.6s forwards;
}

.scroll-cue-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.scroll-cue-arrow {
  width: 16px;
  height: 16px;
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  transform: rotate(45deg);
  animation: bounceArrow 1.8s ease-in-out infinite;
}

@keyframes introFade {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceArrow {
  0%, 100% { transform: rotate(45deg) translate(0, 0); }
  50% { transform: rotate(45deg) translate(4px, 4px); }
}

/* ---------- Chapters ---------- */
.chapters {
  position: relative;
}

.chapter {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: clamp(var(--spacing-2xl), 6vw, var(--spacing-4xl));
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(var(--spacing-2xl), 7vh, var(--spacing-4xl)) var(--spacing-2xl);
  overflow: hidden;
  isolation: isolate;
}

.chapter--alt .chapter-figure {
  order: 2;
}

/* ---- Figure ---- */
.chapter-figure {
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  transition: opacity 0.9s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.chapter.in-view .chapter-figure {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.chapter-figure-frame {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  aspect-ratio: 4 / 3;
  cursor: pointer;
}

.figure-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: var(--spacing-lg);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 55%);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.figure-overlay-text {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-light);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: 1px;
  text-transform: uppercase;
  transform: translateY(8px);
  transition: transform var(--transition-base);
}

.figure-overlay-text::before {
  content: '\1F50D';
  font-size: var(--font-size-base);
}

.chapter-figure-frame:hover .figure-overlay,
.chapter-figure-frame:focus-visible .figure-overlay {
  opacity: 1;
}

.chapter-figure-frame:hover .figure-overlay-text,
.chapter-figure-frame:focus-visible .figure-overlay-text {
  transform: translateY(0);
}

.chapter-figure-frame:focus-visible {
  outline: 3px solid var(--primary-color);
  outline-offset: 3px;
}

.chapter-figure-frame img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  background-color: var(--neutral-light-gray);
  transform: scale(1.05);
}

/* Slow Ken Burns zoom while the chapter is on screen */
.chapter.in-view .chapter-figure-frame img {
  animation: kenBurns 14s ease-in-out forwards;
}

@keyframes kenBurns {
  from { transform: scale(1.05); }
  to { transform: scale(1.16); }
}

/* ---- Text ---- */
.chapter-text {
  position: relative;
  z-index: 1;
}

.chapter-text > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.chapter.in-view .chapter-text > * {
  opacity: 1;
  transform: translateY(0);
}

.chapter.in-view .chapter-text > *:nth-child(1) { transition-delay: 0.1s; }
.chapter.in-view .chapter-text > *:nth-child(2) { transition-delay: 0.2s; }
.chapter.in-view .chapter-text > *:nth-child(3) { transition-delay: 0.3s; }
.chapter.in-view .chapter-text > *:nth-child(4) { transition-delay: 0.4s; }

.chapter-date {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.chapter-title {
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  line-height: 1.15;
}

.chapter-location {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
}

.chapter-description {
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
}

/* ---------- Closing slide ---------- */
.story-closing {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-4xl) var(--spacing-lg);
  background: linear-gradient(160deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.closing-inner {
  max-width: 640px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.story-closing.in-view .closing-inner {
  opacity: 1;
  transform: translateY(0);
}

.closing-mark {
  display: block;
  font-size: var(--font-size-5xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
  animation: heartBeat 2.4s ease-in-out infinite;
}

.story-closing h2 {
  font-size: var(--font-size-3xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
}

.story-closing p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.18); }
  30% { transform: scale(1); }
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .chapter-nav {
    display: none;
  }

  .chapter {
    grid-template-columns: 1fr;
    min-height: auto;
    gap: var(--spacing-xl);
    padding: var(--spacing-4xl) var(--spacing-lg);
  }

  .chapter--alt .chapter-figure {
    order: 0;
  }

  .chapter-title {
    font-size: clamp(1.75rem, 7vw, 2.25rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro-eyebrow,
  .intro-title,
  .intro-sub,
  .scroll-cue,
  .scroll-cue-arrow,
  .closing-mark {
    opacity: 1;
    animation: none;
  }

  .chapter-figure,
  .chapter-text > *,
  .closing-inner {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .chapter-figure-frame img {
    transform: scale(1);
    animation: none;
  }
}
</style>
