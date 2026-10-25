# Portfolio Website

A modern personal portfolio and profile website built with Next.js, React, TypeScript, and Tailwind CSS. The project is designed to showcase experience, skills, and work while also including a contact flow, multilingual support, and an admin area.

## Overview

This portfolio is built as a responsive multi-page application with a polished visual design and subtle motion effects. It currently focuses on:

- a landing page with animated hero content
- an about section with storytelling cards and reveal transitions
- a skills overview with data visualization
- a project-oriented portfolio structure
- a contact form with backend mail handling
- an admin login flow and protected dashboard area
- a kanban-style admin page prototype
- multilingual support with language switching
- light and dark mode support

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- shadcn-style UI components
- Zod and React Hook Form
- Lucide React icons
- Visx for charting and data visualizations

## Project Structure

```bash
.
├── app/                 # App router pages and layouts
├── api/                 # API route handlers
├── components/          # Reusable UI and feature components
├── context/             # React context providers
├── lib/                 # Shared logic, translations, and utilities
├── public/              # Static assets and PHP mail endpoint
├── docs/                # Project documentation
├── package.json         # Scripts and dependencies
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── eslint.config.mjs    # ESLint configuration
├── components.json      # UI component configuration
├── README.md            # Project documentation
└── .gitignore
```

## Features

### User-facing experience

- responsive portfolio layout
- animated text and reveal-based UI sections
- language toggle for multilingual content
- theme switching for light and dark mode
- clean card-based design with modern visual styling

### Contact and content

- Contact form with validation
- server-side mail sending through a PHP-based endpoint
- structured sections for personal information, skills, and projects

The PHP contact endpoint loads its SMTP settings from
`private/contact-config.php`, outside the public `public/` directory. Start by
copying `private/contact-config.example.php` to `private/contact-config.php`,
then fill in the recipient address, permitted sender address, SMTP hostname,
username, and password. The real configuration file is excluded from Git.

Deploy that private file outside the web root and keep the relative layout
expected by `public/contact.php` (the `private/` and `public/` directories are
siblings). If your hosting uses a different layout, update the config path in
`public/contact.php`. Never put the real SMTP password in the public directory
or commit it to the repository.

### Admin functionality

- login flow for admin access
- cookie-based authentication state
- protected admin page and dashboard-style experience
- placeholders for future content management workflows

### Data visualization and UI libraries

- Visx-powered charts and visual skill graphs
- custom UI components built with Tailwind and motion effects
- Radix/shadcn-inspired component patterns

## Current Status and Development Notes

This project is still evolving, and some parts are intentionally prototype-level rather than fully production-ready.

### Kanban board

- The kanban page exists as a front-end structure and is visible in the app.
- It currently uses static, localized mock data instead of a real persisted data source.
- Drag-and-drop behavior, task persistence, and full board state management are not yet implemented.

### Backend integration

- Some backend-coupled features are present, including admin login routes and contact form handling.
- The admin authentication flow is partially implemented and relies on frontend cookie checks.
- Full API integration, session management, and production-ready backend syncing still need to be completed and validated.

### Quiz feature

- The quiz is currently a planned future idea and is not under active development in the current build.

## Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- Node.js 18 or newer
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Linting

```bash
npm run lint
```

## Notes

This project is tailored as a personal portfolio and can be adapted for different branding, content, or business use cases. The contact form and admin features may require additional backend configuration depending on the hosting environment.

## License

This project does not currently include a license file. If you plan to publish or reuse it publicly, add an appropriate license before distribution.

## Author

Built as a personal portfolio website for showcasing projects, expertise, and professional information.
