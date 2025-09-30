export const psychometricTestsData = {
  tests: [
    {
      _id: 'numerical-reasoning',
      key: 'numerical-reasoning',
      name: 'Numerical Reasoning',
      category: 'Aptitude',
      description: 'Numerical reasoning tests gauge how adept you are at dealing with a variety of different mathematical problems.',
      timeLimitMinutes: 45,
      numQuestions: 25,
      numTests: 5,
      rating: 4.8,
      icon: '🧮',
      dimensions: [
        { key: 'NR', name: 'Numerical Reasoning', description: 'Mathematical problem solving and data interpretation' }
      ]
    },
    {
      _id: 'verbal-reasoning',
      key: 'verbal-reasoning',
      name: 'Verbal Reasoning',
      category: 'Aptitude',
      description: 'Verbal reasoning tests examine your ability to quickly read, understand and pull out key information from dense passages of text.',
      timeLimitMinutes: 40,
      numQuestions: 20,
      numTests: 4,
      rating: 4.7,
      icon: '📚',
      dimensions: [
        { key: 'VR', name: 'Verbal Reasoning', description: 'Reading comprehension and language analysis' }
      ]
    },
    {
      _id: 'diagrammatic-reasoning',
      key: 'diagrammatic-reasoning',
      name: 'Diagrammatic Reasoning',
      category: 'Aptitude',
      description: 'Diagrammatic reasoning tests are all about applying logic to a series of different flow charts or diagrams.',
      timeLimitMinutes: 35,
      numQuestions: 15,
      numTests: 3,
      rating: 4.6,
      icon: '📊',
      dimensions: [
        { key: 'DR', name: 'Diagrammatic Reasoning', description: 'Visual pattern recognition and logical flow analysis' }
      ]
    },
    {
      _id: 'situational-judgement',
      key: 'situational-judgement',
      name: 'Situational Judgement',
      category: 'Behavioral',
      description: 'Situational judgement tests assess how you deal with scenarios and challenges that come up in the workplace.',
      timeLimitMinutes: 50,
      numQuestions: 18,
      numTests: 6,
      rating: 4.9,
      icon: '💼',
      dimensions: [
        { key: 'SJ', name: 'Situational Judgement', description: 'Workplace scenario analysis and decision making' }
      ]
    },
    {
      _id: 'abstract-reasoning',
      key: 'abstract-reasoning',
      name: 'Abstract Reasoning',
      category: 'Aptitude',
      description: 'Abstract reasoning tests are also known as diagrammatic or inductive reasoning tests.',
      timeLimitMinutes: 30,
      numQuestions: 12,
      numTests: 2,
      rating: 4.5,
      icon: '🔍',
      dimensions: [
        { key: 'AR', name: 'Abstract Reasoning', description: 'Pattern recognition and logical inference' }
      ]
    },
    {
      _id: 'spatial-reasoning',
      key: 'spatial-reasoning',
      name: 'Spatial Reasoning',
      category: 'Aptitude',
      description: 'Spatial reasoning tests are also known as logical or abstract reasoning tests.',
      timeLimitMinutes: 25,
      numQuestions: 10,
      numTests: 2,
      rating: 4.4,
      icon: '🎯',
      dimensions: [
        { key: 'SR', name: 'Spatial Reasoning', description: '3D visualization and spatial awareness' }
      ]
    },
    {
      _id: 'mechanical-reasoning',
      key: 'mechanical-reasoning',
      name: 'Mechanical Reasoning',
      category: 'Technical',
      description: 'Mechanical reasoning tests examine your ability to understand mechanical and electrical concepts in order to solve challenges.',
      timeLimitMinutes: 30,
      numQuestions: 8,
      numTests: 2,
      rating: 4.3,
      icon: '⚙️',
      dimensions: [
        { key: 'MR', name: 'Mechanical Reasoning', description: 'Mechanical and electrical concept understanding' }
      ]
    },
    {
      _id: 'logical-reasoning',
      key: 'logical-reasoning',
      name: 'Logical Reasoning',
      category: 'Aptitude',
      description: 'Logical reasoning tests are designed to examine your logical thinking skills.',
      timeLimitMinutes: 25,
      numQuestions: 12,
      numTests: 2,
      rating: 4.6,
      icon: '🧩',
      dimensions: [
        { key: 'LR', name: 'Logical Reasoning', description: 'Logical thinking and problem solving' }
      ]
    },
    {
      _id: 'basic-numeracy',
      key: 'basic-numeracy',
      name: 'Basic Numeracy',
      category: 'Foundation',
      description: 'Most job roles require a basic numerical skill set. This includes, but is not limited to, operational, customer service, administrative and entry-level positions.',
      timeLimitMinutes: 20,
      numQuestions: 15,
      numTests: 3,
      rating: 4.5,
      icon: '🔢',
      dimensions: [
        { key: 'BN', name: 'Basic Numeracy', description: 'Fundamental mathematical operations and concepts' }
      ]
    },
    {
      _id: 'analytical-reasoning',
      key: 'analytical-reasoning',
      name: 'Analytical Reasoning',
      category: 'Aptitude',
      description: 'Analytical reasoning tests examine an individual\'s ability to apply logic to solve problems. The questions vary depending on the type of test.',
      timeLimitMinutes: 40,
      numQuestions: 20,
      numTests: 4,
      rating: 4.2,
      icon: '📈',
      dimensions: [
        { key: 'AN', name: 'Analytical Reasoning', description: 'Logical problem solving and analysis' }
      ]
    },
    {
      _id: 'cognitive-ability',
      key: 'cognitive-ability',
      name: 'Cognitive Ability',
      category: 'Intelligence',
      description: 'Cognitive ability tests are predictors of general intelligence. Like IQ tests, they examine your ability to solve problems and think critically.',
      timeLimitMinutes: 45,
      numQuestions: 18,
      numTests: 3,
      rating: 4.5,
      icon: '🧠',
      dimensions: [
        { key: 'CA', name: 'Cognitive Ability', description: 'General intelligence and problem solving capacity' }
      ]
    },
    {
      _id: 'basic-comprehension',
      key: 'basic-comprehension',
      name: 'Basic Comprehension',
      category: 'Foundation',
      description: 'These are foundation level verbal reasoning tests which assess your ability to reason using concepts wrapped in words. It verifies your understanding of written information.',
      timeLimitMinutes: 25,
      numQuestions: 12,
      numTests: 2,
      rating: 4.5,
      icon: '📖',
      dimensions: [
        { key: 'BC', name: 'Basic Comprehension', description: 'Reading comprehension and verbal reasoning fundamentals' }
      ]
    }
  ],

  // Questions with specific, relevant options for each test category
  questions: {
    'numerical-reasoning': [
      {
        _id: 'nr1',
        text: 'What is 15% of 200?',
        dimensionKey: 'NR',
        order: 1,
        options: [
          { value: 1, label: '20', isCorrect: false },
          { value: 2, label: '25', isCorrect: false },
          { value: 3, label: '30', isCorrect: true },
          { value: 4, label: '35', isCorrect: false },
          { value: 5, label: '40', isCorrect: false }
        ]
      },
      {
        _id: 'nr2',
        text: 'If a train travels 60km in 1.5 hours, what is the speed in km/h?',
        dimensionKey: 'NR',
        order: 2,
        options: [
          { value: 1, label: '30 km/h', isCorrect: false },
          { value: 2, label: '35 km/h', isCorrect: false },
          { value: 3, label: '40 km/h', isCorrect: true },
          { value: 4, label: '45 km/h', isCorrect: false },
          { value: 5, label: '50 km/h', isCorrect: false }
        ]
      },
      {
        _id: 'nr3',
        text: 'Simplify: 3/4 + 2/3 = ?',
        dimensionKey: 'NR',
        order: 3,
        options: [
          { value: 1, label: '5/7', isCorrect: false },
          { value: 2, label: '6/12', isCorrect: false },
          { value: 3, label: '17/12', isCorrect: true },
          { value: 4, label: '5/12', isCorrect: false },
          { value: 5, label: '1 5/12', isCorrect: false }
        ]
      },
      {
        _id: 'nr4',
        text: 'What is the average of 6, 8, 10, 12?',
        dimensionKey: 'NR',
        order: 4,
        options: [
          { value: 1, label: '8', isCorrect: false },
          { value: 2, label: '9', isCorrect: true },
          { value: 3, label: '10', isCorrect: false },
          { value: 4, label: '11', isCorrect: false },
          { value: 5, label: '12', isCorrect: false }
        ]
      },
      {
        _id: 'nr5',
        text: 'Find x if 5x = 45.',
        dimensionKey: 'NR',
        order: 5,
        options: [
          { value: 1, label: '7', isCorrect: false },
          { value: 2, label: '8', isCorrect: false },
          { value: 3, label: '9', isCorrect: true },
          { value: 4, label: '10', isCorrect: false },
          { value: 5, label: '11', isCorrect: false }
        ]
      }
    ],
    
    'verbal-reasoning': [
      {
        _id: 'vr1',
        text: 'Select the synonym of "augment".',
        dimensionKey: 'VR',
        order: 1,
        options: [
          { value: 1, label: 'Decrease', isCorrect: false },
          { value: 2, label: 'Maintain', isCorrect: false },
          { value: 3, label: 'Increase', isCorrect: true },
          { value: 4, label: 'Replace', isCorrect: false },
          { value: 5, label: 'Remove', isCorrect: false }
        ]
      },
      {
        _id: 'vr2',
        text: 'From the passage, the author\'s tone is best described as...',
        dimensionKey: 'VR',
        order: 2,
        options: [
          { value: 1, label: 'Hostile and aggressive', isCorrect: false },
          { value: 2, label: 'Neutral and objective', isCorrect: false },
          { value: 3, label: 'Enthusiastic and supportive', isCorrect: true },
          { value: 4, label: 'Skeptical and doubtful', isCorrect: false },
          { value: 5, label: 'Indifferent and apathetic', isCorrect: false }
        ]
      },
      {
        _id: 'vr3',
        text: 'Choose the correct spelling.',
        dimensionKey: 'VR',
        order: 3,
        options: [
          { value: 1, label: 'Accomodate', isCorrect: false },
          { value: 2, label: 'Accommodate', isCorrect: true },
          { value: 3, label: 'Acommodate', isCorrect: false },
          { value: 4, label: 'Accomadate', isCorrect: false },
          { value: 5, label: 'Acomodate', isCorrect: false }
        ]
      },
      {
        _id: 'vr4',
        text: 'Identify the main idea of a short paragraph.',
        dimensionKey: 'VR',
        order: 4,
        options: [
          { value: 1, label: 'The first sentence', isCorrect: false },
          { value: 2, label: 'The most detailed sentence', isCorrect: false },
          { value: 3, label: 'The central theme or message', isCorrect: true },
          { value: 4, label: 'The longest sentence', isCorrect: false },
          { value: 5, label: 'The last sentence', isCorrect: false }
        ]
      },
      {
        _id: 'vr5',
        text: 'Pick the antonym of "mitigate".',
        dimensionKey: 'VR',
        order: 5,
        options: [
          { value: 1, label: 'Reduce', isCorrect: false },
          { value: 2, label: 'Lessen', isCorrect: false },
          { value: 3, label: 'Aggravate', isCorrect: true },
          { value: 4, label: 'Alleviate', isCorrect: false },
          { value: 5, label: 'Ease', isCorrect: false }
        ]
      }
    ],
    
    'situational-judgement': [
      {
        _id: 'sj1',
        text: 'A colleague is consistently late to meetings. What would be your best approach?',
        dimensionKey: 'SJ',
        order: 1,
        options: [
          { value: 1, label: 'Report them to HR immediately', isCorrect: false },
          { value: 2, label: 'Ignore the issue completely', isCorrect: false },
          { value: 3, label: 'Have a private conversation to understand why', isCorrect: true },
          { value: 4, label: 'Make jokes about it in meetings', isCorrect: false },
          { value: 5, label: 'Exclude them from future meetings', isCorrect: false }
        ]
      },
      {
        _id: 'sj2',
        text: 'You discover an error in a report that has already been sent to a client. What should you do first?',
        dimensionKey: 'SJ',
        order: 2,
        options: [
          { value: 1, label: 'Hide the error and hope no one notices', isCorrect: false },
          { value: 2, label: 'Blame someone else for the mistake', isCorrect: false },
          { value: 3, label: 'Assess the severity and impact of the error', isCorrect: true },
          { value: 4, label: 'Wait for the client to complain first', isCorrect: false },
          { value: 5, label: 'Delete all copies of the report', isCorrect: false }
        ]
      },
      {
        _id: 'sj3',
        text: 'A team member disagrees with your approach to a project. How should you handle this?',
        dimensionKey: 'SJ',
        order: 3,
        options: [
          { value: 1, label: 'Dismiss their opinion immediately', isCorrect: false },
          { value: 2, label: 'Take it personally and get defensive', isCorrect: false },
          { value: 3, label: 'Listen to their perspective and discuss alternatives', isCorrect: true },
          { value: 4, label: 'Complain about them to other team members', isCorrect: false },
          { value: 5, label: 'Refuse to work with them on the project', isCorrect: false }
        ]
      },
      {
        _id: 'sj4',
        text: 'You\'re asked to work on a project outside your expertise. What\'s the best response?',
        dimensionKey: 'SJ',
        order: 4,
        options: [
          { value: 1, label: 'Refuse the project outright', isCorrect: false },
          { value: 2, label: 'Pretend you know what you\'re doing', isCorrect: false },
          { value: 3, label: 'Accept the challenge and ask for guidance', isCorrect: true },
          { value: 4, label: 'Complain about being given difficult work', isCorrect: false },
          { value: 5, label: 'Delegate it to someone else', isCorrect: false }
        ]
      },
      {
        _id: 'sj5',
        text: 'A customer is unhappy with your service. How do you respond?',
        dimensionKey: 'SJ',
        order: 5,
        options: [
          { value: 1, label: 'Tell them they\'re wrong', isCorrect: false },
          { value: 2, label: 'Ignore their complaint', isCorrect: false },
          { value: 3, label: 'Listen actively and offer solutions', isCorrect: true },
          { value: 4, label: 'Transfer them to someone else immediately', isCorrect: false },
          { value: 5, label: 'Hang up on them', isCorrect: false }
        ]
      }
    ],
    
    'abstract-reasoning': [
      {
        _id: 'ar1',
        text: 'If all A are B and all B are C, then all A are C. True or False?',
        dimensionKey: 'AR',
        order: 1,
        options: [
          { value: 1, label: 'Always false', isCorrect: false },
          { value: 2, label: 'Sometimes true', isCorrect: false },
          { value: 3, label: 'Always true', isCorrect: true },
          { value: 4, label: 'Never true', isCorrect: false },
          { value: 5, label: 'Cannot be determined', isCorrect: false }
        ]
      },
      {
        _id: 'ar2',
        text: 'Find the next number: 2, 6, 12, 20, ?',
        dimensionKey: 'AR',
        order: 2,
        options: [
          { value: 1, label: '28', isCorrect: false },
          { value: 2, label: '30', isCorrect: true },
          { value: 3, label: '32', isCorrect: false },
          { value: 4, label: '34', isCorrect: false },
          { value: 5, label: '36', isCorrect: false }
        ]
      },
      {
        _id: 'ar3',
        text: 'Choose the odd one out: Circle, Square, Triangle, Cube',
        dimensionKey: 'AR',
        order: 3,
        options: [
          { value: 1, label: 'Circle', isCorrect: false },
          { value: 2, label: 'Square', isCorrect: false },
          { value: 3, label: 'Triangle', isCorrect: false },
          { value: 4, label: 'Cube', isCorrect: true },
          { value: 5, label: 'All are the same', isCorrect: false }
        ]
      },
      {
        _id: 'ar4',
        text: 'If today is Monday, what day will it be in 10 days?',
        dimensionKey: 'AR',
        order: 4,
        options: [
          { value: 1, label: 'Wednesday', isCorrect: false },
          { value: 2, label: 'Thursday', isCorrect: true },
          { value: 3, label: 'Friday', isCorrect: false },
          { value: 4, label: 'Saturday', isCorrect: false },
          { value: 5, label: 'Sunday', isCorrect: false }
        ]
      },
      {
        _id: 'ar5',
        text: 'Which statement logically follows from the given premises?',
        dimensionKey: 'AR',
        order: 5,
        options: [
          { value: 1, label: 'The conclusion contradicts the premises', isCorrect: false },
          { value: 2, label: 'The conclusion is unrelated to the premises', isCorrect: false },
          { value: 3, label: 'The conclusion follows logically from the premises', isCorrect: true },
          { value: 4, label: 'The premises are invalid', isCorrect: false },
          { value: 5, label: 'No conclusion is possible', isCorrect: false }
        ]
      }
    ],
    
    'spatial-reasoning': [
      {
        _id: 'sr1',
        text: 'Which 3D shape would this 2D net create when folded?',
        dimensionKey: 'SR',
        order: 1,
        options: [
          { value: 1, label: 'Cube', isCorrect: true },
          { value: 2, label: 'Pyramid', isCorrect: false },
          { value: 3, label: 'Cylinder', isCorrect: false },
          { value: 4, label: 'Sphere', isCorrect: false },
          { value: 5, label: 'Cone', isCorrect: false }
        ]
      },
      {
        _id: 'sr2',
        text: 'How many faces does a cube have?',
        dimensionKey: 'SR',
        order: 2,
        options: [
          { value: 1, label: '4 faces', isCorrect: false },
          { value: 2, label: '5 faces', isCorrect: false },
          { value: 3, label: '6 faces', isCorrect: true },
          { value: 4, label: '8 faces', isCorrect: false },
          { value: 5, label: '12 faces', isCorrect: false }
        ]
      },
      {
        _id: 'sr3',
        text: 'Which view shows the object from the front?',
        dimensionKey: 'SR',
        order: 3,
        options: [
          { value: 1, label: 'Top view', isCorrect: false },
          { value: 2, label: 'Front view', isCorrect: true },
          { value: 3, label: 'Side view', isCorrect: false },
          { value: 4, label: 'Bottom view', isCorrect: false },
          { value: 5, label: 'Isometric view', isCorrect: false }
        ]
      },
      {
        _id: 'sr4',
        text: 'What would this shape look like if rotated 90 degrees?',
        dimensionKey: 'SR',
        order: 4,
        options: [
          { value: 1, label: 'Same orientation', isCorrect: false },
          { value: 2, label: 'Rotated 90° clockwise', isCorrect: true },
          { value: 3, label: 'Rotated 180°', isCorrect: false },
          { value: 4, label: 'Flipped horizontally', isCorrect: false },
          { value: 5, label: 'Flipped vertically', isCorrect: false }
        ]
      },
      {
        _id: 'sr5',
        text: 'Identify the 3D object from its 2D representation.',
        dimensionKey: 'SR',
        order: 5,
        options: [
          { value: 1, label: '2D shape', isCorrect: false },
          { value: 2, label: '3D object', isCorrect: true },
          { value: 3, label: 'Flat surface', isCorrect: false },
          { value: 4, label: 'Line drawing', isCorrect: false },
          { value: 5, label: 'Abstract pattern', isCorrect: false }
        ]
      }
    ],
    
    'mechanical-reasoning': [
      {
        _id: 'mr1',
        text: 'Which gear will turn fastest in this system?',
        dimensionKey: 'MR',
        order: 1,
        options: [
          { value: 1, label: 'The largest gear', isCorrect: false },
          { value: 2, label: 'The smallest gear', isCorrect: true },
          { value: 3, label: 'The middle gear', isCorrect: false },
          { value: 4, label: 'All gears turn at the same speed', isCorrect: false },
          { value: 5, label: 'The heaviest gear', isCorrect: false }
        ]
      },
      {
        _id: 'mr2',
        text: 'What happens to the pressure when you increase the force on a piston?',
        dimensionKey: 'MR',
        order: 2,
        options: [
          { value: 1, label: 'Pressure decreases', isCorrect: false },
          { value: 2, label: 'Pressure stays the same', isCorrect: false },
          { value: 3, label: 'Pressure increases', isCorrect: true },
          { value: 4, label: 'Pressure becomes zero', isCorrect: false },
          { value: 5, label: 'Pressure becomes negative', isCorrect: false }
        ]
      },
      {
        _id: 'mr3',
        text: 'Which circuit will light the bulb?',
        dimensionKey: 'MR',
        order: 3,
        options: [
          { value: 1, label: 'Open circuit', isCorrect: false },
          { value: 2, label: 'Closed circuit', isCorrect: true },
          { value: 3, label: 'Broken circuit', isCorrect: false },
          { value: 4, label: 'Short circuit', isCorrect: false },
          { value: 5, label: 'Parallel circuit only', isCorrect: false }
        ]
      },
      {
        _id: 'mr4',
        text: 'What is the mechanical advantage of this lever system?',
        dimensionKey: 'MR',
        order: 4,
        options: [
          { value: 1, label: 'Less than 1', isCorrect: false },
          { value: 2, label: 'Equal to 1', isCorrect: false },
          { value: 3, label: 'Greater than 1', isCorrect: true },
          { value: 4, label: 'Zero', isCorrect: false },
          { value: 5, label: 'Negative', isCorrect: false }
        ]
      },
      {
        _id: 'mr5',
        text: 'Which pulley system requires the least force to lift the weight?',
        dimensionKey: 'MR',
        order: 5,
        options: [
          { value: 1, label: 'Single fixed pulley', isCorrect: false },
          { value: 2, label: 'Single movable pulley', isCorrect: false },
          { value: 3, label: 'Compound pulley system', isCorrect: true },
          { value: 4, label: 'No pulley system', isCorrect: false },
          { value: 5, label: 'Broken pulley system', isCorrect: false }
        ]
      }
    ],
    
    'logical-reasoning': [
      {
        _id: 'lr1',
        text: 'All roses are flowers. Some flowers are red. Therefore, some roses are red. Is this valid?',
        dimensionKey: 'LR',
        order: 1,
        options: [
          { value: 1, label: 'Always valid', isCorrect: false },
          { value: 2, label: 'Sometimes valid', isCorrect: false },
          { value: 3, label: 'Never valid', isCorrect: true },
          { value: 4, label: 'Valid only for red roses', isCorrect: false },
          { value: 5, label: 'Valid only in certain conditions', isCorrect: false }
        ]
      },
      {
        _id: 'lr2',
        text: 'If P implies Q and Q is false, what can we conclude about P?',
        dimensionKey: 'LR',
        order: 2,
        options: [
          { value: 1, label: 'P must be true', isCorrect: false },
          { value: 2, label: 'P must be false', isCorrect: true },
          { value: 3, label: 'P can be either true or false', isCorrect: false },
          { value: 4, label: 'P is irrelevant', isCorrect: false },
          { value: 5, label: 'No conclusion possible', isCorrect: false }
        ]
      },
      {
        _id: 'lr3',
        text: 'Which statement is the contrapositive of "If it rains, the ground gets wet"?',
        dimensionKey: 'LR',
        order: 3,
        options: [
          { value: 1, label: 'If it doesn\'t rain, the ground doesn\'t get wet', isCorrect: false },
          { value: 2, label: 'If the ground gets wet, it rains', isCorrect: false },
          { value: 3, label: 'If the ground doesn\'t get wet, it doesn\'t rain', isCorrect: true },
          { value: 4, label: 'The ground gets wet when it rains', isCorrect: false },
          { value: 5, label: 'Rain causes wet ground', isCorrect: false }
        ]
      },
      {
        _id: 'lr4',
        text: 'What is the logical conclusion from these premises?',
        dimensionKey: 'LR',
        order: 4,
        options: [
          { value: 1, label: 'The premises are contradictory', isCorrect: false },
          { value: 2, label: 'The conclusion is obvious', isCorrect: false },
          { value: 3, label: 'The conclusion follows logically', isCorrect: true },
          { value: 4, label: 'No conclusion is possible', isCorrect: false },
          { value: 5, label: 'The premises are invalid', isCorrect: false }
        ]
      },
      {
        _id: 'lr5',
        text: 'Which argument is logically sound?',
        dimensionKey: 'LR',
        order: 5,
        options: [
          { value: 1, label: 'Argument with false premises', isCorrect: false },
          { value: 2, label: 'Argument with logical fallacies', isCorrect: false },
          { value: 3, label: 'Argument with valid premises and conclusion', isCorrect: true },
          { value: 4, label: 'Argument based on emotions', isCorrect: false },
          { value: 5, label: 'Argument with no evidence', isCorrect: false }
        ]
      }
    ],
    
    'basic-numeracy': [
      {
        _id: 'bn1',
        text: 'What is 7 + 9?',
        dimensionKey: 'BN',
        order: 1,
        options: [
          { value: 1, label: '14', isCorrect: false },
          { value: 2, label: '15', isCorrect: false },
          { value: 3, label: '16', isCorrect: true },
          { value: 4, label: '17', isCorrect: false },
          { value: 5, label: '18', isCorrect: false }
        ]
      },
      {
        _id: 'bn2',
        text: 'Calculate: 15 - 8',
        dimensionKey: 'BN',
        order: 2,
        options: [
          { value: 1, label: '5', isCorrect: false },
          { value: 2, label: '6', isCorrect: false },
          { value: 3, label: '7', isCorrect: true },
          { value: 4, label: '8', isCorrect: false },
          { value: 5, label: '9', isCorrect: false }
        ]
      },
      {
        _id: 'bn3',
        text: 'What is 6 × 7?',
        dimensionKey: 'BN',
        order: 3,
        options: [
          { value: 1, label: '36', isCorrect: false },
          { value: 2, label: '40', isCorrect: false },
          { value: 3, label: '42', isCorrect: true },
          { value: 4, label: '48', isCorrect: false },
          { value: 5, label: '49', isCorrect: false }
        ]
      },
      {
        _id: 'bn4',
        text: 'Divide 48 by 6',
        dimensionKey: 'BN',
        order: 4,
        options: [
          { value: 1, label: '6', isCorrect: false },
          { value: 2, label: '7', isCorrect: false },
          { value: 3, label: '8', isCorrect: true },
          { value: 4, label: '9', isCorrect: false },
          { value: 5, label: '10', isCorrect: false }
        ]
      },
      {
        _id: 'bn5',
        text: 'What is half of 26?',
        dimensionKey: 'BN',
        order: 5,
        options: [
          { value: 1, label: '10', isCorrect: false },
          { value: 2, label: '12', isCorrect: false },
          { value: 3, label: '13', isCorrect: true },
          { value: 4, label: '14', isCorrect: false },
          { value: 5, label: '15', isCorrect: false }
        ]
      }
    ],
    
    'analytical-reasoning': [
      {
        _id: 'an1',
        text: 'Analyze the data and identify the trend.',
        dimensionKey: 'AN',
        order: 1,
        options: [
          { value: 1, label: 'No trend visible', isCorrect: false },
          { value: 2, label: 'Weak upward trend', isCorrect: false },
          { value: 3, label: 'Clear upward trend', isCorrect: true },
          { value: 4, label: 'Downward trend', isCorrect: false },
          { value: 5, label: 'Fluctuating pattern', isCorrect: false }
        ]
      },
      {
        _id: 'an2',
        text: 'What conclusion can be drawn from this information?',
        dimensionKey: 'AN',
        order: 2,
        options: [
          { value: 1, label: 'No conclusion possible', isCorrect: false },
          { value: 2, label: 'Multiple conclusions possible', isCorrect: false },
          { value: 3, label: 'One clear conclusion', isCorrect: true },
          { value: 4, label: 'Contradictory conclusions', isCorrect: false },
          { value: 5, label: 'Insufficient data', isCorrect: false }
        ]
      },
      {
        _id: 'an3',
        text: 'Which assumption underlies this argument?',
        dimensionKey: 'AN',
        order: 3,
        options: [
          { value: 1, label: 'No assumptions made', isCorrect: false },
          { value: 2, label: 'Multiple assumptions', isCorrect: false },
          { value: 3, label: 'One key assumption', isCorrect: true },
          { value: 4, label: 'Contradictory assumptions', isCorrect: false },
          { value: 5, label: 'Hidden assumptions', isCorrect: false }
        ]
      },
      {
        _id: 'an4',
        text: 'What is the main weakness in this reasoning?',
        dimensionKey: 'AN',
        order: 4,
        options: [
          { value: 1, label: 'No weaknesses', isCorrect: false },
          { value: 2, label: 'Minor weakness', isCorrect: false },
          { value: 3, label: 'Major logical flaw', isCorrect: true },
          { value: 4, label: 'Irrelevant weakness', isCorrect: false },
          { value: 5, label: 'Multiple weaknesses', isCorrect: false }
        ]
      },
      {
        _id: 'an5',
        text: 'How would you evaluate this claim?',
        dimensionKey: 'AN',
        order: 5,
        options: [
          { value: 1, label: 'Accept without question', isCorrect: false },
          { value: 2, label: 'Reject immediately', isCorrect: false },
          { value: 3, label: 'Evaluate with evidence', isCorrect: true },
          { value: 4, label: 'Ignore completely', isCorrect: false },
          { value: 5, label: 'Believe based on authority', isCorrect: false }
        ]
      }
    ],
    
    'cognitive-ability': [
      {
        _id: 'ca1',
        text: 'Solve this pattern: 2, 4, 8, 16, ?',
        dimensionKey: 'CA',
        order: 1,
        options: [
          { value: 1, label: '24', isCorrect: false },
          { value: 2, label: '28', isCorrect: false },
          { value: 3, label: '32', isCorrect: true },
          { value: 4, label: '36', isCorrect: false },
          { value: 5, label: '40', isCorrect: false }
        ]
      },
      {
        _id: 'ca2',
        text: 'Which word doesn\'t belong: Apple, Orange, Carrot, Banana?',
        dimensionKey: 'CA',
        order: 2,
        options: [
          { value: 1, label: 'Apple', isCorrect: false },
          { value: 2, label: 'Orange', isCorrect: false },
          { value: 3, label: 'Carrot', isCorrect: true },
          { value: 4, label: 'Banana', isCorrect: false },
          { value: 5, label: 'All belong', isCorrect: false }
        ]
      },
      {
        _id: 'ca3',
        text: 'Complete the analogy: Book is to Reading as Fork is to ?',
        dimensionKey: 'CA',
        order: 3,
        options: [
          { value: 1, label: 'Writing', isCorrect: false },
          { value: 2, label: 'Eating', isCorrect: true },
          { value: 3, label: 'Cooking', isCorrect: false },
          { value: 4, label: 'Cleaning', isCorrect: false },
          { value: 5, label: 'Serving', isCorrect: false }
        ]
      },
      {
        _id: 'ca4',
        text: 'What is the missing number: 1, 3, 6, 10, 15, ?',
        dimensionKey: 'CA',
        order: 4,
        options: [
          { value: 1, label: '18', isCorrect: false },
          { value: 2, label: '20', isCorrect: false },
          { value: 3, label: '21', isCorrect: true },
          { value: 4, label: '22', isCorrect: false },
          { value: 5, label: '25', isCorrect: false }
        ]
      },
      {
        _id: 'ca5',
        text: 'Which shape completes the sequence?',
        dimensionKey: 'CA',
        order: 5,
        options: [
          { value: 1, label: 'Circle', isCorrect: false },
          { value: 2, label: 'Square', isCorrect: false },
          { value: 3, label: 'Triangle', isCorrect: true },
          { value: 4, label: 'Rectangle', isCorrect: false },
          { value: 5, label: 'Diamond', isCorrect: false }
        ]
      }
    ],
    
    'basic-comprehension': [
      {
        _id: 'bc1',
        text: 'What is the main idea of this passage?',
        dimensionKey: 'BC',
        order: 1,
        options: [
          { value: 1, label: 'The first sentence', isCorrect: false },
          { value: 2, label: 'The central theme', isCorrect: true },
          { value: 3, label: 'The last sentence', isCorrect: false },
          { value: 4, label: 'A random detail', isCorrect: false },
          { value: 5, label: 'The longest sentence', isCorrect: false }
        ]
      },
      {
        _id: 'bc2',
        text: 'Which detail supports the author\'s argument?',
        dimensionKey: 'BC',
        order: 2,
        options: [
          { value: 1, label: 'Any fact mentioned', isCorrect: false },
          { value: 2, label: 'A relevant supporting fact', isCorrect: true },
          { value: 3, label: 'An unrelated detail', isCorrect: false },
          { value: 4, label: 'A personal opinion', isCorrect: false },
          { value: 5, label: 'A contradictory statement', isCorrect: false }
        ]
      },
      {
        _id: 'bc3',
        text: 'What does the word "context" mean in this sentence?',
        dimensionKey: 'BC',
        order: 3,
        options: [
          { value: 1, label: 'The surrounding text', isCorrect: true },
          { value: 2, label: 'The dictionary definition', isCorrect: false },
          { value: 3, label: 'The opposite meaning', isCorrect: false },
          { value: 4, label: 'A synonym', isCorrect: false },
          { value: 5, label: 'An antonym', isCorrect: false }
        ]
      },
      {
        _id: 'bc4',
        text: 'What is the author\'s purpose in writing this?',
        dimensionKey: 'BC',
        order: 4,
        options: [
          { value: 1, label: 'To entertain', isCorrect: false },
          { value: 2, label: 'To inform', isCorrect: true },
          { value: 3, label: 'To persuade', isCorrect: false },
          { value: 4, label: 'To confuse', isCorrect: false },
          { value: 5, label: 'To bore', isCorrect: false }
        ]
      },
      {
        _id: 'bc5',
        text: 'Which statement best summarizes the text?',
        dimensionKey: 'BC',
        order: 5,
        options: [
          { value: 1, label: 'A partial summary', isCorrect: false },
          { value: 2, label: 'A complete summary', isCorrect: true },
          { value: 3, label: 'An unrelated statement', isCorrect: false },
          { value: 4, label: 'A contradictory statement', isCorrect: false },
          { value: 5, label: 'A personal opinion', isCorrect: false }
        ]
      }
    ]
  }
};

export default psychometricTestsData;
