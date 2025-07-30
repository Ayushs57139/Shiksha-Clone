const mockData = [
    {
      title: "MBA",
      key: "mba",
      submenus: [
        {
          title: "Top Ranked Colleges",
          key: "mba-ranked",
          links: [
            { label: "Top MBA Colleges in India", to: "/top-mba-india" },
            { label: "Top Private MBA Colleges in India", to: "/top-private-mba" },
            { label: "Top MBA Colleges in Bangalore", to: "/top-mba-bangalore" },
            { label: "Top MBA Colleges in Mumbai", to: "/top-mba-mumbai" },
            { label: "Top MBA Colleges in Pune", to: "/top-mba-pune" },
            { label: "Top MBA Colleges in Hyderabad", to: "/top-mba-hyderabad" },
            { label: "Top MBA Colleges in Delhi", to: "/top-mba-delhi" },
            { label: "Top MBA Colleges in Chennai", to: "/top-mba-chennai" },
            { label: "Top MBA Colleges in Maharashtra", to: "/top-mba-maharashtra" }
          ],
        },
        {
          title: "Popular Courses",
          key: "mba-courses",
          links: [
            { label: "MBA/PGDM", to: "/mba-pgdm" },
            { label: "MBA in HR", to: "/mba-hr" },
            { label: "Distance MBA", to: "/mba-hr" },
            { label: "Online MBA", to: "/mba-hr" },
            { label: "Part-Time MBA", to: "/mba-hr" },
          ],
        },
        {
          title: "Popular Specializations",
          key: "mba-specializations",
          links: [
            { label: "MBA in Finance", to: "/mba-hr" },
            { label: "MBA in Healthcare Management", to: "/mba-hr" },
            { label: "MBA in HR", to: "/mba-hr" },
            { label: "MBA in IT", to: "/mba-hr" },
            { label: "MBA in Operations Management", to: "/mba-hr" },
            { label: "MBA in Marketing", to: "/mba-hr" },
            { label: "MBA in International Business", to: "/mba-hr" },
            { label: "MBA in Pharmaceutical Management", to: "/mba-hr" },
            { label: "MBA in Digital Marketing", to: "/mba-hr" },
            { label: "MBA in Data Analytics", to: "/mba-hr" },
            { label: "MBA in Entrepreneurship", to: "/mba-hr" },
            { label: "MBA in Family Managed Business", to: "/mba-hr" },
            { label: "MBA in Agriculture", to: "/mba-hr" },
            { label: "MBA in Product Management", to: "/mba-hr" },
            { label: "MBA in General Management", to: "/mba-hr" },
            { label: "MBA in Data Science", to: "/mba-hr" },
          ],
        },
        {
          title: "Exams",
          key: "mba-exams",
          links: [
            { label: "CAT", to: "/mba-hr" },
            { label: "CMAT", to: "/mba-hr" },
            { label: "SNAP", to: "/mba-hr" },
            { label: "XAT", to: "/mba-hr" },
            { label: "MAT", to: "/mba-hr" },
            { label: "ATMA", to: "/mba-hr" },
            { label: "NMAT by GMAC", to: "/mba-hr" },
            { label: "IBSAT", to: "/mba-hr" },
            { label: "KIITEE Management", to: "/mba-hr" },
            { label: "UPCET", to: "/mba-hr" },
          ],
        },
        {
          title: "College By Location",
          key: "mba-location",
          links: [
            { label: "MBA Colleges in India", to: "/mba-hr" },
            { label: "MBA Colleges in Bangalore", to: "/mba-hr" },
            { label: "MBA Colleges in Chennai", to: "/mba-hr" },
            { label: "MBA colleges in Delhi-NCR", to: "/mba-hr" },
            { label: "MBA Colleges in Hyderabad", to: "/mba-hr" },
            { label: "MBA Colleges in Kolkata", to: "/mba-hr" },
            { label: "MBA Colleges in Mumbai", to: "/mba-hr" },
            { label: "MBA Colleges in Pune", to: "/mba-hr" },
            
          ],
        },
        {
          title: "Compare Colleges",
          key: "mba-compare",
          links: [
            { label: "IIM Ahmedabad Vs IIM Bangalore", to: "/mba-hr" },
            { label: "IIM Ahmedabad Vs IIM Calcutta", to: "/mba-hr" },
            { label: "SIBM Pune Vs SCMHRD Pune", to: "/mba-hr" },
            { label: "SP Jain (SPJIMR) Vs MDI Gurgaon", to: "/mba-hr" },
            { label: "NMIMS SBM Mumbai Vs SP Jain (SPJIMR)", to: "/mba-hr" },
          ],
        },
        {
          title: "College Reviews",
          key: "mba-reviews",
          links: [
            { label: "IIM Ahmedabad Reviews", to: "/mba-hr" },
            { label: "IIM Bangalore Reviews", to: "/mba-hr" },
            { label: "IIM Calcutta Reviews", to: "/mba-hr" },
            { label: "IIM Lucknow Reviews", to: "/mba-hr" },
            { label: "IIM Kozhikode Reviews", to: "/mba-hr" },
            { label: "IIM Indore Reviews", to: "/mba-hr" },
            { label: "FMS Delhi Reviews", to: "/mba-hr" },
            { label: "SP Jain Reviews", to: "/mba-hr" },
            { label: "MDI Gurgaon Reviews", to: "/mba-hr" }
          ],
        },
        {
          title: "College Predictor",
          key: "mba-predictor",
          links: [
            { label: "IIM & Non IIM Call Predictor", to: "/mba-hr" },
            { label: "CAT College Predictor", to: "/mba-hr" },
            { label: "MAH CET College predictor", to: "/mba-hr" },
            { label: "XAT College/Call Predictor", to: "/mba-hr" },
            { label: "IIFT College predictor", to: "/mba-hr" },
            { label: "NMAT College predictor", to: "/mba-hr" },
            { label: "SNAP College and Call Predictor", to: "/mba-hr" },
            { label: "CMAT College predictor", to: "/mba-hr" },
            { label: "MAT College predictor", to: "/mba-hr" },
            { label: "KMAT College predictor", to: "/mba-hr" },
            { label: "TANCET MBA College predictor", to: "/mba-hr" },
            { label: "TSICET College predictor", to: "/mba-hr" },
            { label: "IBSAT College predictor", to: "/mba-hr" },
            { label: "UPCET College predictor", to: "/mba-hr" },
          ],
        },
        {
          title: "Ask Current MBA Students",
          key: "mba-ask",
          links: [
            { label: "Popular Colleges", to: "/mba-hr" },  
            { label: "XIME Bangalore", to: "/mba-hr" },  
            { label: "SIBM Pune", to: "/mba-hr" },  
            { label: "JBIMS Mumbai", to: "/mba-hr" },  
            { label: "FMS", to: "/mba-hr" },  
            { label: "IIM Ahmedabad", to: "/mba-hr" },  
            { label: "NMIMS", to: "/mba-hr" },  
            
          ],
        },
        {
          title: "Resources",
          key: "mba-resources",
          links: [
            { label: "MBA Alumni Salary Data", to: "/mba-hr" },
            { label: "Ask a Question", to: "/mba-hr" },
            { label: "Discussions", to: "/mba-hr" },
            { label: "MBA News", to: "/mba-hr" },
            { label: "MBA Articles", to: "/mba-hr" },
            { label: "Apply to colleges", to: "/mba-hr" },
            { label: "Trends in MBA", to: "/mba-hr" },
          ],
        },
      ],
    },
    {
      title: "Engineering",
      key: "engineering",
      submenus: [
        {
          title: "Top Ranked Colleges",
          key: "engg-ranked",
          links: [
            { label: "Top Engineering Colleges in India", to: "/top-engg-india" },
            { label: "Top Private Engineering Colleges in India", to: "/top-private-engg-india" },
            { label: "Top IITs in India", to: "/top-iits-india" },
            { label: "Top NITs in India", to: "/top-nits-india" },
            { label: "Top Engineering Colleges in Bangalore", to: "/top-engg-bangalore" },
            { label: "Top Engineering Colleges in Karnataka", to: "/top-engg-karnataka" },
            { label: "Top Engineering Colleges in Hyderabad", to: "/top-engg-hyderabad" },
            { label: "Top Engineering Colleges in Pune", to: "/top-engg-pune" },
            { label: "Top Engineering Colleges in Mumbai", to: "/top-engg-mumbai" },
            { label: "Top Engineering Colleges in Maharashtra", to: "/top-engg-maharashtra" },
            { label: "Top Engineering Colleges in Chennai", to: "/top-engg-chennai" },
            { label: "Top Engineering Colleges in Kerala", to: "/top-engg-kerala" },
            { label: "Top Engineering Colleges in Delhi", to: "/top-engg-delhi" },
            { label: "Top Engineering Colleges in Telangana", to: "/top-engg-telangana" },
            { label: "Top Engineering Colleges in Gujarat", to: "/top-engg-gujarat" },
            { label: "Top Engineering Colleges in West Bengal", to: "/top-engg-west-bengal" }
          ]
        },
        {
          title: "Popular Courses",
          key: "engg-courses",
          links: [
            { label: "B.Tech/B.E", to: "/btech-be" },
            { label: "M.Tech/M.E", to: "/mtech-me" },
            { label: "Diploma in Engineering", to: "/diploma-engineering" },
            { label: "Integrated M.Tech", to: "/integrated-mtech" },
            { label: "B.Arch", to: "/bachelor-architecture" },
            { label: "M.Arch", to: "/master-architecture" }
          ]
        },
        {
          title: "Popular Specializations",
          key: "engg-specializations",
          links: [
            { label: "Computer Science Engineering", to: "/specialization/cse" },
            { label: "Mechanical Engineering", to: "/specialization/mechanical" },
            { label: "Civil Engineering", to: "/specialization/civil" },
            { label: "Electronics & Communication Engineering", to: "/specialization/ece" },
            { label: "Aeronautical Engineering", to: "/specialization/aeronautical" },
            { label: "Aerospace Engineering", to: "/specialization/aerospace" },
            { label: "Information Technology", to: "/specialization/it" },
            { label: "Electrical Engineering", to: "/specialization/electrical" },
            { label: "Electronics Engineering", to: "/specialization/electronics" },
            { label: "Nanotechnology", to: "/specialization/nanotech" },
            { label: "Chemical Engineering", to: "/specialization/chemical" },
            { label: "Automobile Engineering", to: "/specialization/automobile" },
            { label: "Biomedical Engineering", to: "/specialization/biomedical" },
            { label: "Construction Engineering", to: "/specialization/construction" },
            { label: "Pulp & Paper Technology", to: "/specialization/pulp-paper" },
            { label: "Marine Engineering", to: "/specialization/marine" },
            { label: "Genetic Engineering", to: "/specialization/genetic" },
            { label: "Food Technology", to: "/specialization/food-tech" },
            { label: "Petroleum Engineering", to: "/specialization/petroleum" },
            { label: "Control Systems", to: "/specialization/control-systems" },
            { label: "Industrial Engineering", to: "/specialization/industrial" },
            { label: "Production Engineering", to: "/specialization/production" },
            { label: "Environmental Engineering", to: "/specialization/environmental" },
            { label: "Robotics Engineering", to: "/specialization/robotics" },
            { label: "Telecommunication Engineering", to: "/specialization/telecommunication" },
            { label: "Materials Science", to: "/specialization/materials-science" },
            { label: "Structural Engineering", to: "/specialization/structural" },
            { label: "Aircraft Maintenance", to: "/specialization/aircraft-maintenance" },
            { label: "RF & Microwave Engineering", to: "/specialization/rf-microwave" },
            { label: "VLSI Design", to: "/specialization/vlsi" },
            { label: "Mechatronics Engineering", to: "/specialization/mechatronics" },
            { label: "Mining Engineering", to: "/specialization/mining" },
            { label: "Biotechnology Engineering", to: "/specialization/biotech" },
            { label: "Transportation Engineering", to: "/specialization/transportation" },
            { label: "Metallurgical Engineering", to: "/specialization/metallurgical" },
            { label: "Textile Engineering", to: "/specialization/textile" },
            { label: "Naval Architecture", to: "/specialization/naval-architecture" },
            { label: "Power Engineering", to: "/specialization/power" },
            { label: "Dairy Technology", to: "/specialization/dairy-tech" },
            { label: "Microelectronics", to: "/specialization/microelectronics" },
            { label: "Communications Engineering", to: "/specialization/communications" },
            { label: "Tool Engineering", to: "/specialization/tool" },
            { label: "Ceramic Engineering", to: "/specialization/ceramic" },
            { label: "Jute & Fiber Technology", to: "/specialization/jute-fiber" }
          ]
        },
        {
          title: "Exams",
          key: "engg-exams",
          links: [
            { label: "JEE Main", to: "/jee-main" },
            { label: "JEE Advanced", to: "/jee-advanced" },
            { label: "BITSAT", to: "/bitsat" },
            { label: "VITEEE", to: "/viteee" },
            { label: "SRMJEEE", to: "/srmjeee" },
            { label: "COMEDK UGET", to: "/comedk" },
            { label: "MHT CET", to: "/mht-cet" },
            { label: "KCET", to: "/kcet" },
            { label: "GATE", to: "/gate" },
            { label: "WBJEE", to: "/wbjee" }
          ]
        },
        {
          title: "Colleges By Location",
          key: "engg-location",
          links: [
            { label: "Engineering Colleges in Bangalore", to: "/engg-bangalore" },
            { label: "Engineering Colleges in Mumbai", to: "/engg-mumbai" },
            { label: "Engineering Colleges in Pune", to: "/engg-pune" },
            { label: "Engineering Colleges in Chennai", to: "/engg-chennai" },
            { label: "Engineering Colleges in Hyderabad", to: "/engg-hyderabad" },
            { label: "Engineering Colleges in Delhi", to: "/engg-delhi" },
            { label: "Engineering Colleges in Kolkata", to: "/engg-kolkata" },
            { label: "Engineering Colleges in Ahmedabad", to: "/engg-ahmedabad" }
          ]
        },
        {
          title: "Compare Colleges",
          key: "engg-compare",
          links: [
            { label: "IIT Bombay vs IIT Delhi", to: "/iit-bombay-vs-delhi" },
            { label: "IIT Madras vs IIT Kanpur", to: "/iit-madras-vs-kanpur" },
            { label: "NIT Trichy vs NIT Warangal", to: "/nit-trichy-vs-warangal" },
            { label: "BITS Pilani vs VIT Vellore", to: "/bits-vs-vit" },
            { label: "IIT Kharagpur vs IIT Roorkee", to: "/iit-kharagpur-vs-roorkee" }
          ]
        },
        {
          title: "Rank Predictors",
          key: "engg-rank-predictors",
          links: [
            { label: "JEE Main Rank Predictor", to: "/jee-main-rank-predictor" },
            { label: "JEE Advanced Rank Predictor", to: "/jee-advanced-rank-predictor" },
            { label: "BITSAT Rank Predictor", to: "/bitsat-rank-predictor" },
            { label: "VITEEE Rank Predictor", to: "/viteee-rank-predictor" },
            { label: "MHT CET Rank Predictor", to: "/mht-cet-rank-predictor" }
          ]
        },
        {
          title: "College Predictors",
          key: "engg-college-predictors",
          links: [
            { label: "JEE Main College Predictor", to: "/jee-main-college-predictor" },
            { label: "JEE Advanced College Predictor", to: "/jee-advanced-college-predictor" },
            { label: "BITSAT College Predictor", to: "/bitsat-college-predictor" },
            { label: "VITEEE College Predictor", to: "/viteee-college-predictor" },
            { label: "MHT CET College Predictor", to: "/mht-cet-college-predictor" },
            { label: "KCET College Predictor", to: "/kcet-college-predictor" }
          ]
        },
        {
          title: "College Reviews",
          key: "engg-reviews",
          links: [
            { label: "IIT Bombay Reviews", to: "/iit-bombay-reviews" },
            { label: "IIT Delhi Reviews", to: "/iit-delhi-reviews" },
            { label: "IIT Madras Reviews", to: "/iit-madras-reviews" },
            { label: "NIT Trichy Reviews", to: "/nit-trichy-reviews" },
            { label: "BITS Pilani Reviews", to: "/bits-pilani-reviews" },
            { label: "VIT Vellore Reviews", to: "/vit-vellore-reviews" },
            { label: "IIIT Hyderabad Reviews", to: "/iiit-hyderabad-reviews" }
          ]
        },
        {
          title: "Resources",
          key: "engg-resources",
          links: [
            { label: "Engineering Salary Data", to: "/engineering-salary-data" },
            { label: "Ask a Question", to: "/ask-question" },
            { label: "Engineering Discussions", to: "/engineering-discussions" },
            { label: "Engineering News", to: "/engineering-news" },
            { label: "Engineering Articles", to: "/engineering-articles" },
            { label: "Apply to Colleges", to: "/apply-colleges" },
            { label: "Engineering Trends", to: "/engineering-trends" }
          ]
        }
      ]
    },
    {
      title: "Medical",
      key: "medical",
      submenus: [
        {
          title: "Top Ranked Colleges",
          key: "medical-ranked",
          links: [
            { label: "Top Medical Colleges in India", to: "/top-medical-colleges-india" },
            { label: "Top Medical Colleges in Karnataka", to: "/top-medical-colleges-karnataka" },
            { label: "Top Pharmacy Colleges in India", to: "/top-pharmacy-colleges-india" },
            { label: "Top Medical Colleges in Bangalore", to: "/top-medical-colleges-bangalore" },
            { label: "Top Dental Colleges in India", to: "/top-dental-colleges-india" },
            { label: "Top Medical Colleges in Maharashtra", to: "/top-medical-colleges-maharashtra" },
            { label: "Top Medical Colleges in Mumbai", to: "/top-medical-colleges-mumbai" },
            { label: "Top Medical Colleges in Delhi", to: "/top-medical-colleges-delhi" },
            { label: "Top Pharmacy Colleges in Maharashtra", to: "/top-pharmacy-colleges-maharashtra" },
          ],
        },
        {
          title: "Popular Courses",
          key: "medical-courses",
          links: [
            { label: "MBBS", to: "/mbbs" },
            { label: "MD", to: "/md" },
            { label: "BMLT", to: "/bmlt" },
            { label: "MPT", to: "/mpt" },
            { label: "MPH", to: "/mph" },
          ],
        },
        {
          title: "Popular Specializations",
          key: "medical-specializations",
          links: [
            { label: "Alternative Medicine", to: "/alternative-medicine" },
            { label: "Dental", to: "/dental" },
            { label: "Dietetics & Nutrition", to: "/dietetics-nutrition" },
            { label: "Medicine", to: "/medicine" },
            { label: "Paramedical", to: "/paramedical" },
            { label: "Pharmacy", to: "/pharmacy" },
            { label: "Physiotherapy", to: "/physiotherapy" },
            { label: "Public Health & Management", to: "/public-health-management" },
            { label: "Clinical Psychology", to: "/clinical-psychology" },
            { label: "Clinical Research", to: "/clinical-research" }
          ],
        },
        {
          title: "Exams",
          key: "medical-exams",
          links: [
            { label: "NEET UG", to: "/neet-ug" },
            { label: "NEET PG", to: "/neet-pg" },
            { label: "NEET SS", to: "/neet-ss" },
            { label: "NEET MDS", to: "/neet-mds" },
            { label: "INI CET", to: "/ini-cet" },
            { label: "FMGE", to: "/fmge" },
            { label: "AIAPGET", to: "/aiapget" }
          ],
        },
        {
          title: "Colleges By Location",
          key: "medical-location",
          links: [
            { label: "Medical Colleges in India", to: "/medical-colleges-india" },
            { label: "Medical Colleges in Delhi", to: "/medical-colleges-delhi" },
            { label: "Medical Colleges in Bangalore", to: "/medical-colleges-bangalore" },
            { label: "Medical Colleges in Chennai", to: "/medical-colleges-chennai" },
            { label: "Medical Colleges in Hyderabad", to: "/medical-colleges-hyderabad" },
            { label: "Medical Colleges in Mumbai", to: "/medical-colleges-mumbai" },
            { label: "Medical Colleges in Kolkata", to: "/medical-colleges-kolkata" },
            { label: "Medical Colleges in Pune", to: "/medical-colleges-pune" }
          ],
        },
        {
          title: "College Predictors",
          key: "medical-predictors",
          links: [
            { label: "NEET 2022 College Predictor", to: "/neet-2022-college-predictor" },
            { label: "NEET PG College Predictor", to: "/neet-pg-college-predictor" }
          ],
        },
        {
          title: "Resources",
          key: "medical-resources",
          links: [
            { label: "Ask a Question", to: "/ask-a-question" },
            { label: "Discussions", to: "/discussions" },
            { label: "Medical News", to: "/medical-news" },
            { label: "Medical Articles", to: "/medical-articles" },
            { label: "Trends in Medicine & Health Sciences", to: "/trends-medicine-health-sciences" }
          ],
        },
      ],
    },
    {
      title: "Design",
      key: "design",
      submenus: [
        {
          title: "Top Ranked Colleges",
          key: "design-ranked",
          links: [
            { label: "Top Fashion Designing Colleges in India", to: "/top-fashion-designing-colleges-india" },
            { label: "Top Fashion Designing Colleges in Bangalore", to: "/top-fashion-designing-colleges-bangalore" },
            { label: "Top Fashion Designing Colleges in Delhi/NCR", to: "/top-fashion-designing-colleges-delhi-ncr" }
          ],
        },
        {
          title: "Popular Specializations",
          key: "design-specializations",
          links: [
            { label: "Fashion Designing", to: "/fashion-designing" },
            { label: "Interior Design", to: "/interior-design" },
            { label: "Graphic Design", to: "/graphic-design" },
            { label: "Jewellery Design", to: "/jewellery-design" },
            { label: "Web Design", to: "/web-design" },
            { label: "Furniture Design", to: "/furniture-design" },
            { label: "Game Design", to: "/game-design" },
            { label: "Product Design", to: "/product-design" },
            { label: "Textile Design", to: "/textile-design" },
            { label: "Visual Merchandising", to: "/visual-merchandising" },
            { label: "Ceramic & Glass Design", to: "/ceramic-glass-design" },
            { label: "Film & Video Design", to: "/film-video-design" },
            { label: "UI / UX", to: "/ui-ux" },
            { label: "Footwear Design", to: "/footwear-design" },
            { label: "Automotive Design", to: "/automotive-design" },
            { label: "Communication Design", to: "/communication-design" },
            { label: "Apparel Design", to: "/apparel-design" },
            { label: "Exhibition Design", to: "/exhibition-design" },
            { label: "Information Design", to: "/information-design" },
            { label: "Knitwear Design", to: "/knitwear-design" },
            { label: "Leather Design", to: "/leather-design" },
            { label: "Toy Design", to: "/toy-design" },
            { label: "Lifestyle Accessory Design", to: "/lifestyle-accessory-design" },
            { label: "All Design Specializations", to: "/all-design-specializations" }
          ],
        },
        {
          title: "Popular Courses",
          key: "design-courses",
          links: [
            { label: "B.Des", to: "/bdes" },
            { label: "M.Des", to: "/mdes" },
            { label: "B.Des in Fashion Design", to: "/bdes-fashion-design" },
            { label: "B.Des in Interior Design", to: "/bdes-interior-design" },
            { label: "B.Sc in Fashion Design", to: "/bsc-fashion-design" },
            { label: "B.Sc in Interior Design", to: "/bsc-interior-design" }
          ],
        },
        {
          title: "Exams",
          key: "design-exams",
          links: [
            { label: "WUD Aptitude Test", to: "/wud-aptitude-test" },
            { label: "Pearl Academy Entrance Exam", to: "/pearl-academy-entrance-exam" },
            { label: "CEED", to: "/ceed" },
            { label: "NID Entrance Exam", to: "/nid-entrance-exam" },
            { label: "NIFT Entrance Exam", to: "/nift-entrance-exam" },
            { label: "UCEED", to: "/uceed" }
          ],
        },
        {
          title: "College Predictors",
          key: "design-courses",
          links: [
            { label: "NID College Predictor", to: "/nid-college-predictor" },
            { label: "NIFT College Predictor", to: "/nift-college-predictor" }
          ],
        },
        {
          title: "Colleges By Location",
          key: "design-courses",
          links: [
            { label: "Design Colleges in India", to: "/design-colleges-india" },
            { label: "Design Colleges in Maharashtra", to: "/design-colleges-maharashtra" },
            { label: "Design Colleges in Delhi", to: "/design-colleges-delhi" },
            { label: "Design Colleges in Karnataka", to: "/design-colleges-karnataka" },
            { label: "Design Colleges in Punjab", to: "/design-colleges-punjab" },
            { label: "Design Colleges in Telangana", to: "/design-colleges-telangana" },
            { label: "Design Colleges in Gujarat", to: "/design-colleges-gujarat" },
            { label: "Design Colleges in Chandigarh", to: "/design-colleges-chandigarh" },
            { label: "Design Colleges in Rajasthan", to: "/design-colleges-rajasthan" },
            { label: "Design Colleges in Madhya Pradesh", to: "/design-colleges-madhya-pradesh" },
            { label: "Design Colleges in Uttar Pradesh", to: "/design-colleges-uttar-pradesh" },
            { label: "Design Colleges in Tamil Nadu", to: "/design-colleges-tamil-nadu" },
            { label: "Design Colleges in Pune", to: "/design-colleges-pune" },
            { label: "Design Colleges in Mumbai", to: "/design-colleges-mumbai" },
            { label: "Design Colleges in Bangalore", to: "/design-colleges-bangalore" },
            { label: "Design Colleges in Hyderabad", to: "/design-colleges-hyderabad" },
            { label: "Design Colleges in Ahmedabad", to: "/design-colleges-ahmedabad" },
            { label: "Design Colleges in Ludhiana", to: "/design-colleges-ludhiana" },
            { label: "Design Colleges in Jalandhar", to: "/design-colleges-jalandhar" },
            { label: "Design Colleges in Jaipur", to: "/design-colleges-jaipur" },
            { label: "Design Colleges in Indore", to: "/design-colleges-indore" },
            { label: "Design Colleges in Gurgaon", to: "/design-colleges-gurgaon" }
          ],
        },
        {
          title: "Resources",
          key: "design-courses",
          links: [
            { label: "Ask a Question", to: "/ask-a-question" },
            { label: "Discussions", to: "/discussions" },
            { label: "Design News", to: "/design-news" },
            { label: "Design Articles", to: "/design-articles" },
            { label: "Trends in Design", to: "/trends-in-design" }
          ],
        },
      ],
    },
    {
      title: "Study Abroad",
      key: "abroad",
      submenus: [
        {
          title: "By Country",
          key: "abroad-country",
          links: [
            { label: "Top Universities in USA", to: "/top-universities-usa" },
            { label: "Top Universities in UK", to: "/top-universities-uk" },
            { label: "Top Universities in Canada", to: "/top-universities-canada" },
            { label: "Top Universities in Australia", to: "/top-universities-australia" },
            { label: "Top Universities in Germany", to: "/top-universities-germany" },
            { label: "Top Universities in Ireland", to: "/top-universities-ireland" },
            { label: "Top Universities in France", to: "/top-universities-france" },
            { label: "Top Universities in Singapore", to: "/top-universities-singapore" },
            { label: "Top Universities in New Zealand", to: "/top-universities-new-zealand" },
            { label: "Top Universities in Japan", to: "/top-universities-japan" },
            { label: "Top Universities in Italy", to: "/top-universities-italy" },
            { label: "Top Universities in Finland", to: "/top-universities-finland" },
            { label: "Top Universities in Netherlands", to: "/top-universities-netherlands" }
          ],
        },
        {
          title: "Exams",
          key: "abroad-exams",
          links: [
            { label: "IELTS", to: "/ielts" },
            { label: "TOEFL", to: "/toefl" },
            { label: "PTE", to: "/pte" },
            { label: "DET", to: "/det" },
            { label: "GRE", to: "/gre" },
            { label: "GMAT", to: "/gmat" },
            { label: "SAT", to: "/sat" },
            { label: "Free IELTS Masterclass", to: "/free-ielts-masterclass" },
            { label: "IELTS Preparation Resource", to: "/ielts-preparation-resource" },
            { label: "IELTS Reading Test", to: "/ielts-reading-test" },
            { label: "IELTS Writing Test", to: "/ielts-writing-test" },
            { label: "IELTS Listening Test", to: "/ielts-listening-test" },
            { label: "IELTS Speaking Test", to: "/ielts-speaking-test" }
          ],
        },
        {
          title: "Popular Programs",
          key: "abroad-programs",
          links: [
            // MS Colleges
            { label: "MS in USA", to: "/ms-usa" },
            { label: "MS in UK", to: "/ms-uk" },
            { label: "MS in Canada", to: "/ms-canada" },
            { label: "MS in Australia", to: "/ms-australia" },
            { label: "MS in Germany", to: "/ms-germany" },
            { label: "MS in Ireland", to: "/ms-ireland" },
            { label: "Explore MS Abroad", to: "/explore-ms-abroad" },
            // MBA Colleges
            { label: "MBA in USA", to: "/mba-usa" },
            { label: "MBA in UK", to: "/mba-uk" },
            { label: "MBA in Canada", to: "/mba-canada" },
            { label: "MBA in Australia", to: "/mba-australia" },
            { label: "MBA in Germany", to: "/mba-germany" },
            { label: "MBA in Ireland", to: "/mba-ireland" },
            { label: "Explore MBA Abroad", to: "/explore-mba-abroad" },
            // MEng Colleges
            { label: "MEng in USA", to: "/meng-usa" },
            { label: "MEng in UK", to: "/meng-uk" },
            { label: "MEng in Canada", to: "/meng-canada" },
            { label: "MEng in Australia", to: "/meng-australia" },
            { label: "MEng in Germany", to: "/meng-germany" },
            { label: "MEng in Ireland", to: "/meng-ireland" },
            { label: "Explore MEng Abroad", to: "/explore-meng-abroad" },
            // MIM Colleges
            { label: "MIM in USA", to: "/mim-usa" },
            { label: "MIM in UK", to: "/mim-uk" },
            { label: "MIM in Canada", to: "/mim-canada" },
            { label: "MIM in Australia", to: "/mim-australia" },
            { label: "MIM in Germany", to: "/mim-germany" },
            { label: "MIM in Ireland", to: "/mim-ireland" },
            { label: "MIM in France", to: "/mim-france" },
            // BE/B.Tech Colleges
            { label: "BE/B.Tech in USA", to: "/be-btech-usa" },
            { label: "BE/B.Tech in UK", to: "/be-btech-uk" },
            { label: "BE/B.Tech in Canada", to: "/be-btech-canada" },
            { label: "BE/B.Tech in Australia", to: "/be-btech-australia" },
            { label: "BE/B.Tech in Germany", to: "/be-btech-germany" },
            { label: "BE/B.Tech in Ireland", to: "/be-btech-ireland" },
            { label: "Explore BE/B.Tech Abroad", to: "/explore-be-btech-abroad" },
            // BBA Colleges
            { label: "BBA in USA", to: "/bba-usa" },
            { label: "BBA in UK", to: "/bba-uk" },
            { label: "BBA in Canada", to: "/bba-canada" },
            { label: "BBA in Australia", to: "/bba-australia" },
            { label: "BBA in Germany", to: "/bba-germany" },
            { label: "BBA in Ireland", to: "/bba-ireland" },
            { label: "Explore BBA Abroad", to: "/explore-bba-abroad" }
          ],
        },
        {
          title: "Popular Specialization",
          key: "abroad-specializations",
          links: [
            // Masters
            { label: "MS in Computer Science", to: "/ms-computer-science" },
            { label: "MS in IT/MIS", to: "/ms-it-mis" },
            { label: "MS in Mechanical", to: "/ms-mechanical" },
            { label: "MS in Electrical & Electronics", to: "/ms-electrical-electronics" },
            { label: "MBA in Finance", to: "/mba-finance" },
            { label: "MBA in Marketing", to: "/mba-marketing" },
            { label: "MBA in Human Resource", to: "/mba-human-resource" },
            { label: "MBA in International Business", to: "/mba-international-business" },
            { label: "Masters in Journalism", to: "/masters-journalism" },
            { label: "Masters of Humanities", to: "/masters-humanities" },
            { label: "Masters of Law", to: "/masters-law" },
            { label: "Masters of Medicine", to: "/masters-medicine" },
            // Bachelors
            { label: "BE/B.Tech in Computer Science", to: "/be-btech-computer-science" },
            { label: "BE/B.Tech in IT/MIS", to: "/be-btech-it-mis" },
            { label: "BE/B.Tech in Mechanical", to: "/be-btech-mechanical" },
            { label: "BE/B.Tech in Electrical & Electronics", to: "/be-btech-electrical-electronics" },
            { label: "Bachelors in Fashion", to: "/bachelors-fashion" },
            { label: "Bachelors in Media", to: "/bachelors-media" },
            { label: "Bachelors of Humanities", to: "/bachelors-humanities" },
            { label: "Bachelors of Law", to: "/bachelors-law" },
            { label: "Bachelors of Medicine", to: "/bachelors-medicine" },
            { label: "B.Sc", to: "/bsc" },
            // Diploma/Certificate
            { label: "Computers Diploma", to: "/computers-diploma" },
            { label: "Business Diploma", to: "/business-diploma" },
            { label: "Engineering Diploma", to: "/engineering-diploma" }
          ],
        },
        {
          title: "Student Visas",
          key: "abroad-visas",
          links: [
            { label: "Student Visa Canada", to: "/student-visa-canada" },
            { label: "Student Visa USA", to: "/student-visa-usa" },
            { label: "Student Visa Australia", to: "/student-visa-australia" },
            { label: "Student Visa New Zealand", to: "/student-visa-new-zealand" },
            { label: "Student Visa Netherlands", to: "/student-visa-netherlands" },
            { label: "Student Visa Sweden", to: "/student-visa-sweden" },
            { label: "Student Visa UK", to: "/student-visa-uk" },
            { label: "Student Visa Germany", to: "/student-visa-germany" },
            { label: "Student Visa France", to: "/student-visa-france" },
            { label: "Student Visa Singapore", to: "/student-visa-singapore" },
            { label: "Student Visa Ireland", to: "/student-visa-ireland" },
            { label: "Student Visa Finland", to: "/student-visa-finland" }
          ],
        },
        {
          title: "SOP/LOR",
          key: "abroad-sop-lor",
          links: [
            { label: "What is SOP?", to: "/what-is-sop" },
            { label: "Common Mistakes in SOP", to: "/common-mistakes-in-sop" },
            { label: "Sample SOP for MBA", to: "/sample-sop-mba" },
            { label: "Sample SOP for MS", to: "/sample-sop-ms" },
            { label: "Sample SOP for Bachelors", to: "/sample-sop-bachelors" },
            { label: "Sample SOP for PhD", to: "/sample-sop-phd" },
            { label: "SOP for USA", to: "/sop-usa" },
            { label: "SOP for UK", to: "/sop-uk" },
            { label: "SOP for Canada", to: "/sop-canada" },
            { label: "SOP for Australia", to: "/sop-australia" },
            { label: "What is LOR?", to: "/what-is-lor" },
            { label: "Common Mistakes in LOR", to: "/common-mistakes-in-lor" },
            { label: "Sample LOR for MBA", to: "/sample-lor-mba" },
            { label: "Sample LOR for MS", to: "/sample-lor-ms" },
            { label: "Sample LOR for Bachelors", to: "/sample-lor-bachelors" },
            { label: "Sample LOR for PhD", to: "/sample-lor-phd" }
          ],
        },
        {
          title: "Scholarships",
          key: "abroad-scholarships",
          links: [
            { label: "Scholarships for Bachelors", to: "/scholarships-bachelors" },
            { label: "Scholarships for Masters", to: "/scholarships-masters" },
            { label: "College Specific Scholarships", to: "/college-specific-scholarships" },
            { label: "Scholarships by External Agencies", to: "/external-agency-scholarships" },
            { label: "For Differently Abled", to: "/scholarships-differently-abled" },
            { label: "For Women", to: "/scholarships-women" },
            { label: "Scholarships for USA", to: "/scholarships-usa" },
            { label: "Scholarships for Canada", to: "/scholarships-canada" },
            { label: "Scholarships for Australia", to: "/scholarships-australia" },
            { label: "Scholarships for UK", to: "/scholarships-uk" },
            { label: "Scholarships for Germany", to: "/scholarships-germany" },
            { label: "Scholarships for Singapore", to: "/scholarships-singapore" },
            { label: "Scholarships for New Zealand", to: "/scholarships-new-zealand" },
            { label: "Scholarships for Netherlands", to: "/scholarships-netherlands" },
            { label: "Scholarships for Ireland", to: "/scholarships-ireland" },
            { label: "Scholarships for Sweden", to: "/scholarships-sweden" },
            { label: "Scholarships for France", to: "/scholarships-france" },
            { label: "Need Based Scholarships", to: "/need-based-scholarships" },
            { label: "Merit Based Scholarships", to: "/merit-based-scholarships" }
          ]
        },
        {
          title: "Services",
          key: "abroad-services",
          links: [
            { label: "Consultants in Delhi", to: "/consultants-delhi" },
            { label: "Consultants in Mumbai", to: "/consultants-mumbai" },
            { label: "Consultants in Pune", to: "/consultants-pune" },
            { label: "Consultants in Kochi", to: "/consultants-kochi" },
            { label: "Consultants in Bangalore", to: "/consultants-bangalore" },
            { label: "Consultants in Kerala", to: "/consultants-kerala" },
            { label: "Consultants in Chennai", to: "/consultants-chennai" },
            { label: "Consultants in Hyderabad", to: "/consultants-hyderabad" },
            { label: "Shiksha Counseling Service", to: "/shiksha-counseling-service" },
            { label: "Topper Counseling Service", to: "/topper-counseling-service" }
          ]
        },
      ],
    },
    {
      title: "Counseling",
      key: "counseling",
      submenus: [
        {
          title: "Get Expert Guidance",
          key: "counsel-guidance",
          links: [
            { label: "Ask a Question", to: "/career-counsel" },
            { label: "Discuss", to: "/admission-help" },
          ],
        },
        {
          title: "Careers After 12th",
          key: "counsel-careers",
          links: [
            { label: "Science", to: "/careers-science" },
            { label: "Commerce", to: "/careers-commerce" },
            { label: "Humanities", to: "/careers-humanities" },
            { label: "Aeronautical Engineer", to: "/career-aeronautical-engineer" },
            { label: "Chartered Accountant", to: "/career-chartered-accountant" },
            { label: "Computer Engineer", to: "/career-computer-engineer" },
            { label: "Doctor", to: "/career-doctor" },
            { label: "Hotel Manager", to: "/career-hotel-manager" },
            { label: "Pilot", to: "/career-pilot" }
          ],
        },
        {
          title: "Courses After 12th",
          key: "counsel-courses",
          links: [
            { label: "Science Stream", to: "/science-stream" },
            { label: "Commerce Stream", to: "/commerce-stream" },
            { label: "Arts Stream", to: "/arts-stream" }
          ],
        },
        {
          title: "Free Prep Material",
          key: "counsel-prep-material",
          links: [
            { label: "NC behulp: NCERT Solutions", to: "/ncert-solutions" },
            { label: "NCERT Solutions for Class 12 Maths", to: "/ncert-solutions-class-12-maths" },
            { label: "NCERT Solutions for Class 12 Physics", to: "/ncert-solutions-class-12-physics" },
            { label: "NCERT Solutions for Class 12 Chemistry", to: "/ncert-solutions-class-12-chemistry" },
            { label: "NCERT Solutions for Class 11 Maths", to: "/ncert-solutions-class-11-maths" },
            { label: "NCERT Solutions for Class 11 Physics", to: "/ncert-solutions-class-11-physics" },
            { label: "NCERT Solutions for Class 11 Chemistry", to: "/ncert-solutions-class-11-chemistry" }
          ]
        },
        {
          title: "NCERT Topics",
          key: "ncert-topics",
          links: [
            { label: "NCERT Notes", to: "/ncert-notes" },
            { label: "NCERT Class 12 Notes", to: "/ncert-class-12-notes" },
            { label: "NCERT Class 11 Notes", to: "/ncert-class-11-notes" },
            { label: "NCERT Class 12 Maths", to: "/ncert-class-12-maths" },
            { label: "NCERT Class 12 Physics", to: "/ncert-class-12-physics" },
            { label: "NCERT Class 12 Chemistry", to: "/ncert-class-12-chemistry" },
            { label: "NCERT Class 11 Maths", to: "/ncert-class-11-maths" },
            { label: "NCERT Class 11 Physics", to: "/ncert-class-11-physics" },
            { label: "NCERT Class 11 Chemistry", to: "/ncert-class-11-chemistry" }
          ]
        },
        {
          title: "National Boards",
          key: "counsel-national-boards",
          links: [
            { label: "CBSE", to: "/cbse" },
            { label: "ICSE", to: "/icse" },
            { label: "NIOS", to: "/nios" }
          ],
        },
        {
          title: "State Boards",
          key: "counsel-state-boards",
          links: [
            { label: "UPMSP", to: "/upmsp" },
            { label: "GSEB", to: "/gseb" },
            { label: "BSEH", to: "/bseh" },
            { label: "BSEB", to: "/bseb" },
            { label: "HPBOSE", to: "/hpbose" },
            { label: "CGBSE", to: "/cgbse" },
            { label: "PSEB", to: "/pseb" },
            { label: "MPBSE", to: "/mpbse" },
            { label: "WBBSE", to: "/wbbse" },
            { label: "RBSE", to: "/rbse" },
            { label: "BIEAP", to: "/bieap" },
            { label: "WBCHSE", to: "/wbchse" }
          ],
        },
        {
          title: "Abroad Counseling Service",
          key: "counsel-abroad",
          links: [
            { label: "Career Counseling", to: "/career-counsel" },
            { label: "Admission Help", to: "/admission-help" },
          ],
        },
        {
          title: "Get Free Counselling",
          key: "counsel-free",
          links: []
        },
      ],
    },
    {
      title: "Shiksha Online",
      key: "online",
      submenus: [
        {
          title: "Technology",
          key: "online-technology",
          links: [
            { label: "Big Data", to: "/technology/big-data" },
            { label: "Cloud Technologies", to: "/technology/cloud-technologies" },
            { label: "Cybersecurity", to: "/technology/cybersecurity" },
            { label: "Databases", to: "/technology/databases" },
            { label: "IT Services", to: "/technology/it-services" },
            { label: "Masters and Certificate Programs", to: "/technology/masters-certificates" },
            { label: "Networking and Hardware", to: "/technology/networking-hardware" },
            { label: "Operating System", to: "/technology/operating-system" },
            { label: "Programming", to: "/technology/programming" },
            { label: "QA and Testing", to: "/technology/qa-testing" },
            { label: "Web Development", to: "/technology/web-development" },
            { label: "Software Tools", to: "/technology/software-tools" },
            { label: "Learn Why Cybersecurity is essential", to: "/guides/cybersecurity-importance" },
            { label: "Learn about the 4Vs of Big Data", to: "/guides/big-data-4vs" },
            { label: "An Ethical Hacker's Guide for getting from beginner to professional", to: "/guides/ethical-hacker-guide" },
            { label: "GPT 3.5 vs GPT 4: How Do They Differ?", to: "/news/gpt-3-5-vs-4" },
            { label: "Exploring Python Pickle: The Ultimate Resource for Object Serialization and Storage", to: "/news/python-pickle" },
            { label: "What is Web Service?", to: "/news/web-service" },
            { label: "max() Function in Python", to: "/news/python-max-function" }
          ],
        },
        {
          title: "Data Science",
          key: "online-data-science",
          links: [
            { label: "Data Science Basics", to: "/data-science/basics" },
            { label: "Data Science for HealthCare", to: "/data-science/healthcare" },
            { label: "Deep Learning", to: "/data-science/deep-learning" },
            { label: "Machine Learning", to: "/data-science/machine-learning" },
            { label: "Learn more about different versions of python", to: "/guides/python-versions" },
            { label: "How to get started with Data Science?", to: "/guides/getting-started-data-science" },
            { label: "Learn about the difference between AI and ML", to: "/guides/ai-vs-ml" },
            { label: "Activation Functions: With Real-life analogy and Python Code", to: "/news/activation-functions" },
            { label: "Understanding Transformers: A Beginner's Guide to the Basics and Applications", to: "/news/transformers-guide" },
            { label: "Difference Between Transportation Problem and Assignment Problem", to: "/news/transportation-vs-assignment" },
            { label: "Midjourney AI Image Generator Pauses its Free Trials", to: "/news/midjourney-pauses-trials" }
          ],
        },
        {
          title: "Management",
          key: "online-management",
          links: [
            { label: "Business Analytics", to: "/management/business-analytics" },
            { label: "Business Tools", to: "/management/business-tools" },
            { label: "Communication", to: "/management/communication" },
            { label: "CSR", to: "/management/csr" },
            { label: "Entrepreneurship", to: "/management/entrepreneurship" },
            { label: "Human Resources", to: "/management/human-resources" },
            { label: "Industry Programs", to: "/management/industry-programs" },
            { label: "Logistics and Supply Chain", to: "/management/logistics-supply-chain" },
            { label: "Marketing", to: "/management/marketing" },
            { label: "Masters and PG-Management", to: "/management/masters-pg" },
            { label: "Operations", to: "/management/operations" },
            { label: "Product Management", to: "/management/product-management" },
            { label: "Strategy and Leadership", to: "/management/strategy-leadership" },
            { label: "What are the latest trends in Recruitment?", to: "/guides/recruitment-trends" },
            { label: "What are the traits required to become a successful Entrepreneur?", to: "/guides/entrepreneur-traits" },
            { label: "Your guide to become a Business Analyst", to: "/guides/business-analyst-guide" },
            { label: "Difference Between Authority and Responsibility", to: "/news/authority-vs-responsibility" },
            { label: "Basics of Google Display Network - Definition and Importance", to: "/news/google-display-network" },
            { label: "Get Started with Google Ads Editor Today", to: "/news/google-ads-editor" },
            { label: "How can Google Ads Help You Advance Your Business Goals?", to: "/news/google-ads-benefits" }
          ],
        },
        {
          title: "Finance",
          key: "online-finance",
          links: [
            { label: "Accounting", to: "/finance-law/accounting" },
            { label: "Banking", to: "/finance-law/banking" },
            { label: "Investing", to: "/finance-law/investing" },
            { label: "Law", to: "/finance-law/law" },
            { label: "Insurance", to: "/finance-law/insurance" },
            { label: "Learn about Corporate Finance concepts and tools", to: "/guides/corporate-finance" },
            { label: "What you need to know about Commercial Banking", to: "/guides/commercial-banking" },
            { label: "Tips, tools and techniques to get started with Risk Management", to: "/guides/risk-management" }
          ],
        },
        {
          title: "Creativity & Design",
          key: "online-creativity-design",
          links: [
            { label: "Architecture", to: "/design-creative/architecture" },
            { label: "Fashion", to: "/design-creative/fashion" },
            { label: "Web Design", to: "/design-creative/web-design" },
            { label: "Why is a career in Graphic Design good?", to: "/guides/graphic-design-career" },
            { label: "What is UI/UX Design all about?", to: "/guides/ui-ux-design" },
            { label: "Learn web design skills a designer should master", to: "/guides/web-design-skills" }
          ],
        },
        {
          title: "Emerging Technologies",
          key: "online-emerging-tech",
          links: [
            { label: "AR VR and Gaming", to: "/emerging-technologies/ar-vr-gaming" },
            { label: "BlockChain", to: "/emerging-technologies/blockchain" },
            { label: "Electric Vehicles", to: "/emerging-technologies/electric-vehicles" },
            { label: "Internet of Things", to: "/emerging-technologies/iot" },
            { label: "Robotics", to: "/emerging-technologies/robotics" },
            { label: "Block chain 101: The complete guide", to: "/guides/blockchain-101" },
            { label: "Learn how IOT is changing the world", to: "/guides/iot-impact" },
            { label: "A Beginner's guide to Augmented Reality", to: "/guides/augmented-reality-guide" }
          ],
        },
        {
          title: "Engineering-Non CS",
          key: "online-engineering-noncs",
          links: [
            { label: "Aviation", to: "/engineering/aviation" },
            { label: "Electrical Engineering", to: "/engineering/electrical-engineering" },
            { label: "Masters and PG-Engineering", to: "/engineering/pg-programs" },
            { label: "Production and Industrial Engineering", to: "/engineering/production-industrial" },
            { label: "TeleCom", to: "/engineering/telecom" },
            { label: "Has technology helped manufacturing processes?", to: "/guides/manufacturing-technology" },
            { label: "Learn about 5 steps of engineering design process", to: "/guides/engineering-design-steps" },
            { label: "How to start a career in Aviation Engineering", to: "/guides/aviation-engineering-career" }
          ],
        },
        {
          title: "Healthcare",
          key: "online-healthcare",
          links: [
            { label: "Fitness and Nutrition", to: "/healthcare/fitness-nutrition" },
            { label: "Healthcare Research", to: "/healthcare/research" },
            { label: "Healthcare Management", to: "/healthcare/management" },
            { label: "Your guide to become a qualified fitness instructor", to: "/guides/fitness-instructor-career" },
            { label: "Clinical Research: Phases, Testing, Types & Trials", to: "/guides/clinical-research-overview" },
            { label: "Learn about emerging trends in Biopharmaceutical Drug Discovery", to: "/guides/biopharma-drug-discovery" }
          ],
        },
        {
          title: "Energy And Environment",
          key: "online-energy-env",
          links: [
            { label: "Energy", to: "/energy-environment/energy" },
            { label: "Environment", to: "/energy-environment/environment" },
            { label: "Renewable Energy: Types, Forms & Sources", to: "/guides/renewable-energy-types" }
          ],
        },
        {
          title: "Social Sciences",
          key: "online-social-sciences",
          links: [
            { label: "Education", to: "/education/education" },
            { label: "TET 2020: Notification, Syllabus, Eligibility, Dates, Exam Pattern", to: "/guides/tet-2020-notification" }
          ],
        },
        {
          title: "Personal Development",
          key: "online-personal-development",
          links: [
            { label: "Career Growth", to: "/career-growth/career-growth" },
            { label: "Hobby And Passion", to: "/career-growth/hobby-and-passion" },
            { label: "Languages", to: "/career-growth/languages" },
            { label: "Why Knowing English is important for today's world?", to: "/guides/why-knowing-english-is-important" },
            { label: "Tips and Tricks to communicate effectively", to: "/guides/tips-to-communicate-effectively" },
            { label: "Your ultimate English Proficiency side", to: "/guides/english-proficiency-guide" }
          ],
        },
        {
          title: "Degree Programs",
          key: "online-degree-programs",
          links: [
            { label: "Bachelors Program", to: "/courses/bachelors-program" },
            { label: "Masters Program", to: "/courses/masters-program" }
          ],
        },
        {
          title: "Blog",
          key: "online-blog",
          links: []
        }
      ]
    }
];

export default mockData;