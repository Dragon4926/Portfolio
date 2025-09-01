# Copilot Instructions for Dragon4926 Portfolio

## Repository Overview

This is a personal portfolio website for **Debopriyo (@Dragon4926)**, a full-stack developer and AI enthusiast. The repository has been transformed from a terminal-based interface to a modern, interactive GUI built with Next.js.

## Tech Stack & Architecture

### Core Framework
- **Next.js 15** with App Router (React 19, TypeScript)
- **Tailwind CSS 4.x** for styling with custom CSS variables
- **Framer Motion** for animations and transitions
- **Lucide React** for icons

### Key Dependencies
- `@radix-ui/*` components for accessible UI primitives
- `class-variance-authority` and `clsx` for conditional styling
- `axios` for API requests
- `express` with rate limiting and security middleware for legacy routes

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes for GitHub integration
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main portfolio page
│   └── globals.css     # Global styles and CSS variables
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── Hero.tsx       # Landing section with typewriter effect
│   ├── AboutSection.tsx # About me with quick facts
│   ├── ProjectsSection.tsx # GitHub projects integration
│   ├── Terminal.tsx   # Legacy terminal interface component
│   └── ThemeToggle.tsx # Dark/light mode toggle
├── lib/
│   └── utils.ts       # Utility functions (cn, etc.)
└── types/             # TypeScript type definitions
```

## Development Guidelines

### Code Style & Conventions
- Use TypeScript for all new code with strict type checking
- Follow functional React patterns with hooks
- Use Tailwind classes with the `cn()` utility for conditional styling
- Implement responsive design mobile-first approach
- Use semantic HTML with proper accessibility attributes

### Component Patterns
- Create reusable UI components in `src/components/ui/`
- Use Framer Motion for smooth animations and page transitions
- Implement proper loading states and error handling
- Follow the existing component structure and naming conventions

### Styling Guidelines
- Use Tailwind CSS classes exclusively for styling
- Leverage CSS variables defined in `globals.css` for theming
- Implement glass morphism effects and modern design patterns
- Ensure all components are responsive across device sizes
- Support both dark and light themes

### API Integration
- GitHub API integration for fetching real-time project data
- Use Next.js API routes for server-side operations
- Implement proper error handling and rate limiting
- Secure API endpoints with appropriate middleware

## Key Features

### Portfolio Sections
1. **Hero** - Animated landing with typewriter effect and social links
2. **About** - Personal information with interactive quick facts cards
3. **Projects** - Dynamic GitHub repository showcase with live data
4. **Skills** - Categorized technical skills with hover effects
5. **Contact** - Multiple contact methods with engaging UI

### Technical Features
- **Performance**: Optimized with Next.js static generation
- **SEO**: Comprehensive metadata and Open Graph tags
- **Accessibility**: ARIA labels and semantic HTML
- **Security**: Rate limiting and content security policies
- **Responsiveness**: Mobile-first responsive design
- **Theme Support**: Dark/light mode toggle functionality

## Legacy Support

The portfolio maintains backward compatibility with a terminal interface:
- Legacy routes redirect to the modern GUI
- Terminal component preserved for historical reference
- Express server configuration for legacy hosting

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm start           # Start production server
npm run lint        # ESLint code checking
npm run legacy-start # Start legacy Express server
```

## Environment Variables

Required for full functionality:
```
GITHUB_TOKEN=your_github_personal_access_token
```

## Deployment

- **Primary**: Vercel (configured with `vercel.json`)
- **Domain**: https://dragon4926.vercel.app
- **Build**: Next.js static export with optimized assets

## Code Quality

- ESLint configuration with Next.js rules
- TypeScript strict mode enabled
- Git hooks for code quality (if implemented)
- Component-level TypeScript interfaces

## When Contributing

1. **Bug Fixes**: Focus on minimal, surgical changes
2. **New Features**: Follow existing patterns and component structure
3. **UI Changes**: Maintain design consistency and responsiveness
4. **Performance**: Consider Next.js optimization best practices
5. **Accessibility**: Ensure all interactive elements are accessible
6. **Testing**: Validate changes across different screen sizes and themes

## Special Notes

- This is a personal portfolio, so maintain professional and clean presentation
- The owner (Dragon4926/Debopriyo) is based in India and focuses on full-stack development and AI
- Performance and SEO are priorities for this portfolio website
- The design emphasizes modern, clean aesthetics with smooth animations
- GitHub integration should always display up-to-date project information