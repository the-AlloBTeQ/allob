import React, { useState, useEffect, Suspense, Component } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, User, Clock, Share2, Eye, Tag, 
  Loader2, AlertCircle, Printer, ChevronDown, FileText,
  Heart, Bookmark, TrendingUp, Download
} from 'lucide-react';

// Define ArticleMeta interface
interface ArticleMeta {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  description: string;
  keywords: string;
  excerpt: string;
  featured: boolean;
}

// Lazy load article components
const articleComponents = {
  1: () => import('./1'),
  2: () => import('./2'),
  3: () => import('./3'),
  4: () => import('./4'),
  5: () => import('./5'),
  6: () => import('./6'),
  7: () => import('./7'),
} as const;

// Article metadata without component references
const articleMetadata: Record<number, ArticleMeta> = {
  1: {
    id: 1,
    title: 'Understanding the New Tax Amendments for 2025',
    author: 'AlloB Consultants',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'tax',
    tags: ['Tax Law', 'SARS', 'Compliance', '2025 Updates'],
    views: 1250,
    description: 'Comprehensive guide to the latest tax law changes in South Africa for 2025, including compliance requirements and business implications.',
    keywords: 'South Africa tax amendments 2025, SARS compliance, tax law changes, business tax updates',
    excerpt: 'Stay compliant with the latest tax amendments for 2025. Learn about new requirements, deadlines, and how they affect your business operations.',
    featured: true,
  },
  2: {
    id: 2,
    title: 'IFRS 17 Implementation: What Insurance Companies Need to Know',
    author: 'AlloB Consultants',
    date: '2025-01-10',
    readTime: '12 min read',
    category: 'accounting',
    tags: ['IFRS 17', 'Insurance', 'Financial Reporting'],
    views: 890,
    description: 'Complete guide to IFRS 17 implementation for insurance companies, covering requirements, timelines, and best practices.',
    keywords: 'IFRS 17, insurance accounting, financial reporting standards, compliance',
    excerpt: 'Navigate IFRS 17 implementation with confidence. Essential guidance for insurance companies on compliance and reporting requirements.',
    featured: false,
  },
  3: {
    id: 3,
    title: 'Digital Transformation in SMEs: A Strategic Approach',
    author: 'AlloB Consultants',
    date: '2025-01-05',
    readTime: '10 min read',
    category: 'business',
    tags: ['Digital Transformation', 'SME', 'Technology', 'Strategy'],
    views: 650,
    description: 'Strategic roadmap for small and medium enterprises embarking on digital transformation initiatives.',
    keywords: 'SME digital transformation, business technology strategy, small business digitalization',
    excerpt: 'Transform your SME with strategic digital initiatives. Learn proven approaches to successful technology adoption.',
    featured: true,
  },
  4: {
    id: 4,
    title: 'Manufacturing Sector Recovery: Post-Pandemic Trends',
    author: 'AlloB Consultants',
    date: '2024-12-28',
    readTime: '6 min read',
    category: 'industry',
    tags: ['Manufacturing', 'Economic Recovery', 'Industry Analysis'],
    views: 520,
    description: 'Analysis of manufacturing sector recovery trends following the global pandemic, with insights for business planning.',
    keywords: 'manufacturing recovery, post-pandemic business trends, industrial sector analysis',
    excerpt: 'Understand manufacturing sector recovery patterns and position your business for growth in the new economic landscape.',
    featured: false,
  },
  5: {
    id: 5,
    title: 'VAT Compliance for E-commerce Businesses',
    author: 'AlloB Consultants',
    date: '2024-12-15',
    readTime: '7 min read',
    category: 'tax',
    tags: ['VAT', 'E-commerce', 'Compliance'],
    views: 780,
    description: 'Essential VAT compliance guide for e-commerce businesses operating in South Africa.',
    keywords: 'e-commerce VAT South Africa, online business tax compliance, digital commerce taxation',
    excerpt: 'Ensure VAT compliance for your e-commerce business with our comprehensive guide to South African tax requirements.',
    featured: false,
  },
  6: {
    id: 6,
    title: 'Sustainable Growth Strategies for SMEs',
    author: 'AlloB Consultants',
    date: '2024-12-01',
    readTime: '9 min read',
    category: 'business',
    tags: ['Sustainability', 'SME', 'Growth Strategies'],
    views: 430,
    description: 'Practical sustainable growth strategies that small and medium enterprises can implement for long-term success.',
    keywords: 'sustainable business growth, SME sustainability strategies, responsible business practices',
    excerpt: 'Build a sustainable future for your SME with proven growth strategies that balance profitability with responsibility.',
    featured: false,
  },
  7: {
    id: 7,
    title: 'UIF Compliance for SMEs: Your Moral and Legal Obligation to Protect Your Employees',
    author: 'AlloB Consultants',
    date: '2024-11-15',
    readTime: '10 min read',
    category: 'business',
    tags: ['UIF', 'SME', 'Compliance'],
    views: 680,
    description: 'Understanding UIF compliance requirements for small and medium enterprises and employee protection obligations.',
    keywords: 'UIF compliance South Africa, SME employee protection, unemployment insurance fund',
    excerpt: 'Fulfill your UIF compliance obligations and protect your employees with our comprehensive guide for SME employers.',
    featured: true,
  },
};

// Progress Bar Component
const ArticleProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(Math.min(Math.max(scrollProgress, 0), 100));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-blue-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Loading indicator
const ArticleLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
      <p className="text-gray-600">Loading article content...</p>
    </div>
  </div>
);

// Error Fallback UI
const ArticleErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
    <div className="flex items-start">
      <AlertCircle className="w-6 h-6 text-red-600 mt-1 mr-3" />
      <div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Something Went Wrong</h3>
        <p className="text-red-700 mb-4">{error.message}</p>
        <button
          onClick={retry}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
        >
          Try Again
        </button>
        <Link to="/articles" className="text-blue-600 hover:underline">
          Back to Articles
        </Link>
      </div>
    </div>
  </div>
);

// Toast notification
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  } transition-opacity duration-300 flex items-center`}>
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 font-bold text-xl">&times;</button>
  </div>
);

// Simple Error Boundary
class ErrorBoundary extends Component<{
  children: React.ReactNode;
  fallback: (error: Error) => React.ReactNode;
  onError: (error: Error) => void;
}, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

// Interface for the print hook return value
interface UseArticleSaveAndPrintReturn {
  isLoading: boolean;
  showSaveOptions: boolean;
  setShowSaveOptions: React.Dispatch<React.SetStateAction<boolean>>;
  handlePrint: () => Promise<void>;
  handlePrintIframe: () => Promise<void>;
  handlePrintWindow: () => Promise<void>;
  handleDirectPrint: () => Promise<void>;
  handleSavePDF: () => Promise<void>;
  handleSaveHTML: () => void;
  handleSaveText: () => void;
}

// Enhanced print solution
const useArticleSaveAndPrint = (article: ArticleMeta): UseArticleSaveAndPrintReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSaveOptions, setShowSaveOptions] = useState<boolean>(false);

  const generatePrintHTML = (): string => {
    const articleElement = document.querySelector('.article-content');
    const content = articleElement ? articleElement.innerHTML : 'Article content not available';

    return `<!DOCTYPE html>
<html>
<head>
  <title>${article.title} - AlloB Consultants</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <style type="text/css">
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      font-family: 'Times New Roman', Times, serif !important;
      font-size: 12pt !important;
      line-height: 1.5 !important;
      color: #000 !important;
      background: white !important;
      margin: 0 !important;
      padding: 20mm !important;
      width: 100% !important;
      max-width: none !important;
    }
    
    @page {
      size: A4;
      margin: 20mm;
    }
    
    @media print {
      body {
        margin: 0 !important;
        padding: 15mm !important;
        font-size: 11pt !important;
      }
      
      .no-break {
        page-break-inside: avoid !important;
      }
      
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
      }
      
      p {
        orphans: 3 !important;
        widows: 3 !important;
      }
    }
    
    .header {
      text-align: center;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 15mm;
      margin-bottom: 20mm;
      page-break-after: avoid;
    }
    
    .logo {
      font-size: 28pt !important;
      font-weight: bold !important;
      color: #2563eb !important;
      margin-bottom: 5mm;
      letter-spacing: -0.5pt;
    }
    
    .tagline {
      font-style: italic;
      color: #666 !important;
      font-size: 14pt !important;
      margin-bottom: 15mm;
    }
    
    .article-title {
      font-size: 24pt !important;
      font-weight: bold !important;
      color: #000 !important;
      margin-bottom: 10mm;
      text-align: center;
      line-height: 1.2;
      page-break-after: avoid;
    }
    
    .article-meta {
      text-align: center;
      font-size: 11pt !important;
      color: #666 !important;
      margin-bottom: 15mm;
      padding-bottom: 8mm;
      border-bottom: 1px solid #ccc;
      page-break-after: avoid;
    }
    
    .category-badge {
      display: inline-block;
      background: #e5e7eb !important;
      color: #374151 !important;
      padding: 3pt 8pt;
      border-radius: 4pt;
      font-size: 10pt !important;
      font-weight: bold;
      margin-right: 10pt;
    }
    
    .content {
      font-size: 12pt !important;
      line-height: 1.6 !important;
      text-align: justify;
      color: #000 !important;
    }
    
    .content h1 {
      font-size: 20pt !important;
      font-weight: bold !important;
      margin: 15mm 0 8mm 0 !important;
      color: #000 !important;
      page-break-after: avoid;
    }
    
    .content h2 {
      font-size: 18pt !important;
      font-weight: bold !important;
      margin: 12mm 0 6mm 0 !important;
      color: #000 !important;
      page-break-after: avoid;
    }
    
    .content h3 {
      font-size: 16pt !important;
      font-weight: bold !important;
      margin: 10mm 0 5mm 0 !important;
      color: #000 !important;
      page-break-after: avoid;
    }
    
    .content h4 {
      font-size: 14pt !important;
      font-weight: bold !important;
      margin: 8mm 0 4mm 0 !important;
      color: #000 !important;
      page-break-after: avoid;
    }
    
    .content p {
      margin-bottom: 8mm !important;
      text-indent: 0 !important;
      orphans: 3;
      widows: 3;
    }
    
    .content ul, .content ol {
      margin: 8mm 0 !important;
      padding-left: 15mm !important;
    }
    
    .content li {
      margin-bottom: 3mm !important;
      line-height: 1.5;
    }
    
    .content blockquote {
      border-left: 4mm solid #2563eb !important;
      margin: 10mm 0 !important;
      padding: 8mm !important;
      background: #f8f9fa !important;
      font-style: italic;
      page-break-inside: avoid;
    }
    
    .content table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 10mm 0 !important;
      font-size: 10pt !important;
      page-break-inside: avoid;
    }
    
    .content th, .content td {
      border: 1px solid #000 !important;
      padding: 4mm !important;
      text-align: left;
      vertical-align: top;
    }
    
    .content th {
      background: #f0f0f0 !important;
      font-weight: bold !important;
    }
    
    .content strong, .content b {
      font-weight: bold !important;
      color: #000 !important;
    }
    
    .content em, .content i {
      font-style: italic !important;
    }
    
    .tags {
      margin: 15mm 0 !important;
      text-align: center;
      page-break-inside: avoid;
    }
    
    .tag {
      display: inline-block;
      background: #f3f4f6 !important;
      color: #374151 !important;
      padding: 2pt 6pt;
      margin: 2pt;
      border-radius: 3pt;
      font-size: 9pt !important;
      border: 1px solid #d1d5db;
    }
    
    .footer {
      margin-top: 20mm !important;
      padding-top: 10mm !important;
      border-top: 2px solid #ccc !important;
      text-align: center;
      font-size: 10pt !important;
      color: #666 !important;
      page-break-inside: avoid;
    }
    
    .footer p {
      margin-bottom: 4pt !important;
      line-height: 1.4;
    }
    
    .footer strong {
      font-weight: bold !important;
      color: #000 !important;
    }
    
    @media print {
      .header {
        border-bottom: 3px solid #2563eb !important;
      }
      
      .category-badge {
        background: #e5e7eb !important;
        border: 1px solid #9ca3af !important;
      }
      
      .content blockquote {
        border-left: 4mm solid #2563eb !important;
        background: #f8f9fa !important;
      }
      
      .footer {
        border-top: 2px solid #666 !important;
      }
    }
  </style>
</head>
<body>
  <div class="header no-break">
    <div class="logo">AlloB Consultants</div>
    <div class="tagline">Integrity and Innovation</div>
  </div>
  
  <div class="article-title no-break">${article.title}</div>
  
  <div class="article-meta no-break">
    <span class="category-badge">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
    <br><br>
    By ${article.author} • ${new Date(article.date).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })} • ${article.readTime} • ${article.views.toLocaleString()} views
  </div>
  
  <div class="tags no-break">
    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
  </div>
  
  <div class="content">
    ${content}
  </div>
  
  <div class="footer no-break">
    <p><strong>Downloaded from AlloB Consultants</strong></p>
    <p>Generated on ${new Date().toLocaleDateString('en-ZA')} at ${new Date().toLocaleTimeString('en-ZA')}</p>
    <p>For professional advice and services: www.allob.co.za | info@allob.co.za</p>
    <p><strong>© ${new Date().getFullYear()} AlloB Consultants. All rights reserved.</strong></p>
  </div>
</body>
</html>`;
  };

  const handlePrintWindow = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const printWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
      
      if (!printWindow) {
        throw new Error('Unable to open print window. Please check your browser popup settings.');
      }

      const htmlContent = generatePrintHTML();
      
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      printWindow.addEventListener('load', () => {
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
          
          setTimeout(() => {
            if (!printWindow.closed) {
              printWindow.close();
            }
          }, 2000);
        }, 1000);
      });
      
    } catch (error) {
      console.error('Print error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrintIframe = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.top = '-9999px';
      iframe.style.left = '-9999px';
      iframe.style.width = '210mm';
      iframe.style.height = '297mm';
      iframe.style.border = 'none';
      
      document.body.appendChild(iframe);
      
      const iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
      const htmlContent = generatePrintHTML();
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }
      
      iframe.onload = () => {
        setTimeout(() => {
          if (iframe.contentWindow) {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
          }
          
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 1000);
        }, 500);
      };
      
    } catch (error) {
      console.error('Iframe print error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectPrint = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const originalTitle = document.title;
      const originalBody = document.body.innerHTML;
      
      const printContent = generatePrintHTML();
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = printContent;
      const bodyContent = tempDiv.querySelector('body')?.innerHTML ?? '';
      
      document.title = `${article.title} - AlloB Consultants`;
      document.body.innerHTML = bodyContent;
      
      const printStyles = document.createElement('style');
      printStyles.textContent = tempDiv.querySelector('style')?.textContent ?? '';
      document.head.appendChild(printStyles);
      
      window.print();
      
      setTimeout(() => {
        document.title = originalTitle;
        document.body.innerHTML = originalBody;
        document.head.removeChild(printStyles);
      }, 1000);
      
    } catch (error) {
      console.error('Direct print error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = async (): Promise<void> => {
    try {
      if (navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Edge')) {
        await handlePrintIframe();
      } else if (navigator.userAgent.includes('Firefox')) {
        await handlePrintWindow();
      } else {
        await handleDirectPrint();
      }
    } catch (error) {
      console.error('Print failed:', error);
      window.print();
    }
  };

  const handleSavePDF = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(generatePrintHTML());
        printWindow.document.close();
        printWindow.onload = () => {
          setTimeout(() => printWindow.print(), 1000);
        };
        setShowSaveOptions(false);
      }
    } catch (error) {
      console.error('PDF save error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveHTML = (): void => {
    try {
      const htmlContent = generatePrintHTML();
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_allob_consultants.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setShowSaveOptions(false);
    } catch (error) {
      console.error('HTML save error:', error);
      throw error;
    }
  };

  const handleSaveText = (): void => {
    try {
      const articleElement = document.querySelector('.article-content');
      const content = articleElement ? articleElement.textContent || '' : '';
      
      const textContent = `
${article.title}
${'='.repeat(article.title.length)}

Author: ${article.author}
Published: ${new Date(article.date).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
Category: ${article.category.charAt(0).toUpperCase() + article.category.slice(1)}
Reading Time: ${article.readTime}
Views: ${article.views.toLocaleString()}

Tags: ${article.tags.join(', ')}

${'-'.repeat(80)}

${content.trim()}

${'-'.repeat(80)}

This article was downloaded from AlloB Consultants website
Generated on: ${new Date().toLocaleDateString('en-ZA')} at ${new Date().toLocaleTimeString('en-ZA')}
Website: www.allob.co.za
Email: info@allob.co.za

© ${new Date().getFullYear()} AlloB Consultants. All rights reserved.
      `;

      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_allob_consultants.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setShowSaveOptions(false);
    } catch (error) {
      console.error('Text save error:', error);
      throw error;
    }
  };

  return {
    isLoading,
    showSaveOptions,
    setShowSaveOptions,
    handlePrint,
    handlePrintIframe,
    handlePrintWindow,
    handleDirectPrint,
    handleSavePDF,
    handleSaveHTML,
    handleSaveText
  };
};

// Related Articles Component
const RelatedArticles: React.FC<{ currentId: number; category: string }> = ({ currentId, category }) => {
  const relatedArticles = Object.values(articleMetadata)
    .filter(article => 
      article.id !== currentId && 
      (article.category === category || article.tags.some(tag => 
        articleMetadata[currentId as keyof typeof articleMetadata]?.tags.includes(tag)
      ))
    )
    .slice(0, 3);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50 no-print">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          Related Articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 group"
            >
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                article.category === 'tax' ? 'bg-red-100 text-red-800' :
                article.category === 'accounting' ? 'bg-blue-100 text-blue-800' :
                article.category === 'business' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h4>
              <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
             <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{article.readTime}</span>
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {article.views}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dynamic Article Component Loader
const DynamicArticleComponent: React.FC<{ articleId: number }> = ({ articleId }) => {
  const [ArticleComponent, setArticleComponent] = useState<React.ComponentType | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      setLoadingError(null);
      try {
        if (articleComponents[articleId as keyof typeof articleComponents]) {
          const module = await articleComponents[articleId as keyof typeof articleComponents]();
          setArticleComponent(() => module.default);
        } else {
          setLoadingError(`Article ${articleId} not found`);
        }
      } catch (error) {
        console.error('Error loading article:', error);
        setLoadingError('Failed to load article content');
      }
    };

    loadArticle();
  }, [articleId]);

  if (loadingError) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">{loadingError}</p>
        <Link to="/articles" className="text-blue-600 hover:text-blue-700">
          Back to Articles
        </Link>
      </div>
    );
  }

  if (!ArticleComponent) {
    return <ArticleLoader />;
  }

  return <ArticleComponent />;
};

const ArticleDetail = () => {
  const { id } = useParams();
  const articleId = parseInt(id || '', 10);
  const article = articleMetadata[articleId as keyof typeof articleMetadata];

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const {
    isLoading,
    showSaveOptions,
    setShowSaveOptions,
    handlePrint,
    handleSavePDF,
    handleSaveHTML,
    handleSaveText
  } = useArticleSaveAndPrint(article);

  useEffect(() => {
    if (article) {
      console.log(`Viewed: ${article.title}`);
    }
  }, [article]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSaveOptions && !(event.target as Element).closest('.save-dropdown')) {
        setShowSaveOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSaveOptions]);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 5000);
  };

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const formattedDate = new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(article.date));

  const handlePrintWrapper = async () => {
    try {
      await handlePrint();
      showToast('Article opened for printing!', 'success');
    } catch (error) {
      showToast('Failed to open print dialog. Please try again.', 'error');
    }
  };

  const handleSavePDFWrapper = async () => {
    try {
      await handleSavePDF();
      showToast('PDF print dialog opened - select "Save as PDF" from destination!', 'success');
    } catch (error) {
      showToast('Failed to generate PDF. Please try again.', 'error');
    }
  };

  const handleSaveHTMLWrapper = () => {
    try {
      handleSaveHTML();
      showToast('HTML file downloaded successfully!', 'success');
    } catch (error) {
      showToast('Failed to download HTML file. Please try again.', 'error');
    }
  };

  const handleSaveTextWrapper = () => {
    try {
      handleSaveText();
      showToast('Text file downloaded successfully!', 'success');
    } catch (error) {
      showToast('Failed to download text file. Please try again.', 'error');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        showToast('Shared successfully!', 'success');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!', 'success');
      }
    } catch (err) {
      showToast('Failed to share article. Please try again.', 'error');
    }
  };

  const retry = () => setRetryKey(prev => prev + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleProgressBar />
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <header className="bg-white border-b border-gray-200 no-print">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            to="/articles"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Articles
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              article.category === 'tax' ? 'bg-red-100 text-red-800' :
              article.category === 'accounting' ? 'bg-blue-100 text-blue-800' :
              article.category === 'business' ? 'bg-purple-100 text-purple-800' :
              'bg-green-100 text-green-800'
            }`}>
              {article.category}
            </span>
            <div className="flex items-center"><User className="w-4 h-4 mr-1" /> {article.author}</div>
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> <time>{formattedDate}</time></div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {article.readTime}</div>
            <div className="flex items-center"><Eye className="w-4 h-4 mr-1" /> {article.views.toLocaleString()} views</div>
          </div>

          <p className="text-lg text-gray-700 mb-6">{article.excerpt}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm inline-flex items-center">
                <Tag className="w-3 h-3 mr-1" /> {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-1" /> Share
              </button>
              
              <button 
                onClick={handlePrintWrapper}
                disabled={isLoading}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
              >
                <Printer className="w-4 h-4 mr-1" />
                {isLoading ? 'Processing...' : 'Print'}
              </button>

              <div className="relative save-dropdown">
                <button 
                  onClick={() => setShowSaveOptions(!showSaveOptions)}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  disabled={isLoading}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {showSaveOptions && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-48">
                    <div className="py-2">
                      <button
                        onClick={handleSavePDFWrapper}
                        disabled={isLoading}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center disabled:opacity-50"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Save as PDF
                      </button>
                      <button
                        onClick={handleSaveHTMLWrapper}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Save as HTML
                      </button>
                      <button
                        onClick={handleSaveTextWrapper}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Save as Text
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center px-3 py-1 rounded-full border transition-colors ${
                  liked 
                    ? 'bg-red-50 text-red-600 border-red-200' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {liked ? 'Liked' : 'Like'}
              </button>
              
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center px-3 py-1 rounded-full border transition-colors ${
                  bookmarked 
                    ? 'bg-blue-50 text-blue-600 border-blue-200' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Bookmark className={`w-4 h-4 mr-1 ${bookmarked ? 'fill-current' : ''}`} />
                {bookmarked ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8">
        <article className="max-w-4xl mx-auto px-4 article-content">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <Suspense fallback={<ArticleLoader />}>
                <ErrorBoundary
                  fallback={(error) => <ArticleErrorFallback error={error} retry={retry} />}
                  onError={console.error}
                  key={retryKey}
                >
                  <DynamicArticleComponent articleId={articleId} />
                </ErrorBoundary>
              </Suspense>
            </div>
          </div>
        </article>
      </main>

      <RelatedArticles currentId={articleId} category={article.category} />

      <aside className="bg-white border-t border-gray-200 no-print py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Professional Advice?</h2>
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
      </aside>
    </div>
  );
};

export default ArticleDetail;