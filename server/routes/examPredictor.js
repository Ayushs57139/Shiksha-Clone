import express from 'express';
import mongoose from 'mongoose';
import ExamPredictor from '../models/ExamPredictor.js';
import ExamPrediction from '../models/ExamPrediction.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Seed initial exam data
async function ensureSeeded() {
  try {
    // Wait for database connection
    if (mongoose.connection.readyState !== 1) {
      console.log('⏳ Waiting for database connection...');
      await new Promise(resolve => {
        const checkConnection = () => {
          if (mongoose.connection.readyState === 1) {
            resolve();
          } else {
            setTimeout(checkConnection, 100);
          }
        };
        checkConnection();
      });
    }
    
    console.log('🔍 Checking if exams exist...');
    const count = await ExamPredictor.countDocuments();
    console.log(`📊 Current exam count: ${count}`);
    
    if (count > 0) {
      console.log('✅ Exam data already seeded');
      return;
    }

    console.log('🌱 Seeding exam data...');
    
    try {
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
        ews: 680
      },
      colleges: [
        { name: 'AIIMS Delhi', location: 'Delhi', branch: 'MBBS', seats: 100, lastRank: 50 },
        { name: 'JIPMER Puducherry', location: 'Puducherry', branch: 'MBBS', seats: 150, lastRank: 200 }
      ],
      preparationTips: [
        'Focus on Biology as it has maximum weightage',
        'Practice diagram-based questions',
        'Regular revision is essential',
        'Solve previous year papers'
      ],
      studyMaterial: [
        { title: 'NCERT Biology', type: 'Book', link: '#', description: 'Class 11-12 Biology NCERT' },
        { title: 'NEET Practice Tests', type: 'Mock Test', link: '#', description: 'Biology-focused practice tests' }
      ],
      mockTests: [
        { title: 'NEET Full Test 1', questions: 200, duration: 200, difficulty: 'Medium', link: '#' },
        { title: 'NEET Biology Test', questions: 90, duration: 100, difficulty: 'Hard', link: '#' }
      ],
      createdBy: null
    },
    {
      examName: 'CAT',
      examType: 'CAT',
      category: 'Management',
      description: 'Common Admission Test for admission to IIMs and other top B-schools',
      eligibility: {
        minAge: 20,
        maxAge: 50,
        education: ['Bachelor\'s degree with 50% marks'],
        nationality: ['Indian', 'International']
      },
      examPattern: {
        totalQuestions: 66,
        totalMarks: 198,
        duration: 120,
        sections: [
          { name: 'Verbal Ability & Reading Comprehension', questions: 24, marks: 72, time: 40 },
          { name: 'Data Interpretation & Logical Reasoning', questions: 20, marks: 60, time: 40 },
          { name: 'Quantitative Ability', questions: 22, marks: 66, time: 40 }
        ]
      },
      importantDates: {
        registrationStart: new Date('2025-08-01'),
        registrationEnd: new Date('2025-09-30'),
        examDate: new Date('2025-11-30'),
        resultDate: new Date('2025-12-15')
      },
      cutoffs: {
        general: 95,
        obc: 85,
        sc: 75,
        st: 70,
        ews: 90
      },
      colleges: [
        { name: 'IIM Ahmedabad', location: 'Gujarat', branch: 'PGP', seats: 400, lastRank: 50 },
        { name: 'IIM Bangalore', location: 'Karnataka', branch: 'PGP', seats: 480, lastRank: 100 },
        { name: 'IIM Calcutta', location: 'West Bengal', branch: 'PGP', seats: 450, lastRank: 120 }
      ],
      preparationTips: [
        'Focus on time management',
        'Practice data interpretation',
        'Improve reading speed',
        'Solve previous year papers'
      ],
      studyMaterial: [
        { title: 'CAT Official Guide', type: 'Book', link: '#', description: 'Official CAT preparation guide' },
        { title: 'CAT Mock Tests', type: 'Mock Test', link: '#', description: 'Practice tests with solutions' }
      ],
      mockTests: [
        { title: 'CAT Full Test 1', questions: 66, duration: 120, difficulty: 'Hard', link: '#' },
        { title: 'CAT Verbal Test', questions: 24, duration: 40, difficulty: 'Medium', link: '#' }
      ],
      createdBy: null
    },
    {
      examName: 'GATE',
      examType: 'GATE',
      category: 'Engineering',
      description: 'Graduate Aptitude Test in Engineering for M.Tech admissions and PSU recruitment',
      eligibility: {
        minAge: 18,
        maxAge: 50,
        education: ['B.Tech/B.E. or equivalent'],
        nationality: ['Indian', 'International']
      },
      examPattern: {
        totalQuestions: 65,
        totalMarks: 100,
        duration: 180,
        sections: [
          { name: 'General Aptitude', questions: 10, marks: 15, time: 30 },
          { name: 'Engineering Mathematics', questions: 15, marks: 25, time: 45 },
          { name: 'Subject Specific', questions: 40, marks: 60, time: 105 }
        ]
      },
      importantDates: {
        registrationStart: new Date('2025-08-15'),
        registrationEnd: new Date('2025-09-30'),
        examDate: new Date('2025-02-08'),
        resultDate: new Date('2025-03-15')
      },
      cutoffs: {
        general: 25,
        obc: 22,
        sc: 20,
        st: 18,
        ews: 23
      },
      colleges: [
        { name: 'IIT Bombay', location: 'Maharashtra', branch: 'M.Tech', seats: 200, lastRank: 500 },
        { name: 'IIT Delhi', location: 'Delhi', branch: 'M.Tech', seats: 180, lastRank: 600 },
        { name: 'IIT Madras', location: 'Tamil Nadu', branch: 'M.Tech', seats: 220, lastRank: 700 }
      ],
      preparationTips: [
        'Focus on core subjects',
        'Practice numerical problems',
        'Time management is crucial',
        'Solve previous year papers'
      ],
      studyMaterial: [
        { title: 'GATE Official Guide', type: 'Book', link: '#', description: 'Official GATE preparation guide' },
        { title: 'GATE Mock Tests', type: 'Mock Test', link: '#', description: 'Practice tests with solutions' }
      ],
      mockTests: [
        { title: 'GATE Full Test 1', questions: 65, duration: 180, difficulty: 'Hard', link: '#' },
        { title: 'GATE Mathematics Test', questions: 15, duration: 45, difficulty: 'Medium', link: '#' }
      ],
      createdBy: null
    },
    {
      examName: 'UPSC CSE',
      examType: 'UPSC',
      category: 'Civil Services',
      description: 'Union Public Service Commission Civil Services Examination for IAS, IPS, and other services',
      eligibility: {
        minAge: 21,
        maxAge: 32,
        education: ['Bachelor\'s degree from recognized university'],
        nationality: ['Indian']
      },
      examPattern: {
        totalQuestions: 200,
        totalMarks: 400,
        duration: 120,
        sections: [
          { name: 'General Studies Paper I', questions: 100, marks: 200, time: 60 },
          { name: 'General Studies Paper II', questions: 80, marks: 200, time: 60 }
        ]
      },
      importantDates: {
        registrationStart: new Date('2025-02-01'),
        registrationEnd: new Date('2025-03-01'),
        examDate: new Date('2025-06-15'),
        resultDate: new Date('2025-08-15')
      },
      cutoffs: {
        general: 100,
        obc: 95,
        sc: 90,
        st: 85,
        ews: 98
      },
      colleges: [
        { name: 'LBSNAA', location: 'Uttarakhand', branch: 'IAS Training', seats: 1000, lastRank: 1000 },
        { name: 'SVPNPA', location: 'Telangana', branch: 'IPS Training', seats: 200, lastRank: 2000 },
        { name: 'NDA', location: 'Delhi', branch: 'Defence Services', seats: 500, lastRank: 3000 }
      ],
      preparationTips: [
        'Read newspapers daily',
        'Focus on current affairs',
        'Practice answer writing',
        'Study NCERT books thoroughly'
      ],
      studyMaterial: [
        { title: 'NCERT Books', type: 'Book', link: '#', description: 'Class 6-12 NCERT textbooks' },
        { title: 'UPSC Mock Tests', type: 'Mock Test', link: '#', description: 'Practice tests with solutions' }
      ],
      mockTests: [
        { title: 'UPSC Prelims Test 1', questions: 200, duration: 120, difficulty: 'Hard', link: '#' },
        { title: 'UPSC Current Affairs Test', questions: 100, duration: 60, difficulty: 'Medium', link: '#' }
      ],
      createdBy: null
    },
    {
      examName: 'SSC CGL',
      examType: 'SSC',
      category: 'Banking',
      description: 'Staff Selection Commission Combined Graduate Level for government jobs',
      eligibility: {
        minAge: 18,
        maxAge: 32,
        education: ['Bachelor\'s degree from recognized university'],
        nationality: ['Indian']
      },
      examPattern: {
        totalQuestions: 100,
        totalMarks: 200,
        duration: 120,
        sections: [
          { name: 'General Intelligence & Reasoning', questions: 25, marks: 50, time: 30 },
          { name: 'General Knowledge', questions: 25, marks: 50, time: 30 },
          { name: 'Quantitative Aptitude', questions: 25, marks: 50, time: 30 },
          { name: 'English Language', questions: 25, marks: 50, time: 30 }
        ]
      },
      importantDates: {
        registrationStart: new Date('2025-01-01'),
        registrationEnd: new Date('2025-02-28'),
        examDate: new Date('2025-04-15'),
        resultDate: new Date('2025-05-30')
      },
      cutoffs: {
        general: 120,
        obc: 110,
        sc: 100,
        st: 95,
        ews: 115
      },
      colleges: [
        { name: 'Government Departments', location: 'Various', branch: 'Administrative', seats: 10000, lastRank: 5000 },
        { name: 'Central Ministries', location: 'Delhi', branch: 'Various', seats: 5000, lastRank: 8000 },
        { name: 'State Governments', location: 'Various', branch: 'Various', seats: 15000, lastRank: 12000 }
      ],
      preparationTips: [
        'Practice reasoning questions',
        'Stay updated with current affairs',
        'Improve English vocabulary',
        'Solve previous year papers'
      ],
      studyMaterial: [
        { title: 'SSC CGL Guide', type: 'Book', link: '#', description: 'Comprehensive SSC CGL guide' },
        { title: 'SSC Mock Tests', type: 'Mock Test', link: '#', description: 'Practice tests with solutions' }
      ],
      mockTests: [
        { title: 'SSC CGL Full Test 1', questions: 100, duration: 120, difficulty: 'Medium', link: '#' },
        { title: 'SSC Reasoning Test', questions: 25, duration: 30, difficulty: 'Easy', link: '#' }
      ],
      createdBy: null
    }
  ];

      console.log(`📝 Attempting to insert ${exams.length} exams...`);
      const result = await ExamPredictor.insertMany(exams);
      console.log('✅ Successfully seeded', result.length, 'exams');
      console.log('📋 Inserted exam IDs:', result.map(e => e._id));
    } catch (error) {
      console.error('❌ Error seeding exam data:', error);
    }
  } catch (error) {
    console.error('❌ Error in ensureSeeded:', error);
  }
}

// Get all exams
router.get('/exams', async (req, res) => {
  try {
    console.log('📚 Fetching exams with filters:', req.query);
    
    await ensureSeeded();
    const { category, examType, search } = req.query;
    
    let filter = { isActive: true };
    if (category && category !== 'all') filter.category = category;
    if (examType && examType !== 'all') filter.examType = examType;
    if (search) {
      filter.$or = [
        { examName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    console.log('🔍 Applied filter:', JSON.stringify(filter, null, 2));

    const exams = await ExamPredictor.find(filter).sort({ examName: 1 });
    console.log(`✅ Found ${exams.length} exams`);
    
    res.json({ success: true, data: exams });
  } catch (error) {
    console.error('❌ Error fetching exams:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch exams' });
  }
});

// Get exam by ID
router.get('/exams/:id', async (req, res) => {
  try {
    const exam = await ExamPredictor.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    res.json({ success: true, data: exam });
  } catch (error) {
    console.error('Error fetching exam:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch exam' });
  }
});

// Get exam categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await ExamPredictor.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

// Get exam types
router.get('/types', async (req, res) => {
  try {
    const types = await ExamPredictor.distinct('examType');
    res.json({ success: true, data: types });
  } catch (error) {
    console.error('Error fetching exam types:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch exam types' });
  }
});

// Generate exam prediction
router.post('/predict', async (req, res) => {
  try {
    const { examId, currentScore, targetScore, studyHours, weakAreas, strongAreas, userId, userName } = req.body;
    
    const exam = await ExamPredictor.findById(examId);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    // Calculate prediction based on input data
    const timeToExam = Math.ceil((new Date(exam.importantDates.examDate) - new Date()) / (1000 * 60 * 60 * 24));
    const scoreGap = targetScore - currentScore;
    const dailyStudyHours = Math.max(2, Math.ceil(scoreGap / (timeToExam * 0.1)));
    
    // Calculate expected rank based on target score
    const expectedRank = Math.ceil((100 - (targetScore / exam.examPattern.totalMarks * 100)) * 1000);
    
    // Generate college predictions
    const collegePredictions = exam.colleges.map(college => {
      let probability = 'Low';
      if (expectedRank <= college.lastRank * 0.8) probability = 'High';
      else if (expectedRank <= college.lastRank * 1.2) probability = 'Medium';
      
      return {
        collegeName: college.name,
        branch: college.branch,
        probability,
        lastYearRank: college.lastRank
      };
    });

    // Generate study plan
    const recommendedStudyPlan = [
      `Study ${dailyStudyHours} hours daily`,
      'Focus on weak areas first',
      'Take weekly mock tests',
      'Revise strong areas regularly',
      'Practice time management'
    ];

    // Create or update prediction
    const predictionData = {
      userId: userId || null,
      userName: userName || 'Anonymous User',
      examId,
      examName: exam.examName,
      examType: exam.examType,
      predictionData: {
        currentScore,
        targetScore,
        studyHours,
        weakAreas,
        strongAreas,
        recommendedStudyPlan,
        expectedRank,
        collegePredictions
      },
      analysis: {
        timeToExam,
        studyEfficiency: Math.min(100, Math.round((currentScore / targetScore) * 100)),
        improvementAreas: weakAreas,
        progressTrend: currentScore < targetScore * 0.7 ? 'Improving' : 'Stable'
      },
      recommendations: {
        dailyStudyHours,
        weeklyGoals: [
          'Complete 2 chapters from weak subjects',
          'Take 1 full mock test',
          'Revise 3 strong topics',
          'Practice 50 questions daily'
        ],
        focusSubjects: weakAreas,
        practiceTests: ['Daily quizzes', 'Weekly full tests', 'Subject-wise tests'],
        resources: ['NCERT books', 'Previous year papers', 'Online mock tests']
      }
    };

    let prediction = userId ? await ExamPrediction.findOne({ userId, examId }) : null;
    if (prediction) {
      Object.assign(prediction, predictionData);
      await prediction.save();
    } else {
      prediction = new ExamPrediction(predictionData);
      await prediction.save();
    }

    res.json({
      success: true,
      data: prediction,
      message: 'Prediction generated successfully'
    });
  } catch (error) {
    console.error('Error generating prediction:', error);
    res.status(500).json({ success: false, message: 'Failed to generate prediction' });
  }
});

// Get user predictions
router.get('/predictions', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.json({ success: true, data: [] });
    }
    
    const predictions = await ExamPrediction.find({ userId })
      .populate('examId', 'examName examType category')
      .sort({ updatedAt: -1 });
    
    res.json({ success: true, data: predictions });
  } catch (error) {
    console.error('Error fetching predictions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch predictions' });
  }
});

// Get prediction by ID
router.get('/predictions/:id', async (req, res) => {
  try {
    const prediction = await ExamPrediction.findById(req.params.id)
      .populate('examId', 'examName examType category examPattern importantDates');
    
    if (!prediction) {
      return res.status(404).json({ success: false, message: 'Prediction not found' });
    }
    
    // No authentication check - predictions are now accessible to all users
    
    res.json({ success: true, data: prediction });
  } catch (error) {
    console.error('Error fetching prediction:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch prediction' });
  }
});

// Update mock test scores
router.put('/predictions/:id/scores', async (req, res) => {
  try {
    const { testName, score, date } = req.body;
    
    const prediction = await ExamPrediction.findById(req.params.id);
    if (!prediction) {
      return res.status(404).json({ success: false, message: 'Prediction not found' });
    }
    
    // No authentication check - mock test scores can be updated by anyone
    
    prediction.analysis.mockTestScores.push({ testName, score, date: date || new Date() });
    prediction.lastUpdated = new Date();
    
    // Update progress trend based on recent scores
    if (prediction.analysis.mockTestScores.length >= 2) {
      const recentScores = prediction.analysis.mockTestScores.slice(-3);
      const avgScore = recentScores.reduce((sum, test) => sum + test.score, 0) / recentScores.length;
      
      if (avgScore > prediction.predictionData.currentScore * 1.1) {
        prediction.analysis.progressTrend = 'Improving';
      } else if (avgScore < prediction.predictionData.currentScore * 0.9) {
        prediction.analysis.progressTrend = 'Declining';
      } else {
        prediction.analysis.progressTrend = 'Stable';
      }
    }
    
    await prediction.save();
    
    res.json({
      success: true,
      data: prediction,
      message: 'Mock test score updated successfully'
    });
  } catch (error) {
    console.error('Error updating mock test score:', error);
    res.status(500).json({ success: false, message: 'Failed to update mock test score' });
  }
});

// Admin: Create exam
router.post('/admin/exams', auth, adminAuth, async (req, res) => {
  try {
    const examData = { ...req.body, createdBy: req.user._id };
    const exam = new ExamPredictor(examData);
    await exam.save();
    
    res.json({
      success: true,
      data: exam,
      message: 'Exam created successfully'
    });
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ success: false, message: 'Failed to create exam' });
  }
});

// Admin: Update exam
router.put('/admin/exams/:id', auth, adminAuth, async (req, res) => {
  try {
    const exam = await ExamPredictor.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    
    Object.assign(exam, req.body, { updatedBy: req.user._id });
    await exam.save();
    
    res.json({
      success: true,
      data: exam,
      message: 'Exam updated successfully'
    });
  } catch (error) {
    console.error('Error updating exam:', error);
    res.status(500).json({ success: false, message: 'Failed to update exam' });
  }
});

// Admin: Delete exam
router.delete('/admin/exams/:id', auth, adminAuth, async (req, res) => {
  try {
    const exam = await ExamPredictor.findByIdAndDelete(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    
    // Delete related predictions
    await ExamPrediction.deleteMany({ examId: req.params.id });
    
    res.json({
      success: true,
      message: 'Exam and related predictions deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting exam:', error);
    res.status(500).json({ success: false, message: 'Failed to delete exam' });
  }
});

// Admin: Get all predictions
router.get('/admin/predictions', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 50, examType, status } = req.query;
    
    let filter = {};
    if (examType) filter.examType = examType;
    if (status) filter.status = status;
    
    const skip = (page - 1) * limit;
    
    const predictions = await ExamPrediction.find(filter)
      .populate('userId', 'name email')
      .populate('examId', 'examName examType')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await ExamPrediction.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        predictions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching admin predictions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch predictions' });
  }
});

// Test endpoint to manually insert one exam
router.get('/insert-test-exam', async (req, res) => {
  try {
    console.log('🌱 Manually inserting test exam...');
    
    const testExam = new ExamPredictor({
      examName: 'JEE Main Test',
      examType: 'JEE',
      category: 'Engineering',
      description: 'Test JEE Main exam for testing purposes',
      eligibility: {
        minAge: 17,
        maxAge: 25,
        education: ['12th Pass with PCM'],
        nationality: ['Indian']
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
        { name: 'NIT Test', location: 'Test Location', branch: 'Test Branch', seats: 100, lastRank: 1000 }
      ],
      preparationTips: ['Test tip 1', 'Test tip 2'],
      studyMaterial: [
        { title: 'Test Book', type: 'Book', link: '#', description: 'Test description' }
      ],
      mockTests: [
        { title: 'Test Mock Test', questions: 90, duration: 180, difficulty: 'Medium', link: '#' }
      ],
      createdBy: null
    });
    
    const savedExam = await testExam.save();
    console.log('✅ Test exam inserted successfully:', savedExam._id);
    
    res.json({ 
      success: true, 
      message: 'Test exam inserted successfully',
      examId: savedExam._id
    });
  } catch (error) {
    console.error('❌ Error inserting test exam:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to insert test exam', 
      error: error.message
    });
  }
});

// Test endpoint to check database connection
router.get('/test-db', async (req, res) => {
  try {
    console.log('🔍 Testing database connection...');
    
    // Check if mongoose is connected
    const connectionState = mongoose.connection.readyState;
    console.log('📊 Mongoose connection state:', connectionState);
    
    // Try to create a simple document
    const testDoc = new ExamPredictor({
      examName: 'Test Exam',
      examType: 'JEE',
      category: 'Engineering',
      description: 'Test description',
      createdBy: null
    });
    
    await testDoc.save();
    console.log('✅ Test document created successfully');
    
    // Delete the test document
    await ExamPredictor.findByIdAndDelete(testDoc._id);
    console.log('🗑️ Test document deleted');
    
    res.json({ 
      success: true, 
      message: 'Database connection working',
      connectionState,
      testDocId: testDoc._id
    });
  } catch (error) {
    console.error('❌ Database test error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database test failed', 
      error: error.message,
      connectionState: mongoose.connection.readyState
    });
  }
});

// Test endpoint to manually seed data
router.get('/seed', async (req, res) => {
  try {
    console.log('🌱 Manual seeding triggered...');
    await ensureSeeded();
    const count = await ExamPredictor.countDocuments();
    res.json({ success: true, message: `Seeding completed. Total exams: ${count}` });
  } catch (error) {
    console.error('❌ Manual seeding error:', error);
    res.status(500).json({ success: false, message: 'Seeding failed', error: error.message });
  }
});

// Admin: Get exam statistics
router.get('/admin/stats', auth, adminAuth, async (req, res) => {
  try {
    const totalExams = await ExamPredictor.countDocuments();
    const totalPredictions = await ExamPrediction.countDocuments();
    const activePredictions = await ExamPrediction.countDocuments({ status: 'Active' });
    
    const examTypeStats = await ExamPrediction.aggregate([
      { $group: { _id: '$examType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const recentPredictions = await ExamPrediction.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    
    res.json({
      success: true,
      data: {
        totalExams,
        totalPredictions,
        activePredictions,
        examTypeStats,
        recentPredictions
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
});

export default router;
