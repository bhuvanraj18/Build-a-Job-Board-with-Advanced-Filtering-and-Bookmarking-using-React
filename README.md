# Job Board Application

A modern job board application built with React, Vite, Typescript, and Tailwind CSS. Features advanced client-side filtering, searching, sorting, and bookmarking capabilities.

## Features

- **Job Listings**: View jobs in Grid or List layout.
- **Advanced Filtering**:
  - Filter by Job Type (Remote, Hybrid, Onsite)
  - Filter by Experience Level
  - Filter by Skills (Multi-select)
  - Filter by Salary Range (Slider)
- **Search**: Real-time search by job title or company name (debounced).
- **Sorting**: Sort by Most Recent, Highest Salary, or Relevance.
- **Bookmarking**: Save jobs to local storage and view them in a dedicated Tracker page.
- **Responsive Design**: Fully responsive layout for desktop and mobile.
- **Dockerized**: specific Docker configuration for easy deployment.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, clsx, tailwind-merge
- **State Management**: Zustand (Global Filter State), SWR (Data Fetching/Caching)
- **UI Components**: react-select, react-slider

## Setup & Running

### Prerequisites

- Node.js (v18+)
- Docker (optional, for containerized run)

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Setup

1. Build and start the container:
   ```bash
   docker-compose up --build -d
   ```

2. The application will be available at [http://localhost:3000](http://localhost:3000).

3. To stop the container:
   ```bash
   docker-compose down
   ```

## Project Structure

- `/src/components`: Reusable UI components (JobCard, FilterPanel, etc.)
- `/src/hooks`: Custom hooks (useJobs, useBookmarks, useDebounce)
- `/src/pages`: Page components (Home, Tracker)
- `/src/store`: Zustand store for global application state
- `/src/data`: Mock data JSON file

## Environment Variables

Copy `.env.example` to `.env` if you need to configure environment variables. Currently, no variables are strictly required for the default local mock data mode.
"# Build-a-Job-Board-with-Advanced-Filtering-and-Bookmarking-using-React" 
