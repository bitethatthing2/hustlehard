# The Side Hustle Bar

A progressive web application (PWA) for The Side Hustle Bar, providing location-based services, menu browsing, ordering options, and promotional content.

## Project Overview

This application enables users to:
- Install the app on their device as a PWA
- Enable notifications for updates and promotions
- Browse menu items and place orders for delivery or pickup
- View location-specific information
- Access exclusive content and merchandise

## Project Structure

The project follows a modular organization with components grouped by functionality:

```
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   ├── contact/            # Contact page
│   ├── events/             # Events page
│   ├── instructions/       # Installation instructions
│   ├── menu/               # Menu page
│   ├── order/              # Order page
│   ├── shop/               # Shop page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
│
├── components/             # React components organized by functionality
│   ├── hero/               # Hero section components
│   ├── location/           # Location-related components
│   ├── menu/               # Menu-related components
│   ├── navigation/         # Navigation components
│   ├── reviews/            # Review components
│   ├── shared/             # Shared/reusable components
│   ├── shop/               # Shop components
│   ├── social/             # Social media components
│   └── ui/                 # UI components (buttons, cards, etc.)
│
├── contexts/               # React context providers
│
├── hooks/                  # Custom React hooks
│
├── lib/                    # Utility libraries and services
│
├── public/                 # Static assets
│   ├── images/             # Image assets
│   ├── only_these/         # Special assets with specific paths
│   │   └── logos/          # Logo assets
│   ├── service-logos/      # Service provider logos
│   └── manifest.json       # PWA manifest
│
├── supabase/               # Supabase configuration
│
└── types/                  # TypeScript type definitions
```

## Recent Changes

### Code Organization Improvements (March 30, 2024)

1. **Component Reorganization**:
   - Moved navigation components to a dedicated `/components/navigation/` directory
   - Ensured all component imports are updated to reflect new locations
   - Created a more consistent directory structure

2. **Duplicate Removal**:
   - Removed duplicate HeroSection components
   - Removed duplicate navigation components
   - Consolidated shared components

3. **Unused Code Cleanup**:
   - Removed unused LocationInfo and LocationSelect components
   - Removed unused InfoSection component
   - Removed unused image assets

4. **Style Improvements**:
   - Enhanced cross-browser compatibility for scrollbar styling
   - Fixed vertical button stacking in the hero section

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## PWA Features

The application supports Progressive Web App features, including:

- Installable on iOS and Android devices
- Push notifications (requires permission)
- Offline functionality
- App-like experience

## Contact

For questions or support regarding this project, please contact the development team.