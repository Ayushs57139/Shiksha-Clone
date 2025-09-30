# Psychometric Tests System

A comprehensive psychometric testing platform integrated into the Diksha Buddy educational website, featuring aptitude, personality, and interest assessments with professional UI/UX design.

## Features

### 🧠 Test Categories
- **Aptitude Tests**: Numerical, Verbal, Diagrammatic, Abstract, Spatial, Logical, Analytical reasoning
- **Foundation Tests**: Basic Numeracy, Basic Comprehension
- **Behavioral Tests**: Situational Judgement
- **Technical Tests**: Mechanical Reasoning
- **Intelligence Tests**: Cognitive Ability

### 📊 Test Statistics
- **Numerical Reasoning**: 5 tests | 25 questions
- **Verbal Reasoning**: 4 tests | 20 questions
- **Situational Judgement**: 6 tests | 18 questions
- **Diagrammatic Reasoning**: 3 tests | 15 questions
- **Abstract Reasoning**: 2 tests | 12 questions
- **Spatial Reasoning**: 2 tests | 10 questions
- **Mechanical Reasoning**: 2 tests | 8 questions
- **Logical Reasoning**: 2 tests | 12 questions
- **Basic Numeracy**: 3 tests | 15 questions
- **Analytical Reasoning**: 4 tests | 20 questions
- **Cognitive Ability**: 3 tests | 18 questions
- **Basic Comprehension**: 2 tests | 12 questions

### 🎯 User Experience
- **Professional UI/UX**: Clean, modern design matching the website aesthetic
- **Responsive Design**: Works on all devices and screen sizes
- **Timer Support**: Configurable time limits with countdown display
- **Progress Tracking**: Shows answered vs. total questions
- **Auto-submit**: Automatically submits when time runs out
- **Offline Support**: Works even when backend API is unavailable

### 🔧 Admin Features
- **Test Management**: Create, update, and manage test metadata
- **Bulk Import**: Import questions via JSON or CSV format
- **Results Monitoring**: View all test results and user performance
- **Question Banks**: Manage large question databases with pagination
- **User Analytics**: Track completion rates and performance metrics

## Technical Architecture

### Frontend Components
- `PsychometricTests.jsx`: Main tests listing page with category grouping
- `PsychometricRunner.jsx`: Test execution interface with timer and progress
- `PsychometricResult.jsx`: Results display with score breakdowns
- `AdminPsychometrics.jsx`: Admin panel for test management

### Backend API Endpoints
- `GET /api/psychometrics/tests` - List all available tests
- `GET /api/psychometrics/tests/:key/questions` - Get questions for a test (with pagination)
- `POST /api/psychometrics/tests/:key/submit` - Submit test answers
- `GET /api/psychometrics/result/:resultId` - Get specific result
- `POST /api/psychometrics/admin/tests` - Create/update test (admin)
- `POST /api/psychometrics/admin/tests/:key/questions/import` - Bulk import questions (admin)
- `GET /api/psychometrics/admin/results` - List all results (admin)

### Data Models
- **PsychometricTest**: Test metadata, dimensions, scales, timing
- **PsychometricQuestion**: Individual questions with dimension mapping
- **PsychometricResult**: User responses, scores, and analysis

## Setup & Installation

### 1. Frontend Integration
The psychometric tests are already integrated into the main application:
- Route: `/psychometrics`
- Admin route: `/admin/psychometrics`
- Navigation: Available in the main navbar

### 2. Backend Setup
Ensure the MongoDB connection is configured in `project/server/server.js`:
```javascript
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/diksha-buddy', {
  dbName: 'Diksha Buddy'
});
```

### 3. Admin Access
To access admin features:
1. Create a user account
2. Set the user role to 'admin' in the database
3. Navigate to `/admin/psychometrics`

## Usage Guide

### For Users
1. **Browse Tests**: Visit `/psychometrics` to see all available test categories
2. **Select Test**: Click on any test card to start
3. **Answer Questions**: Select responses using the 5-point scale
4. **Submit**: Click submit or wait for auto-submission when time expires
5. **View Results**: See your performance breakdown and percentile scores

### For Administrators
1. **Access Admin Panel**: Navigate to `/admin/psychometrics`
2. **Manage Tests**: Create new tests or modify existing ones
3. **Import Questions**: Use JSON or CSV format to bulk import questions
4. **Monitor Results**: View all user test results and performance metrics

## Question Import Formats

### JSON Format
```json
[
  {
    "text": "What is 15% of 200?",
    "dimensionKey": "NR",
    "order": 1
  },
  {
    "text": "If a train travels 60km in 1.5 hours, what is the speed?",
    "dimensionKey": "NR",
    "order": 2
  }
]
```

### CSV Format
```csv
What is 15% of 200?,NR,1
If a train travels 60km in 1.5 hours what is the speed?,NR,2
Simplify 3/4 + 2/3,NR,3
```

## Customization

### Adding New Test Categories
1. Update `psychometricTestsData.js` with new test metadata
2. Add corresponding questions to the questions object
3. The system will automatically display new categories

### Modifying Question Scales
Each test can have custom scales:
```javascript
scale: {
  min: 1,
  max: 5,
  labels: [
    { value: 1, label: 'Very Low' },
    { value: 2, label: 'Low' },
    { value: 3, label: 'Average' },
    { value: 4, label: 'High' },
    { value: 5, label: 'Very High' }
  ]
}
```

### Custom Dimensions
Tests can measure multiple dimensions:
```javascript
dimensions: [
  { key: 'NR', name: 'Numerical Reasoning', description: 'Mathematical ability' },
  { key: 'VR', name: 'Verbal Reasoning', description: 'Language comprehension' }
]
```

## Performance & Scalability

### Question Pagination
- Questions are served in configurable batches (default: 100)
- Supports tests with thousands of questions
- Efficient memory usage for large question banks

### Offline Functionality
- Local fallback data ensures tests work without backend
- Graceful degradation when API is unavailable
- Local result computation for immediate feedback

### Database Optimization
- Indexed queries for fast question retrieval
- Efficient result storage and retrieval
- Support for high-volume user testing

## Security Features

### Admin Authentication
- Role-based access control for admin features
- JWT token validation for all admin endpoints
- Secure question import with validation

### User Privacy
- Anonymous testing support
- Optional user registration for result storage
- Secure result access controls

## Future Enhancements

### Planned Features
- **Advanced Analytics**: Detailed performance insights and trends
- **Question Randomization**: Dynamic question selection algorithms
- **Adaptive Testing**: Questions that adjust based on user performance
- **Export Functionality**: Download results in various formats
- **Integration APIs**: Connect with external assessment platforms

### Scalability Improvements
- **Redis Caching**: Cache frequently accessed questions and results
- **CDN Integration**: Serve static test content globally
- **Microservices**: Split psychometrics into dedicated service
- **Real-time Updates**: Live result updates and notifications

## Troubleshooting

### Common Issues
1. **Tests Not Loading**: Check if backend API is running and accessible
2. **Import Failures**: Validate JSON/CSV format and ensure proper field mapping
3. **Timer Issues**: Verify test configuration has valid timeLimitMinutes
4. **Admin Access**: Ensure user role is set to 'admin' in database

### Debug Mode
Enable console logging for troubleshooting:
```javascript
// In browser console
localStorage.setItem('debug', 'psychometrics');
```

## Support & Documentation

For technical support or feature requests:
- Check the admin panel for system status
- Review API responses in browser developer tools
- Consult the backend logs for server-side issues

---

**Note**: This system is designed to be fully functional both online and offline, providing a robust foundation for psychometric testing in educational and professional contexts.
