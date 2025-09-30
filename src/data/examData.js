// Comprehensive Exam Data for Exam Predictor
export const examData = [
  {
    _id: 'jee-main-1',
    examName: 'JEE Main',
    examType: 'JEE',
    category: 'Engineering',
    description: 'Joint Entrance Examination Main for admission to NITs, IIITs, and other engineering colleges across India. This is the gateway to premier engineering institutions.',
    examPattern: {
      totalQuestions: 90,
      duration: 180,
      totalMarks: 300,
      sections: [
        { name: 'Physics', questions: 30, marks: 100 },
        { name: 'Chemistry', questions: 30, marks: 100 },
        { name: 'Mathematics', questions: 30, marks: 100 }
      ]
    },
    importantDates: {
      registrationStart: '2025-01-15',
      registrationEnd: '2025-02-15',
      examDate: '2025-04-15'
    },
    colleges: [
      { name: 'IIT Delhi', branch: 'Computer Science' },
      { name: 'IIT Bombay', branch: 'Mechanical Engineering' },
      { name: 'IIT Madras', branch: 'Electrical Engineering' },
      { name: 'NIT Trichy', branch: 'Civil Engineering' },
      { name: 'NIT Surathkal', branch: 'Information Technology' }
    ],
    isActive: true
  },
  {
    _id: 'jee-advanced-1',
    examName: 'JEE Advanced',
    examType: 'JEE',
    category: 'Engineering',
    description: 'Joint Entrance Examination Advanced for admission to IITs. Only top 2.5 lakh JEE Main qualifiers can appear for this exam.',
    examPattern: {
      totalQuestions: 54,
      duration: 180,
      totalMarks: 180,
      sections: [
        { name: 'Physics', questions: 18, marks: 60 },
        { name: 'Chemistry', questions: 18, marks: 60 },
        { name: 'Mathematics', questions: 18, marks: 60 }
      ]
    },
    importantDates: {
      registrationStart: '2025-05-01',
      registrationEnd: '2025-05-15',
      examDate: '2025-06-15'
    },
    colleges: [
      { name: 'IIT Delhi', branch: 'All Branches' },
      { name: 'IIT Bombay', branch: 'All Branches' },
      { name: 'IIT Madras', branch: 'All Branches' },
      { name: 'IIT Kanpur', branch: 'All Branches' },
      { name: 'IIT Kharagpur', branch: 'All Branches' }
    ],
    isActive: true
  },
  {
    _id: 'neet-1',
    examName: 'NEET',
    examType: 'NEET',
    category: 'Medical',
    description: 'National Eligibility cum Entrance Test for admission to MBBS, BDS, and other medical courses in government and private medical colleges.',
    examPattern: {
      totalQuestions: 200,
      duration: 200,
      totalMarks: 720,
      sections: [
        { name: 'Physics', questions: 50, marks: 180 },
        { name: 'Chemistry', questions: 50, marks: 180 },
        { name: 'Biology', questions: 100, marks: 360 }
      ]
    },
    importantDates: {
      registrationStart: '2025-02-01',
      registrationEnd: '2025-03-15',
      examDate: '2025-05-05'
    },
    colleges: [
      { name: 'AIIMS Delhi', branch: 'MBBS' },
      { name: 'JIPMER Puducherry', branch: 'MBBS' },
      { name: 'AFMC Pune', branch: 'MBBS' },
      { name: 'BHU Varanasi', branch: 'MBBS' },
      { name: 'MAMC Delhi', branch: 'MBBS' }
    ],
    isActive: true
  },
  {
    _id: 'cat-1',
    examName: 'CAT',
    examType: 'CAT',
    category: 'Management',
    description: 'Common Admission Test for admission to IIMs and other top B-schools in India. Tests quantitative, verbal, and logical reasoning skills.',
    examPattern: {
      totalQuestions: 66,
      duration: 120,
      totalMarks: 198,
      sections: [
        { name: 'Verbal Ability', questions: 22, marks: 66 },
        { name: 'Data Interpretation', questions: 22, marks: 66 },
        { name: 'Quantitative Aptitude', questions: 22, marks: 66 }
      ]
    },
    importantDates: {
      registrationStart: '2025-08-01',
      registrationEnd: '2025-09-15',
      examDate: '2025-11-30'
    },
    colleges: [
      { name: 'IIM Ahmedabad', branch: 'PGP' },
      { name: 'IIM Bangalore', branch: 'PGP' },
      { name: 'IIM Calcutta', branch: 'PGP' },
      { name: 'IIM Lucknow', branch: 'PGP' },
      { name: 'IIM Kozhikode', branch: 'PGP' }
    ],
    isActive: true
  },
  {
    _id: 'gate-1',
    examName: 'GATE',
    examType: 'GATE',
    category: 'Engineering',
    description: 'Graduate Aptitude Test in Engineering for admission to M.Tech programs and recruitment in PSUs. Tests subject knowledge and aptitude.',
    examPattern: {
      totalQuestions: 65,
      duration: 180,
      totalMarks: 100,
      sections: [
        { name: 'General Aptitude', questions: 10, marks: 15 },
        { name: 'Subject Specific', questions: 55, marks: 85 }
      ]
    },
    importantDates: {
      registrationStart: '2025-08-15',
      registrationEnd: '2025-09-30',
      examDate: '2025-02-15'
    },
    colleges: [
      { name: 'IIT Delhi', branch: 'M.Tech' },
      { name: 'IIT Bombay', branch: 'M.Tech' },
      { name: 'IIT Madras', branch: 'M.Tech' },
      { name: 'NIT Trichy', branch: 'M.Tech' },
      { name: 'BITS Pilani', branch: 'M.Tech' }
    ],
    isActive: true
  },
  {
    _id: 'clat-1',
    examName: 'CLAT',
    examType: 'CLAT',
    category: 'Law',
    description: 'Common Law Admission Test for admission to National Law Universities (NLUs) and other law colleges across India.',
    examPattern: {
      totalQuestions: 150,
      duration: 120,
      totalMarks: 150,
      sections: [
        { name: 'English', questions: 28, marks: 28 },
        { name: 'Current Affairs', questions: 35, marks: 35 },
        { name: 'Legal Reasoning', questions: 35, marks: 35 },
        { name: 'Logical Reasoning', questions: 28, marks: 28 },
        { name: 'Quantitative Techniques', questions: 24, marks: 24 }
      ]
    },
    importantDates: {
      registrationStart: '2025-01-01',
      registrationEnd: '2025-03-31',
      examDate: '2025-06-15'
    },
    colleges: [
      { name: 'NLU Delhi', branch: 'BA LLB' },
      { name: 'NLU Bangalore', branch: 'BA LLB' },
      { name: 'NLU Hyderabad', branch: 'BA LLB' },
      { name: 'NLU Kolkata', branch: 'BA LLB' },
      { name: 'NLU Jodhpur', branch: 'BA LLB' }
    ],
    isActive: true
  },
  {
    _id: 'upsc-cse-1',
    examName: 'UPSC CSE',
    examType: 'UPSC',
    category: 'Civil Services',
    description: 'Union Public Service Commission Civil Services Examination for recruitment to IAS, IPS, IFS, and other civil services.',
    examPattern: {
      totalQuestions: 'Multiple Stages',
      duration: 'Multiple Days',
      totalMarks: 'Multiple Stages',
      sections: [
        { name: 'Preliminary', questions: 'Objective Type', marks: 'Qualifying' },
        { name: 'Mains', questions: 'Descriptive', marks: '1750' },
        { name: 'Interview', questions: 'Personality Test', marks: '275' }
      ]
    },
    importantDates: {
      registrationStart: '2025-02-01',
      registrationEnd: '2025-03-01',
      examDate: '2025-06-01'
    },
    colleges: [
      { name: 'LBSNAA Mussoorie', branch: 'IAS Training' },
      { name: 'SVPNPA Hyderabad', branch: 'IPS Training' },
      { name: 'FSI Delhi', branch: 'IFS Training' },
      { name: 'NAARM Hyderabad', branch: 'IRS Training' },
      { name: 'NIFM Faridabad', branch: 'IFS Training' }
    ],
    isActive: true
  },
  {
    _id: 'ssc-cgl-1',
    examName: 'SSC CGL',
    examType: 'SSC',
    category: 'Government Jobs',
    description: 'Staff Selection Commission Combined Graduate Level Examination for recruitment to various government posts.',
    examPattern: {
      totalQuestions: 100,
      duration: 60,
      totalMarks: 200,
      sections: [
        { name: 'General Intelligence', questions: 25, marks: 50 },
        { name: 'General Knowledge', questions: 25, marks: 50 },
        { name: 'Quantitative Aptitude', questions: 25, marks: 50 },
        { name: 'English Language', questions: 25, marks: 50 }
      ]
    },
    importantDates: {
      registrationStart: '2025-04-01',
      registrationEnd: '2025-05-15',
      examDate: '2025-08-15'
    },
    colleges: [
      { name: 'Various Ministries', branch: 'Administrative Posts' },
      { name: 'Government Departments', branch: 'Inspector Posts' },
      { name: 'Central Agencies', branch: 'Assistant Posts' },
      { name: 'State Governments', branch: 'Various Posts' },
      { name: 'Public Sector', branch: 'Officer Posts' }
    ],
    isActive: true
  },
  {
    _id: 'bank-po-1',
    examName: 'Bank PO',
    examType: 'Banking',
    category: 'Banking',
    description: 'Bank Probationary Officer examination for recruitment to various public sector banks. Tests banking knowledge and aptitude.',
    examPattern: {
      totalQuestions: 200,
      duration: 120,
      totalMarks: 200,
      sections: [
        { name: 'Reasoning', questions: 50, marks: 50 },
        { name: 'English Language', questions: 40, marks: 40 },
        { name: 'Quantitative Aptitude', questions: 50, marks: 50 },
        { name: 'General Awareness', questions: 40, marks: 40 },
        { name: 'Computer Knowledge', questions: 20, marks: 20 }
      ]
    },
    importantDates: {
      registrationStart: '2025-03-01',
      registrationEnd: '2025-04-15',
      examDate: '2025-07-15'
    },
    colleges: [
      { name: 'SBI', branch: 'Probationary Officer' },
      { name: 'IBPS', branch: 'Probationary Officer' },
      { name: 'RBI', branch: 'Grade B Officer' },
      { name: 'NABARD', branch: 'Grade A Officer' },
      { name: 'SEBI', branch: 'Grade A Officer' }
    ],
    isActive: true
  },
  {
    _id: 'nda-1',
    examName: 'NDA',
    examType: 'Defense',
    category: 'Defense',
    description: 'National Defence Academy examination for admission to Army, Navy, and Air Force wings of NDA.',
    examPattern: {
      totalQuestions: 150,
      duration: 150,
      totalMarks: 900,
      sections: [
        { name: 'Mathematics', questions: 120, marks: 300 },
        { name: 'General Ability Test', questions: 150, marks: 600 }
      ]
    },
    importantDates: {
      registrationStart: '2025-01-01',
      registrationEnd: '2025-02-15',
      examDate: '2025-04-20'
    },
    colleges: [
      { name: 'NDA Khadakwasla', branch: 'Army Wing' },
      { name: 'NDA Khadakwasla', branch: 'Navy Wing' },
      { name: 'NDA Khadakwasla', branch: 'Air Force Wing' },
      { name: 'IMA Dehradun', branch: 'Army Training' },
      { name: 'AFA Hyderabad', branch: 'Air Force Training' }
    ],
    isActive: true
  },
  {
    _id: 'cds-1',
    examName: 'CDS',
    examType: 'Defense',
    category: 'Defense',
    description: 'Combined Defence Services examination for recruitment to Indian Military Academy, Naval Academy, and Air Force Academy.',
    examPattern: {
      totalQuestions: 120,
      duration: 120,
      totalMarks: 300,
      sections: [
        { name: 'English', questions: 120, marks: 100 },
        { name: 'General Knowledge', questions: 120, marks: 100 },
        { name: 'Elementary Mathematics', questions: 120, marks: 100 }
      ]
    },
    importantDates: {
      registrationStart: '2025-05-01',
      registrationEnd: '2025-06-15',
      examDate: '2025-09-15'
    },
    colleges: [
      { name: 'IMA Dehradun', branch: 'Army Training' },
      { name: 'NAVAC Ezhimala', branch: 'Navy Training' },
      { name: 'AFA Hyderabad', branch: 'Air Force Training' },
      { name: 'OTA Chennai', branch: 'Army Training' },
      { name: 'OTA Gaya', branch: 'Army Training' }
    ],
    isActive: true
  }
];

// Exam Categories
export const examCategories = [
  'Engineering',
  'Medical',
  'Management',
  'Law',
  'Civil Services',
  'Government Jobs',
  'Banking',
  'Defense',
  'Arts & Humanities',
  'Science',
  'Commerce',
  'Agriculture',
  'Architecture',
  'Design',
  'Hotel Management',
  'Fashion Technology',
  'Media & Journalism',
  'Education',
  'Social Work',
  'Pharmacy'
];

// Exam Types
export const examTypes = [
  'JEE',
  'NEET',
  'CAT',
  'GATE',
  'CLAT',
  'UPSC',
  'SSC',
  'Banking',
  'Defense',
  'State Level',
  'University Level',
  'International',
  'Professional',
  'Entrance',
  'Competitive'
];

// Popular Exams for Quick Access
export const popularExams = [
  'JEE Main',
  'JEE Advanced',
  'NEET',
  'CAT',
  'GATE',
  'CLAT',
  'UPSC CSE',
  'SSC CGL',
  'Bank PO',
  'NDA'
];

export default examData;
