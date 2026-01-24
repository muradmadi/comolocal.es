# ComoLocal

A high-performance web application for discovering Madrid's nightlife and social scene. Built for students and locals who want verified intel on the city's best bars, clubs, and events—without the tourist markup.

---

## Technology Stack

Built using a modern Jamstack architecture optimized for speed and reliability.

- **Framework**: [Astro](https://astro.build/) with server-first rendering
- **Styling**: TailwindCSS with a custom design system
- **Data Layer**: Headless WordPress via WPGraphQL
- **Type Safety**: TypeScript

---

## Features

### Venue Discovery
Comprehensive listings of Madrid's bars and clubs with verified details including cover charges, guest list availability, and student discounts.

### Event Tracking
Real-time event listings with venue connections, helping users find where the action is on any given night.

### Interactive Map
Geolocation-based discovery interface for finding nearby venues and navigating the city's neighborhoods.

### Content Hub
Curated guides and articles on Madrid's nightlife scene, with direct venue recommendations.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Access to the CMS endpoint (configured in `.env`)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview the build locally
npm run preview
```

---

## Project Structure

```text
src/
├── assets/           # Static assets (images, fonts)
├── components/       # UI components organized by domain
│   ├── cards/        # Card components (Venue, Blog, etc.)
│   ├── events/       # Event-related components
│   ├── layout/       # Header, Footer, Navigation
│   ├── map/          # Leaflet Map integration
│   ├── seo/          # SEO and meta components
│   ├── ui/           # Reusable UI primitives
│   └── venues/       # Venue-specific components
├── layouts/          # Global layout wrappers
├── lib/
│   ├── api/
│   │   └── wordpress.ts  # GraphQL fetching logic and queries
│   ├── seo/
│   │   └── schema-helpers.ts  # Structured data helpers
│   ├── utils.ts          # General utilities
│   └── venue-mapping.ts  # Venue data transformation
├── pages/
│   ├── index.astro       # Homepage and landing
│   ├── map.astro         # Interactive map interface
│   ├── blog/             # Blog and article pages
│   ├── venues/           # Venue detail pages
│   └── events/           # Event pages
├── styles/           # Global styles and Tailwind configuration
└── types/
    └── wordpress.d.ts    # TypeScript interfaces for WordPress data
```

---

## License

This project is proprietary. All rights reserved.
