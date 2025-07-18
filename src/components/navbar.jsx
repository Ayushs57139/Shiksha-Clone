import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Navbar = () => {
  const [openMainMenu, setOpenMainMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const menuRef = useRef(null);

  const toggleMainMenu = (menuKey) => {
    setOpenMainMenu(openMainMenu === menuKey ? null : menuKey);
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (submenuKey) => {
    setOpenSubMenu(openSubMenu === submenuKey ? null : submenuKey);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMainMenu(null);
        setOpenSubMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menus = [
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
            { label: "Popular Colleges", },  
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
        { label: "Computer Science Engineering", to: "/cse" },
        { label: "Electronics & Communication", to: "/ece" },
        { label: "Mechanical Engineering", to: "/mechanical" },
        { label: "Civil Engineering", to: "/civil" },
        { label: "Electrical Engineering", to: "/electrical" },
        { label: "Information Technology", to: "/it" },
        { label: "Chemical Engineering", to: "/chemical" },
        { label: "Aerospace Engineering", to: "/aerospace" },
        { label: "Biotechnology", to: "/biotech" },
        { label: "Automobile Engineering", to: "/automobile" }
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
          key: "medical-top",
          links: [
            { label: "Top MBBS Colleges", to: "/top-mbbs" },
            { label: "Top BDS Colleges", to: "/top-bds" },
          ],
        },
        {
          title: "Popular Courses",
          key: "medical-top",
          links: [
            { label: "Top MBBS Colleges", to: "/top-mbbs" },
            { label: "Top BDS Colleges", to: "/top-bds" },
          ],
        },
        {
          title: "Popular Specializations",
          key: "medical-top",
          links: [
            { label: "Top MBBS Colleges", to: "/top-mbbs" },
            { label: "Top BDS Colleges", to: "/top-bds" },
          ],
        },
        {
          title: "Exams",
          key: "medical-top",
          links: [
            { label: "Top MBBS Colleges", to: "/top-mbbs" },
            { label: "Top BDS Colleges", to: "/top-bds" },
          ],
        },
        {
          title: "Colleges By Location",
          key: "medical-top",
          links: [
            { label: "Top MBBS Colleges", to: "/top-mbbs" },
            { label: "Top BDS Colleges", to: "/top-bds" },
          ],
        },
        {
          title: "College Predictors",
          key: "medical-top",
          links: [
            { label: "Top MBBS Colleges", to: "/top-mbbs" },
            { label: "Top BDS Colleges", to: "/top-bds" },
          ],
        },
        {
          title: "Resources",
          key: "medical-top",
          links: [
            { label: "Top MBBS Colleges", to: "/top-mbbs" },
            { label: "Top BDS Colleges", to: "/top-bds" },
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
          key: "design-courses",
          links: [
            { label: "Fashion Design", to: "/fashion-design" },
            { label: "Graphic Design", to: "/graphic-design" },
          ],
        },
        {
          title: "Popular Specializations",
          key: "design-courses",
          links: [
            { label: "Fashion Design", to: "/fashion-design" },
            { label: "Graphic Design", to: "/graphic-design" },
          ],
        },
        {
          title: "Popular Courses",
          key: "design-courses",
          links: [
            { label: "Fashion Design", to: "/fashion-design" },
            { label: "Graphic Design", to: "/graphic-design" },
          ],
        },
        {
          title: "Exams",
          key: "design-courses",
          links: [
            { label: "Fashion Design", to: "/fashion-design" },
            { label: "Graphic Design", to: "/graphic-design" },
          ],
        },
        {
          title: "College Predictors",
          key: "design-courses",
          links: [
            { label: "Fashion Design", to: "/fashion-design" },
            { label: "Graphic Design", to: "/graphic-design" },
          ],
        },
        {
          title: "Colleges By Location",
          key: "design-courses",
          links: [
            { label: "Fashion Design", to: "/fashion-design" },
            { label: "Graphic Design", to: "/graphic-design" },
          ],
        },
        {
          title: "Resources",
          key: "design-courses",
          links: [
            { label: "Fashion Design", to: "/fashion-design" },
            { label: "Graphic Design", to: "/graphic-design" },
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
            { label: "Study in USA", to: "/study-usa" },
            { label: "Study in UK", to: "/study-uk" },
          ],
        },
        {
          title: "Exams",
          key: "abroad-country",
          links: [
            { label: "Study in USA", to: "/study-usa" },
            { label: "Study in UK", to: "/study-uk" },
          ],
        },
        {
          title: "Popular Programs",
          key: "abroad-country",
          links: [
            { label: "Study in USA", to: "/study-usa" },
            { label: "Study in UK", to: "/study-uk" },
          ],
        },
        {
          title: "Popular Specialization",
          key: "abroad-country",
          links: [
            { label: "Study in USA", to: "/study-usa" },
            { label: "Study in UK", to: "/study-uk" },
          ],
        },
        {
          title: "Student Visas",
          key: "abroad-country",
          links: [
            { label: "Study in USA", to: "/study-usa" },
            { label: "Study in UK", to: "/study-uk" },
          ],
        },
        {
          title: "SOP/LOR",
          key: "abroad-country",
          links: [
            { label: "Study in USA", to: "/study-usa" },
            { label: "Study in UK", to: "/study-uk" },
          ],
        },
        {
          title: "Scholarships",
          key: "abroad-country",
          links: [
            { label: "Study in USA", to: "/study-usa" },
            { label: "Study in UK", to: "/study-uk" },
          ],
        },
        {
          title: "Services",
          key: "abroad-country",
          links: [
            { label: "Study in USA", to: "/study-usa" },
            { label: "Study in UK", to: "/study-uk" },
          ],
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
            { label: "Career Counseling", to: "/career-counsel" },
            { label: "Admission Help", to: "/admission-help" },
          ],
        },
        {
          title: "Careers After 12th",
          key: "counsel-guidance",
          links: [
            { label: "Career Counseling", to: "/career-counsel" },
            { label: "Admission Help", to: "/admission-help" },
          ],
        },
        {
          title: "Courses After 12th",
          key: "counsel-guidance",
          links: [
            { label: "Career Counseling", to: "/career-counsel" },
            { label: "Admission Help", to: "/admission-help" },
          ],
        },
        {
          title: "Free Prep Material",
          key: "counsel-guidance",
          links: [
            { label: "Career Counseling", to: "/career-counsel" },
            { label: "Admission Help", to: "/admission-help" },
          ],
        },
        {
          title: "National Boards",
          key: "counsel-guidance",
          links: [
            { label: "Career Counseling", to: "/career-counsel" },
            { label: "Admission Help", to: "/admission-help" },
          ],
        },
        {
          title: "State Boards",
          key: "counsel-guidance",
          links: [
            { label: "Career Counseling", to: "/career-counsel" },
            { label: "Admission Help", to: "/admission-help" },
          ],
        },
        {
          title: "Abroad Counseling Service",
          key: "counsel-guidance",
          links: [
            { label: "Career Counseling", to: "/career-counsel" },
            { label: "Admission Help", to: "/admission-help" },
          ],
        },
        {
          title: "Get Free Counselling",
          key: "counsel-guidance",
          links: [
            { label: "Career Counseling", to: "/career-counsel" },
            { label: "Admission Help", to: "/admission-help" },
          ],
        },
      ],
    },
    {
      title: "Shiksha Online",
      key: "online",
      submenus: [
        {
          title: "Technology",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Data Science",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Management",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Finance",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Creativity & Design",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Emerging Technologies",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Engineering-Non CS",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Healthcare",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Energy And Environment",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Social Sciences",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Personal Development",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Degree Programs",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },
        {
          title: "Blog",
          key: "online-courses",
          links: [
            { label: "MBA Online", to: "/online-mba" },
            { label: "Data Science", to: "/online-ds" },
          ],
        },

      ],
    },
  ];
  

  return (
    <nav className="bg-teal-800 text-white shadow relative z-[1000]" ref={menuRef}>
      <div className="flex items-center px-6 py-3 space-x-6 relative">
        {menus.map((menu) => (
          <div key={menu.key} className="relative">
            <button
              onClick={() => toggleMainMenu(menu.key)}
              className="flex items-center gap-1 px-4 py-2 hover:bg-teal-700 rounded"
            >
              {menu.title}
              <FaChevronDown
                className={`transition-transform duration-200 ${
                  openMainMenu === menu.key ? "rotate-180" : "rotate-0"
                }`}
                size={10}
              />
            </button>

            {openMainMenu === menu.key && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-white text-black border rounded shadow-xl z-[1000]"
                onMouseLeave={() => {
                  setOpenMainMenu(null);
                  setOpenSubMenu(null);
                }}
              >
                {menu.submenus.map((submenu) => (
                  <div key={submenu.key} className="group relative">
                    <button
                      onClick={() => toggleSubMenu(submenu.key)}
                      className="w-full text-left flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                    >
                      {submenu.title}
                      <FaChevronRight className="text-xs" />
                    </button>

                    {openSubMenu === submenu.key && (
  <div
    className="absolute left-full top-0 ml-2 w-64 bg-white text-black rounded-lg shadow-lg z-[1000] py-2"
    style={{
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
    }}
  >
    {submenu.links.map((link, i) => (
      <Link
        key={i}
        to={link.to}
        onClick={() => {
          setOpenMainMenu(null);
          setOpenSubMenu(null);
        }}
        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-black transition-colors duration-150"
      >
        {link.label}
      </Link>
    ))}
  </div>
)}

                    
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

