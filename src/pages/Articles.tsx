import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Eye, Tag, Search, Filter, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

<SEO
  title="Articles & Insights"
  description="Read the latest business, tax, and accounting insights from AlloB Consultants. Expert guidance on financial management, compliance, and growth strategies."
  keywords="accounting articles, tax insights South Africa, business advice, financial management tips"
  canonical="/articles"
/>

// Article metadata for the listing page
const articlesData = [
  {
    id: 1,
    title: 'Understanding the New Tax Amendments for 2025',
    author: 'AlloB Consultants',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'tax',
    tags: ['Tax Law', 'SARS', 'Compliance', '2025 Updates'],
    views: 1250,
    excerpt: 'Stay compliant with the latest tax amendments for 2025. Learn about new requirements, deadlines, and how they affect your business operations in South Africa.',
    image: 'https://placehold.co/400x300/dc2626/ffffff?text=Tax+Amendments',
    featured: true
  },
  {
    id: 2,
    title: 'IFRS 17 Implementation: What Insurance Companies Need to Know',
    author: 'AlloB Consultants',
    date: '2025-01-10',
    readTime: '12 min read',
    category: 'accounting',
    tags: ['IFRS 17', 'Insurance', 'Financial Reporting'],
    views: 890,
    excerpt: 'Navigate IFRS 17 implementation with confidence. Essential guidance for insurance companies on compliance and reporting requirements.',
    image: 'https://placehold.co/400x300/1e40af/ffffff?text=IFRS+17',
    featured: false
  },
  {
    id: 3,
    title: 'Digital Transformation in SMEs: A Strategic Approach',
    author: 'AlloB Consultants',
    date: '2025-01-05',
    readTime: '10 min read',
    category: 'business',
    tags: ['Digital Transformation', 'SME', 'Technology', 'Strategy'],
    views: 650,
    excerpt: 'Transform your SME with strategic digital initiatives. Learn proven approaches to successful technology adoption and digital growth.',
    image: 'https://placehold.co/400x300/7c3aed/ffffff?text=Digital+Transform',
    featured: true
  },
  {
    id: 4,
    title: 'Manufacturing Sector Recovery: Post-Pandemic Trends',
    author: 'AlloB Consultants',
    date: '2024-12-28',
    readTime: '6 min read',
    category: 'industry',
    tags: ['Manufacturing', 'Economic Recovery', 'Industry Analysis'],
    views: 520,
    excerpt: 'Understand manufacturing sector recovery patterns and position your business for growth in the new economic landscape.',
    image: 'https://placehold.co/400x300/059669/ffffff?text=Manufacturing',
    featured: false
  },
  {
    id: 5,
    title: 'VAT Compliance for E-commerce Businesses',
    author: 'AlloB Consultants',
    date: '2024-12-15',
    readTime: '7 min read',
    category: 'tax',
    tags: ['VAT', 'E-commerce', 'Compliance'],
    views: 780,
    excerpt: 'Ensure VAT compliance for your e-commerce business with our comprehensive guide to South African tax requirements.',
    image: 'https://placehold.co/400x300/ea580c/ffffff?text=VAT+Compliance',
    featured: false
  },
  {
    id: 6,
    title: 'Sustainable Growth Strategies for SMEs',
    author: 'AlloB Consultants',
    date: '2024-12-01',
    readTime: '9 min read',
    category: 'business',
    tags: ['Sustainability', 'SME', 'Growth Strategies'],
    views: 430,
    excerpt: 'Build a sustainable future for your SME with proven growth strategies that balance profitability with responsibility.',
    image: 'https://placehold.co/400x300/0891b2/ffffff?text=Sustainable+Growth',
    featured: false
  },
  {
    id: 7,
    title: 'UIF Compliance for SMEs: Your Moral and Legal Obligation to Protect Your Employees',
    author: 'AlloB Consultants',
    date: '2024-11-15',
    readTime: '10 min read',
    category: 'business',
    tags: ['UIF', 'SME', 'Compliance'],
    views: 680,
    excerpt: 'Fulfill your UIF compliance obligations and protect your employees with our comprehensive guide for SME employers.',
    image: 'https://placehold.co/400x300/8b5cf6/ffffff?text=UIF+Compliance',
    featured: true
  }
];

const Articles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tax', label: 'Tax Advisory' },
    { value: 'accounting', label: 'Accounting' },
    { value: 'business', label: 'Business Advisory' },
    { value: 'industry', label: 'Industry Insights' }
  ];

  // Filter and sort articles
  const filteredArticles = articlesData
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'views') {
        return b.views - a.views;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const featuredArticles = articlesData.filter(article => article.featured).slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tax': return 'bg-red-100 text-red-800';
      case 'accounting': return 'bg-blue-100 text-blue-800';
      case 'business': return 'bg-purple-100 text-purple-800';
      case 'industry': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insights & Articles
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest updates, insights, and expert advice on business, 
              taxation, and financial management in South Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {article.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.date)}
                        </span>
                      </div>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                    
                    <Link
                      to={`/articles/${article.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-100 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="views">Sort by Popularity</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredArticles.length} of {articlesData.length} articles
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{article.tags.length - 2} more</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.date)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/articles/${article.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Our Latest Insights
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest articles, tax updates, and business advisory content directly in your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-blue-200 text-sm mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Professional Advice?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our articles provide valuable insights, but every business situation is unique.
              Contact AlloB Consultants for personalized guidance tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/contact" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                Schedule Consultation
              </Link>
              <Link 
                to="/services" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;