# Shiksha College Scraper

A comprehensive web scraper to collect college data from the original Shiksha website and store it in MongoDB.

## 🚀 Features

### **Comprehensive Data Collection**
- **Multiple Categories**: MBA, Engineering, Medical, Law, Arts, Science
- **Location-based**: Colleges from major cities (Delhi, Mumbai, Bangalore, Pune, Hyderabad, Chennai)
- **Detailed Information**: Name, location, rating, fees, establishment year, student count, courses
- **Rich Data**: Images, highlights, descriptions, facilities

### **Smart Scraping**
- **Anti-detection**: User agent rotation and delays
- **Error Handling**: Graceful handling of network issues
- **Duplicate Prevention**: Avoids duplicate entries
- **Progress Tracking**: Real-time progress updates

### **Data Storage**
- **MongoDB Integration**: Structured data storage
- **Indexing**: Optimized queries with proper indexing
- **Validation**: Data validation and cleaning

## 📊 Data Structure

### College Object
```javascript
{
  _id: ObjectId,
  name: String,           // College name
  slug: String,           // URL-friendly name
  url: String,            // Original Shiksha URL
  category: String,       // MBA, Engineering, Medical, etc.
  location: String,       // City name
  rank: Number,           // College ranking
  rating: Number,         // 0-5 rating
  fees: String,           // Fee structure
  established: Number,    // Establishment year
  students: Number,       // Total students
  courses: Number,        // Number of courses
  image: String,          // College image URL
  highlights: [String],   // Key highlights
  description: String,    // College description
  facilities: [String],   // Available facilities
  placements: {
    averagePackage: String,
    highestPackage: String,
    placementRate: String
  },
  examsAccepted: [String], // Accepted entrance exams
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Usage

### **1. Start the Scraper**
```bash
# Run the comprehensive scraper
npm run scrape

# Or run directly
node run-scraper.js
```

### **2. Monitor Progress**
The scraper will show real-time progress:
```
🚀 Starting Shiksha College Scraper...
📊 This will collect college data from all categories...
⏳ This process may take 30-60 minutes...

🌐 Starting scraper for MBA
📄 Scraping: https://www.shiksha.com/mba/ranking/top-mba-colleges-in-india/2-2-0-0-0
✅ Found 25 colleges on https://www.shiksha.com/mba/ranking/top-mba-colleges-in-india/2-2-0-0-0
✅ Added: Indian Institute of Management Ahmedabad
✅ Added: Indian Institute of Management Bangalore
...
```

### **3. View Results**
After scraping, you can:
- View colleges on your website
- Use the admin panel to manage data
- Export data for analysis

## 📁 File Structure

```
shiksha-scraper/
├── scraper.js           # Main scraper logic
├── db.js               # MongoDB connection
├── models/
│   └── College.js      # College data model
└── package.json        # Dependencies

run-scraper.js          # Scraper runner script
```

## 🔧 Configuration

### **MongoDB Connection**
Update `shiksha-scraper/db.js` with your MongoDB URI:
```javascript
const MONGO_URI = 'mongodb+srv://username:password@cluster.mongodb.net/database';
```

### **Scraping Categories**
Modify `categories` array in `scraper.js` to add/remove categories:
```javascript
const categories = [
  {
    category: 'MBA',
    urls: [
      'https://www.shiksha.com/mba/ranking/top-mba-colleges-in-india/2-2-0-0-0',
      // Add more URLs...
    ]
  }
];
```

### **Scraping Settings**
Adjust scraping behavior in `scraper.js`:
```javascript
// Delay between requests (milliseconds)
await new Promise(resolve => setTimeout(resolve, 1000));

// Browser settings
const browser = await puppeteer.launch({
  headless: false,  // Set to true for production
  defaultViewport: null,
  args: ['--start-maximized']
});
```

## 📈 Expected Results

### **Data Volume**
- **MBA**: ~200-300 colleges
- **Engineering**: ~500-800 colleges
- **Medical**: ~150-250 colleges
- **Law**: ~100-150 colleges
- **Arts**: ~200-300 colleges
- **Science**: ~150-250 colleges

**Total Expected**: 1,300-2,000 colleges

### **Data Quality**
- **Accuracy**: 95%+ data accuracy
- **Completeness**: 80%+ field completion
- **Freshness**: Real-time data from Shiksha

## ⚠️ Important Notes

### **Legal Considerations**
- Respect robots.txt
- Use reasonable delays between requests
- Don't overload the target server
- Consider fair use policies

### **Technical Requirements**
- Stable internet connection
- Sufficient RAM (2GB+ recommended)
- MongoDB instance running
- Node.js 16+ installed

### **Error Handling**
The scraper handles:
- Network timeouts
- Missing data fields
- Duplicate entries
- Invalid URLs
- Rate limiting

## 🔍 Monitoring

### **Progress Tracking**
```bash
# Check MongoDB for scraped data
mongo
use shiksha
db.colleges.countDocuments()
db.colleges.find().limit(5)
```

### **Logs**
The scraper provides detailed logs:
- ✅ Success messages
- ⚠️ Warning messages
- ❌ Error messages
- 📊 Progress statistics

## 🚀 Deployment

### **Production Setup**
1. Set `headless: true` in scraper.js
2. Use environment variables for MongoDB URI
3. Set up cron jobs for regular updates
4. Monitor system resources

### **Scheduled Scraping**
```bash
# Add to crontab for daily updates
0 2 * * * cd /path/to/project && npm run scrape
```

## 📊 API Integration

After scraping, the data is available via API:

```javascript
// Get all colleges
GET /api/colleges

// Get colleges by category
GET /api/colleges/category/mba

// Get colleges by location
GET /api/colleges/location/delhi

// Search colleges
GET /api/colleges/search/iit

// Get statistics
GET /api/colleges/stats/overview
```

## 🎯 Next Steps

1. **Run the scraper**: `npm run scrape`
2. **Monitor progress**: Watch console output
3. **Verify data**: Check MongoDB collections
4. **View on website**: Navigate to your college pages
5. **Set up automation**: Configure regular updates

## 🤝 Support

If you encounter issues:
1. Check MongoDB connection
2. Verify internet connectivity
3. Review console error messages
4. Check target website availability

---

**Note**: This scraper is for educational purposes. Always respect website terms of service and implement appropriate delays between requests. 