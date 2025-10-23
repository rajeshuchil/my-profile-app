# Profile Management Application

## Overview

A modern profile management system built with Next.js, TypeScript, MongoDB, and Tailwind CSS for TAPMI students.

## Features

- View profile cards with student information
- Detailed profile pages with projects and skills
- Add new profiles with image upload
- Responsive design for mobile and desktop
- Video resume integration

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Image Hosting**: ImgBB API
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- ImgBB account for image hosting

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd my-profile-app
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

- `MONGODB_URI`: Your MongoDB connection string
- `IMGBB_API_KEY`: Your ImgBB API key

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Seeding Data (Optional)

Visit `http://localhost:3000/api/seed` to add sample profiles to your database.

## Project Structure

```
my-profile-app/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Homepage
│   ├── profiles/       # Profile pages
│   ├── add-profile/    # Add profile form
│   └── api/            # API endpoints
├── components/         # Reusable components
├── lib/               # Utilities (DB connection)
├── models/            # MongoDB schemas
├── types/             # TypeScript definitions
└── public/            # Static assets
```

## API Endpoints

- `GET /api/profiles` - Get all profiles
- `POST /api/profiles` - Create new profile
- `GET /api/profiles/[id]` - Get profile by ID
- `POST /api/seed` - Seed sample data

## Deployment

This app is configured for easy deployment on Vercel. Set up your environment variables in your deployment platform.

## Author

Created for TAPMI assignment by [Your Name]
