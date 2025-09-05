# Todo List App

## Overview
A modern Todo List application built with Next.js 14, React 19, TypeScript, and Tailwind CSS. The app features a clean, responsive interface with task management capabilities including adding, editing, deleting, and marking tasks as complete.

## Recent Changes
- **September 4, 2025**: Initial project setup and configuration for Replit environment
  - Installed dependencies with legacy peer deps to resolve React 19/Next.js compatibility
  - Converted next.config.ts to next.config.js (Next.js 14 requirement)
  - Fixed font configuration from Geist to Inter for better compatibility
  - Configured development server on port 5000 with 0.0.0.0 host binding
  - Set up deployment configuration for autoscale deployment

## Project Architecture
- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with Shadcn/UI components
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks (useState) for local state
- **Icons**: Lucide React icons
- **Fonts**: Inter from Google Fonts
- **Build System**: Next.js built-in build system

## Key Features
- Add new tasks with keyboard shortcuts (Enter key)
- Mark tasks as complete/incomplete
- Edit tasks inline with save/cancel options
- Delete tasks
- Task statistics (total, completed, remaining)
- Responsive design with mobile-friendly interface
- Clean, modern UI with proper accessibility

## Development Setup
- Development server runs on port 5000 (configured for Replit)
- Uses npm with legacy peer deps for dependency resolution
- Hot reload enabled for development
- TypeScript support with path aliases (@/* -> ./src/*)

## Deployment Configuration
- **Target**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Run**: `npm run start`
- Suitable for production deployment on Replit