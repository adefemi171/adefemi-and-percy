# Adefemi & Percyline - Family Events Website

A multi-page Vue.js website for celebrating family events: Roora (engagement) and Wedding. The design uses a natural earth-tone colour palette (Clay, Fresh Bark, Olive, Sand, Herb, Seed Puff) with page-specific accents.

## Features

- **Homepage**: Welcome page with event overview (Clay & Olive theme)
- **Roora Page**: Countdown, itinerary, and RSVP form (August 28–29, 2026); RSVP success redirects to a thank-you page
- **Wedding Page**: Placeholder for upcoming wedding details
- **Gallery**: Photo gallery filterable by place
- **Our Story**: Timeline of Adefemi & Percyline’s journey (rope/knots style, filterable by type)
- **Love Jar**: Shared notes stored in Firebase Firestore
- **FAQs**: Accordion FAQs with dress-code colour palette image (Clay & Sand theme)
- **Registry**: Single “Ways to Give” section (physical items, cash funds, and experiences in one grid)
- **Background music**: Optional play/pause with preference saved in the browser

## Technology Stack

- Vue 3 (Composition API)
- Vue Router 4
- Vite
- CSS with design tokens and per-page theme overrides
- Firebase (Firestore) for Love Jar
- Formspree for RSVP

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

### Design (Colour palette & themes)

The site uses an **earth-tone palette** defined in `src/assets/styles/tokens.css`:

| Token            | Hex       | Use            |
|------------------|-----------|----------------|
| Clay             | `#7A534A` | Primary accent |
| Fresh Bark       | `#6F7E62` | Greens         |
| Olive            | `#B2AA87` | Secondary      |
| Sand             | `#D2B596` | Light accent   |
| Herb             | `#C0C5B8` | Sage / BG      |
| Seed Puff        | `#EDE4DD` | Main background|

The palette is based on `public/color_palette.jpeg`. Each page can use a different lead colour via `#app[data-page="…"]` overrides in `tokens.css` (e.g. Home: Clay & Olive; FAQs: Clay & Sand). To change a page’s theme, edit the corresponding `#app[data-page="…"]` block.

### Event dates

Roora date and itinerary are in `src/views/RooraPage.vue`. Update the `rooraDate` and `itinerary` arrays as needed.

### Content customization

- **Gallery**: Add images under `src/assets/images/` (folder per place); the app discovers them via `src/utils/imageLoader.js`. Filter is by place only.
- **Our Story**: Edit `milestones` and narrative in `src/views/OurStoryPage.vue`; images are loaded from `src/assets/images/` (see `imageLoader.js`).
- **FAQs**: Edit the `faqs` array in `src/views/FAQsPage.vue`. The “What should I wear?” answer can include an image (e.g. `public/color_palette.jpeg`).
- **Registry**: Edit the `registryItems` computed in `src/views/RegistryPage.vue` (physical, cash, and experience entries in one list).

## Project structure

```
src/
├── components/
│   ├── BackgroundMusic.vue
│   ├── CountdownTimer.vue
│   ├── RSVPForm.vue
│   ├── GalleryFilter.vue
│   ├── Navigation.vue
│   ├── Footer.vue
│   └── AddNoteForm.vue       (Love Jar)
├── views/
│   ├── HomePage.vue
│   ├── RooraPage.vue
│   ├── RSVPThankYouPage.vue
│   ├── WeddingPage.vue
│   ├── GalleryPage.vue
│   ├── OurStoryPage.vue
│   ├── LoveJarPage.vue
│   ├── FAQsPage.vue
│   └── RegistryPage.vue
├── router/
│   └── index.js              (routes + scroll behavior)
├── utils/
│   └── imageLoader.js       (Gallery & Our Story images)
├── assets/
│   └── styles/
│       ├── tokens.css        (palette + per-page themes)
│       └── main.css
├── firebase.js               (Firestore for Love Jar)
├── App.vue
└── main.js
public/
├── color_palette.jpeg        (dress-code palette; referenced in FAQs)
└── La_Mer_Charles_Trenet.mp3 (optional background music)
```

## Customization

### Colours

Global and page-specific colours live in `src/assets/styles/tokens.css`: palette variables (`--palette-clay`, etc.) and semantic tokens (`--primary-color`, `--bg-secondary`, etc.). Per-page overrides use `#app[data-page="route-name"]` (e.g. `fa-qs` for FAQs).

### Typography

Fonts are loaded from Google Fonts in `index.html`. Families, sizes, and weights are in `tokens.css`.

### Images

- **Gallery & Our Story**: Add images under `src/assets/images/` (one folder per place/event). `src/utils/imageLoader.js` discovers them; see `IMAGE_OPTIMIZATION.md` for optimisation scripts.
- **Static assets** (e.g. dress-code palette): Place in `public/` and reference by path (e.g. `/color_palette.jpeg`).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project for Adefemi & Percyline

## Notes

- **RSVP**: Formspree endpoint is set in `RSVPForm.vue`; successful submit redirects to `/rsvp/thank-you`.
- **Love Jar**: Requires Firebase project and `VITE_FIREBASE_*` env vars (see Configuration).
- **Registry**: Update links and handles in the `registryItems` computed in `RegistryPage.vue`.
- **Deployment**: Build with `npm run build`; `dist/` is published. Netlify config is in `netlify.toml` (SPA redirect).
