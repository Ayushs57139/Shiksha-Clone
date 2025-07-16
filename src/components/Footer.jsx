import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Top Colleges',
      links: [
        'Engineering Colleges',
        'MBA Colleges',
        'Medical Colleges',
        'Law Colleges',
        'Arts Colleges',
        'Science Colleges'
      ]
    },
    {
      title: 'Top Courses',
      links: [
        'B.Tech',
        'MBA',
        'MBBS',
        'BBA',
        'B.Com',
        'B.Sc'
      ]
    },
    {
      title: 'Top Exams',
      links: [
        'JEE Main',
        'NEET',
        'CAT',
        'GATE',
        'CLAT',
        'UPSC'
      ]
    },
    {
      title: 'Study Abroad',
      links: [
        'Study in USA',
        'Study in UK',
        'Study in Canada',
        'Study in Australia',
        'Study in Germany',
        'Study in Ireland'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Contact Us',
        'Privacy Policy',
        'Terms & Conditions',
        'Careers',
        'Press'
      ]
    }
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-white px-3 py-2 rounded-lg font-bold text-xl">
                Shiksha
              </div>
            </Link>
            <p className="text-gray-300 mb-4">
              India's largest education platform helping students make informed career choices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get the latest education news and updates</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg text-gray-900 flex-1 md:w-64"
              />
              <button className="bg-primary px-6 py-2 rounded-r-lg hover:bg-orange-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 Shiksha.com. All rights reserved. | Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;