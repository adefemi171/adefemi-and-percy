# Adefemi & Percyline - Family Events Website

A beautiful, multi-page Vue.js website for celebrating family events including Roora (engagement) and Wedding celebrations.

## Features

- **Homepage**: Welcome page with event overview
- **Roora Page**: Countdown timer, event itinerary, and RSVP form
- **Wedding Page**: Placeholder for upcoming wedding details
- **Gallery**: Filterable photo gallery by location, event, and place
- **Our Story**: Timeline of Adefemi & Percyline's journey
- **FAQs**: Accordion-style frequently asked questions
- **Registry**: Hybrid gift registry (physical items, cash funds, experiences)

## Technology Stack

- Vue 3 with Composition API
- Vue Router 4
- Vite
- CSS with Design Tokens

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Configuration

### RSVP Form

The RSVP form is set up to use Formspree. To configure:

1. Create an account at [formspree.io](https://formspree.io)
2. Create a new form and get your form endpoint
3. Update the `FORMSPREE_ENDPOINT` constant in `src/components/RSVPForm.vue`:
```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
```

Alternatively, you can use EmailJS by modifying the form submission logic.

### Love Jar (Firebase / Firestore)

The Love Jar stores notes in Firebase Firestore so they are shared across devices.

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** (test mode is fine for development)
3. Register a **Web app** and copy the config
4. Copy `.env.example` to `.env.local` and fill in your Firebase config (all `VITE_FIREBASE_*` variables)
5. For **Netlify** (or other hosts), add the same `VITE_FIREBASE_*` environment variables in the site’s build settings

Firestore security rules: allow read and create on the `loveJarNotes` collection (and optionally restrict delete/update). See [Firestore security rules](https://firebase.google.com/docs/firestore/security/get-started).

### Background music

A play/pause toggle for background music appears on all pages (bottom-right). To add your track:

1. Add your MP3 to the `public/` folder (e.g. `La_Mer_Charles_Trenet.mp3`). The component uses this file; to change it, edit the `src` in `src/components/BackgroundMusic.vue`.
2. The user’s choice (on/off) is saved in the browser so it persists across visits.

### Design Tokens

Update the color palette in `src/assets/styles/tokens.css` with colors from your Figma template:

1. Open the Figma template: https://www.figma.com/community/file/1118254401144099088
2. Extract color codes using Figma's color picker
3. Update the CSS variables in `tokens.css`

### Event Dates

Update the Roora date in `src/views/RooraPage.vue`:
```javascript
const rooraDate = ref('2025-06-15T18:00:00') // Update with actual date
```

### Content Customization

- **Itinerary**: Update `itinerary` array in `src/views/RooraPage.vue`
- **Gallery Images**: Add images to `src/assets/images/` and update the `images` array in `src/views/GalleryPage.vue`
- **Story Milestones**: Update `milestones` array in `src/views/OurStoryPage.vue`
- **FAQs**: Update `faqs` array in `src/views/FAQsPage.vue`
- **Registry**: Update registry information in `src/views/RegistryPage.vue`

## Project Structure

```
src/
├── components/
│   ├── CountdownTimer.vue
│   ├── RSVPForm.vue
│   ├── GalleryFilter.vue
│   ├── Navigation.vue
│   └── Footer.vue
├── views/
│   ├── HomePage.vue
│   ├── RooraPage.vue
│   ├── WeddingPage.vue
│   ├── GalleryPage.vue
│   ├── OurStoryPage.vue
│   ├── FAQsPage.vue
│   └── RegistryPage.vue
├── router/
│   └── index.js
├── assets/
│   ├── images/
│   └── styles/
│       ├── tokens.css
│       └── main.css
├── App.vue
└── main.js
```

## Customization

### Colors

All colors are defined in `src/assets/styles/tokens.css` as CSS variables. Update these to match your Figma template.

### Typography

Fonts are loaded from Google Fonts in `index.html`. The design tokens define font families, sizes, and weights.

### Images

Add your images to `src/assets/images/` and update the image paths in the respective components.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project for Adefemi & Percyline

## Notes

- The RSVP form currently uses a placeholder endpoint. Configure Formspree or EmailJS for actual submissions.
- Gallery images use placeholder URLs. Replace with actual image paths.
- Registry links are placeholders. Update with actual registry URLs.
- Payment handles in the Registry page need to be updated with actual information.
