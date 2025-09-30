import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import collegesRoutes from './routes/colleges.js';
import adminRoutes from './routes/admin.js';
import resumeRoutes from './routes/resumes.js';
import authRoutes from './routes/auth.js';
import reviewRoutes from './routes/reviews.js';
import templateRoutes from './routes/templates.js';
import psychometricRoutes from './routes/psychometrics.js';
import examPredictorRoutes from './routes/examPredictor.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ayushs81740:6JplFZPJ3W38tYAh@cluster0.emv3s7n.mongodb.net/DikshaBuddy', {
  dbName: 'DikshaBuddy'
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  
  // Seed exam data
  try {
    const ExamPredictor = (await import('./models/ExamPredictor.js')).default;
    const count = await ExamPredictor.countDocuments();
    
    if (count === 0) {
      console.log('🌱 Seeding exam data...');
      
      const exams = [
        {
          examName: 'JEE Main',
          examType: 'JEE',
          category: 'Engineering',
          description: 'Joint Entrance Examination Main for admission to NITs, IIITs, and other engineering colleges',
          eligibility: {
            minAge: 17,
            maxAge: 25,
            education: ['12th Pass with PCM'],
            nationality: ['Indian', 'OCI', 'PIO']
          },
          examPattern: {
            totalQuestions: 90,
            totalMarks: 300,
            duration: 180,
            sections: [
              { name: 'Physics', questions: 30, marks: 100, time: 60 },
              { name: 'Chemistry', questions: 30, marks: 100, time: 60 },
              { name: 'Mathematics', questions: 30, marks: 100, time: 60 }
            ]
          },
          importantDates: {
            registrationStart: new Date('2025-01-01'),
            registrationEnd: new Date('2025-02-28'),
            examDate: new Date('2025-04-15'),
            resultDate: new Date('2025-05-15')
          },
          cutoffs: {
            general: 85,
            obc: 75,
            sc: 65,
            st: 60,
            ews: 80
          },
          colleges: [
            { name: 'NIT Trichy', location: 'Tamil Nadu', branch: 'Computer Science', seats: 120, lastRank: 1500 },
            { name: 'NIT Warangal', location: 'Telangana', branch: 'Mechanical', seats: 100, lastRank: 2500 },
            { name: 'NIT Surathkal', location: 'Karnataka', branch: 'Electrical', seats: 80, lastRank: 3000 }
          ],
          preparationTips: [
            'Focus on NCERT books for fundamentals',
            'Practice previous year questions',
            'Take regular mock tests',
            'Time management is crucial'
          ],
          studyMaterial: [
            { title: 'NCERT Physics', type: 'Book', link: '#', description: 'Class 11-12 Physics NCERT' },
            { title: 'JEE Main Mock Tests', type: 'Mock Test', link: '#', description: 'Practice tests with solutions' }
          ],
          mockTests: [
            { title: 'JEE Main Full Test 1', questions: 90, duration: 180, difficulty: 'Medium', link: '#' },
            { title: 'JEE Main Physics Test', questions: 30, duration: 60, difficulty: 'Hard', link: '#' }
          ],
          createdBy: null
        },
        {
          examName: 'NEET',
          examType: 'NEET',
          category: 'Medical',
          description: 'National Eligibility cum Entrance Test for admission to MBBS, BDS, and other medical courses',
          eligibility: {
            minAge: 17,
            maxAge: 25,
            education: ['12th Pass with PCB'],
            nationality: ['Indian', 'OCI', 'PIO']
          },
          examPattern: {
            totalQuestions: 200,
            totalMarks: 720,
            duration: 200,
            sections: [
              { name: 'Physics', questions: 45, marks: 180, time: 50 },
              { name: 'Chemistry', questions: 45, marks: 180, time: 50 },
              { name: 'Biology', questions: 90, marks: 360, time: 100 }
            ]
          },
          importantDates: {
            registrationStart: new Date('2025-01-15'),
            registrationEnd: new Date('2025-03-15'),
            examDate: new Date('2025-05-05'),
            resultDate: new Date('2025-06-05')
          },
          cutoffs: {
            general: 720,
            obc: 650,
            sc: 600,
            st: 550,
            ews: 700
          },
          colleges: [
            { name: 'AIIMS Delhi', location: 'Delhi', branch: 'MBBS', seats: 100, lastRank: 100 },
            { name: 'JIPMER Puducherry', location: 'Puducherry', branch: 'MBBS', seats: 200, lastRank: 200 },
            { name: 'BHU Varanasi', location: 'Uttar Pradesh', branch: 'MBBS', seats: 150, lastRank: 300 }
          ],
          preparationTips: [
            'Focus on NCERT Biology',
            'Practice diagrams and labeling',
            'Solve previous year questions',
            'Time management is crucial'
          ],
          studyMaterial: [
            { title: 'NCERT Biology', type: 'Book', link: '#', description: 'Class 11-12 Biology NCERT' },
            { title: 'NEET Mock Tests', type: 'Mock Test', link: '#', description: 'Practice tests with solutions' }
          ],
          mockTests: [
            { title: 'NEET Full Test 1', questions: 200, duration: 200, difficulty: 'Medium', link: '#' },
            { title: 'NEET Biology Test', questions: 90, duration: 100, difficulty: 'Hard', link: '#' }
          ],
          createdBy: null
        }
      ];
      
      await ExamPredictor.insertMany(exams);
      console.log(`✅ Successfully seeded ${exams.length} exams`);
    } else {
      console.log(`✅ Exam data already exists (${count} exams)`);
    }
  } catch (error) {
    console.error('❌ Error seeding exam data:', error);
  }
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/psychometrics', psychometricRoutes);
app.use('/api/exam-predictor', examPredictorRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
