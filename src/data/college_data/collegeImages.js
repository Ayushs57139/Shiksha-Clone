// College Images Data - Reverted to simple structure
// This file contains basic image data for colleges

export const collegeImages = {
  // Default image for all colleges
  'default': 'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
};

// Banner carousel images with college information
export const bannerImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'College Campus',
    title: 'Find Your Perfect College',
    subtitle: 'Discover the best colleges, courses, and career opportunities',
    collegeName: 'Featured College'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1541339907198-0875fd0521eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'University Campus',
    title: 'Top Universities',
    subtitle: 'Leading institutions across India',
    collegeName: 'Featured University'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Engineering College',
    title: 'Engineering Excellence',
    subtitle: 'Premier engineering institutions',
    collegeName: 'Featured Engineering College'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Medical College',
    title: 'Medical Education',
    subtitle: 'Leading medical institutions',
    collegeName: 'Featured Medical College'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1523240795138-4745c0c0c3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Management College',
    title: 'Business Education',
    subtitle: 'Top management institutions',
    collegeName: 'Featured Management College'
  }
];

// Function to get image for a college
export const getCollegeImage = (collegeName) => {
  return collegeImages['default'];
};

// Function to get random banner image
export const getRandomBannerImage = () => {
  const randomIndex = Math.floor(Math.random() * bannerImages.length);
  return bannerImages[randomIndex];
}; 