<template>
  <div class="faqs-page">
    <section class="section faqs-hero">
      <div class="container">
        <h1 class="page-title">Frequently Asked Questions</h1>
        <p class="page-subtitle">Everything you need to know about our celebrations</p>
      </div>
    </section>

    <section class="section faqs-content">
      <div class="container">
        <div class="faqs-list">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="faq-item"
          >
            <button 
              class="faq-question"
              @click="toggleFaq(index)"
              :aria-expanded="faq.open"
            >
              <span class="faq-text">{{ faq.question }}</span>
              <span class="faq-icon" :class="{ 'open': faq.open }">+</span>
            </button>
            <div class="faq-answer" :class="{ 'open': faq.open }">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div class="faqs-contact">
          <h2>Still have questions?</h2>
          <p>If you have any other questions, please don't hesitate to reach out to us.</p>
          <!-- Add contact information here -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'What is Roora?',
    answer: 'Roora is a traditional engagement ceremony that celebrates the coming together of two families. It\'s a beautiful cultural celebration that marks an important milestone in our journey.',
    open: false
  },
  {
    question: 'When is the Roora celebration?',
    answer: 'The Roora celebration is scheduled for August, 2026. Please check the Roora page for the exact date and time.',
    open: false
  },
  {
    question: 'Do I need to RSVP?',
    answer: 'Yes, please RSVP through our website so we can plan accordingly. You can find the RSVP form on the Roora page.',
    open: false
  },
  {
    question: 'What should I wear?',
    answer: 'We recommend [dress code]. Please feel free to wear traditional attire or semi-formal clothing that makes you feel comfortable and celebratory.',
    open: false
  },
  {
    question: 'Can I bring a plus one?',
    answer: 'Please indicate the number of guests when you RSVP. We\'d love to celebrate with your loved ones!',
    open: false
  },
  {
    question: 'Will there be food and drinks?',
    answer: 'Yes, we\'ll be providing a full meal and refreshments. Please let us know of any dietary restrictions when you RSVP.',
    open: false
  },
  {
    question: 'What about the wedding?',
    answer: 'Wedding details are still being finalized. We\'ll update the website as soon as we have more information. You can sign up for updates on the Wedding page.',
    open: false
  },
  {
    question: 'Where can I find gift registry information?',
    answer: 'You can find all gift registry information on our Registry page. We appreciate your thoughtfulness!',
    open: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}
</script>

<style scoped>
.faqs-page {
  padding-top: 100px;
  min-height: 100vh;
}

.faqs-hero {
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

.faqs-content {
  background-color: var(--bg-primary);
}

.faqs-list {
  max-width: 800px;
  margin: 0 auto var(--spacing-4xl);
}

.faq-item {
  background: var(--bg-primary);
  border: 1px solid var(--neutral-light-gray);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-md);
  overflow: hidden;
  transition: box-shadow var(--transition-base);
}

.faq-item:hover {
  box-shadow: var(--shadow-md);
}

.faq-question {
  width: 100%;
  padding: var(--spacing-xl);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  transition: background-color var(--transition-base);
}

.faq-question:hover {
  background-color: var(--bg-secondary);
}

.faq-text {
  flex: 1;
  margin-right: var(--spacing-md);
}

.faq-icon {
  font-size: var(--font-size-3xl);
  color: var(--primary-color);
  font-weight: var(--font-weight-light);
  transition: transform var(--transition-base);
  line-height: 1;
}

.faq-icon.open {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-base), padding var(--transition-base);
  padding: 0 var(--spacing-xl);
}

.faq-answer.open {
  max-height: 500px;
  padding: 0 var(--spacing-xl) var(--spacing-xl);
}

.faq-answer p {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.faqs-contact {
  text-align: center;
  padding: var(--spacing-4xl);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  max-width: 600px;
  margin: 0 auto;
}

.faqs-contact h2 {
  font-size: var(--font-size-2xl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.faqs-contact p {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .page-title {
    font-size: var(--font-size-4xl);
  }
  
  .faq-question {
    font-size: var(--font-size-base);
    padding: var(--spacing-lg);
  }
}
</style>
