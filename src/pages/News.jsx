import React, { useState } from 'react';
import { Calendar, User, Eye, Share2, Bookmark } from 'lucide-react';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'admissions', name: 'Admissions' },
    { id: 'exams', name: 'Exams' },
    { id: 'results', name: 'Results' },
    { id: 'scholarships', name: 'Scholarships' },
    { id: 'policy', name: 'Education Policy' },
    { id: 'international', name: 'Study Abroad' }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'JEE Main 2024 Registration Begins: Important Dates and Guidelines',
      excerpt: 'National Testing Agency (NTA) has announced the registration dates for JEE Main 2024. Students can apply online from November 1, 2023.',
      category: 'exams',
      author: 'Education Desk',
      date: '2023-11-01',
      readTime: '3 min read',
      views: '15.2K',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: 2,
      title: 'NEET 2024: Medical Colleges to Increase Seats by 10%',
      excerpt: 'The Medical Council of India has approved an increase in MBBS seats across various medical colleges for the academic year 2024-25.',
      category: 'admissions',
      author: 'Medical Education Reporter',
      date: '2023-10-28',
      readTime: '4 min read',
      views: '12.8K',
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 3,
      title: 'New Scholarship Program Launched for Engineering Students',
      excerpt: 'Government announces ₹500 crore scholarship program to support meritorious students from economically weaker sections.',
      category: 'scholarships',
      author: 'Policy Reporter',
      date: '2023-10-25',
      readTime: '2 min read',
      views: '8.5K',
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 4,
      title: 'CAT 2023 Results Declared: Check Your Scores Now',
      excerpt: 'Indian Institute of Management has declared the results for Common Admission Test 2023. Candidates can check their scores online.',
      category: 'results',
      author: 'MBA Desk',
      date: '2023-10-22',
      readTime: '2 min read',
      views: '25.3K',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: 5,
      title: 'Study Abroad: Top Universities Offering Full Scholarships',
      excerpt: 'Complete guide to international universities providing 100% scholarships for Indian students in 2024.',
      category: 'international',
      author: 'Study Abroad Expert',
      date: '2023-10-20',
      readTime: '6 min read',
      views: '18.7K',
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 6,
      title: 'New Education Policy: Major Changes in Higher Education',
      excerpt: 'Ministry of Education announces significant reforms in higher education structure and curriculum framework.',
      category: 'policy',
      author: 'Education Policy Analyst',
      date: '2023-10-18',
      readTime: '5 min read',
      views: '22.1K',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const featuredNews = newsArticles.filter(article => article.featured);
  const regularNews = filteredNews.filter(article => !article.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Education News</h1>
          <p className="text-gray-600">Stay updated with the latest news and updates in education</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured News */}
        {selectedCategory === 'all' && featuredNews.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured News</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                      <span className="bg-primary text-white px-2 py-1 rounded text-xs uppercase">
                        {categories.find(cat => cat.id === article.category)?.name}
                      </span>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <User size={14} className="mr-1" />
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                          <Bookmark size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Regular News */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === 'all' ? 'Latest News' : `${categories.find(cat => cat.id === selectedCategory)?.name}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedCategory === 'all' ? regularNews : filteredNews).map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs uppercase">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <User size={14} className="mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        <span>{article.views}</span>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <button className="text-primary font-medium hover:underline">
                      Read More
                    </button>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                        <Bookmark size={14} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            Load More Articles
          </button>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest education news and updates
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-secondary px-6 py-3 rounded-r-lg hover:bg-opacity-90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;