# Diksha Buddy Project

A comprehensive educational platform that scrapes and displays college data from Diksha Buddy.

## Features

- Web scraper for Diksha Buddy college data
- RESTful API for accessing college information
- React frontend for displaying college listings and details
- Search, filter, and pagination functionality
- User authentication and profile management
- College comparison tool

## Project Structure

- `/server` - Main backend server with authentication and core APIs
- `/diksha-scraper` - Web scraper and API for Diksha Buddy data
- `/src` - React frontend application

## Installation

1. Clone the repository
2. Install dependencies for all components:

```bash
# Install main project dependencies
npm install

# Install server dependencies
cd server
npm install

# Install scraper dependencies
cd ../diksha-scraper
npm install
```

3. Create `.env` files in the root directory, server directory, and diksha-scraper directory with the appropriate configuration (see `.env.example` files).

## Running the Application

### Development Mode

To run all components together (frontend, main server, and scraper):

```bash
npm run start:all
```

Or run each component separately:

```bash
# Frontend
npm run dev

# Main Server
cd server
npm run dev

# Scraper Server
cd diksha-scraper
npm run dev
```

### Running the Scraper

To manually trigger the scraper:

```bash
npm run scrape
```

The scraper is also scheduled to run automatically every Sunday at 1:00 AM.

## API Documentation

### Main Server API

Base URL: `http://localhost:5000/api`

- Authentication: `/api/auth`
- Users: `/api/users`
- Colleges: `/api/colleges`
- Courses: `/api/courses`
- Exams: `/api/exams`
- News: `/api/news`

### Scraper API

Base URL: `http://localhost:5001/api`

- Colleges: `/api/colleges`
- College by ID: `/api/colleges/:id`
- Colleges by Category: `/api/colleges/category/:category`
- Colleges by Location: `/api/colleges/location/:city`
- Trigger Scraper: `/api/scrape`

See the README.md in the diksha-scraper directory for more details.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Scraper**: Puppeteer, Node-cron
- **Authentication**: JWT

## License

ISC