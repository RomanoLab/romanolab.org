# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Romano Lab website (romanolab.org), built with Astro 5 and Tailwind CSS 4. It's a static site showcasing research, people, publications, and contact information for the Romano Lab at University of Pennsylvania.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |
| `npm run astro ...` | Run Astro CLI commands |

## Architecture

### Tech Stack
- **Astro 5** - Static site generator with component-based architecture
- **Tailwind CSS 4** - Styling framework via Vite plugin
- **MDX** - Markdown with JSX support for content
- **TypeScript** - Strict configuration extending astro/tsconfigs/strict

### Directory Structure
```
src/
├── components/     # Reusable Astro components
├── layouts/        # Page layout templates (Layout.astro)
├── pages/          # Route-based pages (index, people, research, etc.)
├── data/           # JSON data files (people.json, publications.json, research.json)
├── styles/         # Global CSS (global.css with Tailwind)
├── assets/         # Static assets
└── _includes/      # Include files
```

### Key Components
- **Layout.astro** - Main layout with navigation, includes responsive mobile menu
- **Welcome.astro** - Homepage welcome component
- **Data-driven pages** - People, publications, and research pages consume JSON data files

### Content Management
The site uses JSON files in `src/data/` for content:
- `people.json` - Lab members and affiliations
- `publications.json` - Research publications
- `research.json` - Research areas and funding information

### Styling
- Global styles in `src/styles/global.css`
- Uses Tailwind CSS 4 via Vite plugin
- Mobile-responsive navigation with hamburger menu
- Google Fonts integration (Voces font family)
- Dark theme by default (`data-theme="dark"`)

### Configuration
- Site URL configured as 'https://romanolab.org' in astro.config.mjs
- Static output with sitemap generation
- TypeScript with strict configuration