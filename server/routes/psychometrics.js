import express from 'express';
import PsychometricTest from '../models/PsychometricTest.js';
import PsychometricQuestion from '../models/PsychometricQuestion.js';
import PsychometricResult from '../models/PsychometricResult.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Seed a couple of tests with questions if empty
async function ensureSeeded() {
  const count = await PsychometricTest.countDocuments();
  if (count > 0) return;

  // Big Five
  await PsychometricTest.create({
    key: 'big5',
    name: 'Big Five Personality Test',
    category: 'Personality',
    description: 'Measures five broad personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.',
    dimensions: [
      { key: 'O', name: 'Openness', description: 'Intellect and openness to experience' },
      { key: 'C', name: 'Conscientiousness', description: 'Organization, diligence, and reliability' },
      { key: 'E', name: 'Extraversion', description: 'Sociability and activity' },
      { key: 'A', name: 'Agreeableness', description: 'Compassion and cooperativeness' },
      { key: 'N', name: 'Neuroticism', description: 'Emotional stability and anxiety' }
    ],
    scale: { min: 1, max: 5, labels: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ] },
    timeLimitMinutes: 12,
    numQuestions: 10,
    tags: ['personality','big five']
  });

  const big5Items = [
    { text: 'I am quick to understand things.', dimensionKey: 'O' },
    { text: 'I pay attention to details.', dimensionKey: 'C' },
    { text: 'I am the life of the party.', dimensionKey: 'E' },
    { text: 'I sympathize with others’ feelings.', dimensionKey: 'A' },
    { text: 'I get stressed out easily.', dimensionKey: 'N' },
    { text: 'I have a rich vocabulary.', dimensionKey: 'O' },
    { text: 'I like order.', dimensionKey: 'C' },
    { text: 'I talk to a lot of different people at parties.', dimensionKey: 'E' },
    { text: 'I take time out for others.', dimensionKey: 'A' },
    { text: 'I often feel blue.', dimensionKey: 'N' },
  ];
  await PsychometricQuestion.insertMany(big5Items.map((q, i) => ({ testKey: 'big5', order: i + 1, reverseScored: false, ...q })));

  // Holland RIASEC Interest Inventory (short)
  await PsychometricTest.create({
    key: 'riasec',
    name: 'RIASEC Career Interest Inventory',
    category: 'Interests',
    description: 'Six themes: Realistic, Investigative, Artistic, Social, Enterprising, Conventional.',
    dimensions: [
      { key: 'R', name: 'Realistic', description: 'Hands-on, practical' },
      { key: 'I', name: 'Investigative', description: 'Analytical, scientific' },
      { key: 'A', name: 'Artistic', description: 'Creative, expressive' },
      { key: 'S', name: 'Social', description: 'Helping, teaching' },
      { key: 'E', name: 'Enterprising', description: 'Leading, persuading' },
      { key: 'C', name: 'Conventional', description: 'Organizing, detail-oriented' }
    ],
    scale: { min: 1, max: 5, labels: [
      { value: 1, label: 'Strongly Dislike' },
      { value: 2, label: 'Dislike' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Like' },
      { value: 5, label: 'Strongly Like' }
    ] },
    timeLimitMinutes: 10,
    numQuestions: 10,
    tags: ['career','interests']
  });
  // Aptitude samples (numerical, verbal, logical)
  await PsychometricTest.create({
    key: 'numerical-basic',
    name: 'Numerical Reasoning (Basic)',
    category: 'Aptitude',
    description: 'Assess arithmetic and data interpretation.',
    dimensions: [{ key: 'NR', name: 'Numerical Reasoning' }],
    scale: { min: 1, max: 5, labels: [{ value: 1, label: 'Very Low' },{ value: 5, label: 'Very High' }] },
    timeLimitMinutes: 12,
    numQuestions: 5,
    tags: ['numerical']
  });
  const numQs = [
    { text: 'What is 15% of 200?', dimensionKey: 'NR' },
    { text: 'If a train travels 60km in 1.5 hours, what is the speed (km/h)?', dimensionKey: 'NR' },
    { text: 'Simplify: 3/4 + 2/3 = ?', dimensionKey: 'NR' },
    { text: 'What is the average of 6, 8, 10, 12?', dimensionKey: 'NR' },
    { text: 'Find x if 5x = 45.', dimensionKey: 'NR' }
  ];
  await PsychometricQuestion.insertMany(numQs.map((q,i)=>({ testKey: 'numerical-basic', order: i+1, reverseScored:false, ...q })));

  await PsychometricTest.create({
    key: 'verbal-basic',
    name: 'Verbal Reasoning (Basic)',
    category: 'Aptitude',
    description: 'Reading comprehension and vocabulary.',
    dimensions: [{ key: 'VR', name: 'Verbal Reasoning' }],
    scale: { min: 1, max: 5, labels: [{ value: 1, label: 'Very Low' },{ value: 5, label: 'Very High' }] },
    timeLimitMinutes: 10,
    numQuestions: 5,
    tags: ['verbal']
  });
  const verbQs = [
    { text: 'Select the synonym of "augment".', dimensionKey: 'VR' },
    { text: 'From the passage, the author’s tone is best described as...', dimensionKey: 'VR' },
    { text: 'Choose the correct spelling.', dimensionKey: 'VR' },
    { text: 'Identify the main idea of a short paragraph.', dimensionKey: 'VR' },
    { text: 'Pick the antonym of "mitigate".', dimensionKey: 'VR' }
  ];
  await PsychometricQuestion.insertMany(verbQs.map((q,i)=>({ testKey: 'verbal-basic', order: i+1, reverseScored:false, ...q })));

  await PsychometricTest.create({
    key: 'logical-basic',
    name: 'Logical Reasoning (Basic)',
    category: 'Aptitude',
    description: 'Pattern and inference based reasoning.',
    dimensions: [{ key: 'LR', name: 'Logical Reasoning' }],
    scale: { min: 1, max: 5, labels: [{ value: 1, label: 'Very Low' },{ value: 5, label: 'Very High' }] },
    timeLimitMinutes: 10,
    numQuestions: 5,
    tags: ['logical']
  });
  const logQs = [
    { text: 'If all A are B and all B are C, then all A are C. True/False?', dimensionKey: 'LR' },
    { text: 'Find the next number: 2, 6, 12, 20, ...', dimensionKey: 'LR' },
    { text: 'Choose the odd one out: Circle, Square, Triangle, Cube', dimensionKey: 'LR' },
    { text: 'If today is Monday, what day will it be in 10 days?', dimensionKey: 'LR' },
    { text: 'Which statement logically follows?', dimensionKey: 'LR' }
  ];
  await PsychometricQuestion.insertMany(logQs.map((q,i)=>({ testKey: 'logical-basic', order: i+1, reverseScored:false, ...q })));
  const riasecItems = [
    { text: 'Repair mechanical equipment', dimensionKey: 'R' },
    { text: 'Study a biological problem', dimensionKey: 'I' },
    { text: 'Write a short story or poem', dimensionKey: 'A' },
    { text: 'Help people solve personal problems', dimensionKey: 'S' },
    { text: 'Sell a product to a customer', dimensionKey: 'E' },
    { text: 'Organize files and records', dimensionKey: 'C' },
    { text: 'Operate heavy machinery', dimensionKey: 'R' },
    { text: 'Conduct a scientific experiment', dimensionKey: 'I' },
    { text: 'Design a poster or logo', dimensionKey: 'A' },
    { text: 'Teach children', dimensionKey: 'S' },
  ];
  await PsychometricQuestion.insertMany(riasecItems.map((q, i) => ({ testKey: 'riasec', order: i + 1, reverseScored: false, ...q })));
}

// List tests
router.get('/tests', async (req, res) => {
  try {
    await ensureSeeded();
    const tests = await PsychometricTest.find({ isActive: true }).select('-__v');
    res.json({ success: true, data: tests });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching tests' });
  }
});

// Manual seed trigger (dev convenience)
router.post('/seed', async (req, res) => {
  try {
    await ensureSeeded();
    const tests = await PsychometricTest.find({ isActive: true });
    res.json({ success: true, data: tests });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Seed failed' });
  }
});

// Get questions for a test
router.get('/tests/:key/questions', async (req, res) => {
  try {
    const test = await PsychometricTest.findOne({ key: req.params.key, isActive: true });
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
    // Pagination support for large banks
    const page = parseInt(req.query.page || '1');
    const limit = Math.min(parseInt(req.query.limit || '100'), 500);
    const skip = (page - 1) * limit;
    const [qs, total] = await Promise.all([
      PsychometricQuestion.find({ testKey: req.params.key }).sort({ order: 1 }).skip(skip).limit(limit),
      PsychometricQuestion.countDocuments({ testKey: req.params.key })
    ]);
    res.json({ success: true, data: { test, questions: qs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching questions' });
  }
});

// Submit test results
router.post('/tests/:key/submit', async (req, res) => {
  try {
    const { key } = req.params;
    const { answers, timeSpent } = req.body;
    const userId = req.body.userId || null; // Allow optional userId

    // Find the test
    const test = await PsychometricTest.findOne({ key });
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    // Get questions for this test
    const questions = await PsychometricQuestion.find({ testKey: key }).sort({ order: 1 });
    
    // Calculate score based on answered questions
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    const score = Math.round((answeredQuestions / totalQuestions) * 100);

    // Create result record
    const result = new PsychometricResult({
      testKey: key,
      testName: test.name,
      userId: userId,
      userName: req.body.userName || 'Anonymous User',
      totalQuestions,
      answeredQuestions,
      score,
      answers,
      timeSpent: timeSpent || 0,
      completedAt: new Date()
    });

    await result.save();

    res.json({
      success: true,
      data: result,
      message: 'Test results saved successfully'
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ success: false, message: 'Failed to submit test results' });
  }
});

// Get user results
router.get('/results/:userId', async (req, res) => {
  try {
    const results = await PsychometricResult.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: results });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching results' });
  }
});

// Get a single result by id
router.get('/result/:resultId', async (req, res) => {
  try {
    const result = await PsychometricResult.findById(req.params.resultId);
    if (!result) return res.status(404).json({ success: false, message: 'Result not found' });
    res.json({ success: true, data: result });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching result' });
  }
});

export default router;

// Admin Management Endpoints
// Admin: Create or update test
router.post('/admin/tests', auth, adminAuth, async (req, res) => {
  try {
    const { key, name, category, description, timeLimitMinutes, dimensions, scale, questions, icon } = req.body;
    
    // Validate required fields
    if (!key || !name || !category || !description || !timeLimitMinutes) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: key, name, category, description, timeLimitMinutes' 
      });
    }

    // Check if test already exists
    let test = await PsychometricTest.findOne({ key });
    
    if (test) {
      // Update existing test
      test.name = name;
      test.category = category;
      test.description = description;
      test.timeLimitMinutes = timeLimitMinutes;
      test.dimensions = dimensions || test.dimensions;
      test.scale = scale || test.scale;
      test.numQuestions = questions ? questions.length : test.numQuestions;
      test.numTests = test.numTests || 1;
      test.rating = test.rating || 4.5;
      test.icon = icon || test.icon || '🧠';
    } else {
      // Create new test
      test = new PsychometricTest({
        key,
        name,
        category,
        description,
        timeLimitMinutes,
        dimensions: dimensions || [{ key: 'GENERAL', name: 'General', description: 'General ability' }],
        scale: scale || {
          min: 1,
          max: 5,
          labels: [
            { value: 1, label: 'Very Low' },
            { value: 2, label: 'Low' },
            { value: 3, label: 'Average' },
            { value: 4, label: 'High' },
            { value: 5, label: 'Very High' }
          ]
        },
        numQuestions: questions ? questions.length : 0,
        numTests: 1,
        rating: 4.5,
        icon: icon || '🧠'
      });
    }

    await test.save();

    // If questions are provided, import them
    if (questions && Array.isArray(questions) && questions.length > 0) {
      try {
        // Remove existing questions for this test
        await PsychometricQuestion.deleteMany({ testKey: key });
        
        // Create new questions
        const questionDocs = questions.map((q, index) => ({
          testKey: key,
          text: q.text,
          dimensionKey: q.dimensionKey || 'GENERAL',
          order: q.order || index + 1,
          options: q.options || [],
          correctAnswer: q.correctAnswer || null
        }));
        
        await PsychometricQuestion.insertMany(questionDocs);
        
        // Update test with question count
        test.numQuestions = questions.length;
        await test.save();
      } catch (questionError) {
        console.error('Error importing questions:', questionError);
        // Continue even if questions fail to import
      }
    }

    res.json({
      success: true,
      data: test,
      message: test.isNew ? 'Test created successfully' : 'Test updated successfully'
    });
  } catch (error) {
    console.error('Error creating/updating test:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create/update test: ' + error.message 
    });
  }
});

// Admin: Create complete test with questions and answers
router.post('/admin/tests/complete', auth, adminAuth, async (req, res) => {
  try {
    const { 
      key, 
      name, 
      category, 
      description, 
      timeLimitMinutes, 
      dimensions, 
      scale, 
      questions,
      icon = '🧠'
    } = req.body;
    
    // Validate required fields
    if (!key || !name || !category || !description || !timeLimitMinutes || !questions) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: key, name, category, description, timeLimitMinutes, questions' 
      });
    }

    // Check if test already exists
    let test = await PsychometricTest.findOne({ key });
    
    if (test) {
      return res.status(400).json({ 
        success: false, 
        message: 'Test with this key already exists. Use update endpoint instead.' 
      });
    }

    // Create new test
    test = new PsychometricTest({
      key,
      name,
      category,
      description,
      timeLimitMinutes,
      dimensions: dimensions || [{ key: 'GENERAL', name: 'General', description: 'General ability' }],
      scale: scale || {
        min: 1,
        max: 5,
        labels: [
          { value: 1, label: 'Very Low' },
          { value: 2, label: 'Low' },
          { value: 3, label: 'Average' },
          { value: 4, label: 'High' },
          { value: 5, label: 'Very High' }
        ]
      },
      numQuestions: questions.length,
      numTests: 1,
      rating: 4.5,
      icon
    });

    await test.save();

    // Create questions with options and correct answers
    const questionDocs = questions.map((q, index) => ({
      testKey: key,
      text: q.text,
      dimensionKey: q.dimensionKey || 'GENERAL',
      order: q.order || index + 1,
      options: q.options || [],
      correctAnswer: q.correctAnswer || null,
      explanation: q.explanation || null
    }));
    
    await PsychometricQuestion.insertMany(questionDocs);

    res.json({
      success: true,
      data: {
        test,
        questionsCount: questions.length
      },
      message: 'Complete test created successfully with questions and answers'
    });
  } catch (error) {
    console.error('Error creating complete test:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create complete test: ' + error.message 
    });
  }
});

// Admin: Update existing test
router.put('/admin/tests/:key', auth, adminAuth, async (req, res) => {
  try {
    const { key } = req.params;
    const updateData = req.body;
    
    const test = await PsychometricTest.findOne({ key });
    if (!test) {
      return res.status(404).json({ 
        success: false, 
        message: 'Test not found' 
      });
    }

    // Update test fields
    Object.assign(test, updateData);
    
    // If questions are provided, update them
    if (updateData.questions && Array.isArray(updateData.questions)) {
      // Remove existing questions
      await PsychometricQuestion.deleteMany({ testKey: key });
      
      // Create new questions
      const questionDocs = updateData.questions.map((q, index) => ({
        testKey: key,
        text: q.text,
        dimensionKey: q.dimensionKey || 'GENERAL',
        order: q.order || index + 1,
        options: q.options || [],
        correctAnswer: q.correctAnswer || null,
        explanation: q.explanation || null
      }));
      
      await PsychometricQuestion.insertMany(questionDocs);
      
      // Update question count
      test.numQuestions = updateData.questions.length;
    }

    await test.save();

    res.json({
      success: true,
      data: test,
      message: 'Test updated successfully'
    });
  } catch (error) {
    console.error('Error updating test:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update test: ' + error.message 
    });
  }
});

// Admin: Delete test and all its questions
router.delete('/admin/tests/:key', auth, adminAuth, async (req, res) => {
  try {
    const { key } = req.params;
    
    // Delete test
    const test = await PsychometricTest.findOneAndDelete({ key });
    if (!test) {
      return res.status(404).json({ 
        success: false, 
        message: 'Test not found' 
      });
    }

    // Delete all questions for this test
    await PsychometricQuestion.deleteMany({ testKey: key });

    // Delete all results for this test
    await PsychometricResult.deleteMany({ testKey: key });

    res.json({
      success: true,
      message: 'Test and all associated data deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete test: ' + error.message 
    });
  }
});

// Bulk import questions (JSON array). Accepts [{text, dimensionKey, order, reverseScored}]
router.post('/admin/tests/:key/questions/import', auth, adminAuth, async (req, res) => {
  try {
    const key = req.params.key;
    const items = Array.isArray(req.body) ? req.body : req.body.items;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No questions provided' });
    }
    const prepared = items.map((q, i) => ({
      testKey: key,
      text: q.text,
      dimensionKey: q.dimensionKey || q.dimension || 'GEN',
      reverseScored: Boolean(q.reverseScored),
      order: q.order ?? (i + 1)
    }));
    // Clean existing if requested
    if (String(req.query.replace) === 'true') {
      await PsychometricQuestion.deleteMany({ testKey: key });
    }
    const inserted = await PsychometricQuestion.insertMany(prepared, { ordered: false });
    // Also update count on test
    await PsychometricTest.updateOne({ key }, { $set: { numQuestions: await PsychometricQuestion.countDocuments({ testKey: key }) } });
    res.json({ success: true, inserted: inserted.length });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: 'Import failed', error: e.message });
  }
});

// Admin: List all results with filtering and pagination
router.get('/admin/results', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 100, sortBy = 'completedAt', sortOrder = 'desc', testKey, userId } = req.query;
    
    // Build filter query
    const filter = {};
    if (testKey) filter.testKey = testKey;
    if (userId) filter.userId = userId;

    // Build sort query
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;
    
    const results = await PsychometricResult.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email');

    const total = await PsychometricResult.countDocuments(filter);

    res.json({
      success: true,
      data: {
        results,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch results' });
  }
});


