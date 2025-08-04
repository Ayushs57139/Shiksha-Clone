// College Tools Data
export const collegeTools = {
  collegePredictor: {
    title: "College Predictor",
    description: "Predict your chances of getting into top colleges based on your scores",
    data: [
      {
        id: 1,
        name: "IIT JEE Main Predictor",
        description: "Predict IIT admission chances based on JEE Main rank",
        colleges: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur"],
        cutoffRanks: [1000, 2000, 3000, 5000, 8000],
        successRate: 85
      },
      {
        id: 2,
        name: "NEET College Predictor",
        description: "Predict medical college admission based on NEET score",
        colleges: ["AIIMS Delhi", "JIPMER Puducherry", "AFMC Pune", "MAMC Delhi", "GMC Mumbai"],
        cutoffScores: [650, 600, 580, 550, 520],
        successRate: 78
      },
      {
        id: 3,
        name: "CAT College Predictor",
        description: "Predict MBA college admission based on CAT percentile",
        colleges: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "IIM Indore"],
        cutoffPercentiles: [99.5, 99.0, 98.5, 97.0, 95.0],
        successRate: 82
      }
    ]
  },
  feeCalculator: {
    title: "Fee Calculator",
    description: "Calculate total cost of education including fees, accommodation, and other expenses",
    data: [
      {
        id: 1,
        name: "Engineering Fee Calculator",
        categories: ["Government Colleges", "Private Colleges", "Deemed Universities"],
        feeRanges: {
          government: { min: 50000, max: 200000, avg: 125000 },
          private: { min: 200000, max: 800000, avg: 500000 },
          deemed: { min: 300000, max: 1200000, avg: 750000 }
        },
        additionalCosts: {
          hostel: 60000,
          mess: 40000,
          books: 15000,
          transport: 20000
        }
      },
      {
        id: 2,
        name: "Medical Fee Calculator",
        categories: ["Government Medical Colleges", "Private Medical Colleges", "Deemed Medical Universities"],
        feeRanges: {
          government: { min: 100000, max: 500000, avg: 300000 },
          private: { min: 800000, max: 2500000, avg: 1500000 },
          deemed: { min: 1200000, max: 3500000, avg: 2000000 }
        },
        additionalCosts: {
          hostel: 80000,
          mess: 50000,
          books: 25000,
          transport: 25000
        }
      },
      {
        id: 3,
        name: "MBA Fee Calculator",
        categories: ["IIMs", "Other Government Colleges", "Private B-Schools"],
        feeRanges: {
          iims: { min: 200000, max: 2500000, avg: 1200000 },
          government: { min: 100000, max: 500000, avg: 300000 },
          private: { min: 500000, max: 2000000, avg: 1200000 }
        },
        additionalCosts: {
          hostel: 100000,
          mess: 60000,
          books: 20000,
          transport: 30000
        }
      }
    ]
  },
  rankingCompare: {
    title: "Ranking Compare",
    description: "Compare colleges based on NIRF rankings, placement records, and other parameters",
    data: [
      {
        id: 1,
        name: "Engineering Rankings",
        colleges: [
          {
            name: "IIT Bombay",
            nirfRank: 1,
            placementRate: 95,
            avgPackage: 1200000,
            highestPackage: 5000000,
            researchScore: 85
          },
          {
            name: "IIT Delhi",
            nirfRank: 2,
            placementRate: 92,
            avgPackage: 1100000,
            highestPackage: 4500000,
            researchScore: 82
          },
          {
            name: "IIT Madras",
            nirfRank: 3,
            placementRate: 90,
            avgPackage: 1050000,
            highestPackage: 4200000,
            researchScore: 80
          }
        ]
      },
      {
        id: 2,
        name: "Medical Rankings",
        colleges: [
          {
            name: "AIIMS Delhi",
            nirfRank: 1,
            placementRate: 98,
            avgPackage: 800000,
            highestPackage: 2000000,
            researchScore: 90
          },
          {
            name: "JIPMER Puducherry",
            nirfRank: 2,
            placementRate: 95,
            avgPackage: 750000,
            highestPackage: 1800000,
            researchScore: 85
          },
          {
            name: "MAMC Delhi",
            nirfRank: 3,
            placementRate: 92,
            avgPackage: 700000,
            highestPackage: 1600000,
            researchScore: 80
          }
        ]
      }
    ]
  },
  admissionGuide: {
    title: "Admission Guide",
    description: "Complete guide for college admissions including application process, documents required, and important dates",
    data: [
      {
        id: 1,
        name: "JEE Main Admission Guide",
        examDate: "January 2025",
        applicationStart: "December 2024",
        applicationEnd: "January 2025",
        counsellingStart: "June 2025",
        importantDates: [
          "Application Start: December 2024",
          "Application End: January 2025",
          "Exam Date: January 2025",
          "Result Declaration: February 2025",
          "Counselling Start: June 2025"
        ],
        documentsRequired: [
          "Class 10th Certificate",
          "Class 12th Certificate",
          "JEE Main Score Card",
          "Category Certificate (if applicable)",
          "Domicile Certificate",
          "Income Certificate"
        ],
        process: [
          "Register for JEE Main",
          "Appear for the exam",
          "Check your rank",
          "Register for JoSAA counselling",
          "Fill college preferences",
          "Get seat allotment"
        ]
      },
      {
        id: 2,
        name: "NEET Admission Guide",
        examDate: "May 2025",
        applicationStart: "March 2025",
        applicationEnd: "April 2025",
        counsellingStart: "July 2025",
        importantDates: [
          "Application Start: March 2025",
          "Application End: April 2025",
          "Exam Date: May 2025",
          "Result Declaration: June 2025",
          "Counselling Start: July 2025"
        ],
        documentsRequired: [
          "Class 10th Certificate",
          "Class 12th Certificate",
          "NEET Score Card",
          "Category Certificate (if applicable)",
          "Domicile Certificate",
          "Income Certificate"
        ],
        process: [
          "Register for NEET",
          "Appear for the exam",
          "Check your rank",
          "Register for counselling",
          "Fill college preferences",
          "Get seat allotment"
        ]
      }
    ]
  }
};

// Exam Preparation Data
export const examPreparation = {
  jeeMain: {
    title: "JEE Main Preparation",
    description: "Complete preparation guide for JEE Main examination",
    data: {
      examPattern: {
        subjects: ["Physics", "Chemistry", "Mathematics"],
        totalQuestions: 75,
        duration: "3 hours",
        markingScheme: "+4 for correct, -1 for incorrect"
      },
      syllabus: {
        physics: [
          "Mechanics",
          "Thermodynamics",
          "Electromagnetism",
          "Optics",
          "Modern Physics"
        ],
        chemistry: [
          "Physical Chemistry",
          "Organic Chemistry",
          "Inorganic Chemistry"
        ],
        mathematics: [
          "Algebra",
          "Calculus",
          "Trigonometry",
          "Geometry",
          "Statistics"
        ]
      },
      preparationTips: [
        "Focus on NCERT books first",
        "Practice previous year questions",
        "Take regular mock tests",
        "Revise important formulas",
        "Time management is crucial"
      ],
      studyMaterials: [
        "NCERT Textbooks",
        "HC Verma Physics",
        "OP Tandon Chemistry",
        "RD Sharma Mathematics",
        "Previous Year Papers"
      ]
    }
  },
  neet: {
    title: "NEET Preparation",
    description: "Complete preparation guide for NEET examination",
    data: {
      examPattern: {
        subjects: ["Physics", "Chemistry", "Biology"],
        totalQuestions: 200,
        duration: "3 hours 20 minutes",
        markingScheme: "+4 for correct, -1 for incorrect"
      },
      syllabus: {
        physics: [
          "Mechanics",
          "Thermodynamics",
          "Electromagnetism",
          "Optics",
          "Modern Physics"
        ],
        chemistry: [
          "Physical Chemistry",
          "Organic Chemistry",
          "Inorganic Chemistry"
        ],
        biology: [
          "Botany",
          "Zoology",
          "Human Physiology",
          "Ecology"
        ]
      },
      preparationTips: [
        "Focus on NCERT Biology",
        "Practice diagrams and labeling",
        "Understand concepts thoroughly",
        "Regular revision is important",
        "Solve previous year papers"
      ],
      studyMaterials: [
        "NCERT Biology",
        "NCERT Physics",
        "NCERT Chemistry",
        "Previous Year Papers",
        "Mock Tests"
      ]
    }
  },
  cat: {
    title: "CAT Preparation",
    description: "Complete preparation guide for CAT examination",
    data: {
      examPattern: {
        sections: ["Verbal Ability", "Data Interpretation", "Quantitative Aptitude"],
        totalQuestions: 66,
        duration: "2 hours",
        markingScheme: "+3 for correct, -1 for incorrect"
      },
      syllabus: {
        verbalAbility: [
          "Reading Comprehension",
          "Verbal Logic",
          "Grammar",
          "Vocabulary"
        ],
        dataInterpretation: [
          "Tables and Graphs",
          "Data Sufficiency",
          "Logical Reasoning",
          "Case Studies"
        ],
        quantitativeAptitude: [
          "Number System",
          "Algebra",
          "Geometry",
          "Arithmetic",
          "Modern Math"
        ]
      },
      preparationTips: [
        "Focus on speed and accuracy",
        "Practice mental calculations",
        "Read newspapers daily",
        "Solve puzzles and brain teasers",
        "Take regular mock tests"
      ],
      studyMaterials: [
        "CAT Previous Year Papers",
        "Quantitative Aptitude Books",
        "Verbal Ability Books",
        "Mock Test Series",
        "Online Resources"
      ]
    }
  },
  gate: {
    title: "GATE Preparation",
    description: "Complete preparation guide for GATE examination",
    data: {
      examPattern: {
        subjects: ["Computer Science", "Electronics", "Mechanical", "Civil"],
        totalQuestions: 65,
        duration: "3 hours",
        markingScheme: "+1 for correct, -1/3 for incorrect"
      },
      syllabus: {
        computerScience: [
          "Programming",
          "Data Structures",
          "Algorithms",
          "Computer Networks",
          "Operating Systems",
          "Database Systems"
        ],
        electronics: [
          "Digital Electronics",
          "Analog Electronics",
          "Signals and Systems",
          "Control Systems",
          "Communication Systems"
        ]
      },
      preparationTips: [
        "Focus on core subjects",
        "Practice numerical problems",
        "Understand concepts deeply",
        "Solve previous year papers",
        "Take subject-specific tests"
      ],
      studyMaterials: [
        "GATE Previous Year Papers",
        "Subject-specific Books",
        "Online Courses",
        "Mock Test Series",
        "Study Notes"
      ]
    }
  }
};

// Career Resources Data
export const careerResources = {
  careerCounseling: {
    title: "Career Counseling",
    description: "Professional career guidance and counseling services",
    data: [
      {
        id: 1,
        name: "Stream Selection",
        description: "Choose the right stream after 10th standard",
        options: [
          {
            stream: "Science",
            careers: ["Engineering", "Medical", "Research", "Teaching"],
            subjects: ["Physics", "Chemistry", "Mathematics/Biology"],
            duration: "2 years"
          },
          {
            stream: "Commerce",
            careers: ["Chartered Accountancy", "Business Management", "Banking", "Finance"],
            subjects: ["Accountancy", "Business Studies", "Economics"],
            duration: "2 years"
          },
          {
            stream: "Arts",
            careers: ["Law", "Journalism", "Design", "Social Work"],
            subjects: ["History", "Geography", "Political Science", "Literature"],
            duration: "2 years"
          }
        ]
      },
      {
        id: 2,
        name: "Career Assessment",
        description: "Assess your interests and aptitude for different careers",
        assessments: [
          {
            name: "Interest Assessment",
            questions: 50,
            duration: "30 minutes",
            areas: ["Technical", "Creative", "Analytical", "Social", "Administrative"]
          },
          {
            name: "Aptitude Test",
            questions: 60,
            duration: "45 minutes",
            areas: ["Numerical", "Verbal", "Logical", "Spatial", "Mechanical"]
          },
          {
            name: "Personality Assessment",
            questions: 40,
            duration: "25 minutes",
            areas: ["Extroversion", "Introversion", "Leadership", "Teamwork", "Innovation"]
          }
        ]
      }
    ]
  },
  jobProspects: {
    title: "Job Prospects",
    description: "Explore career opportunities and job prospects in different fields",
    data: [
      {
        id: 1,
        name: "Engineering Careers",
        fields: [
          {
            field: "Computer Science",
            jobRoles: ["Software Engineer", "Data Scientist", "AI Engineer", "DevOps Engineer"],
            avgSalary: "8-15 LPA",
            growthRate: "25% annually",
            companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"]
          },
          {
            field: "Mechanical Engineering",
            jobRoles: ["Design Engineer", "Production Engineer", "Quality Engineer", "R&D Engineer"],
            avgSalary: "5-10 LPA",
            growthRate: "15% annually",
            companies: ["Tata Motors", "Maruti Suzuki", "L&T", "Godrej", "Bajaj"]
          },
          {
            field: "Electrical Engineering",
            jobRoles: ["Power Engineer", "Control Engineer", "Electronics Engineer", "Instrumentation Engineer"],
            avgSalary: "6-12 LPA",
            growthRate: "18% annually",
            companies: ["BHEL", "NTPC", "Siemens", "ABB", "Schneider Electric"]
          }
        ]
      },
      {
        id: 2,
        name: "Medical Careers",
        fields: [
          {
            field: "MBBS",
            jobRoles: ["Medical Officer", "Resident Doctor", "General Practitioner", "Specialist"],
            avgSalary: "6-20 LPA",
            growthRate: "20% annually",
            organizations: ["Government Hospitals", "Private Hospitals", "NGOs", "Research Institutes"]
          },
          {
            field: "Nursing",
            jobRoles: ["Staff Nurse", "Nurse Practitioner", "Nursing Supervisor", "Clinical Nurse"],
            avgSalary: "3-8 LPA",
            growthRate: "22% annually",
            organizations: ["Hospitals", "Clinics", "Nursing Homes", "Home Healthcare"]
          }
        ]
      }
    ]
  },
  industryTrends: {
    title: "Industry Trends",
    description: "Latest trends and developments in various industries",
    data: [
      {
        id: 1,
        name: "Technology Trends",
        trends: [
          {
            trend: "Artificial Intelligence",
            description: "AI is transforming industries with automation and intelligent solutions",
            impact: "High",
            growthRate: "35% annually",
            jobOpportunities: ["AI Engineer", "Machine Learning Engineer", "Data Scientist"]
          },
          {
            trend: "Cloud Computing",
            description: "Cloud adoption is increasing rapidly across all sectors",
            impact: "High",
            growthRate: "28% annually",
            jobOpportunities: ["Cloud Architect", "DevOps Engineer", "Cloud Security Specialist"]
          },
          {
            trend: "Cybersecurity",
            description: "Growing need for cybersecurity professionals due to digital transformation",
            impact: "High",
            growthRate: "30% annually",
            jobOpportunities: ["Security Analyst", "Penetration Tester", "Security Architect"]
          }
        ]
      },
      {
        id: 2,
        name: "Healthcare Trends",
        trends: [
          {
            trend: "Telemedicine",
            description: "Digital healthcare is becoming mainstream",
            impact: "High",
            growthRate: "40% annually",
            jobOpportunities: ["Telemedicine Specialist", "Digital Health Consultant", "Healthcare IT"]
          },
          {
            trend: "Precision Medicine",
            description: "Personalized treatment based on genetic makeup",
            impact: "Medium",
            growthRate: "25% annually",
            jobOpportunities: ["Genetic Counselor", "Bioinformatics Specialist", "Research Scientist"]
          }
        ]
      }
    ]
  },
  skillDevelopment: {
    title: "Skill Development",
    description: "Develop essential skills for career growth",
    data: [
      {
        id: 1,
        name: "Technical Skills",
        skills: [
          {
            skill: "Programming",
            languages: ["Python", "Java", "JavaScript", "C++"],
            learningTime: "3-6 months",
            resources: ["Online Courses", "Books", "Practice Projects"],
            certification: ["Microsoft", "Oracle", "Google", "AWS"]
          },
          {
            skill: "Data Analysis",
            tools: ["Excel", "SQL", "Python", "Tableau"],
            learningTime: "2-4 months",
            resources: ["Online Courses", "Datasets", "Real Projects"],
            certification: ["Google Data Analytics", "Microsoft Power BI", "Tableau"]
          }
        ]
      },
      {
        id: 2,
        name: "Soft Skills",
        skills: [
          {
            skill: "Communication",
            aspects: ["Public Speaking", "Written Communication", "Active Listening"],
            learningTime: "Ongoing",
            resources: ["Toastmasters", "Writing Courses", "Practice"],
            certification: ["Toastmasters International", "Business Communication"]
          },
          {
            skill: "Leadership",
            aspects: ["Team Management", "Decision Making", "Conflict Resolution"],
            learningTime: "6-12 months",
            resources: ["Leadership Programs", "Mentorship", "Real Experience"],
            certification: ["Project Management", "Leadership Development"]
          }
        ]
      }
    ]
  }
};

// Study Abroad Data
export const studyAbroad = {
  usUniversities: {
    title: "US Universities",
    description: "Top universities in the United States for international students",
    data: [
      {
        id: 1,
        name: "Massachusetts Institute of Technology (MIT)",
        ranking: "World #1",
        location: "Cambridge, Massachusetts",
        programs: ["Engineering", "Computer Science", "Business", "Architecture"],
        tuitionFee: "$53,790/year",
        acceptanceRate: "7%",
        requirements: ["GRE/GMAT", "TOEFL/IELTS", "Strong GPA", "Research Experience"]
      },
      {
        id: 2,
        name: "Stanford University",
        ranking: "World #2",
        location: "Stanford, California",
        programs: ["Engineering", "Computer Science", "Medicine", "Business"],
        tuitionFee: "$56,169/year",
        acceptanceRate: "4%",
        requirements: ["GRE/GMAT", "TOEFL/IELTS", "Strong GPA", "Leadership Experience"]
      },
      {
        id: 3,
        name: "Harvard University",
        ranking: "World #3",
        location: "Cambridge, Massachusetts",
        programs: ["Law", "Medicine", "Business", "Arts & Sciences"],
        tuitionFee: "$54,768/year",
        acceptanceRate: "5%",
        requirements: ["GRE/GMAT", "TOEFL/IELTS", "Strong GPA", "Extracurricular Activities"]
      }
    ]
  },
  ukUniversities: {
    title: "UK Universities",
    description: "Top universities in the United Kingdom for international students",
    data: [
      {
        id: 1,
        name: "University of Oxford",
        ranking: "World #4",
        location: "Oxford, England",
        programs: ["Humanities", "Sciences", "Medicine", "Law"],
        tuitionFee: "£9,250/year (UK), £26,770/year (International)",
        acceptanceRate: "17%",
        requirements: ["IELTS 7.0+", "Strong Academic Record", "Personal Statement", "References"]
      },
      {
        id: 2,
        name: "University of Cambridge",
        ranking: "World #5",
        location: "Cambridge, England",
        programs: ["Arts", "Sciences", "Engineering", "Medicine"],
        tuitionFee: "£9,250/year (UK), £24,507/year (International)",
        acceptanceRate: "21%",
        requirements: ["IELTS 7.0+", "Strong Academic Record", "Personal Statement", "Interview"]
      },
      {
        id: 3,
        name: "Imperial College London",
        ranking: "World #6",
        location: "London, England",
        programs: ["Engineering", "Medicine", "Business", "Natural Sciences"],
        tuitionFee: "£9,250/year (UK), £32,000/year (International)",
        acceptanceRate: "14%",
        requirements: ["IELTS 6.5+", "Strong Academic Record", "Personal Statement", "References"]
      }
    ]
  },
  australia: {
    title: "Australia Universities",
    description: "Top universities in Australia for international students",
    data: [
      {
        id: 1,
        name: "University of Melbourne",
        ranking: "World #33",
        location: "Melbourne, Victoria",
        programs: ["Arts", "Sciences", "Engineering", "Medicine"],
        tuitionFee: "A$37,992/year",
        acceptanceRate: "70%",
        requirements: ["IELTS 6.5+", "Strong Academic Record", "Personal Statement", "References"]
      },
      {
        id: 2,
        name: "Australian National University",
        ranking: "World #27",
        location: "Canberra, ACT",
        programs: ["Arts", "Sciences", "Engineering", "Business"],
        tuitionFee: "A$36,400/year",
        acceptanceRate: "35%",
        requirements: ["IELTS 6.5+", "Strong Academic Record", "Personal Statement", "Research Experience"]
      },
      {
        id: 3,
        name: "University of Sydney",
        ranking: "World #38",
        location: "Sydney, New South Wales",
        programs: ["Arts", "Sciences", "Engineering", "Medicine"],
        tuitionFee: "A$42,000/year",
        acceptanceRate: "70%",
        requirements: ["IELTS 6.5+", "Strong Academic Record", "Personal Statement", "References"]
      }
    ]
  },
  canada: {
    title: "Canada Universities",
    description: "Top universities in Canada for international students",
    data: [
      {
        id: 1,
        name: "University of Toronto",
        ranking: "World #18",
        location: "Toronto, Ontario",
        programs: ["Arts", "Sciences", "Engineering", "Medicine"],
        tuitionFee: "C$45,690/year",
        acceptanceRate: "43%",
        requirements: ["IELTS 6.5+", "Strong Academic Record", "Personal Statement", "References"]
      },
      {
        id: 2,
        name: "University of British Columbia",
        ranking: "World #31",
        location: "Vancouver, British Columbia",
        programs: ["Arts", "Sciences", "Engineering", "Business"],
        tuitionFee: "C$38,946/year",
        acceptanceRate: "52%",
        requirements: ["IELTS 6.5+", "Strong Academic Record", "Personal Statement", "Extracurricular Activities"]
      },
      {
        id: 3,
        name: "McGill University",
        ranking: "World #27",
        location: "Montreal, Quebec",
        programs: ["Arts", "Sciences", "Engineering", "Medicine"],
        tuitionFee: "C$18,110/year",
        acceptanceRate: "46%",
        requirements: ["IELTS 6.5+", "Strong Academic Record", "Personal Statement", "References"]
      }
    ]
  }
}; 