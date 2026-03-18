# Verba - Language Tutors Platform

A web application for finding and booking language tutors. Users can browse teachers, filter by language/level/price, save favorites, and book trial lessons.

## Features

- Browse and filter language tutors (by language, level, price)
- Pagination with Firebase Realtime Database
- User authentication (registration, login, logout)
- Favorites system for authorized users
- Book trial lesson modal with form validation
- Toast notifications (iziToast)

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Routing:** React Router DOM
- **Backend:** Firebase Realtime Database, Firebase Auth
- **Forms:** React Hook Form + Yup validation
- **Styling:** CSS Modules
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/       # UI components (Header, TeacherCard, Modals, etc.)
├── hooks/            # Custom hooks (useAuthState)
├── pages/            # Page components (Home, Teachers, Favorites)
├── services/         # Firebase services (auth, teachers, favorites)
├── firebase/         # Firebase configuration
└── types/            # TypeScript interfaces
```
