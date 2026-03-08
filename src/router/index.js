import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RooraPage from '../views/RooraPage.vue'
import WeddingPage from '../views/WeddingPage.vue'
import GalleryPage from '../views/GalleryPage.vue'
import OurStoryPage from '../views/OurStoryPage.vue'
import LoveJarPage from '../views/LoveJarPage.vue'
import FAQsPage from '../views/FAQsPage.vue'
import RegistryPage from '../views/RegistryPage.vue'
import RSVPThankYouPage from '../views/RSVPThankYouPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/roora',
    name: 'Roora',
    component: RooraPage
  },
  {
    path: '/rsvp/thank-you',
    name: 'RSVPThankYou',
    component: RSVPThankYouPage
  },
  {
    path: '/wedding',
    name: 'Wedding',
    component: WeddingPage
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: GalleryPage
  },
  {
    path: '/our-story',
    name: 'OurStory',
    component: OurStoryPage
  },
  {
    path: '/love-jar',
    name: 'LoveJar',
    component: LoveJarPage
  },
  {
    path: '/faqs',
    name: 'FAQs',
    component: FAQsPage
  },
  {
    path: '/registry',
    name: 'Registry',
    component: RegistryPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
