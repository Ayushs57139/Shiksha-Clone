# Shiksha.com Web Scraper and API

This module scrapes college data from Shiksha.com and provides a RESTful API to access the data.

## Features

- Scrapes college data from Shiksha.com including:
  - College names, descriptions, and locations
  - Fees and course information
  - Rankings and ratings
  - Facilities and contact details
- Automatically schedules weekly scraping to keep data updated
- Provides a RESTful API to access the data
- Supports filtering, sorting, and pagination

## Installation

1. Make sure you have Node.js and MongoDB installed
2. Clone the repository
3. Install dependencies:

```bash
cd shiksha-scraper
npm install
```

4. Create a `.env` file with the following variables:

```
MONGO_URI=mongodb://localhost:27017/shiksha
PORT=5001
NODE_ENV=development
```

## Usage

### Running the Scraper

To run the scraper manually:

```bash
npm run scrape
```

This will scrape college data from Shiksha.com and save it to the MongoDB database.

### Running the API Server

To start the API server:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## API Endpoints

### Get All Colleges

```
GET /api/colleges
```

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Number of results per page (default: 10)
- `category`: Filter by category (e.g., 'mba', 'engineering')
- `location`: Filter by city
- `rating`: Filter by minimum rating
- `sort`: Sort field (default: '-ratings.overall')
- `search`: Search term for college name, location, or description

### Get College by ID or Slug

```
GET /api/colleges/:id
```

### Get Colleges by Category

```
GET /api/colleges/category/:category
```

### Get Colleges by Location

```
GET /api/colleges/location/:city
```

### Trigger Scraper Manually

```
GET /api/scrape
```

### Health Check

```
GET /api/health
```

## Scheduled Scraping

The scraper is scheduled to run automatically every Sunday at 1:00 AM to keep the data updated. You can modify the schedule in the `scraper.js` file.

## Integration with Main Application

The API can be accessed from the main application using the endpoints above. The frontend should be configured to make requests to the API server.

## License

ISC