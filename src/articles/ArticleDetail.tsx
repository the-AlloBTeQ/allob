import React, { useState, useEffect, useRef, Suspense, Component } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { fetchViewCounts, incrementViewCount } from '../utils/article-views';
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
  8: () => import('./8'),
  9: () => import('./9'),
  10: () => import('./10'),
  11: () => import('./11'),
  12: () => import('./12'),
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
    description: 'Understanding UIF compliance requirements for small and medium enterprises and employee protection obligations.',
    keywords: 'UIF compliance South Africa, SME employee protection, unemployment insurance fund',
    excerpt: 'Fulfill your UIF compliance obligations and protect your employees with our comprehensive guide for SME employers.',
    featured: true,
  },
  8: {
    id: 8,
    title: 'Approved but Not Yet Effective: The GRAP Standards Every Municipality Must Prepare For',
    author: 'AlloB Consultants Technical Department',
    date: '2026-09-22',
    readTime: '8 min read',
    category: 'public-sector',
    tags: ['GRAP', 'Public Sector', 'Municipalities', 'Accounting Standards Board'],
    description: 'Overview of the Standards of GRAP approved by the Accounting Standards Board but awaiting a Ministerial effective date, and why municipalities should start preparing now.',
    keywords: 'GRAP standards South Africa, Accounting Standards Board, municipal financial reporting, Directive 5',
    excerpt: 'A new cluster of Standards of GRAP has cleared the Accounting Standards Board and is waiting only for the Minister of Finance to gazette an effective date. Here is what has been approved and why the preparation work needs to start now.',
    featured: true,
  },
  9: {
    id: 9,
    title: 'GRAP 105, 106 & 107 Revised: Getting Ready for the New Rules on Transfers of Functions and Mergers',
    author: 'AlloB Consultants Technical Department',
    date: '2026-09-22',
    readTime: '10 min read',
    category: 'public-sector',
    tags: ['GRAP', 'GRAP 105', 'GRAP 106', 'GRAP 107', 'Municipalities'],
    description: 'How to apply the concentration test, when a transfer of functions becomes a merger, and what the new disclosure requirements mean for municipal restructurings and amalgamations.',
    keywords: 'GRAP 105, GRAP 106, GRAP 107, transfer of functions, mergers, municipal restructuring',
    excerpt: 'Revised GRAP 105, 106 and 107 replace the 2010 originals with a single, consistent model for deciding whether a restructuring is a transfer of functions or a merger.',
    featured: false,
  },
  10: {
    id: 10,
    title: 'GRAP 111 Explained: Accounting for Social Benefits for the First Time',
    author: 'AlloB Consultants Technical Department',
    date: '2026-09-22',
    readTime: '11 min read',
    category: 'public-sector',
    tags: ['GRAP', 'GRAP 111', 'Social Benefits', 'Indigent Support', 'Municipalities'],
    description: 'GRAP 111 gives South African public sector entities a dedicated recognition and measurement model for cash social benefits - including when the liability for indigent grants actually arises.',
    keywords: 'GRAP 111, social benefits, indigent support, grants-in-aid, municipal liability',
    excerpt: 'GRAP 111 is a wholly new Standard for cash social benefits. The recognition point runs against most preparers\' first instinct - and getting it wrong changes the size of the liability.',
    featured: true,
  },
  11: {
    id: 11,
    title: 'GRAP 109 Amended: Why the Sharpened "Binding Arrangement" Test Changes How You Account for Agency Income',
    author: 'AlloB Consultants Technical Department',
    date: '2026-09-22',
    readTime: '9 min read',
    category: 'public-sector',
    tags: ['GRAP', 'GRAP 109', 'Principal and Agent', 'Conditional Grants', 'Municipalities'],
    description: 'The July 2026 amendments to GRAP 109 clarify how to identify a principal-agent arrangement and add new significant-judgements disclosure for conditional grants and agency collections.',
    keywords: 'GRAP 109, principal agent, binding arrangement, conditional grants, agency income',
    excerpt: 'If your municipality collects money, manages funds, or delivers a programme on behalf of another sphere of government, GRAP 109 already governs how you account for it - and the 2026 amendments sharpen the test.',
    featured: false,
  },
  12: {
    id: 12,
    title: "The Changes That Aren't So Quiet: GRAP 1, GRAP 103 and the Improvements to the Standards of GRAP (2026)",
    author: 'AlloB Consultants Technical Department',
    date: '2026-09-22',
    readTime: '10 min read',
    category: 'public-sector',
    tags: ['GRAP', 'GRAP 1', 'GRAP 103', 'Going Concern', 'Heritage Assets'],
    description: 'Amended GRAP 1 tightens going concern disclosure and rewrites current/non-current liability classification. Amended GRAP 103 reclassifies heritage assets with an alternative use. An eight-standard Improvements package touches the rest.',
    keywords: 'GRAP 1, GRAP 103, going concern, heritage assets, Improvements to Standards of GRAP 2026',
    excerpt: 'Not every approved-but-not-yet-effective change comes as a headline new Standard. Going concern disclosure, loan covenant classification, and heritage asset reclassification all get quietly rewritten.',
    featured: false,
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
  <div
    role={type === 'error' ? 'alert' : 'status'}
    aria-live={type === 'error' ? 'assertive' : 'polite'}
    className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    } transition-opacity duration-300 flex items-center`}
  >
    <span>{message}</span>
    <button onClick={onClose} aria-label="Dismiss notification" className="ml-4 font-bold text-xl">
      <span aria-hidden="true">&times;</span>
    </button>
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
    
    .logo-img {
      height: 22mm;
      width: auto;
      margin: 0 auto 5mm;
      display: block;
    }
    
    .footer-logo {
      height: 10mm;
      width: auto;
      margin: 0 auto 4mm;
      display: block;
      opacity: 0.85;
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
    <img src="data:image/png;base64,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" alt="AlloB Consultants logo" class="logo-img" />
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
    })} • ${article.readTime}
  </div>
  
  <div class="tags no-break">
    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
  </div>
  
  <div class="content">
    ${content}
  </div>
  
  <div class="footer no-break">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUgAAAEhCAYAAAAd7zmhAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAANzjSURBVHhe7P1XrCVJmueJ/cxcH311aB0ZGamzdJfqnqpqtds93T1ccJdLzJDLlyX4QIIzAz7PE8EHLvlAgsC+LbAElgSWg9np7umZ6equrqrMSq0zQ6ur1dHCtZvxwc9VETfujcyMzErhPyBgYcfFOdf9+P98Zp8wobXWFBQUFBQ8gLz/hYKCgoKCnEIgCwoKCh5CIZAFBQUFD6EQyIKCgoKHUAhkQUFBwUMoBLKgoKDgIRQCWVBQUPAQCoEsKCgoeAiFQBYUFBQ8hEIgCwoKCh5CIZAFBQUFD6EQyIKCgoKHUAhkQUFBwUMoBLKgoKDgIRQCWVBQUPAQCoEsKCgoeAiFQBZ87mgg1ZqRVkSPUK9ZAeoR9isoeNwUAlnwuZNqzbxKeD0JWMqS+zc/QAYEaCKt7t9UUPCZUghkweeKBnpa8bfhiP8+6HEli1Acbh22VMamyh5hz4KCx0chkAWfK7HWXEkjfhGPeDUO+CiJaKvDLcMMaGtFV2X3byoo+MwoBLLgc0MBmyrjF9GID4KAMM14L4m4nkb377oHE5iUBm2VcT2NyYr5yILPiUIgCz43Qq14Owl4fTQkudfGutPh9sjnShLhHzC/KAAbgQGsqIRVld6/S0HBZ0IhkAWfC5nWLGUJ/xCOuLPRY+ZXC8z9hzvEyz0+SCPupQc7a2whOGVY9JTmzSR8JO93QcGnpRDIgs8cDQy15jdRyNv9Ic5Hm0y9scrE22uYtzt8FIZcS2PSA0TPGA+zS0JwI425ncX371JQ8NgpBLLgMyfVmjtpzEvBkLXVLpOvr1C52cZdH+LeatFsDfkoiWge4oBxhOCiaTNSipejgOEjOHcKCj4NhUAWfKYoremojF9GIz7oDai+u0b9ow1knCGjjOr1NsbdDu/FAVfT6MAwHgvBKWkyIww+SEI+SMMigLzgM6UQyILPlAS4ksT8ZjSiP99h4s01vOUhWoBIFeWFHvbtNveGAVeSiOEhzpqyNHjCsvGV4qUwoH3A/gUFn5ZCIAs+MzKtWctS/j4ccb09YOKtVWrXm6A1CAGAMUoo32yTLfb4MIm4kx48t+gIwROmwzHD4o045M04OHDusqDg01AIZMFngtaaQGvejEPeGA5RN5s03lnDavm5OApACGSiqNzuYN7tcDUIuZrExAcIngSmDYOLps1wbEUuZ0XYT8FnQyGQBZ8JGbCYpfzSH7Gw1mPyjRUqt9sIIdBjcdQC0Bqn5ePdbtPZHPJhFLJ2iOA5CJ61HM6aFq9HAb+JAsIDRLWg4JNSCGTBY0drTV8pXgp93h0McK5sUP9gA9NP0ZCL5LgFELGieqONdbfDB3HE1SQ60PliCcEp0+KSZdNXil+HI24mBw/NCwo+CYVAFjx2EuBmGvOyP6K53GXyrVVKi73cQz0Wx92tzDTeygD7Toelvs+1JGFwgEAClITkubEV+XYU8uvQp1eE/RQ8ZgqBLHisKKCtMn4V+FzpDKi9s0b1WhNStTOs3tPmQmn4CZVbbVjo8V4UcCM5OD/bFoKLls0l02aoNC9HPu/FRdhPweOlEMiCx0qkFe/FIa8Mh4zm29TfW8NZHz4w97jTz/+JVFG618G81+Hm2FlzUDqhBBrS4Gnb4Yhh8lEU8XIYsFlYkQWPkUIgCx4bmdaspRn/MBpxqzlg4u01Krc6wI44bnmv9/bzfESrG+Le6TBcH/BhFLF0SH62IwRPWTaXrTy75pXQ540oIDlAWAsKPg6FQBY8FjQw0ppXI5+3hiPErRa1D9axeuG2KD68zf+fh/y0MO91uBKFXEviA4vpmghOmBZPWw41YXArjvl1MGLhEGEtKHhUCoEseCxkWrOQJvx6OGJ5rcfEWyuU57sPOGT2trmwbv2fTOGuDbHudljp+lyJI9rZwUNmV0iesR0u2zah1rwRhbwcBvjFULvgMVAIZMGnRgM9pfi17/NBb0Tpow2qVzeRQbqPKO5ut6zH8f8RyDCjcquNnO/wfhRx45DwHVsILtg2T9sOjpCsJCkvBwHXkvgA27Og4NEoBLLgU5NozbU45uXRiPZKl/r767irgz1zjQe1u/8vU0VpoYd5t8OdYcCVODrQGhRATRpcthzOGiaR1rwXhbwUBHSzg6sDFRQcRiGQBZ8KpTWbWco/+COutYfU3lunfKOFzPQeb/XD2m0Lcus1wBzFePe6BGt9Pooi5g+ZU7QFXLZtLtsOEkE7y3gl8HknCovlGQo+FYVAFnwqQq15J4x4YzAivtem9sE6TtPfI3j3C+BOf9eJxpakEAKRKEr3upjzXa4GEdfig4vpmgiOmRZP2Q7TQhIrxdUo4qXAZ72wIgs+BYVAFnxiMmAly/iVP+Jus0/9vTXK9zoPCeXZr78zB7nHksw0zuYI+16HjfaQj8KI5iFC5wjBM47DU46DQDBSmteDkFeD4MDiFwUFB1EIZMEnQgMjpXg18HmnP8K42aJ6ZQNjEOVCx31zjQf093tNJhnlOx2MhS4fRrkVeZDMWUJw1rJ5ynYpI8iSjHk/4qUg4E5y8BC9oOBhFAJZ8IlIteZukvDS0GdtrUfj3VW8pd5eoXvEdr/XRKpwlweY813uDQOuRhGjQ5w1VSl5xrG5aNkYQULaD3mnP+Ql3y+WZyj4RBQCWfCx0UBXKX41GvFhd4B3ZYPyzRYyVmNrcOvffsPq3dtz63HfYwAziPHudUhXenwUR9w+xBK0heCSbXPZcTANiexHdDcGvBIEfBgdvJxDQcF+FAJZ8LGJteZqFPHKcERvqZs7ZjaG5GGNu+cWt/o7Irl3u8hLnu17TG5FlhZ7mAtdrvsR16PowDRCA5g1TJ5yHOZcBxmnsDniSmfIS35A+5B5zIKC+ykEsuBjobRmI035h+GIm60h1Q/WKd/pQJYvo6AZCxw71uCe/j7bt0Xxvn3INHY7wJ7v0mmNuBJGrKeHFNMVgqcdh8ueS1ZzkcOI5G6L13yfN4OgCPsp+FgUAlnwsQi05s0g5I3BiORem+qVDaxOsEvs7he/w/vw4Gvbc5FJhnevi1zo8GEYcTWMDyxpZgrBadPisufi1T1QYC72uNcc8LIfsJIWVmTBo1MIZMEjk2rNYpLw66HPwsaA2ntreAu97bnE3RbhXqF72PZxLvb9x+zqi0zjruXOmqVByJU4on+Aw0UAJUPylOtwseSSzJQx/AR5bYM3Rz6/CfwDy6gVFOymEMiCR0IDA6X4jR/wfn+IdbNJ5WYTI0jy+cI9luGj9nfmIh++D8goxZvvopa7fBRF3IoPd9ZctGwulTyYrqBNiX27zfpKn9+MAm7HB+d3FxRsUQhkwSORas3tOOE3g4CN1T61D9fG+dZ7rb5P1t/vtZ2+TBXecg+50OXmMORKGBIdYEVKYNo0uOw4zFVcwrkq5jDC+miN97ojfj30D7RCCwq2KASy4FAU0M4yfjUccbUzoHR1g9KdDmK8jMKWoO38+7j9/V7b1ddg9kOchS7D5pCrUczyIc4aWwiedh0uV0rER2pkJYfSjSbDhQ6v+AHvBwcvDFZQQCGQBY9CrDUfhBGv9X2Gy12qVzawmyPYHhJv1XT8uP299SD332c8zE4U3mIXudjlWhBz7RBnjSUEJyyTJ12H8kSJaK6C3QlwrqxxvT3k5ZHPZuGwKTiEQiALDkRpWE8y/mHgc6s1pPLhOu5CBzQoQ5JMlkiq7i5h26cdW4IPCuCOxbj/PjstSuNsjLAWeqx0fa6GEd1DiumWpORp1+aJskt4okE84VG+vkl2u8Xrw4A3g/DAuMqCgkIgCx6K1pqRUrweBLzT99HzbSo3NrH6EVoK0ppN/8VjjC7NoGwjF7375g8f3s+H0frAffb2RZLhLnRhucuHYcS16OCVDy0huODYXK54iLkK4dEaVjvAvbLOwmafl4Y+i4c4fAq+3hQCWfBQMmAhTvh1f8TyRp/qh+u4y4Nc1CyD4NQkg6ePMDo3SVp3dzzPgp1smLEVuKe/a/u2BXnAPtve7FThrvaRi11uD0OuhjHBAc4WCUwYBpddhxMVj+hEnWSiROlWC+PGJu8OAl4ZBQeeo+DrTSGQBfuitaaXKV4a+XzYGWHfaFK+3UJGCdqQJBMeg6fnCE5OEM9USCa8bWHbsv52+uOYxge259u2/u2/z65zAOYowV3qE20MuRrGzMeHOGuk5EnX4cmKR3K0RnS0it0a4V7dYHO1x8ujgGtRkg/lCwruoxDIgn1JgFtxzKt9n9Zaj8q1dezNYS5cjol/cRr//BS6ZJFOlUkaJbTMhS0XvB2h27/PLgtySyTv3+fBPlmGs9xDLPW47ufD7IPSB03gmGnylOdQr5cIj9dJKw7lO23sq+t81B3x8tCnV+RpF+xDIZAFD6CAVqb4Zd/nRntE+fom3nwHkSm0IYmnK4yenMU9UmfGtrBrHsmER+aa+zhiHtbPRU+z46x5cJ8H+0Jp7LaPtdRlvTPiahDTOkTcXCm47Do8USkRHm8Qnahj9EO865sE8x1eHwW8V4T9FOxDIZAFDxApzfujkDd6I/ylLuXrm1idAC0EWclieGkGzkzxrVqJn1ZLzHl2Psyul3YJ237tbiHcEcAHhfP+ffaeQyQZzlIPsdzjSpDnZx8kbbYQnHMsnio7WLMVwuMNtGPiLnaxr21wqznk5YHPehH2U3AfhUAW7CHTmpU44Rf9IXebQyrX1nGWewBo0yA6UiO8NMvsXI2fVMv8pFpm1rGIp8ukDe/BIfFhQ+Y9/x62z31tpnDWB5hLPeYHIdeC+BFWPpQ86TmcKruEx+tER6uYfkzp1ibqTpM3hyGvjYrlGQr2UghkwTYaGCnNa6OA93sB4l479/iOxmE9VYfhU3OYJyf4XtnjWyWXM47NrGOjJkqkDRdhyAcEbqev9zhdtq3H7VAe7tvnIedAYIQJ9kqPaK3PlSDiTnRwuI4lJE84eWZNeqRGcLyBlgJnbYBzbYOltR6/GQbcK8J+CnZRCGTBNqnW3IsSXur7rG70KV9dx1nv54JlGQSnJkjOz3B6qsIPKyVO2xY1Q3LMtihXHJLJMmnJPsATvbufW41b7d7XHnbMrn6qcFb6yJUeN/yIa8EhKx8KOGobPFlymKx5RMdqJJNlZJzh3m1j3Nzk3a7PywP/wKUdCr5eFAJZAFvLKGSKXw18rnZ87Fst3IUOIlF5xsyER3B5jtKJBj+qlHjas5EiX5P6rGtxxHMeGGY/WrtjRT647eEtWmP1QqyVPp22z9UgOnQO0RaCy24eOB4fqROeqKM1edjPjU16q11eHYZcCYrlGQpyCoEsACBWmqt+xGu9Ed21PuWbG9jtfH1r5RgE56fJzkzyZK3E9yoeM5YJ42yV05bJrG2RTJZJ6venHe5UGn9Yu99rj3IO0gx7Oc+suRLEXPUPFjZLCE7bJpfKDvZUmehonaxsIdIMb6GDeW2Da+0RLw8CuoeIbcHXg0IgC1AaNpOUX/Z9brdHlK5v5CsUjsN6kqkK4RNzTB6t83u1Epdce/tYE8ER2+KIayMmSqQND2XI7eyXLUHb6eeCKHZ5rnf22Xpta5+DzyGVxmmOMFb6LPcDroUxgwPyswVQNQwuew5nqx7hsQbRsQZoMIYR3u0W0XybNwYBb43CA+MrC74eFAJZQKgVb49C3u75RMtdSneaGP0ApESVbPxLc4hTE3yjWuKbZZeKIdFj8RACPAknHJNGySaZLJNV3Z2h8K55xa3/755v3LvPzv/3Omoecg7yYrrOSo9kvc9HfsTN8OBiuFv52U+WXdRsheh4He2YiEzhrPSwbmxytzniN4OAtaSwIr/uFAL5NSfTmqU45Vc9n8XmgPL1Dey1PiDQpiQ6UiO6MM2RmSo/rHicdSyyTNFuj+h0RmSZwhKSU47FrJMPs9PxMPuB8Jz75xHH8487/x62z4Pt1naRKez1PnK5x51hxDU/JlIPt/wMAbOWwZMlm5maR3S0RjxVBkCGKd69FvrOJm/1fV4ZFGE/X3cKgfwao4GB0vymH/Bhz0fOd3DvtvJlFMZhPf6lWZzjDb5fLfFc2cVE4Psx77yzyDvvLDIcRlgCTtomc65FOlkire9y1DCeP3xof9cc5EP3OaCvwehHmKt9+u08s2Y5OTg/25GCy57D5apHPFsjOtZAGxKUwtocYN/aZH1jwCuDgDthEfbzdaYQyK8xqdbcCWNe6flsrA8oXV/Hbo5yx4xtEJ6cJDs7zdmJCr9TcTlum6RpxuJihzffvMe77y7Qao0whGDWMjnq2Jg1LxdI29wRtH3bHc/1fq99nHZreMzyOD/bPzht0BSCU47Fk2UHb7JMdLRGVnFgq6TafAd5c5MPej6/HvgHzmsWfLUpBPJritKadpLxq67Pjc4I504Td7kHqUJLSdrwCC7NUjna4Mc1j6dKDmhNvx/y1tv3uHZ9jeXlLq3WEDEOoTnhmEx7NslkibSWC862ALIlaLv7OwKZv7Ylllv93FJ8+Dny7UJrrI6PsdpntR9wLYgPLKYrgLKUPOU5XKy4JEfqREfrudhqMHsBzu0m/eUur/dDPhhF23OuBV8vCoH8mpJouBLEvNEL6K318W43Mbs+SIFyTYJz03BqkqfrHt+ueEyaBnGccev2Bu9/sEyrPaLVHtFsDkmSDFvAKdti1h3PQ9a8HUEb62De7vZI5xagvs+zvXefw84BjPOz7bUe2Vqfq37MjeAQZ40UnHdtnqx6MFPJBdLOi23IVOEudzFvbnKjkztsmunDBbfgq0shkF9DlNasxQn/0B1xpz2kdHMTZ62H0LkXI5kuE5+fYWamxo9rJS66Fkpp2u0Rb7x1j3vzLTQQRilr6z26PR9TCE6MHTVZo0RWcxFSoLdTB7c803v7Ww6ag/Z5pH6msTeHyJU+dwchV/3Di+lOmpJLns1c1SU+UiOZqYxFV2P4Ce69FvF8mzf7AW8OgwMzdQq+mhQC+TUkUJq3hhHv9QKS5S7uvSbGMEZLQVayCS7MYh6f4Ft1j29UXDwpCMOEDz5a5srVVYIwASFIMsXKWp9228cQgklTcsSxcCsuaaNE5lrjIfHW0Hh3+/jmIBEC0Eg/xlzv4beGXPMjFqLDnDWSJ0sOT1U90pkq0ZEayhgP6bMMa72PeWuDheaQV3ohy4ecr+CrRyGQXzNSrVmIEl7qjljeGFC6sYG9OUSjUYYkPlInOTvDsakK3696nHJMlNKsrvV4+51Flld6uTChSVLF2nqfVmsIW5kqrsWsZ5NMlElr7q4h8lY2zN45SL3vqoZ75xgffo6920WmsNcGsNrnxijm2uiQYroij998suxSbpSI5upkFXf7/DJK8wXK7jZ5t+/zcj8gPCCEqOCrRyGQXyM0MMgUL/cCPuoGGAttnKUOIkpBSrKaS3BxltLROj+sl3i27GAAw1HE2+8tcf3WOmmmtgVJaU2747PRHBCGCZYQnLStPNxnokRa8/YK3JaVuN3fz0Fz/z5b4viwc+zarjRmL8BY67PZ9bnmx7QOmTt0heDJks2lmkt6pEZ8tA5yfH6lsdoj7DstNtcHvNoLuOEfPLdZ8NWiEMivEYnS3AoSXu36NDcGuHeaWB0/FzvbJDo5iTo1yYWJMt+tuczZJmmqmF/o8N77S2w2R3s8z1pAnGWsrvVpd/J5yGOOyYxjouseWc0DQ27vn//bOX6nv99rn6wvsgx7vY9a73N1HPJzkM1nScE51+LJioucLBMfqaGcfGogP5/CXu4g72xytZdbkf1DRLfgq0MhkF8TtIZ2qvhVx+dWx8e528RZ7Y6XURCkDY/o/AyNuTo/qnlc8mzQml4v4K135rl9r/lAwDZAmipW1vu02iOkIC9/5liUSzZp3SMr2TsCxl4rcKu/I3I7r+1+jz0ieMh2kSnM1hCx1mdhGHHdj/EPCPmRQN0wuOQ5nBgHjifTlZ3zK405CLHvtRit9nizH/DuMDwwzrLgq0MhkF8TQq34cBjyVtdnuNrHvdfE7IdoIVCORXhmCnGswXN1j29XXRqmQRRnXLu5wfsfrdAbBNvCtOU5RgjSTLG+kQuk1hpbwmk3L16RD7PH1X3G++8cnwui3nbM7HXQ7H6PndfvP8c+2xHIMMXaGBBtDrnmx9w9JBvGlnCxZHOp5pHNVImP1NGm3D4/mcJe6yFvb3CzPeI3vYDNIk/7a0EhkF8DMq1ZizJ+2fW51x7h3t3E2higAW1K0ukK6ZlpZmeq/KhR4qxno5Si2RzyxjsL3Fvq3CdEO22mNb1hyEZzgB/EmEJw0rGYca3ck72rcMWD7c4weXex3E/bCqWwNgaw1ufWMOaaf1gx3Xxq4HLZpl73SOaqqK35U5HvI4MEZ6FDstDmrX7Aa/2Q5IBzFnw1KATyK44GfKV5vR/yficgXenhLnaQfowWgsyzCc/OYB+b4LuNEs+VHRwBfpDw3kfLXLmxShSnO06Rfdo01ays9Wm28nnII7bBEddCVj2yqoc2jX2P22r3e+1TtUpjDEPkep9Wx+faKGI9Ptjic4XgUsnmUtUlma4RzdXQciza5Kspms0h1t0mK5tDXu0GLAQHW6YFX34KgfyKk2nNfJDwcmfEanOId3sjn6MTAiyD5Eid7PQ0J6cqfL/uccLJg8JX1/q8/f4Sq+u5pZkHUO8I0e5+kuXzkM32CAF4UnLcMZnYsiLLzoHH7/fap+2LVGFvDNDrPa4N85Cfgww+SwrOuhZPVj2syTLJXO6s2X1+GY8L9N5r8X4v4KVecOD8ZsGXn0Igv8JooJsqXuoGXO8GGAst7NUuMsnQUpJVXKJzM5Tnavyw7vFUyUaiGQwj3npvkZt3NsmU2jVnmDtDtvpi3M8yxUZzQLM1JMsUthSccm3mPJusUULtqQ+5+3i2nTNiT+D4g+9x2Gd4YLvWmL0RYmPA8jDk2ugRiumaBpdKFqcquRWZTlf3nB+tMLs+5nyT9nqf1/shV/0kF9GCrySFQH6FiZXmxijm9Y5Pe2OAM9/C6AXocbWe6MQkHJ/g0kSJ79Q8ZmyTJFXcWWjxzofLbLZHcJ/w7O5vtQoYBQnrzQGDYYQp4KRrMutaZDWPtLq3PuTO8WL8+u7/37/P3vaRtwMizjA3BiSbQ66NYm4dEsNoC8FFz+ZyzYXJSm5FmnmY0tb582D0HvLuJtfbPr/p+HSLsJ+vLIVAfkVRWtNKUn7V9rnT9rHvNbE3+qDyZRSyeonk9DSTszV+3PC4WBrnW3d9Xnt7gduL7X0F6GHt7mG2IQQzlsFR18KqumRVF2Ub+x6nP0V64WEt45Afvd7n7jDixigmPiATxhAw55hcqjhM1D2S6SpZ7b5FyADDj7GXOgQrXd7sh7zdCw7M2Cn48lII5FeUSMO7g5h3uj6j9R7OUhs5CmEc1hOdmsI4WueFeokXay5VUxLFKVdvrPPh9TWGo+gBwTmoTZVidWNAq+MjAFsKjrsm045FWi/lKXz7HMe2Bbn/tk/VAoYfYWwO6HUDrvsJa4c4a+yxs+bJmks6XSWeq4PcWetbC3Lh3Rwg7zXz5Rm64aFOoIIvJ4VAfgXJNCyHKb9sjVhojXDvtTCbQ0CgDYN0qkJ2aooj01V+OOFxxs2XUdjYHPLGe0ssrvR2HCgPae/fnilNszNis5WXP7PG9SFnPIusXkJV8rCZvcfn3fy1rfb+fR5874+zXWR5lXC93uf6MOLKIUHelhScck0uVxycRol0pooaF92AnfOLKMVa6ZAtt3ivH/BKNzxwqYeCLyeFQH7F0MAwU7za9bnSCdArXeyVNjJK8qDwkk18ehpnrs73Gh7PVBwsIQjChHeuLHPt1gZRku7xCDNut/oaHtiudV7+bHWzT7cfYAo47lrMuTa65o3jIcfW4vbxYmfuceypOeg9PtF2pTH6Pmz0We2HXB8l9A6YMxRAxTR4ouxwtuqSTlVJp2vjjbveTynMzghjvs3aOOznjl+E/XzVKATyK0aqNXeDhFfaARutIc58E7ObO2a0KUlm6+gTk5yZKvM7DY9jjkmmFEurPd7+cJnVZn+Ph3j30PL+1+/fnmSKlY0BzT3lz0zckkNWc9FuvgzD/R7oj/Me97/+KNtFqrBaA9LNAdfGc5EHYQnBuZLFkzUXJsokMzWUZex7Xnu9CwtNrnR9Xu74DA8Q34IvH4VAfoXQQDdRvNTyudHxMRbbWBt9yPKwHlVxSc5MU52t8aOJEpfKNgLNYBDy+nuL3LzXQulP7jRJlWZlY8BmZwTjechTnsWcZ5FV83nI/Y7b77XH2iqN0fXRm33uDiKuDuMDy5YZAmZsg0sVh+maRzJVIauXHjyv1sh+iLHYobc+4K1eyEfD+MB4y4IvF4VAfoWIlebqMOLNdkBvc4i91EIOxznUtkF8bAJxpMHlhse36i5TtkGSKm7Ot3j36irtcQjQA0LwiG2mNJ1ebrmGUZpXGd8O9ymhyvd5hA/IxX6sLRoZxMjmEL8bcHOUHJoFY0vBpbLNUzWXbLJCMl1Dy70hP1qM0xo3e4j5TW518rCfVpGn/ZWhEMivCEpr1qOUX7YC7nZ87MVmnjGjycN6amWyU9NMz1T58WSJ8+OwnmbH57X3Frm73Mkf+PsF4GP2k0yxujmg1d0pfzbrWlBxyaoOGLs9wrn1uPv/+53zcfTzOcMhaqPPzWHM9VHCAUbkWNzzYXa5XiKbrqI868HzAzJMMFa6BCtd3umFvNULD8z9LvjyUAjkV4RAad7uhbzf9ok2elgrHYwgz7dWjklyYhJrts43GiWer7mUDUkYp3x4Y40Pb6wz8uP8wSd/8PPm4/fzecg8HlIKqJqSo45JxbPIKh7Ktffsv80B53wsfQ3GIITmgPWez/VBRPsAS08AnhRcLFmcr7ukkxWy6dq+50dpzM4QsdhioeXzaidgNSyWZ/gqUAjkV4BUa5aClJdbAcvtEfZ8E7MzQjO2HieqqBNTHJuq8INJl5OeSaY0a5tD3vxgmaX1PlvW0NaD/0n7aaZYb45odX20BkvAKc/iqGejqiVUxX3w+EPO+dj6aYbZGqCaQ64PY64ODi+me7Zk82TVQTbKpFNVlJkHvMOu84/ztK31HulSmw96Ia90giLs5ytAIZBfcjQwSDW/aQdc7QTo1S7mRg+SFC0FyrNJTk5Rmqnx/UmPpyoOJoKRH/P2R8tcu7tJkqo9Q9JP02Za0xuFrLdGjMblz064JrOehap5uUBu7/85zUGOW7TG6PnozQHzg4hrw+TAYhOGgClb8kTFYa6aW5Fpo/TAebXYctgEyOU265tDXu9E3DzEW17wxacQyC85idLcHsW81g5otnLHjLFV3NY0SGdqiKMTnJss8Z2GyxHXJM0UC6td3rqywnp7tP8D/ynaJNMsbwxodnxMKZh1DOYcE6PkoEoueju/ef85yM+sBUScYnQGhO0hN4cx9/yDh8KWFFwsWzxVd1ETZbKpKvr+zJpxK7IMc7OPXmxxpePzUitgUIT9fKkpBPJLjNbQSRS/bvncbvuYy22M1gCUhnFYT3pyhtp0lR9OelysjJdRGIS8+v4StxbbZGpcNXvrQSdvP00/U5r+KGIUxAigZEjmXJOaa5FVXJS3swzDVkXzbLJKOlVDefa2t/ig9/ikfaE0RmeEbg65PYy4NogOdKiYIk+ZfLLmUKmVyCZraM/Z//xaI/0QY63DYHPAO92Q93oh+oDzF3yxKQTyS0ykNR/0I95uhQw2B5grHYxxDrWyDNIjE5hzdZ6dLPGthseEZRAnGTfuNXn/+hqdQbjXIyv49H0psS2TuakyE+NlXzOt0VojxkKx21rUpiQ90iB4/gzBi+eILh0nOTlFOllBuTZaigff49P00Ug/gvaAVi/kxjBmMzrYWeMakotlm4s1l3SiTDpdfej5yVT+I7XY4k4n4NV2SDMurMgvK4VAfklRWrMepvx602ehPcJcaWP0Rmh07lk1Jel0Fbde4psNhzOlfH3rVjfgtQ+XuLfa3X6wtzyzj6NvmJK5mQrPPjHHkekqmdKshBlXexGdzgizNci964wFxrNJ5xpwdBLv5BTi+bP4375E8MJ5oieOk5yYJp2sot3cstzvPT9uH6UwuiOy1oAbw5hrw4PnCi0hOFOyuFx3seplsskq2jIfen4ZJRjrXcLVDu92Q15rBwdaqQVfXAqB/BKitWaUal7vhHzYCYg3+1jrHUQY56IDaAQCgYGgbBjYUpJmisX1HvdWevjhwcsofJIWIfAci+eemOPi6SmEFAwzzVudkOudAGOjj9Ee5ENOkc+RZlM1xEyd03WX358t80dHKrx4tMqR87OIF84RfPsi4fNniC4eIzk+RdqojMUyf7/7P8MjtVojBwG6PWC5H3G9Hx+YIigFNCyDJyo2x6sOWaNC1ig/eN6tVmmM3giW2yy2RrzaCVk8ZK6z4ItJIZBfQjJgMUh5pRmw1h5hrrQQu1YdRIh8xzAhjVJ6qdpOrZPiwSHr42qlIZibqfDMxVnmpiqkSrMUJLzbCdhojTA3e4hxybUtD3s628CbqvKDSY//zek6/+LCJP+ni1P8r0/V+eMjFV48Wmfu/BHk82cJv3WR8LkzxBeOkhydJGtU8mUR9slwObAFRJIiO0Oizogbg5hbw4MzaywpuFDOrUhdL5FNVtDjNb8fOL/IQ4qMZh+12uFqN+KVdnhgemPBF5NCIL9kaK3pJYqXmz43OgF6vYvZ7CPTbO8DikbGCSpJ6cUZfqowpKBedfHG5bt273+YaB66XQpKJZsXnjzKE6enEVIwyjTvdCNudgKMzR6yM8z/BkFuPU5WkdM1TlYcnq85zDkmriG4ULH4s2MV/vmFCf7lxUn+2ek6f3ikwgtH68xdOALPnyP85hOEz+ZimR6dIGuU0Y61Y1nu9xl39XMrz0e1BtwdxlwfHlxM1xRwxDW5VHNo1DxUvZI7lB52fq2RwwCx2qHZHPBG2+d6fzy1UPCloRDILxmJhluDmDdaAa3WEGs1L4S7PczdanVes1AnGZ04Y5QqpBTUyg4lz9r2wG7t/8Dx97WHbTcMg6PTVZ69sNd6fK8dsNkeYTT7SD/cOZ9ro2YalCarfKPhcqlqb58OtpwjgosVi784VuGfX5zkXz4xyT87VeePjlZ54XgulvK5c0TfvEj09Gnic0dJj0yg6mW0beZj44f9DYAIIugM6fYCbg5i1g7JfnGk4GLF5lLdJZuooKZqDz+/EAilkO0B2UqL652Il5sBvaKw7peKQiC/RGigGWX8qhlwtxtgrHWQnVEe1iPEXtFDQ5ygkoxeogiy3HnjOCalko1l5uW79ojdff1H3S6EoOTmc4/nT04CmmGqeLMdcr3tIze6GO3BznFb1uNMjVM1hxcaLrOOmW+/Dz3+l4uTxV8cr/DPL07wL56Y5J+eqvEHRys8d6zBzIWjiOfPEX7jAtFTp0nOHiWdmyCrldD2uODtfX+DUOTOmvaAG4OYa4PkwEo8lhScLtlcrns4tRLZRAVtmQ+/RhpkGCE3egw2e7zdDXmnGx2YA17wxaIQyC8RYaZ5vxvxbitg2BxgbHQQYbRHrHaGeCDjFBWn9BK1nTFiSEmj6uJ59uHD5oe8fv92aUiOzoytx8kyqYYFP+Hddshmy8do9nNrTQi0IdHe2HpsVHixvtd61ICfaZaDlI/6MW93Ihb9dHvNFwF4huCJisU/OVHlXzwxyb98YoJ/errGHxwZi+XFsVi+eJH48mnis0dI5xp5RSHL3OXgUQg/RHeGrPYjrg+iRyimm08BnKq6+TC7Ud732mxfI6UxukNYaXOvE/BqK2A9OthSLfjiYPyrf/Wv/tX9LxZ88ci0ZslP+TfLAz5YGyDm1zE3uohMPWDZbQcwGwbZdB2rVuaFCYfTZYs0UyxtDLi13GHg517vhx3/SH0pqJRtfvzCKb7/3AnKnkU/VfxiI+A3qwPipSbmahuR5KKgTYNsZgJxcobzczX+4EiZ0yWTVpyx4KdcH8S81Qn5xUbA36+PWPATTngmxz1r+y23EGOrbsoxeKrm8J1Jj6fqDkcck7otcT0bXS8TTdWJJ2v5sg+ODZaRi6TKYzO1IVEVD7PicdIzOe7tb80ydnJJYC1KuTlMwY+RvVEu7Q+5RkJp0JrMsYlKLg3b4FzFxrj/Dyr4wlEI5JcArWGYav5hw+eXa0P6qx3MpQ2knweF74nF22oBpCSbrCMbZV6YcDlXsVFKs94ZcX2hTWdwwPGP2JqGwdljDX7/O2d54vQUqYZbw4T/uDrk5koPY3ETozPIrSop0J5DemIW88gEF2sOU47kxjDhV5sB/351xF+tDPnlZsCNQUzJkPzhkTLfm3Kx5eFiYknBtGPwVN3hWxMuT9UcjrgmNdvA8Wx0rbItlrri5U4d0wBAuTZJxWPOs7hUszEfIl5S5LUiO7Hi+ighCGJkf4RIcifZftdIoxFZhpKSUaWEsCzOlC2mnPy9C764FAL5JSBDc3uY8G+XhtxcH2DMr+dzejqfV3zggRTkxoshyRoVrHqFpyY8zlUtTKA7DLk232K94+9z3KO3CKiUbH70Ym49llyLXqL4xbrPS6sDoqUm5nob0nyNG8bWY3Z8Gu05DFPNW+2Qv1/3+bAXsxqm+VyphlnH5A+PlvnpXJm69fGERIwL3s6MxfLbky6Xa3ae7ugYuK6NruWWZTJRRbsO2rbJHIuKbXK2bDN5gHiJcajVapiyMEoRQYQYBIhxwY19rxX5amqZZeGXXMqWwcWq/UjCX/Dbo5iD/IKjNXRjxa83fG52QvRGF9EZQpqNrZPxcJota2Wnj9b5PGSS0Y0z/FTnnuyKg+daD+z/cfumaXBitsYz52aYbpRItWbeT3mvE9JujZDtPmzNPUqZe66nauhyiVRpNsOMzSgj0yD02POOoGJKvjHh8qMZj5kDhOpREEDZlDxdd/jPT1X5l5cm+T9emuC/PF3jp8cqPHNigulzRzCPTBILg9uDhOuD+EBHiikFJ0sWl+oubrWEalTQ9q7MGva5ZhqkHyE2u7SbQ95qRVzpFWE/X3QKgfyCE2vN9X7MW62QbnuIsdFBBuNga/IHkXG7X19sxUImimAcC1krOXiuve/+j9oXUlIqWbx4aY4LJyZAwyBVvNUOuN0OkK3eeG4uRxsSNVFDT1Tz/GoEeb5PLh5a57k/joAnazZ/cKTEhYq1ffzjIBdLkYvl6Rr/4slJ/g+XJvgvTlX5yazHU3UbjebOMKF9QDiOAMrjEKSzNQddLaFrezNr8h3v6yuF7AxRa21udXxeaQZ0Dnifgt8+hUB+gVEaNsOMX28EzHcCxEYH0fdzQRHjB/CgFiBJUWlGJ1KM0nxI7o0rfFvjlfoeOO4RWsOUnJyt8+z5GWa2rMdhwgftkHZnhOz0EWGMFqBlHveYTdVQ5VIujnr8R+gtf4bAAE56Fn8wV+b5hoMQ4sA1rD8NAqiYkmfqDv+LMzX+5eVJ/vdPTPAXJyoc8wwGycO92YyH8GcrFk82HGS1RNY4JLNGCDQakhjR7uE3B7zXiXi7HZF9Nn9iwWOgEMgvMEGmeLcd8n4rYNQaIJs9RJSLzr4P4H0tAHGKijP6cUawHeojqFcdPO/BjJpHaZGCSsnmhYuznDs2gQb6qeKtdsjtTohs9RADf+c400BN1FD1Kki5Sxx1HtcDCK2Zsg1+NOvxnSkXz5T4qeL2MOHDbsR6mB6Y6fJpEGOxfLbh8J+dqvGPT1Q5UXq4J5uxs2bayTNrZqouulZGl90HrtX9LUoj+j5qvc182+fVZsBqUIT9fFEpBPILSqo1y37KyxsByx0fudFGjHZWHdwKIzmwj0YkW3OQuQXJlkCWHUpOvgjVQ49/SN8wJSdmazx7bobpukeiNHcHCe+3QjrtEbI72InPlBLt2KjJGpS93LG0PbwWAAgNVUPyzUmH350tMeeZCCBV8H4n4v99p8//cLfP36/6fNSN2AxTks9QLC2Re8QPwxJwrmLxZMNFV8rjH4D9r9nuPmmK6AxINrt81Il4dTMkLszILySFQH4B0cAw0bzaDLjeCchafYzuADH2Bu9+4A7sA6QpKkkZxBnDVJFpkFJSr7iUvLGj5mHH79OXUlIt2Xzj0hznjzfQwCBRvNUKud0OEK0eYjDaEQRT5vOO9QoIuT283i2OthBcqtn8wdEyF2s7844VK7fqypbk3y75/N+vdfh/XO/y/50f8A/rPld7Ma0oI/2MxPIwTCk4Uc4Fslz10LUK2nqEawoIP0BvdllvjXijFXL7kGIZBb8dCoH8ApIozd1hzOsbIZsdH7HZAX/HMfNQT+k+/fyEKWmcMYgVUTYuWlF2KLnWA/sf1jdNyam5Gs+cnWaqNrYehwkftUO63RGyN0BECZrx3KNjoyfq6JKXS+KWOOo8nMcQghMlk58dKfHchLMneNoUcKps8YNpj7Nlk2Gc8f5mwP9ws8t/81Gb/+e1Dv/j/IBfbQRc78d04mw74+bzQIyzei5ULc7Xc2eNqpUfuGb79pWG3pBko8P1TsDLm+GBJdcKfjsUAvkFQ2tNN8p4aT3kTidAN7uIfp5vvfsBe9RWQ56TneY52X6Wh/rUyw6eM56D3Oe4/VqEoOLZvHhxjvNHG2it6SeKt5ohtzsBsjNADP2d/Q0D3aihaxWElOjd4Tw6z0jJ5x1LfGfGo2w++HV0DMELky4/mvWYsgyIEugMGK52eHehy39/vc1/82Gb/9e1Lv96fshLGyE3PkextITgdNnicsPFrHjoegVtGA9cuwdarfNpiHaPbnvIO82A99tRsTzDF4wHv5EFv1UiBR/1Yt5u+vS6I0T74zlm7m935iFTelGGn4xDfco2Jdd8YJ7soHbLenz6zBSTVZdEw51B7rnudnxEd4COxkV7pUS5dh7aU/K2vdVbAiDG8YkvTDj8eM7j6EPS+wRQsyXfm/H45rSLYwhEb4C8s4i8uwTLG3RX27w53+G/u9bm//phi//2eo9/szDiN5shtwYJ/UR9Zt5wKWDSNrhYs5mr5nORlL0Hrt2+rdaIwYhso8OdTsgrmyHNqLAiv0gUmTRfIDKtWfNT/nJhyPvrI7LVTWS7B9k4KHxL9Pab1zqo79gYjSrTjRKXGw4zrkmqNB/Nt7i73ifblZGz7/Eij3tslB1+8uIpvnf5KK5l0I0zfr7i89rKkHitiWh3YSs33DTQkxPomUmw7Xx4Ddtzj7YhuNxw+PNTFZ6fcJC7htb3IwWUrfy3fClQtGJgFCBaXUS7h+wNEUGEjlOCKGVpmPBuJ+KddszCKKETK/xUk6jcQWXJ/O97XGz9TetBxt1hAlEMIz//QTjomgJoBRpSxyZxHSZsg7NV68DrUfD5UQjkF4gg0/x6PeQflke0N7qI9SZiHBTOrgfr47UCLBNRr1KveTwz4XC0ZJKkilsrXe6s94mSXQUvHtLapuTJE5P87BunOXekTqLhSjfh50tD5te6iPUWYuTn+0uBdh2Ym0Y36ggxHl6LfMxvCDhRsviTkxW+P+vh7jO0vh9TCuq2QaDgXqTzkKUgzItgpCliFCC6fWR/Ryz9OGVhmPBOJ+bdTsLCKKUb5RlFqcrPaUmRf65PgRBgSfL87H5KFMUwHIFS+17LPS0CkSmUlPhuCcM0OF+1adifLoOo4PFQCOQXhHQcKvOX80NurA/RaxuIXp5vve+D9XFaaUC9ilct8/ykw6mKRZIqFjYH3FrtMQyT/Y8bt0IK6hWXn7xwiu89eQTHMunEatt6jNabyE53RxAMAyYn0NOTCDv3Sm9pkCEEk47JT46W+dmxMlPuowmBAGxD4hmSdqxYjkClGcIPdq4RuddejHxEbyyWYYROEkZRyr1BwrvdhPc6MUujlE6c18nM9FgsxScTS0Fe5SfOYGmUsjJKEVE0DnXa/5ruacmr/SjTJHI9KpbkQs3GfIRQo4LPlsN/ugs+czR5mt4rGyG3OiFZtw/9ISj14OT+x221hixDpRmDOGWYKJQGwxA0Knks5L7H7WpNQ3J2rsbTp6dolB0SpbnVzz3X/d4I0R+h41xkt+Iedb2K8LbmHncyZkqG4PlJm9896nGs9GjiuIUp4EzF4vtzHqenSjDZQNerO2vSsOuza432g9wKv7OIuD2PWFwlXWuyutrl7+92+W8/avN/+6DNf3ezy98sjni7FbE4SvGzsUPsY2AKwamyyZMTLnbZQ1dzZ80Dn2u/duyw0Z0+G50Rb2yGXO8dvNJiwedDYUF+AUgyzbVuzF8vjLi3MYS1DRj6Y8tobEUc1kqZW25inKGye7thoCsVrGqJpyZdzlVtDKAziri62GG96z94vnErpGSy6vKzF0/x3SfmcusxUvx82ef1lSHxegu2rEfI32uyAVNTYOcB35pcJG1Dcqlu8+enK7ww5fJJDKStobafwXyoCVKFCAJI0gc++3arNSQpYjhC9AaI4RCiGJWm9KOU2/2Et9sRH3ZjVvyMfqwIs/yHxJIC8xEsSyHyqYNBorgzTOkFST49Mv7h2N7poFYrtDQJ3BKOKXmibuEahQ3z26QQyN8yWkMzUvz1woi314ZEGy1Ep4veFRR+aCsF2rYQ9WouRuMFvHa2Syh5WJUy5xoeF2oWnikYRQkfLLRYbo32P+947vGpU5P8/vOnODNbI1aajzoxP18asrDehWYrr8q99Tk8B2amoFYFIXPLUQgMAcc8k//0ZIUfzHl4xiGK8xAEYEuJawhaUT7UztIMEYZorfb9G/a0GnSSIIY+9AeI4QjimCzJ6IVjsWzFfNhJWPNTerEiGodYWVIcOOwVY4fSRqi4PUjQcYzw87CnBz7H/S0CPf6RSWyHzMqdaScrJuIwdS74zCgE8rdMmGne2gz528Uhq80+YrOJDoLc8trvQdqvNU2YmoCZaUSSosNw7/FSguNgVcucbLg8UbdpOAZxpnj/XpO7G4N9zyukYLLq8tPnT/KdJ+ZwTIPWtvU4IN5oI7p9tBoLk2EgJiZgahIsOw8xQiCFZsI2+L2jJX52osTMQ+YdozRkY7hCkPi4Zgkp9reeDAFVK481XAoUnUTnYhTn5cO2/wYp0VLm/f1ESmt0nOQi2R/AaARRTJakdMKUm/2UdzoxV7oxa0HKIFFEmUZvWZb3iaUUudOnEymu9VLCKMm92Uo9cG33bQGtFFpIfMfFNg0u1h0qYw9+wedPIZC/RbJxvvVfzg/5cGNIttFC9/qgMth6cBgPwfb083/bolSrwtwcwiuhfR+CELasKcZmjW1jVqvM1j2ebDhMeyZppvlgvs2djT5qK9Rn1/lt0+Cpk5P87PmTnJ6pEinN+62Qv1scsrTRRzRbaD9fjxspEa6Dnp5CVGvkHzsXEM80+Ma0w5+cLnOhbu+6AhAkI5IsZhD1WOre5XbzComKma0cxZD7CyljZ0/NkvlQO9C5cIURIst2/gbDQHheHoc5LpIhtupj7L6GjE35OEYMR+j+ILf84oQ0TmkFCTe6CW+3Eq51YzbCjGGiiNT4OkmxnQEkRO5wWw0yloZJLtrhTiTC/df4gXuc+2tQlkVsO9Rtg3M1q1ie4bdEIZC/JbTO861/tRryq5UR3WYX3WxBlBd52Hpg8qdm5wEaP1VjURJQKiHmZpC1ar4tjiEIIMtFdnt/00RWqzRqJZ7eHeqz1uPuRp8oHYf6jPcXUjJZcfnZCyf59oU5bFPSCjP+dsnnzdUhcbMFvf7Ycz0Wo4kJxORkHlaUnwxLCi7WLf7sTJUXp122RtZKK4JkxO3mFdYHiyz37nK7+RFxFqF1hiFNLMPBMvLc5vsRAhxD4pr5UHsl0qg0QwfhzhysyK8P09OIWg1ME7Fl9W0Fju93jVVelozhEAYD8EN0kpAkGS0/4VovF8vr3ZjNIHd8xePL4EiBY0haoeJ6LyWNk9wyzecaHryH978/gMrQUhI6HtI0OFs9uMJ5wWdHIZC/JTKtud1P+Kt7Q25tDsk2mjAc5h7N3UPCh7VCIBwHMTONOzXJkaqDFBCFMfh+Ps+2e39DIqtVvIrHc1MOJysWSaZYaA64tdZnEOzd3zYlz5ye5PefO8mpmSqRgvfbMb9YGrG80Yd2G8J8PW4hBLguYmoKKpW8rzWGEBwtmfzxqTI/OOJRNneEbhQPuN36kBub79EcrdINNugGm9imjWmYLHZvEmYjJkuzWDJfgfF+DAE1y0BpWPAV3VhDkuR/O+RrwagMLAsxOYFoNBDlMljWjkNra7/9rjHjYXgU5ZblYADBllimbI5SrnYS3mpF3OqnNMOMYapJlSbMYDXI6ARp/qOX5PnpD5x/v1aPw36kSWR5eJbkYt1+pApDBY+XQiB/C2idBxX/h4URr6+OGDW76E4Hkkf0eApyK21iEndmhstzFX7vWIkg1awO4txiicdhIuPjhJBQqWKXSzw37XK2ZuULePUCrq/0aI+i7f2FEExVXX7/uZN8+8Islilphhk/X9yxHnV/y3rMveSi0UA2Gggrj3uUQjDhGPz4WInfP1FmztuxgFb791gbLtAO1ljq32AYt3EsB8/2MKWkYleJs5BEhUghEULiWuX9RVIKarbBKNXM+5o4y3LhzjJg7NFXCmFZCM/DdB3sWhVRqaAdB2GO17UeixI85JqTVwQnivIfssEwf580IY4z1ocJV9oJ77Ri7g7y+cp+rOlECh0n+dTHFvef9/6W/L20gNh20abJsYrJ0UNqVBY8forZ398CsdLc7Ma8tRHS6vnoXhfi3etbb/17SF8aiGoNa2qKk1Ml/pOTZX54xGPKMzFtC0zjwePR6DQlitNxVR+NFIKaZ+M5e3OyLVNy4Widp05OUPVsYgXXOzFX2iGjwQg9GkKWh9VsOYBEpYpwnHyeD3Cl5JkJm390zONkZe+DvTla5lbzXTId4dkOVbfKZHmailum5HrEaoCUCWHaZX14jyAZoNEonZGpNK/MPUYCU47kd+Y8np8rYdXrUK/vXANARyG610MEIY4hOFuz+eaxGmdPz1E+fRJ54iRidg7RaIDnja3LA+4BQJqg+z306irZ4gJ6ZYWsuUmv2eHdxS5/Pz/gVi/OhblUQjj2w8+3Xx+N9n2STpfbnZBX1kK6UbE8w+dNIZCfM0prmmHGS6shS938wVVBkG8U5EMssTM/9UBfSkS5jDE1zcxEhZ8cL/OtWZcJx2DKMSjZVu5BHj/kW8drQKcpWZrRjdR20YrGuOzZ1vmllExUHL51YZazszWUhk6keHszYqETogcD9PY8KQhDIqpVRKk0XmEmjxs8WzX56fESTzR2nDK9sEU32KThTYHI2PTnMQxNyXExTYGUGk2MEhFB1iXMekipGSRNWqMl7rY/5F7nCpnaW4HbkoKLDZvvH/E42igha3VEqZw7ZkQ+TFbDIVmvSxanzHkmf3a2wv/qUpXfP13hmZMTzJw+hn3qFPLoUcTUFKJSAdsGmVvUD70ngEgSVL+HWl0lW1xEra2gWk10v4+KIoRlQylfs+aB4x/WZ1zLczhg0B3yfjPi7c3oc6lQVLBDMcT+nAkyeG095O8Xhqy3B+h2CxFF4/mncVD1+AHZr8V1MWZmqE82+OHxMn98usyxskmmYWWUcrsbMxgG6DDYzsTZegCF7WCVy5ysuzzRsKk7kkQp3ptvjUN9wLEMXjgzzc+eOcHxyTKR0rzbDPnF4ojVZh/dae/6vPk8qJyYgnI+BDaE4EjJ4I9Ol/nh0dJ2kQmAe50rLPVvIQSEaY9YjfCsEoYhSVVAzZ2k4tSJ1YCKXafi1OlF62yO5umGm2yOlogyn6nSUWzD3TPkNoSgYol8qB1AnGa593jrGpAPW5VhMpI2057BT06U+Z2jHk80bCZcE9c2ka5HUqqQeiWEacF4nRmh9Xh++IB7pPM5Tx2GMByghsN8qkMpSNN8LvOg4/f5DqAUSkhCy8U0DS7Ubap2Ydd8XhQC+TmSaVgapvzb20OubYxIW818uLpd1GBrnDV+UgQ7fSkRtoWYmMSbnOSFoxX+/GyFCw0bIUAB3SjjRieiOQjRYYDO0r3ns2ysSoXZmseTE3Ye6qM07y+2ub0xACGYrrr84fMn+da5GUxDshlk/Hx+xDtrQ+J2Bz0cbH9eYRjI+gSy3kCYedZM3ZL88KjH758sc6RkjIfEira/ykr/NlE2pBMskxJiGhLD0JTtCrEeYEiBa5YI0x4T3hEmvWNoMiCjF64jkATpkEwlTJdPYMidobsQ4BoS2xBsBoq1SKOyDB2F2/swDgFKLYdQmEw4BmdrFkdKJk9POjw7ZXOsbFFxDCzHRnllEq8CtpNb5HIsTLvnKnffo/vvoVIQhejhEB2HedRBvuOjHQ+591uDMi0S06FqS87XbYzCYfO5UAjk54QeL03wi6WAV1Z8uu0eutdBx2OrYtfQ6oG+BAwTWavjTM/wxGyVvzhX5blpB2tXRkqQwUetmNVBhPZH+TzZ+HwIgTBNjFKZRtXjqUmHI2WTOFPcWu9zZ7OPFoytx+McmygRKc3bGxG/XBqx2hygeh10FObnkwLhusjGJLJcRgiJY0iem3L407MVnpjIS5wt9W6xPlzAT3r4SY8oGxCkPY7XL9HwZlgefsQobeKYLpZhM0g2cEyXM/VvMFU6hmWYZDrGlDZCCuIsIFMZVWeSTCXEKsQaW5OGFFRtSaZhYaQYJBqdxOh07NUW4xAaIfENByElJysWk66BFPkSD2frFi9MOzzRcGg4W1alS+pVyNwSmFaemSTF+K5uWXyH3MPt/R6y/aC+ytBCEJsewjQ5U7WY2uX0KvjsKATycyJVmpudhL+6M+BOc0jWaaGC8brRY8+xHv+f3fNQQiCkgShXsKdnOD5V40/OVvido3nVly3E2EL9qBWxMEhQgY+KtgKU8/MLKZGVCqVSiWenbU5WLVKlmG8OubPRx7VN/ui5E3zzzAymIdgIMv7jwoh3VkfEnXY+ZBzHGArDQNYa+XyfYWJKwbmaxZ+eK/PirLsdkrLSv8va4A5RNkCREKZ9JktHuDj1bWzDJSMg0UPqzgwnqs/iWA6mNKna0wB0wiX8tItpGKQ6whAGnlWlHayxMVrENjxqzuR21o0lBVVbMEw1Cz4kmUJHUZ7tA+OCvRotLYbCwrEkZ2sW7jgESYzPMeMZPD3l8MyUzdGyRcU2sGwL5ZVJ3TLasvMqSeO/U49nYB92Dw+7xwduJ1+iQUuDyHTzPO2Gg/0J0zULHp1iMuNzQAPdSPHyasB8LyId9lGhnxdL3XoQxPjpFPkDst2XAuF4WI0pJmtVfnisxHePuNTvm4cSQlAyJZOuScmywDDH82dbD5pGq7yqzzDKCJI8Zc4QeSHcRsXlqeMTPHV8krJjEmWaK62I682IYOijgxGodPszYTvIUgVhOUgEM67B7x33+MaMh2sIukGTpd4t/KSLISVx5jNMWjiWjRYxq6OrDJNNHNNBCR8lAqr2JDV7Bl+t04puYUgT07QwJOOsmgQpQUpBrHyGSYdR0kWzU4VbCpj1TL53xOOpaQ+zWkVWqghDbnuHVRiS9nu0+z5vrIW8sxnuWSVRKY1SGkPAkZLJT0+W+N8+2+B/9/wEf3G+yndP1DhzYobqiZOYR05gTM1gVGsIx0WMr/mee3jYPT5sOxqdJmSjAe3eiHc3Ij5sRdsj/YLPjsKC/ByIM827GyH/4d6I5daQrNvamRsbWwtbVsTevkRYDubEFOWJCb5zvMyfnitzumblz819pFqzPEy4040ZjsL8PcYizDi3WrhlbM/j8pTL2YaFFND1IzaHIS+enuIbZ6YwZD6P97fzPu+tjYi6bZS/13o0qg2Mam491mzJ9495/MHpMkfLJlEacLv1IXc7HzFMOggBliHRJBhSEqkBioiUEd3kLo7hMe2dpWxNkjJimK5hSZcJ5yT9eI1EDzlefYaGe5QJ9zipihEi/+UJkhHDeEA3aFKyq5jS2h5qpwoWhopByvZQe/vArZxnaedD7arFxDhHPEoyVrsBG/0AQ0ocM5/bnPUMnpl2eHY6n56oWLlVqd1dVqVh5Nk6u8XrwHv8iH00aIUSuRVpmZKLEzalRyg2XPDJKQTyM0ZpWB2l/NXdER9tBITdFsofoLeWURg/B3m71R97nU0To1rHbUzy9FyFv7hQ4fKk/dC8XKWhFSpudBLawxAVh+OqQOPnVUqE4+KUSpybdDlXt/BMSao0jmnwxJE6R+ulvIDGesgvl3zW2n2yQXc8V5rHPQrbxahNIL0yjiF5ZsrhT89VeHIyn3dsjdb4aOM1RnEX17QRUhGqHkHWpuzUsA2TlBGJHhCpLmW7xpR7Ci0TUnzq9lGkFICiYs5gSgfPrAOCVIWE6ZBNf54wHREmPsvd23SDFlOlo1TsOlJITCmo2IJBrFnwdT7UjvM0xFy7FFrr3Kut8+twtm7hGIIgyXhvsc3Pr66w1PWJU4VA4JgSy5BULMm5usULMw4XGjYN18C1TKTjkbplMruUB6CP61Si1XgQft893tPu8x24f/vYUFbSIjMdGk7+mYvlGT47CoH8jPFTxW9WQn616LPZGZD12/mDuvWl3rcdzxeWq7iT05yervJn5yt8c849cHkCDfgJXB07alTo51YT+XmFEAjLxvZKnGx4XJywqdkS2zCYq7nMVF0MKdnwM34+7/Pu2oi42yHbsh4htx4rufVoWRZnaxZ/cq7MN+d25h2Xere5sfkWQmqESLFNm2O1C4ySTUbJBkJmhKpD2a5Ts2dQIsCUFpHukqmASecJItVmlG5Qt09gSZdUhfTjdYKsiy3LDKImftJHa0GiEizDperkYUKmtJFC4Jm5UK77io1Qo7IUnWwVotXjeUlBajjEGEx5BscqJo6RH3d9rc//9O4i7yy02OyH+EmGQmMZEtuU2IZktmTyzJTD01M2R8sGZdvM5yqdMplTBstB7E5r3D0u3vfeH9AyzrBBEBkuhmFyvp6HaxV8NhQC+RmSac18P+Wvbg+53vSJuy1UOMqtmPHIadtTuTWSEvlEmnTLOBMzzE5U+YMzFX58okTjkIIFYrejpp+gghEqGVt+W+c1LWyvzGzV5dJkHupjm5KSY2IZkjDTvLke8cuFEevtHumwC0m+qqKQAum4mLUJTK/MtGvws9NlfnTCozZ+SNf6C9xufkA7XKNkl5guH2HCm6Ni1zENgWGalOwqFWsSx3SRBgiZYUqTRPfQxJTMKaSQaFK66QJh1sEzc0eMn3YpWRM4RhU/6eKZNUzpMoz6DKI+E94sVbeBEHKchihJlGZ+qBnFCp3G6HGguUaPvdoGI2kjkJyqWUx6BiXHxJSSpc6I62t9rq/3eXexzZ3NIf0gIcnymEh7bFVWbcm5hs3zMy4XGhZ1x8g94I5L5pRRtofY8oBviSXjuMr9vgO7+ru35z+DeZ52Ih3KlsGFCeuB0msFj4dCID8jNNCPNX83H/Dask+v1yMb9vLQmz0PxO42txyF7WLXp2nU63z/RJk/Olvm2H3pevshhCBTmuvthPleShT46CTaLsaAELnH2SszUfF4asphrrxzXqVh3c/42/kR76+NiPpdVDBCk5dOE4aBUa5jVepUXYvvHnH5wzNlTlTzcyitWO7dxU8HaJFRtqucnriMZ1bY8G8QZUOOlC8y4RwjUJuMslVK5gTIhEi3kNJAi4xQtcYVyKu0ous0o+tUzDmU1gRpn6o1iwIMaSKFjZ/0CZIAx3A5PXGZilPP/95xrnbJlAwSzdLYq63iYKe47jgHW0uLESbeONTHMw1qXl7Q405zyDBKiFLFUtfnvaUOH6502ByEBElKpsEy8iG4bQhmSyZPT9s8M+0yVzIpWwaWbaPtEqldAiuf98zFkr3D7y1v9gPfjXELeeVxBInhgjQ4UTWZLfK0PxMKgfyMSDPN9XbMv7s94l57RNJvoaIgfxSEgPu/+GMLTRgmZmWSUn2CF45V+LMLFc437J0Y40NIFSwNMu52Y0Z+kFuQeqdgK1Ii3TJlz+OZaWdb3BgX731jLeJXCyPWO32yUReVxuPjBNJ2MSuTuF6Zp6Yd/vGFCpen8kB1gPXBEvPdGyRZTJQNKdsVjtcvEKkBC/238bM2hgGuWUER0Emv5zGMMqOb3iDRQyrGCRxZI8ja2LKMBhI1ZMI+D1oySDbItGJ1cJ1MpUx6JxjFPTyzimvmJd/q7uR2BSApoGRJDAFrfkYzGg+102QnNGcc+J5Kh0wYTHsmxysGtpmnbvbDhHvtEanKf2gyrekGCdfXe7yz2OFec8gwSokzhRQCxzS2rcrz47nK8w2LuiPzuUp7bFVaHsIw80IiIp+EFOy/VOz9Iqm1BiGJpIttSp6YsHGKsJ/HTiGQnwFaa5pBxt/cGfHOms+o1yEN+miVbX/x92uFNDBLNdz6JOeny/z5xQrPzjjYj6qOYyuwGaTcase0R1FuLand67VIDKeM43o8N+Nwpm4hxNh6HKX87b3ceowHHdJoOD4m/2xGuY5bqXOq4fAn58t8+4i7Jxav5W+y2L3FxvAeqQo5XjtHxa7TDOcZxOvYpoNlmASqia9aWNImpc9G8gat9MM83dA6jSVLDLJ5YtXL1UJLHNnAFCV68SrdaBVDODScY9hGBYVmtnSKOI1ZHSxScyapuzuxkVtebT/V3OsrwgxUGo3vB+P5yAwlJD42piE5Vc+92iXbxJCC5a7PxjBPsdy6ZxpBmGYsdQPeW2pzZbVHaxQRJlm+no0x9oCbkrmyyTPTLs9OO8yWTcq2iWnbYJdJrTKYNsIw8pzs/CONvxf7fVd2rEhlOihpMlMyOFktlmd43BQC+RkQKXhnPebv7o1Y6QxJRx2y5OA8XKTEcMs4tWmOT1b5T89X+N6xvcHgj8ow1lxtxaz1I7KxQG55QoWQSKeE43hcnnY428jnr4JU8fpaxK8XfDa7fVK/i852ahhK28UpTzBTr/KzMyV+fLL0gHOgZJUxpMkw7qBIsQyTVIconaDJMA2T2dIFKvYUg2SJQK3Tz27SSj8kVl2m7KcoGXOsRq+yGb9LqJqYwkPioLXAFCUEJgKJZzRouCcYRB1W+rdwzCpTpeOkKkMKyXR5DkPkgiHIc7VBsOYrVvw8r1on0fbwFvKUPi1NfGVSMiWn6xaeZVBzLZJMc6c5xE+2ruXee5hpTXsUc22tx9uLbebbQwZRSpIpjLFVaRqCii05P2Hz/KzL+YZFbWxVGrZHZpfQlouQZp4+tSXee2qEbn2HQI9FMhIuliG5MGHvyX0v+PQUAvmYyTSsDFL+6taQKxs+waBDGu54gXcsuV2tkBiWi1ObZqpe43dPlfnpmRIzH3NZVMbGRaI0H25GLPVTsthHpePqO+TvZ1guruvloT4NG8eAtVHGf7wz4oP1EdGwQxaNxsO4fO7RLNepVOt861iZPzpb4mQtr/t4PxuDRfpRZyyKKakKSHWE0jGh6uVDasAyXDIdsJm8R6g2sAwPx5hAkzDIFgnUJg3zEmV5HLSkbp2hE60QKZ8p5zzdcIPl/nWiNMAULkmWEiYhJbvGXOUkNWcSQxrbFpWUAscQNP2M292UDIlWKSrd5dXemtuTDim5h/pY1cQ2DTzHpBskzLdHZONbud+91GiCRLHY8Xl3qcOVtR6tUUKYKpTWWKaBbUocQ4ytSodnZhxmSyYlS2JbDtoaD79NG6SZr60z/ox73m/8mpYWmbCoOQbnJoqwn8dJIZCPEa01fqL59VLASwsjWr0hyaiLyuKHDJXGc3umhV2ZpFZt8O3jZf70YpnT9f2DwQ9DCIHWgmvNmPl+QhyNUMnO+wspEJaD43icrLtcmLCwpOC1lYiXFnw2e33SoIfK8qBqIceCWpng5GSVPz5f5vm5naUTdqN0RpCOWOnfJUgHOJZDogIyHTNK27hmhQn3CIN0lUj1mXTPIYWkl9zGllUUMWV5lKp5iiDbpGwcR2iPMBuQqoxMJVStI9Sd42gN3XCd5miVujvHtHeSJEuZq5zgzOQlLGNvFXIxLuIbZZqlYUZzHKefD7XHUxB6VwC5tjENg1M1i4YrqdgWhiFZ7Po0t4sLP+SeinxbqnKr8spaj3eW2ix0fIZRQpIppBS4psTcmqucsHh+No9NrdoSx7IwbA9lltGmgzSMnbnKLaFkZ6gdSxcpDc41LBoPWRSt4ONTCORjJNNwt5vy17dG3Gr5RKM2Wezv8iKPrYzxZHtunZmYXp1ydYKn58r8+RNVLk05+wrQo5IqzeIg5V43YRiEZGk+lGT8vsKwcNwSczWXC5MWcQZ/e9fnw/UR4ahDGu3KEZcGVqlOrVLnd06U+eEJbzvj5H6kMKg6DTKd0g7WWRvewTJsXMsjzPocqzzJtHcGS+ZFcVMiHFljlK6jdIIlyxx1v49nTLMSvE6cBUhclJKYokTDPo2BR6Yy6vYRhDbIVIYhHILEp2I3OFY7t8eLvffz5SsRbowy7nYStDDQWqHScPsebaUtamERKJOyLTldN/FMSdXNi3vcbg7wkzzQ/8F7+mBfI/CTlMW2zztLba6s9ej4MVGaobTGNnasyiMVk2dmHZ6ecZgtGZTtsVVpllBmGWHYaEDrbHxPx6uQCYNEOnhWPtQulmd4PBQC+ZjQOs+3/tu7Pm8uB/T6PdKwh9IHrG8tJaZTplSd5sxkhX98scKLR5ztwgmfFKVgY5RxqxPT8UNUGqL01gMtENLEtstMlF3O1C3u9ZJt6zEJ+2g1DkWSAsN0ccu59fizsyWennEOHMJJYTBXOYlAEGUBR6pnqToNJr0TTHrHSZRPkHYZJpsM0zWEkMRqSDdewKRMw7qAK2foxsv0og2iNCJOQibs8zTsM3SjNfrRJkHi04/aVKwp6s4crlXhROMic5VTD10NUYg8HGcYK+Z7Kf14vDSsSlFqPN86DlcCQYJDhmSuZHCkYmAbEs8y6AQJC12fbGtucL97+5A2U5qmH/PRao93ljssdnyGUUqa6Tyt0TCwDEHNyYXuuTmHcw2Lqm1gmyaptImwUColy2IE47lILUiFA8LiWNXgyK7wrYJPTiGQj4lYaT7ajPmb2yMWOyNiv0OajpdE3W8IJiWm5eGWp5mrV/iDc2V+eNJ7LMMjDQxjxbVWzPogJkvD8TCSXAKExHRKlFyPSU9yrRnz0fqIMOhuW7xb1qPt1qlV63z/ZJkfPOLni7OIxe5NNkfLaBSeWaZs1VGk+EmbZnCPMBvgGhVKxgSGcBkk68RZiCsnmbAuICmz6n/IKO4z4z7DMe9FJtzTJFlCO1ghyWI8q86x6kVmK6e5OPUiDXf6oWtpbyHIF/vaGGXM91IQBiBQ49UU82s0znvGwFc2lmFwum5Sdw0qTj73Ot/2aft5AP0D9/YRWo3GTxTznRHvLHe4st6n7cdE2dZcZe793rEqbS5O2KQaloeaOFP5fdVbyzAoNJIEB9uQPDFp43zKH9qCQiAfC1rDpq/4m1sjPlz3GY26JPFw/KW9f8W8vC8NB7c8xUSlxvdPlvmj82WO7opJ/DQIAYmCK82YxX5MlgS5tbH1OaTAtMto6eDHmqV+wma/TxL1t/dD5NajV2pwcqLCz86VeGo6T+E7jFQlDOIe99pXSLKAVIV0olU8s8IoadGJlihZE5yqfosT5W8w415Ga8lGcIuKeZQj7vOYoowfDyibR3hh6n/JhfrvUbVmibIAW7qcqD7D8eoljlQvULHzzJlHQYrcWdMNFXe6CUEKQhqA3p6K0GPPMWi0sAiVQcXOQ38cU1JzLaJMcbs1IEwffo8fpY/Ig9dbfsyHqz3eXe6w1PMZRSnpeK7SMQ0sKag4kpJlsDHKWB4o0IoszRMBEPm8pBI2GSaTnsHJuvlI96vg4RQC+RgIU80bKwG/uOez1hsShR1UFo8fgPwLuv1ASIk0LBy3TrVc5/mjZf7xExXOTeaVdQ4iVZpepGCcufEw8vcSXNmMme8mxEmQW0jkD6QQAsP0UMKhE2n6QUQYdkmTrZX3BHJsPdYrdX7wMaxHAFNazFaO0/Cmmaueoe5N45glKnYD2/CYLZ1nxjvHlHuaCeckFWuWNEvY8G/RsM8x7V7AEC5RGuLIBpcaP8U1qgghqDuzzJbPU3Nm8Kz8tY+LGPtj1oYpy/0UIfJcaa0SlBrnro+tSI0g1uOhdsVkrmzimBLPMukECfMdn61KaTuid989f8Q+CIZxyt32iLeXu1zbHNAL889TdkxKtknJFCSZ5nY3I0gV2Zblmw+2cy88LqaUXJi0qBTLM3wqCoH8lGRas9RP+cvrQ641A3y/Q5b4+WT/2BITIp9/yv9vYDtVyqVJLs6U+fNLFZ6d3VsZfD9SpVnopby1GmGb8tCK0kmmme+mzPcSRmFIprYcNXk6o2E6GIaLUoIoHhLHA9TYm7s191gqTXBmbD1ensnX3f44THizTJePMeUd51jtIpPeCWbL55grX2DSPYln1rctv0HSZBh3qNsnqDvHcY06/XATQ3qcqX0HU+4s/vVpkUJgG4JWoLjdTogzjRT59cyyGD2er80jJDUaAz/L40XPNvJwmqprIYTgXicfau++xzv3fCtrau934NDtCFKl2RiGfLTW5057xKTncHayjG1IbFPQjzQLvXw4nmUR+afNPy/CJCWPiTw3kZd/K/hkFD8vnwKtYRRr3lgOudWOCaIRaeqj2Jsxsy2OUmJaJTx3giPVEr93usTTM4fPFSmtWR9l/PyOzy/u+jRHebDyQRgSpkoGVVsiDRMpdy0FCyiV5R5clZImPkrtDgUysO0KVcfjuVmb8xPWp/KqG9LEEGZeq1E8ZBpBSyrmMer2CWxZQWgTrUxMvLF19PgQ5OmHT0zanJuwEeQ/XJZVxrKrCGmM7xmkKiaKh/SDgPfXIt5cCQlTjWNKnjvW4HfPz1L3rAfmIh9XP1GKe50Rv767yVLXx5BwrGLy7aMuJ+sullXGtLztDJwsiwnDAav9gLdWQ+51964AWfDxKATyU5Dp3Kp7fTlkYxASxwMyFY+/4LllsOXwQAik4eI6DSbLJX7npMf3TriHDlu1hn6keW0x5JXFkOVeSjdUxOnBEmkKwfSWQAord0aMP08+x5ahVUqa+qRZgNrzOR1sq8TRmsOzcw5zj1Ao49OilAZl4cgakjwbJ0ojJO5jF0jGyyqcaVhcmrJwjTzbRkoT265gWiUQciw6mjT1CcI+y72Q15dD7nQShBBMlWy+d3qKb5yYxDS2RHXnnt//Hfik28M048pGn1/f3SRMMxxT8MSUxXdPeJQcF8uqIKSJFrm9m6QhfjjkdivhlcUAPzn4u1LwcAqB/IRoDb1Q8fJCwEI3IkpGpFkeT7f9Rd9uBdKwcJ06Na/C83MePz3jcfQQ4dEaglTz/nrEL+76rPaTfOg1yhjEO8sM7IdpCGZLBlXbREpz+wHKRTAP6s6ymDT1yVQeFJ5XEzKwrApV1+P5OedTW4+PQpjm83iWLJEpTaoymv4KnWATiUMuX48XKaDu5PN0R6tmXiwdiWm42FYVadjb91BpRZKMGIZDrqyHvDQf0PIVliG5OF3h9y7McnKidN89f3xtpmF9FPHmcpcbmwOkgOmywQtHHC5OuphWCcvK193WQqN0QpQMafsBH6xHXNkczz8XfGwKgfyExEpzvZnw3mpI24+IkyGZHmdkiF2Wo5QIaWJZFUpOlSemPf7oYpkzE3mRiINIteZ2O+Zvb/rcaUUkaUiSpmyOMoaHCKQU0HAN6q6BbVjjIfb4swlBplPidESShWgxnr8SAsNw8KwSx2sOz8zazB4i4o+DXrgJWjLpnSJMAuY7V1jp36U53GCxe4tuuDmOTXy8WIbg/ERuRZpiXE1HGFhmGduq7NRuFJDqmCgd0gtC3l2NeHslJEo1nmXwwrEGv3tuhqprbl/jPd+Bx9CPM8W1zT6/utukFyVYUnB+0uZ3TpWY8Dxsq4Ihx6KOJs0i/GjAvU7Ma4shnWArHKjg41A4aT4BSsP6MOPf3ciXURiGXZJ0hBrXTdSwqzWwzTIVZ5IzE2X+9MkKLx51ca2D1VFpWO5n/PWNEW+u+PTCAXEyxJAWddfh8ozDbPnhw3Mxduzc7aTMdxNGcUCq8rzj3HOqUTpF6QyNzotYSAPXqjNRqvHD02W+d3KnEO7jRumMTrDJndaH3Gy9Q5yFSGFyt/MRd9sf0g/bLHXvcLd9jc3hGpvDFfphF601juliSPNTW5ZSgG1I+pHibjthNB6KSiERCDKdoHS+trgmd4AoBHFmA5JjNZPpkoFr5Zkwm6OYxX443nP3d+DxtKnSJEozW3E5M1HCNvLMoJavWB4oMq1IVZ4GqcVORpDSefrh6Yki7OfjUgjkJ8BPFK8thvzqns/GcESY9kj1lidzK7ti7JQxPMrOJHPVCj87X+aHpz0a7sGiozV0AsXf3/bz9xiNCJIOqYqwZAnHdHhmzuF43TxQIlINq4OMu+2YXhCRqQjFzlo4eZzfOA1SCkzpUnbqnJ0o89PzHpemd2o9Pk6CZMRaf4F7nWssdK+zMVxmfbDIreb7XN94m+Zwnc3hGsu9e2wM1rmx8QHXN95jtbfA5nCDYTSgZFUo2ZX8s38Kto7eGCkWe7kYovOMIMgtx51rpsexrQZBamIZgrMTFmXboOKYaOBuZ0Q32vou7HirH0dfafCTDMsQXJquUnMtPEuQacGdjmKUKDIdk+kEQX6c1pAoB0ManJ+0P7MfvK8qhUB+TDKlWeim/NV1n5utgFHcJVZBvnE8b7TVGtLGsxpMuFW+d7LMH188PBhcA6NE8+ZSyH+4OWKhOyJIuiRZAAJM6eIYDk/O2JyqH1xqP58nzbjZTNj0o7yqDuNskV2fEyGQIrceJ70qPzpT4rsnXaqfwcPkxyMWOre4tfkhG8MVWqNN1vsr3G5d5erGu7RGTbpBh43BGmGcULGmOFY9T9meJEpTNgYrtP1NpDQp2blIHpY9cxBSCmxT0AkybrcSojQvoiuEzOMjtSIl3nGc6DwwXGmbJDWoeyYn6yauKak4FqM04057RDwuwvvgtf50barzLJqGZ3NxqoIlJbYBg0ix0M1ItSbVefD41o8gmCht45mCC1NF2M/HoRDIj4EG+pHiF3dC3ljyaQdDwqyPIh0PU3eGRFKaeEaNml3juSNl/uxyhbOPEAyeZJqP1mP+8uqI600fP+kRq+F2LnW+wp/L6YbD6Ym8RNZBRKnm2mbCSj8h0SGZyj2wO583t1JM6VK165ybLPOT8x5PTDt8SuNsX/phl0HUI1EJa/0VVvuLZCrDMjwEJiYOR6pnef7YDzg7+RSzlVN84+Tv8r0zP+P81FOcnXqCs1OXmCzPUrFrVJzqtrX3SRHjyjurg4z1YR6IL4RAIoF8vnbrHiPygTZaEGU26HyoPVU28CwDx5CsjyKWBwFqu47j2BJ8aEbNo2/XCIIkr1x+YbLCVNnOc/eFYLGb0Q1yJ01GXjF9PKFCpvJpgRMNi5kDpmYK9lII5McgzTQ3mgn//vqIe10fP+uS6nzOaftXfhxT5xgVanaDi1Ml/vHlCs8ccfZU396PVGnudVP+6tqQ99Z8BsmAMBvscf4YwsQ1PGbLNuenLBoHBIwL8oft6kbMQjcmViGpHtc/HH9eAUhh4pk1ptwqPzpT5runvM8wA0Mz4U3m5ciAizPP8t3TP+G5Y9/j/PQzXJ59ke+d/hm/d+FPeP7Y7zBXPcnpiYs8OfcCF2ae5uLMM5ydepJj9VPU3ManFkd2pR+2fMXtVkw29gcJcsua8VA7D/7Py9rl4mMQJTtD7ZItqToWCrjTGdGP8vx3sT3vu/Mdyd9g5x58nO2ZhiBTlCyDJ6erOKaBa0rCVHOnlZIqSHQeUcE49AckaZbnaV+csrAPib0tyCkE8hHRWtPyFf/hus97awHdeECkRyi9FRSe/xNCYssSFWuCE9UKf3SpzHdOHi44apzP/fObPq8s+LSCEX6Wz23unDs/vyNd6o7DpVmH2crDBSK3jOB2O2G+m+InY4EcD9eEECBkvmSqVefCZJmfXihxcToXr88Cy7CxDAdDmhytneTc9GWmK0eYLs9xauI856Yvc6R2Es8qU7IrTJXnqLp1TJlnrnwWCJEvyxCmsNRLafvje6rJh9pINIqUZKxdOwNYpWySVNLwDE7U8yVjy5bJMMm40/VJ1XjPXd+R7TfdmmP8mNs1mmgcB3uy4XGs6uIYAikEq/2MjZFCocjI73Uu6IC2gdyxdKJubr9VwcM5+Kkt2CbO4MpGzPtrEd0wJNajXZZd/qMvEJjCoWTWmPbKfO+Ux3dPPppTZhBmvLkQ8spCwIbv46seiY62z51bApCRkWhFc6QYRtn4MX04poRpLw8YN4SZW0RjgcyHbgaOKFO3XZ4/6uThR/ef5DOg6tSpuROHzh+a0sQ2nEP3+7SYhuDMhMkT0+N5Xa1zL7kGQ1g4RhlLjoPWhUALRaRDhumQe52YVxcCFrophhQcrbr88NQUT8/WdgnbjmG4098tfh9ve6I1N1pDfnmvSTdMMGX++b93ymPKc3FkCSksNKCFJiVimA2Z70S8vhjSLsJ+HonP9lv3FSHTmrVhxm/uhawOIkI1JBlbYruDwYW08nlHq8yzcw7/6JzL3AEW3hZRpvlwPebvbvksdgMCNSDR4X3n3xJJRZplDKKMbqBIDsmoMYRgqmxQtQ2kMPPKNSL3cCJyQffMEifrDk/POUx/TeenDAFTJcmFKYvZspFPT4xFUmiBjYsjKshdAfeKlEiPGKY+V9ZjfjMf0o8Utim5PFPlJ+dmmau6+wZ/774HD75++HYN9OKUd9Z6vLHcQaOpOJKn52xeOOriSg9XVMYZQZChiFRAL/a5thHxxmJItlVlo+ChFAL5CASJ5p2lkJvNkGESEBGgRLZHHKUwcEWZiqzwxJTHHz5R5tSjBINnmrvthJ/fDLjVDvH1kEj7KJEv1frAgyE0GSmJymj5imF88Jd8OyfbMTAwEWInJW7rM9cth+eOOpyZODhs6KuObUguTNk8MW2TR0KOh9kIJAaOLOGI8vY11AISYnw1pB2EvLcc8v5KRKY0FdvkW8fq/Oj0FJ61Kw3xMbap1tzrBby81GFtGGFKwYm6xbdPuhytODiylFu9Qmxbkb4asjqIeWspYqlX5GkfRiGQh5AqzVI35bWFkPVhTKiHpOTVpxE7HkdHeFSNGqfqLr9/wePSjHWoUyZTmtVByt/d9PloLWCY+oR6SCbGxSjG52fXvJQWkIqEOEvZHGaMDsmoMSRMlvJ1T0wsJLkFKZC59Wi4nGo4PD1nM/U1tR63MCQcqRpcnLaoOVvD7HwORCCwtIUnKljC2b43WmhiHTBIh9xpx7w2H7HSy3Kxqnn88OQkT07XduZPd93T+9uPu10Bfqr4YKPPS4ttkkzledrTNt856VE2XFxR2S7nptBEOqSfDrndinl1Pi+8UfBwCoE8AA0MIs1r8xHznQRfBcRE92XMSCxcyqLOrFfiR2dLvHjCpXJIDGG+6JTilfmItxZD2lGAr/sk5HUk94Z77DwYGsh0SqIUzWHGMDpYIKUQlG3JpGfgmQYSE5Db1uOE4/HCMftrbz1u4ZiCC9MWF8dWJGMLMm8lNi6eqCDJl5TVQCYyQnz6qc+HaxG/uRcwjBS2lDwzU+Wn56aZKe+I6v339v57fP/rB21PtWZlGPLKcofb42o/cxWDbxx3OTfh4ODhiBL53CmkpATKZ2MU8cFqzO3mVv3Lgv0QOi+dXLAPcaZ5fyXmv3+rz7XmkC4tIvKisnlEmsDEpkqDaavKD89W+CfPlTnZODwYPEg0r90L+f+9P+BmZ0SfLiGjPGtjnNq2fwsmFpNiiov1Bv/Vd2t8+6R7/1vsYRgr/uaqz19eGXB31MKnj6ltpowpnp2t8V+8WOGF485DBTJVcHdT8W/eTvn7axmZFhypC0ahJkzANGC2KvjPvmVy+Zjk33+Q8rdXMo43JD+4YLDYVvziWh6jV3EFR+uCnq9ZbOdfPSHgWEPwP/umwU+eNJhvwb9+O+VuU/GDC5I/e9FkqiJ5407Gv3475dqq4tSU4D95zuTMtOQX1zIW24q/+IbJt04bvLuY8fpdxZNHJT97ysDbf4XafdFA18/4d1d9/s2HI/yxhS5ygxKEJtExQ9ElYDj2Z2skBh4VJuQET82U+SfPlvnOKQ+N5k7P5//z0Qp/fWudaKsC+b739pO1QsBcxeHPLx7hnz57As80aPsZP78R8D++36MVD+mJFhl5ho2BRZUax9wJ/tGFMv/5CzVq7sPu/tebIsznIWgNrZHi318b8eFaSFf1CUU+N7jlYTSEiUeFhqzy3JES//iZ8iMHg19bj/nLj4ZcbwYMGBCKEUrsrSO5f5v/39IuNg5PzjmcapgHZkcoBe1Rxu1mQjOMUSLDpcSsU+HH50p866RzYMB5x9f86obi1obmx5dM/uBpgzNTkkzD0QnBuRnBtTXNWk9zaU4yVxes9yBI4G5TozT8Vz+0+C+/Z/H8SYMz0xJDCk5MCv7r37X4n3/HZLoqqXmCYSz4+2sZNVfw08smix14/Y7igyXFG/OK508Z/Ne/azNTlfzyhmK+pZiqCKIU6p5ESvj1TYVtwu9dkkyVcwF5VAR5yE+cwnI3pTnMcnEcbwOBgQEIUpGQiTwzSQudfze0IIksJIKTDYuJkkHZNjENyeIgZN3fikPd795+slaPf8yVhuNVl5M1D9sQGFKwOVSs9jOUUKQiX0NHC53/PZmFziwmy5KTjdwiLthLIZAPIUo1by1G/OKWz6rvM5IDUjFe7U/kv8MuZRqiwYXJMn/6dJmnjziHBuBmSrPYTfnrKyPeXYnoqiG+GJKKcYbL+PwHtxJL23jS4UzD5vSEdWDxCw2MYrixmbA2SBBIKtLj0lSZn1zwODt1sImVZLDY0lxdVUyWBT+8aDBREtxraqQQVBzBjXXFnQ1NzRPUPMG1Vc2tdcVcXfCnz5t877xkupyLYtWFhbYmzQQvnpI8e1zy5BHJuRnBXF3wzHHJd85KpiqCe03F+0uK9b7m+VO5NXlmWjBXE2gN19cU7ZHGkPl64O8uKP71Wyk3NxRRKjjakEyUPqZICoEpoTnKuNNKyca/iVvDWjSY5I6XRMQoMZ5yGa8Lo5VJHJm4luTMpIVnSaq2QaLhZnvEKB3ndu97bz9ZqzWM0gzbkFyeqlK2DUqWIFVwp5kRJIpEJNvOv1wkBSqxMYTk/LR16LTQ15FCIPdBaVjpZfz1lRE3miF90SeUeVkwhEAgcPCo6wYnKiX+8MkS3z3tHfoF0xqaI8Xf3Qh4ZT5gIxoxkj1iGXG/VXBgi8DAxBMuc2Wbc9MW9QNiLcU4YPzaesxyR+VDdMfmx+fKfPOki3eAuALYJhwfC80rtxW/uZ0vi9rxc0EoOxAmUPfyYOtRBKu9XNReOGXwOxcMpiu5SBkSRpHm+prGj+HJI5KjDYFp5OXHHFNQdfNrfG1N8+ubGf0IpiqC504YvHhSYpm5MAwiuLWh6QWaOIWFtkJr+NMXTP7iGxZ3m5rbG4rjk5JG6eC/cTdCgCkFw0ix0EkZhFvph+PtgNACKSSZUKQy/+FEsG1F6tQiyyRTZYNj4wByz5T04pS7vYBUb5Uye8g9/pitHnu1EwVTJYvzjRKmFFhS0A81Sx2Vh/qIOF/ga8sqVgakFmVHcrbI036Ahz9VX1O01oxixZsLIbc2YwZZSCjD7WUUBAILm6quMm17fPeUy3dOu9S9gy+lHs8FvrMU8uq9gA0/xDcGxHKcKcP4C/8orcwdA4nKaD2io6biSOqOxJUmnrA51XC4fMRionTw52Z8fK0k+MFFg3/2A5OJEvzmdsZSZzyHCEyU4MXTkpoLr99V3GvmwddBrPH3CUUaxZrf3E75v/xNzP/5r2NevaOIx1EnQQyv3cktwaor+ONnTKYrkijVpOPYPaUgTMYZJTo/ZnOQC+l3zkmeOS44OQmbQ81C6+Drsx+2ITg/bXFpxiaPihw7avSOw8ZUNiVVxtK5AwZACU1khPTxud2KeOVuwGo/Ha9nU+L3Tk1xYaKcW6Lsc28/RZsqzb1BwEtLHZYHIaYUHKubfOuEw/Gqg6s93HGFdj2OhhiKgNVhxDsLEYudIuznfg5/Or5mZAoW2ylvzIds+hG+MSIV44yZ/LGgpCo0ZInnj7r85IkSc4dU6AGIU83VtYS/ux6w0AsZysGOVUr+Bdfj9rC+BlKRx0LmGTWHC4Ap8yrUNUdStQUvHrc5PXn459bAMIQry7nVJwWUHEGY5H/TFoYhODkp+cFFAyk06331/2/vv6MsS/L7TuwTcd3zL70p77uqq72dtuNnMEAPgJkBSAy5ICXtckntniPpH2lJHa2WR446lA61PCtSZ7lcEgQBAiA4MxiHwWBc26n2pnx1dfmqzEqf+ey1Efoj7su8+eplmZ6u7qru/J4TL16YGzduxI3v/UXELyKo5gXn54wUOFPXtEPNmVnFmVkNCB7aavNff9blH3zGYfeoIEw0S2147kTCd96MGe8TfPNRmwe2SnIOvHYm4Y1zCj82XfRXTxuJcfeYRcGDvAN1XzNd19R9WGxBzhb034D02IElYbhksWvYoT8vu1R+jC0ReCpHXhWRunOkhakbX7RYitscmQh45YxPM0xntYfKfH7rEP0556p1/H7dfqw4MtfghUsLBInCtQS7hh0e3ZqjJD0KqpiOoRoyD4VPTbU4PRfx8lmfdo+P2ScZ613sDLTWLLYVPz3e5u2JNvOqSdNqpuM2ZnC+oIr0U2XvkJmU2TNy9S3H6CiDz0X84FCTw1M+SzRo2I1lZfPu8aTrsQE8lcPDZe+ox+Z+B+sqn7tEw2wj4cJizHDJ4TN7CmwduPrYI+mwwPkFxR+8FPPP/jrkhwcTZhua/gLMNjRnZ+HcnOLigmZjv+CeTSYTiy3NfVsk92y2OHBK8T+/EPMnr8Y8/67m8hIcn0x4+0LC8csJPz2a8IN3FPMNQ5DffjPmzXMJC03NcycUxyYV+zdKLCn5owMJ//6lmJ8dTcg5Zjx0tgEHLyo29gs0gv/4asJ/ej0m0fDrd1s8sFViX0MntRc6m8tO1RUTi2ZpnjD0iJGbQaYq5YlMiGSM6EzYSDMMoUMHlVgMlyzGqxaebdSt5oOYM/U2WhuF8151/H5sELQSk9cd1QJjRRfPEUjg0mLCXEMTS0UkIzMOmU7YEDmQSEarNmOVdZWvDtbVfDIIE81bFwL++LU6JxaaLDgL+FbbqFNoQT4pMJD0saNS4Gv3lvjU9mvrOyZaM1VL+MHhJs+912IybLDkpOOOvwKkllTiKhvtKl+7q8qX9xXou0p3OUw0RyZC/vpYix1DDl/aV7jmsEAHsTLjhWFkeMGSAik0SnWkFyMReja4liZMBEGscSyBJcz4YJwKuVIYaVMpTaKMuwPHNpJuEAvixEirmL18cW0zKeNHZhNYIQS21LgOJImZdZbSSHdRYojdsSDvmrHNjpB1I9BAra348dEW33mnQTPUZJuLEGY5ohaKltVK6zWdpQYc7VCNK4zKCk/uKPA795cYq9i0YsXLk4v82YnLnFlqsRDE+PEHtzZaCsFwweW3do7wv9y/kaJtsdhO+PmJNn/+dp3puMGiu0AkjA6krW0qSYWNso+ndhT55sMl+q7z3fi4Y12CTKE1zDQUPzrS4uiUz6Js0LbbJOkMpas8+uIq416Bz+0p8OSu/FW3GiNNs+ZrXjrl8+zJFpf8NjWnRmiF6OVdo6+UAq7HBoGtbfLaY6zksGPYoXK1iZrURAnsHnHZch3d6w6kMJMnBU9QcAV5B3KOIJ/+zzvGdiyzAa1jGT/XNuSUc8x1Bddc49nm+o67Y1xbYFuCnMNKmGOud6wO4XWuA88xRw64tiHCnCPwOvfyzHWWfH/kSFpeUkCkYHIpZqpudFRNWEYPEYHUlllVY0Wo5bo1ZCoSmzi0KLqSLQMOOVsykne5o7/IeCnHUN6h6tnkbQuRKn8r3r9kqTCTNbHSbCjm2FLJ4cj0eIamYmLR7PYTWmZ3ItVR+4ltiCyqeYstg+vHM7BOkCsIYs1rZwNeeK/F5aBFzWkQWZFRqVEO1bjMkGWUf7+0v3DNbkhH2nnrQsBfHWlxpuZTc+r4dhu1fGB87xdci1Qy6+G/HJ6uD86rHAOOy54Rh6FrbIyRc82s6mDRwrvGzPU6DKQQuLZkrqk4PRORKEOKLCtpazxL4EpJkgiUVEQyRqdrtRWmD50EDjqRjFZsRsoWni0ZKbjcPVTiiQ39PDJWZWe1wIZSjsG8S8W1cSyJSo/OMML69b8jida0YoVjCe4cKFFyLfKOkcJPTyf4oSayI2Jp9Dw7+dS+g0Syc9ihfJUP7icF6wSZ6iZeWkz44aEmJ+d8FpwGvu2DBEtblKIS/brEPeMFvnpPkW2D7jWPQo2V5t3piB8eanJ8xmfRatByWsQdZfDOC2/+3LBbpFKMl3gUhcu+DR4bqmtLhUIYaaroyXVyvAEIYXb6aYeaiwsJS21lJmrSoQXXMlLh5j6bZlsQJRBaEYnsjCkYCU0kkrBlkyjoy0sERpXIkgJLCMquzfZqngdHKzyxoZ97h8tsreQYLbj05RxKroUlBIk2hNnrneh2x1oRKk1/zmZPXwFHShzLqC9dmFcoViRehJGIpbIhMmfd7BhaV/v5xBOkBhqB5rkTLV477zOr2jTcBrFMkFpSiAsMxBV29Rd45u4C+8evQxlcw8Riwl8dafH2JZ95WtS9BpE050/Dygv9/m3zPxfnyGuXfWMumwYc0JqFluLcfMzlJbMlWiPQRlE4MafySSGuudpnHSsQQiAlzDUTzs3GdIYhBYKCLXhwi8cTu/I0fc30ok6Jx6xaAVDSTIYQ2Swswfl5s0JnsaVoBoogVZKwLVMvjhQM5hz29hf51FiVx8f62NtfYlMpx3DBpeI55G1zJG2sTHc8zegqWwGtRCEQ7O0vMpCzyblGtD0/F1NrayIZE1lm53MtFBrQbTNhs3nAvmav5OOOTzxBxonmvemIHx9pcrYesOjVCCyzqiUXe/SHFTblC3xxX4GHt+UoXaPbobVZ1vfs8Ta/PNVmKmqzmKsT2Ebfsbsr9CvZSJzEoaBdtvW7bB6wsS3BxYWY59/1ee7dNgcvBrw7FXF6Jub8XMzFxZjJpYTpWsJMXTHfTKilJOpHmjgxivLrJLoCKcz4Z8NXnJmNaQYaIUCi6S9aPLQtx6d25NAaLs4lNH2IrSQlHpHOapuliHEkuNxIODEZ8s75gKOTERcXYmYbilo7oRWaCS1LmDFDKQR522JjyePuoTKPj1V5eLTKrr484yWP/pyz3B1PNETp7uGdd0Rp8JWi6Frs6y/iWhLXFgSh5sx0QqLAtyO01GhBOiFpQejiCMnuEfeaAsHHGZ9ogjRkpvjp0TYHJwPmZJOG20ZJjaMc+oMyI1aBx3fk+ezePMPlq39NdaoA/fpZn58cbXG+5bOYr+M7QboKJ/26f0C2SCdqCsplvOyyfcihr2BRzUtyruTSQsLxyYjTsxGnZyKOpo3ytTM+r54JePt8wOGJkGOTEScvh5yeiTg3F3NpwUifU3W1ikSbocaPDYlqzITMJ4VETZdaMFNPuLhgpEjHkmwZtHl4W47NAw5FTxBEmotzijiB0E672ilJhlZM2wmJrIjYSgh0wlKQcH4h4silkHfOh5ycjphcSphvJdR9ozuqlJn573TJK67N9kqeh0YqPD7ex92DJbZW8owWXPpzDiXHRkrTFY+0xk8Mae4o5xkvunh2ejzDUsJsTZFYitA2q4GU0EalLXQQsWSwbLGx75N7PMMnmiDDRHPwYsDPjre51PZZyjeIrBhLWVT9EgO6xAObCvzGPUU2DVx789so1hydCPnhoRbvLfgseU2abgslV8ix83X/QNyA1BaFxGPAddk94jJUsrCkoL8gqeYt6r5ioZkQxea6TvcwScyOQotNxUw94cJ8zKmZmCMTIW9fCHj1rM/rZ3zePh9wZCLk+GTEyamIMzMR51MSnVxKmK6bbdcWWoq6b0jUrHhJ8/crzCJ/WFDaSG1RYqTodmRW/zQCRcPXxBo822yFtthSnJ6JCWONawv2jrk8uiNHJS/x0ln4ubpibkmRCE1gG31DU2dGkgysiLYb0HJ8fCcksmIimdBWitlWzKmZkIMXQg5dCDk3Z2bPF1uKum/KVqQSrRQC15IM51329Rf51GiVx8aq3DFQZFM5nR13zDLHVmy0Mfb2F8nbkrwrSRScmUoIY5PPxDLj40qY1Um65WJhpMi8e4tX4k3CJ1YPUmmYWIz5k5frvHKhxWVniZrXBAFlv8hQWOHOwTy/83CJuzdeu5uRKDg7F/Gt1xu8dqHNjGyyWKinCrnLfGZevNStMcti3284WuAkNqOtPvaVyvz+YxUe3OZ1YhLGRvfxrw61OHQx6Lnk71eBEJCzJeWcpJwXVHLp/5yknJdUcpKSJ8i7ZmLItYyKj+cYlR7PNn4d9aAbhdIs61PGyky2GWPG5mKlSRKji5ooM5ySKE2iTX0lyhB5FGuC2JRXGBsS6ixrrOYl+za47B4xH8ijEyHffqPJOxcCqjnJr91T4OsPlvDS96PhK1486fPtN+ucbbdZKNRouWbFVK867NQxAixl4SYOXuzgxg52YmMria0tcsJiuGSzdchm66DD5n6bgZJc7jHkndUfIg2EiWK6HXJisc3pWhvPEjw13seOSp5Yac7MxHznrQYvnG2y4DVYzNdMPrXAi11GWlX2lEo8c2+Rz+7LX3NBxMcRn1iCbIaaXxxt8d13Gpz1m8yWFonsmGKQZ7hdZUcpz28/UOLRHR7FayiDKw3TtYS/PNjk2XdbTCQt5gs1AsccOG8kt5tjW0oy3OhjqzQE+dQdeexMdsNYc+RSyI8Ptzh0MaQZpDvPaCOJdJSuu9P9oMItATnHEGbZE5TzVkqigkpeUspJim5KorbRaex0ATvEZkjPkFqsdEp0hhSDWBFERhk9TFJyi1aILoxNnDBdtx0kqV8aJ0yUOXlQmJVURqdR4NiCDX02T92R5+k9OYbLFhozJPNXh5r86J0WQ2XJb91f5LP7CsvlnaQ6kz862OInxxrMWk3mi3UiO16jjNawEVjKSsnSxUts7NjGVhaOlpRsi/E+m+1DDlsGbcaqNv1FQ5jlnPn4ZKGBSCkSDfl0yVUrULxy2uc/vNrgnN9irriE7wZorbG0RdnPszHo48FNBf72Y2U234Du7McFn0iCjJXm7EzEv/9lnbcvt5gq1GjmfNzYZqhZYYOd50t3FvnSXQUGrzGLpzXUfcXzJ9r84GCTs60W88UaTTcdd7zJkEoy0CqzWZf5xr0VvrC/QKVrFUQYa45eCvlRKkneautthYCCY/aDLOcMadqWWR1jSE4TpeTnL5OfModOpRMLnQmG63ZjlgSaMBPuJBa5yKUgLbYOOXxuX4FP7fJWrTgKIs2b5wJ+8HaTgiv4+kMl9m1wl8O1hoWm4ufHWvzgYJPLUZv5Yp2G116O834gtMRRFl7UkTDtVRJmX85m66AxmwdtRis2fQVJtWCk+F7qOomCycWYvzzU5K+ONph3m8yVamZxBAI3thlsldlpV/jSXQWeua94BfF+3PGJI0gNLLYUP3y7wU+PtjivG8yV6ggBA40yY6rIY9sL/PaDRTb1X3twutNgvvV6gxMLbeYKdeq5tlHA7bH78wdtSy0otwtsiip8cVeFZ+4rsCGzo7nGdENboead8yE/PtTk3csRYdxDarnpdpasVggKTBdzJewqxLZsG2NWgaS27HJ3wjP/O+EdPy00QgnysUtfu8hwUmDPsMvn9xd4eHvuirE3peHyUsLPj7YIY83XHizRXzQEqtJJvzfP+PzsWIsjs21quTa1fJPQjunU2QdhW0qa7nhkuuOGMC1sJckJyXDRYduwzbYhm439NoMlm2pBmu64u9IdDyLNOxcC/sPLdd5dajFXNO8vAqQWFIMc480+7h0p8DceLbF/48rH4JOATxxBdrqcf3ygzvGFFlPlJQI7ptIuMBqUuG+swO88XGT3mHPNDQ6iRHPyshl3fHvCZ9ZrslA0Ez2d8aUObpZbdF7iVoV7B0o8eUeO0Yplxt/S7qmRuMz42LF0wqUV6OUUNSAyd+jlpkNo6bK0FcK6cbeSKl1Kp1GoDIGlfl3k1m0vE9saZXIjbqEkhdClv1VijDx3jnt88a4C92xxcdao/yDWHJuI8CPFoztyCGG2X5uuJxw46fPzYy1O1dvUCi2WCi1i2dno4sr7fxBuAYYwIwcvcvFiG6fTHVemO76harM17Y6P95nueLUgKXuSRqD52ZEWf/F2nWmrxUy5RmSbd9iJbQZaJbaqCp/eY8bky5+gddqfKILU2rzE33q1wYunWlxy6iwVWuRCh5FmhT19Bb7+UJEHtnpGofYqSJRmcjHh+281eelUi0nRYq5cJ7BTZXAzOHfTbaHBjW1Gl6oMxPnl8dLOGFysNImhJrQAUvsKt7h6uMpIaR2y6imdCY0WapV7xT+thE7+VzX59H+PZ7xZtp1ICoHHQKvIBivP/VtyfH5/gTvGHeRVOEBrowGgtaboSaJEc3kx4YUTbZ490eKC77NYbFHLt82uPmvc/2bZQptn8yIjYXqxjZPYWInpplc9i60DDluHbTYP2AyWLKZrCT890uL4QpuFUoPFYhMjsUoKgctYo8qdlQJfe7jEp3Z6CHH19vFxwSeKIP1I8/JJnz9/rc6pVpuZag2hBcP1ElvcAr9xb4lP78tRvcquOABaaxZbmp8ebvHjw00uRG3mKnVanpmUWcZan/wP2G0pSV+jRDFwV8iOFYmvm6g6RJd1r012hlyvdv8PzN3L7ya5ndii5OcYaBfY5OZ5ZGeOz92ZZ9vwtbeAyyKMNefnYn5+tM1L77W4nBhybOT9lfOLetz/w3QLJXBim1yGMO047Y5jMZC3GK5YNAPN2bmQRi5gplojcMxmFnZi0dcssDmo8qltOb75ePmaOsEfF3xiCFJpzcW5mD/5ZYPXLrWYLNTx3Zj+eoFxXeDTewo880CRserVK15rsy73tVM+33mzycmlNrOVOvW8j7aMVLE8XpSZkbzZbktJhE5XbQjTbeUq8W8Jd6Ytd/5n4wiyO3gbaXnZNuItQnf5Y3azCZ2E2EoP1Fp1T4Eb2VRaeQbbBbaWcjyxx+OpvXnGr3EaZRY63Yzk9HTETw+3OHCmzbz0WSi3aHpmgq7nM98CbpkI3MghFznkIhsnMt1xO5FYShBLxWKpxVylgZZmp4x85DJSL7PHK/KVe4t88e5PhtrPJ4IgtdY0A81PD7f54TtNzkVNFspNCoHHqF/koc15vvFIke3DzjX18aJEc+RiyLdebXBkJmCm0GCh1DKNcR2wBmktk9oqf0CLFSJMbaNXL5Ap6UstkMp0HWUnXMvVful/JTWtXEit0KLlGSXtbL68yKavkWcoKLCjL8dn7szz+O4cfelEy/VAa2gGihOTET851OL1C20WXJ/FcuvKXsQtDgFYiYUX2eRCI2HaiSSyExZKTXzX7BkplaTSyrGlUeX+8RzffKLCtuHr/6DcrvhEEGSszGTKH79Y5/BMm+lyE6kEI60idw7m+MajJfZvuh5lcM35uYTvvNbktXMtppw2s9U6oWNG+bJSyu1mk0oZqwhMG9Lp7b+aAEn9DXllyUwg1Mr/FVIzm/4KTcZPYmMOmrKlwEo357Wt1JbGtqRRLFdas9RSLLUUidYETkK9YIgqcFbPGkstyQcO/fU8I1GB3UMen78rz0M7cxS9q9d7FlqbTXQPnQ/46eE2b19us5hvs1Bu4bvm3Onusr2dbKkldiJxYgslFb5rylFqI3kP10vs0EU+v7/Ibz1UvOppmh8HfOwJUmvNYlPzvTea/OJ4i4uySduNGWjl2V7I8dUHijy2+/o2oZitJ/z4nRa/ONbmomoz01+n7YWo7KqIW8AWykhfHUmst/TW8QdICapLIuuQnUmrO6xDfGBpgS0kjhDYUmJJoyC+sn7YHMuaJTtLmnNfuv+7ttn01rXMLuJeugmuawtyjtlowbHMqpiL8zFvnA54byaiYYcsltrUSj6xlawqE0sJCr7LYL3IaJJj37jHF+4qcO9WF/cGGrjSMN9QvHHa52dHWhyb81kstVkstwmdFc2Fj6ttaUGp5bFxqcL+gQK/+6ki925dWbn1ccTHniDDWPPOuYA//WWdd5d8Fks+Rd9lo8zxxf0FvnhPgcFrDDhroOFrfnm8zfffanKm5TPT16BRDEiE2YwAvTLe85G5EdixpOh75EJ7NZF1/mcIzhCbwBFGcjNklm67lRJWVmqzZGcPw9TPMkck2NKsPOkQ2TKxpStjlpcVdoWbsJUVNHa6vvhqUBoWmwlHLkT84kibQ5M+S07AQqVNsxCYrcUyZWInFsW2y1C9wLjIc/cml8/fXeDOTe5Vz/DpRqJgeinhwLttfnG8zem6z2KlzVKpTZSuYe5ZJx8jt0gntwbqebb7FZ7YledvPF6m+j4ORbtd8LEmSK1hainmzw80OHCmzbTjYynBUJLjU9vzfO2RIhsHrq0MHsaat88EfPvVJsfnfaarTZbKbWLr2qcJflgQmJe3Us8zXC8w5riU8qk01yE7KyutGSLsnEW9vD56mbiuJLxlolsO72zQYNrTzUaiYGop4bWTPs8fa3NqKaRW8FmotGl3jTeSlke56THYyLPJzvPgdo/P3pVn5+i1Nx7JIkpgYj7m+WNtnjvR5lJk7lkr+Ssb435CILSRxjcultlbKPCbDxV4Ym/umh+22xUfa4Jsh5qXjrf5zmtNzrcDAjemGrrcO57n648W2TN+bWXwJDEzld9+ucGblwKmCi3m+swYV/f4zUdpO7GkWssz1iiyp5rj4d0em4dscqnkZogt22Vd2aD1w4RONQpiZQ66j7Va/p+km7/mbUnFtnAymQsizYW5mBeP+fzyZJuJIGSpbKS47roAcEOLaiPHUL3A1oLHY3fkePrOPBv6r95b6EYYa85Nx/ziSItfnvK5jM9ctU29GKDSJXnddfFxty0l6avl2Far8Mi2HN98sszoNbQ/bld8bAkyUZrzszF/9FydQxMBDTsin9js6HP52iMl7t/hXbGMrBtKaaaWEn74RpMX320zYflMDTVpe2Zm71aA0IYc+2s5RhsF9g3k+bX7C9y/3aNwA5MP14LWZhccQ2qpSXfD6Sa6WHXF0WbLsERrIqUJlaadKPxE4ScaP1EEyky0DLo2Dw4U2VfJU7AttDYrgE5OmC71W+d95mSUdm99Ynu1BCc05EKb/lqe4Wae7WWPp/fneXxvjoHS9feptQY/1JyaivjZoRYvn/GZc3zm+lo0CldKq58kCC3IBzZjC0V2yyJfurfAr91fWHPl0e2MjyVBag31tuKv327x1++0mW3HIDVjRYev3Ffg6f3561AGh6WW4rnDbf7qnRbnIp+poQaNYmcrfTN83fmqfhRuoQVOJOmr5Rlr5FNyLHL/dpeCZ8aOVHr0bNwht842YFoTZSU5pZZJLEtqWZILlCG1dofUEk07SfBVh+g0vlIEXeRnwo3bEGGn/FYmAXJSckclz29s6OPLY1XG8y5Kw1w94dDZkGePtDk2HbCUC5nva9MohCtnT6dlIpVpuIOLeYbbeXYNunz27jwP7/JuaHmc7qjxXIr4ycEWb170mcv5zPe1aebT/R3XqJNPittSkmrDY8tcmXtHc3zzqTI7x25Myf52wMeSIONEc/xixH94vs7pqYgETdmzeHJfnmceLjByje6A1ho/1LxxKuQvXm1ysuYzNdhkqRKQWObcDpGN/1G4NbiRRd+Sx3jdSI5fvr/A/TuM5BgqzdlmwJlmQC1OUoJS+ColrZTg/ETRViv/O4QWpGTXkfQipem8KD3z8z7dAqjYFvf3F/jG5gGeGCpTsi2iWDO5kPDquz4vHPc51whZKgfMV9u0c3FKUiuQiaTYdhhazDMSeuwd9fj8vQXu2+7ekCqK1lBrKQ6fD/jJwTbvTLVZKPnM9/n4uXgl3lWe6ZPgRoMXWowsFNgZlvj03gJfe6z4gfZabgV87AhSp6oYf/Fyk5eO+TT8BNcR3Lfd4+uPFdk2cu3zfqNEc+JSyLcONDk8FTBVbTPb3yJ2FDozs/eR2QjcSNK3mGO8nufOgTxffqDIfankGCrNocUWf3R+judmajTiWyTfXbYtBSOewxNDJb6xcYB7+wrYUuCHmjNTMc8dafPaKZ8pFbLQ57NUCQjd5Iq0rFhQbroMLRQYSzzu3uzy+XsL3Ln52mPMWSgN8/WEN08H/Pxwm2PzZrxxod8nulXq/hayhYJy02XTbIm7qgW+9qkiD+78eKn9fOwIMog0b54K+I8vNrk0F2Fbgp3jDl9/rMj+LdejDA4XZ2O+91qTV0/7TObaTA238L0V6eGjhNDgRBb9Sx7jSx1yLHBfKjkGSnN4qcUfnZ/luZk69ejWm2UVQuBKwfaCx5dGKzyzoY9tRQ9SJexjF0KePdzm4KWABTtivr9NrRz21BpwIotKw2V4IcdG6XH/9hyfuyfPrvEbm6lOFEwvxhw4EfDs0TanWz7z/T6LVZ+oa5xzHQYiLf/BhRw76iU+tTPP33yqRP8NjPXe6vj4PEkqAczWEl4+7jNbi7GkYLTP4jN35dm94drkqDUsNBIOHPc5dC5gxg6ZHfAJvMSMOwpzUtxHZiNw4m5yLGbIUXFoyUiOz842qMfpDjrd6XyEtpCCgi25r6/A/2L7EH976yDbix5aw8xSwoFjPt99pcXr532mcwGXR1os9IXE9pXP4oU2A4s5xmeL7HDyPLUvz288VGDXhhsjxyg2H8WfvN3mr95p8p7fZnqozVy/T+Rced9129hKQOQoasWQWTvkvcmIt04FZiPjjwk+VhJkK9A8f7jND15tMltT9BUln7knzxfvz1+XMngrVQb/watNzvghkyMtapWAxDLjXdmC+tDd6Zhj/4LH+GKOOwc75Gi61YHSvLPY4o8vzPH8bN10q6+W3kfglkLQ79o80l/gdzf288hACVcKolhzcS7hwLE2B074XGiHLFYD5gcC/Fy8nE4nTaEh79sMLOQYqeXYWnJ56q48j+/zGKpcvZ67EcSac1MxvzjU5uVTbSZlyOygkVi1XBl3ZY1nWneDHQv6F3Nsny3x4OYcv/fpEhsHPx7rtD82EmSiYHI+4bUTAYt1Td4R3LPN5ak7cwxc49gE0hMJT1wMee6gz6VWzHy/T6MckdhmFUHnq0lqf5huM+bYIce8IccHu8hxqc2/vzDHs7N16smK1NMrvY/CbUnJ5oLLM+NV/v6OYZ4YKuMKQctXHL8Q8sNXmvz0YJtzYcDMcJuZEZ92PkZ3pSm1oNh2GJ7NM76UZ0+/x5cfLPCZu3M3RI5aQzvQnLwU86PXWzz/botLdsD0SIulaoiyzMFaV3umdbexExsapYjZQsDZ6ZhXTwQEcZZKb198LCRInY5d/ei1Fr94p00z0Ozb5PCNp4rsug5l8DjRnJtO+IsDDd66EDBRajM10ibIffQ79AgNbijpn8+xYTHHnQN5vvRgYTU51tr84blZXphr0ExurfEyAXhSsqfk8dWxPr48WmFDzkFpWGoqDp8LeO5Qm6OTIQtexOyQT60SklhXvpZWIig2bYZn84z6HntGXT53T577d7rkr3GwWhY61a08cSHiZ++0ePOSz2wpZHbIp1Uwp1Cu48YgE0F1yWXbVIm7B3P8jadL7N18+6v9XP9bdQsjSTTnp2LeOR3SbCs2Dlh87r48W0euTY5Ka+ZqihcOtzl6KWTWDZgb8g05CmG6FB+V3ZEc53NsWMyzfyDPlx/qQY7n53h+vkGzo4rTnc5HZAshKDsWjw4U+Xvbhvmdjf1syDkkiebyfMzzh9p87+Umb00ETJcCJsdbLPaFxFYqtWfSshJJpe4yNl1gU5Dj3k0ev/FwkYf3eDdMjkstxVunAr7/WpNXL7W5XPWZGmnRKEZo2ftZ1u2r29qCVjFmruxzYS7ileM+DV9zu+O2lyC1hrlawrdfbPLqCZ+8J/nygwWevjtH5Rp7/GkN9bbmpSNt/vL1JmejkIkNLWqVCCU/2mLpSI4Dcx4bFvLsH8jx5YcK3LvDJZ+S49u1Nv/uwhwvzjVoxreW5GgJwYhn89RgkW+M93FvpYAtIIw052diXjzs88rJgMkoZH4gZH4wwF9DYncjSXXJZXg2x0btcs82j8/dl2f3RrvnaX1rwajxKN48GfDswRbvzobM94fMjPj4uSTdQb37qnVcL6QSlBo2WyeK7C/m+c1PFXhkrzmz53bF1RnkNkAYa45fiDh+IUQIeGCXxyN7vWuSI6lK0NFzAc8d8plox8wO+dTL8arxp4/ETiXHwbkcG7vIMecK/ETxdq3FH16c58X5Js3MmONHbSMFri3ZVfL43Q19/Jdbh3ior4glzI5IR89H/OCVFs8ebXNBB0yN+UyP+vh5dWVagBdY5iMxlWeH8Hh8b45ff6TAHZucGyJHM0Yd8/zBNn/1WovTkzFagBML+hdchmY9+hc8qksupYZDoeXg+TZOZJnd2rnyWdft1bayNO1CwmxfwKWliNfeDZhv3Fof7hvFbS1BKqW5NBvzZ881efdCxN4tLl97ssjWEfuqhy6RTsq8NxHxnZeaHJoMuNwfcHmsTeitrJT5SGwNXigZnPXYMJdj/2COL2XJUSnerrWXybGVfMT5zdhCCAqW4K5Sjq+PV/ncYJkB10Ypo7x/8JQZbzwxE7JQjJgZCaiXo+XxxmxaaMi3LQZnPUYWPLYVXB7bn+OJ/TlGb3DDCdKP4bHzIQeO+lyeV/ihIog0QQRBaE5+jLUmchSRo4idlf+Ro4kdRWxplKVJLE0iQXXc0pzxQ48y+aTZaEGxabF5Is9eCnz5oQKfeyB32x7PcFsTZKOt+PlbbX72Zpu+kuTrTxXZt/Xa+o5Kw8RczPd/2eKV93wmij6Tm3xaBbNKA2GqXGBWDZiaJ+O+SeFa4AWSwVl3mRy//FCBezLk+FatzR9emuel+SatpLP34XWmfxPDpRAMOBaP9BX43fE+HukrkBOSWGkuzyW8esznpWM+55oRC30hMyMBraLZiT1NfPkeQkGhaTMy7TFac9ne5/Lpe/I8vNej730qIWsNYWzW6C81EpaaapWptxTtQBOEGj8yS039UBNGmiDSRApiqYgdRehoIneFOENHkTiGKJOUQJUFiTQEqtKTILlGGX5cwq1YMDDnsGOyyP0bcvzeZ0tsHrk91X5uW4KME83pyZg//XmDRivhy48UePTO69kZXLPQ0PzirTY/e7vFeRFwaXObeiVGSTKfws4FH45baHB9i6EZh40dyfHhK8nx311a4KUFIzleLb0P020Lwca8w2cHS3x9tMqdpRwCsxvO2csRLx72ef29gMs6Ym4oYG4oJMhl8s9KmjIRlOo2o1MeYw2X3SMun70vz/27XQrXqNtfBbGCdqCoNRWLTcVSw/zvEGjTN4QZpOQZpAQaRKn0KTSxbcgycjSxu0Kksa1IbE1igepBouaAtUxmepTx7eQWCvK+xYbJPHtaeT5zT45nHr89j2e4LQlSA4t1xY9eafLOqYj7d7t86eECA+WrNyCd6r69djzgey83Od0OmNjoMz8YEVuq53rTD8VG4PnSkOPsVchxokOO6emJ3el8BLYnBXcUPJ4ZqfCV4TIbUxWeektx/HzIc+/4HL4YMpeLmB4NWOwPSRzzoRKIZQlSILASQWXJZuxyjnHfYe9Gl8/dn+eu7Td2NMIHDa1NF73eSgmzlSHPxor02ZE8w4wUGkYQKU1spd11N+26pwQaO4rY1iQ2KWkaSbTTlVfCHN/bq+xvZdtSkuqCzY6LBe7uy/GNTxfZv83tLtpbHrclQYax5vDpkO//ssXogMVXHyuwYej6dgY/ejbkL15scXw2YGIkYGo8IHQ/uoFkoc1ExNC0w6ZZjzsHcnzpkS5yrHckx9Yto+cohaBiS+4r5/jdsT6eGihStiSJ0swtKd4+acYb35uPWKxETI8F1DpSejc0OJGgb8FhbMpjQ+xy1zaXzz+QZ8/mG5uM+SiQKGj5mS77FdKnSqVOI1WbsU9DoFGsieh02VMCTUk0TMdCl6XP5fHPDoEa8rwV0dHCGJ302DOX57G9OX7n06Xrmjy9lXDbEaTWML2Y8P0XmzR8zVceLbBzo31Nfcc40VyYjvnuiy3eOudzqRIyscWnXciqlhiJZiUlkcqrNydcaIHrS4anHTbNeNzZkRx3uuQ8ga80b9ZaqeTYMpLjDaR/s8ItIRh1bZ7sL/C7o33cV8lhC7Nk8NJMzMtHA14+5nMhiJgfiJgZDWmV4h7pd8pAMDDvMDadY7NwuG+3x2fuy7Nt7NofvVsdWpvljPXmatJckT71svQZhB0iTbvukdlcOLYNgXa67KGjiTxDnrHd6a4bwlwm0HTtuhb0rMNr1fEHES6VGS7Zdi7PnU6O33i8wOP7vWserXwr4bYjSD/UvHYs4I0TAY/dlePeXUbSuhqUNlLNj19t8cIRnwtuyMWtPo2KUfXQaTV38KG4NeR8ydC0w8Zpz6jyPFLg7pQc20rxZs03kuNSi3ZGcuyZ3ofkdqRgR97hy4NlfnOkwo68C9qsgz99KeL5g23eOhMwLWNmR0PmhiMCT/VMTyhBrm3KYHjKpRpb7Nvm8un78mwds8m5K2fhXEsr4XZFnEqftYai1jKkuSyFthSNtsYPUqkz7boHgSaINWEMkTDd9cjVhKkUGrqa2NUrBJqROJe77tZqnc+r1XlPt86QpDDK4r3iO5FgaNpl96U8D27L8XufKzHyPrQQPircVgSpNFycjvnJqy02jdg8dte1lcEBGm3NS4fa/OUrLc5GIRe3Byz2R+Yrq7li/GTFNhLAlf6/Yrg2Y47D0w6bpj329Xt86ZGCIXtP0E4Ub9Z9/s2lBQ4stfDVWmOOa6R/E8IFkLckdxU9vjFa4fMDJQYdyywZbCiOnAl5/m2fY5cD5koRU+MhS/0xsdUrXfNVcgPJ0JTDyKRL3pfkLMlwVTLSb1EtSapFSbUkKRckhZzEczCk6QpyrsRzBa5jDiTLNs6PC1aNfabEWUvJs3vmPYgy3fdQE0aKUGsiR18heUbLk0caZZuJolVjoJZGy5QEu9+RDjlm3xFEzzrW2pynXWhYbDnvsS/K8YWHCnzh4TzONTRNbhXcNgSptabZ1hw4FNDwFU/ck2O437pmwwgizTvvhXz3xSbvLYVc3BAwPRYSuenMYfbpPwS30JBrS4YnO91qQ47LkmOieL3W5g8mFziw1KZtzidYM70P3q1X/NJwKQT9tuThap7fHa3yaCVP0ZLEiWZ6IeHNEyEvHvI5UwuZH4iZHg+pV2J0RytgVfrpXy3I+ZLSkkWhKXFCgRMbFRGZmAkbY8DTgpIrqZZWE2e1KKkUJcW8kTRXyNPYnmNOcrzdu+lrIUk0rUCz2EhJM0Oi9Y70mXbZw0zXPQg1QaKJZEqcriby0nHQjjtVW1Lp+Ocq6VNmpM+e79BqtxULBmcc9pzNc9eoy+9+rsSOjWadtrjFK+e2Icg4gXOXYw6fCrh/j8em61AGjxM4fSniO881OTwRMDEccmlLYFZtpJWz/FX8MNwpKYxMGMlx/5DLlx4pcFeWHOtt/u3kIgeW2iuS41rpfdBuVrpOnXBLCDa5Np/tL/KNkQr7Sh6SdMng5ZgDh3xeezdgIo6YHY2YGQtpF66zfFfNYoOlBHYocAOBG0qcQOKGAicQOFFKmPEKedqJwNaCgi3oK0gqpdXEWS1KSgWZEibLUmen6+58jLvuWps66pY6OxNIjbam7WuCSJku+/Ksu+nGRx3pcxWBdrrxpvu+atzTMlKosjQqPQ6jU+coTb4l2XjR447FHE/ek+e3ny4uD42JW5gkbwuC1FpTb2kOvhcwNmixZdS5ptqHUpqpecVf/rLFyyd8LhZDLuwIaJTN5redCjTQaWNdwQcers1428iEw+ZpjzsHXb70aJYcNa832vzbicWVbnX2+mulf6Ph+trpe1Kwu+Dy1aEyvz5YYpPnoDU0fc3J8xHPvd3m0LmAWS9majxifiQidE0qV9w/I5iuhKcVkYb0ykPHLZUZz3IDmRJoSpyBxI4Edmx2+zEEavQp7USQk4JqviN9ipRALSpFSakgyOdMdz3nCNyURHOuOSrXSsnzg27AN9rkPuj7k05aNn1NraFYbCQsNRSNjApTo51Kmp1xz+zkUawJrVT69LQhUFcRe4ZUo8zMu7FNb628ZLPjrMf+co7f/kyRu3e6V0j3N+NZfxXcFgQZx5qJ2YSmr9gyalO8xgl1WkOtoXj2rTY/fb3NBRFxbmfA4kCMsjpksPLYqxvzasnmAwnXkGtZjE44bJpy2T/k8sWUHPOeQAFTYcJfzNR4pdairQyb6LRL3rnBr+xOiapXuE4Js+OWwLBr84WBIk9XC1RtyywZrCccPhXywjs+J2ZC5isxUxsjlvpj0xB6PT/m3ivubLhpENcswzXDNSIlz6zE6Xb+hwI7FshlydMQqZ0IXC0pe4JKKSN9loz0WSlIinlJzst03x2B5xkp1JbpWOr7xPU2u1/lHteL7rx0xj5rqfRZy45/NhX1phn7DCOMzme4MgMfRppQGNI0kmequuSZCqwsWWxouzy01+UbnyvRV5JrPuNa/h8mbnmC1Kly9+W5mNEB6zrI0eibvXE84HsvtjjVCrm4LWBmLCZ2Oo/aYYnlq26a25CjZPRSb3IEUEAjUcxHCeFN2q7+atXcK8xK9Rz7bIkjBHGimZxNeO1owMtHfM42Q+aHDTk2K+nGtstYuzxW3GT8ut0dv1/dLZTZ8drJEmdguvFOILFTiXO56x6DnQgcLSg46SRRZ8yzQ6QFQakg8dx04shLu/GOGft0HEEvTZZe5fx+8EERx43mpxPfSJ/pzHtTm257Q1FrGXWmZvtKqTMIIQgVUWI+LONDNr/2WJ4n780hpZnk6YW1/D8s3PIEqTQEgUZIcNd48bKIY82JcxF/8XyTY9MRF8YDJreG+F7v2dmb6taCXFswOuGyadLhrkGPL34qv4ocPwz0quJuv253BzqVJs5Nxrz4ts+bJwMuy4jp8ZjZ8Qg/p9Z+/ut0A1f4fRhutCFGN5ApeYKbGQO1o5Uu+ypbCfKWmV1fJs3M5FGpIMi7whBoduLIASfTdX8/EOKDe2/WqvMsridOFkqZM36WJc90Br5DoM2Wph0YlbXtGxy+/KkCpVQTZa1nW8v/w8AtT5A3gkRpLk3H/OCFFm+cCrjYH3F+V0irlKxSbV1L2vgg3Z0xx9GLDpsmHLYVHT7/SJ67d3V2v+5cc3Ptlepd29/8vfJ6pY0EcGbCkOOxSwEzhYTLGyPmh2Oi9yORa71GOD38PiJ3yp5W3BnrNN11I3kaCdQJBXbaXTcz70ZStRJwhemeL5NmUVIuSapFQbkoKORS0nQE7vKMO2bWvUv95WrkcLWwblyrmV8t/Gph3ejOU7c7SYzaXb2l0FowUDESeided/wO1vK/2fjYEKTWML+k+NmrbZ472Oa8G3JuT0StLzFqCWs3hw/c3elWj110GLvgUI4l2zfYbN/kpAerC0jXG5hpiZvk1tmcdcog/e2MOa7hRpvrG23FifMRZ5ZCFgYSJjdFLPXFJNbaz7+mO/OqdYf38vtI3WKlJHuFWwnYocQLZDrjLvA6XffQdNVlbCROOyOB2gjyTjruWUgnjcpGCq0UjPTpOum4p7eiruR5EtfurbJ0LfK4WhNfK2wt/xtBNl+9/nf7dT/HtdwfBj4WBKk1tH3NK4d9fvBSi7NRxLk9IbMjMco21NAZ1L/ptjaNZGTSZuyCg9eSyzHMVO6V9s0JxzTp5XDMul0tUn+6rjfllPVHaDRGvWNhOGZqU0yjrDp36/3817L16uuyuCLuR2Kbhnil/1r2lfm2lMCOzBLKrNRpxj0xXffELMWzIrBiY2wt8CyxPOZZLgiqZUm1ZFMpmnHPXG5lrNOoL3UU5q/edb9aM+8V1svvRrEWEXbs7vBuu/t/L/fNxseCIMNIc+S9iO8+1+TEQsSFrRGTW0MiTy9/9T8sW2hBriXom7HwApl2KdMYYnkgbLX9QYdDVzjL4cvVvcrupMfqcGFItV1QLPUnhB390R7PvcpelkavL5xecd6PbbJ8pX/WFmv4L4d3SG+N8KydrjBa091ta41UYIekZLlCoo4vcCNDrJ2JIrlKdUngSkEpL6kUUwm0bBm72FltJPC8tLueUZb3HIGVKsx3N/druTtYyz+LbvLqJrxucuzlnw3vYK10Pwzc9gSZKDh7KeZ7zzY5eCHkwkjE+d0R7ZLq9Yp+/G3N1d2wTIpa6/R/Nl4nPGP3TKf7vmv4d67v8jdJd8K70Z3GddrLaa4RjjB/e/nTaXjd/t121/Ui43+t6zv5Wy6rrvxmyDPbbTcTSAIrktjpTLuVdEjUuB0EeU9SKadqSiUjiVaKgkpBUihkCDNdotnR97StNOudHPWghF5+3ehFar1IL0uQ3X7d4d3preW+WbitCVJpzcy84scvtTlw1OdCMeL0vohGX4ISptJ1D4HrY2unxNPbrU0zTBvpilun8TLudPyxE3/5+u77pfZy4++0+4591fxkomUvXeMeV9idvHb734idNrQ13WvZnQbaeVY60lnHXuO6TBlfs2xW3c9IplZsthBb7rb7AtfHEGiq65lVW5KxNm4FrmukzCxxduxiQZBzjZaI5xjy7EweObZZ634tmugmrG6yy/6/HtN9bTbNtdw3A7ctQWoNjZbmpTd9/vrlFheThLN7IuZHEpSlzJsrtHlpO2/yx9mtuap7pVGKdLKk49aIZd3LNJ7uur7zigi93JiveX8M5a2K3+XWy5KkCe38MXGu132VMrmqeyU9OqOJQqTp94rf5U6vI0NgV4azUuZky5iuMiMt417366S/lttIpFZiJoeWxz1T8nQDs3yz02W30/FOkZhLBWDbUMwLygUzy14uSmMXJKWiJJ8z3XbXSUk0nYF3Ml33DrLk1rGvx0hpZrI7pnOtzKwF7fiv5b4ZuG0J0g80b58I+cEvWlycNZMHC8Nmsf3yRAXCEIE2L5ZBx/1xCu+EdcJZDl8mvOVgvUyWaJWGp9dh4pro6TWrwo1t2nKP/C2nm+Zv+bo0Hqn0tHz9cpIGy8+Yuex63Oltr1pGZMswG38lfKXBdV/fiZdFml6nMXfKQKTpZa9ffmbQpPXRKQNNGr8TNX2YND2Tp0wZX/E83eGd9Dp1IJCJxglZ6a77Ajs0k0RozeqJJ/N+CMxphZY00uUyaRYFlaJFOZ00KuRNN72zQYjrSnKeNGvdnSuJsBchdv53k2TWwJWE2O2+GbgtCXK5a/1im1PnI+I4K1JkXv5u+2MbrjOBaSNL/ZcbJCz/1x2SzISbaZM1/LP3zzR20nZ4RT6y7k48OmErec3m89rPePXw5bTWCEf3aFBCXOnf+d/jepYJq+MWkHavs9cKTLpX5A/z7OZvdx11Eu2BNJ+d5xNZdycfmXDozrdJf7kO6GQiWwed+Gv5dxLtXA9SGkIspdJmpSgplyxDpiVJKS/J5ySua1Ydmc1BVpPhWnYvQ+fZU1xRnzcBtyVBJkozt6i4PKMIwrQ7vfqN+ETZpgZ7uc2LvtoYqbGXm6x/liwz6a+8Lmu40/su56eTdiZf3fZKfK54tuu1u8ugl23ak8jcJyOhXZe7Kx0hEBn3SkNOu+tZdNUDJteZ8umQaMfO5neN+6+Rv9X2lenSsw5W4q/ln72+9/1XSEsII0GWi3YqfVrkc6ulxo7Jurv/Z9PL/s/aNxO3JUGuYwXd1beqAXY1Sq01Sq0myI67286a7vus9b/b3ev66033/aI7jWwj6vW/l99a7qxfp8FmTXd4Ftnn7jbZ8OtBd9rd7ix6lfNa/r38suj271V2a5VPN/n1IsRu051G9z26/98M3LYE2WwFvHL4FKcuLeDaDo/ds5XtG4dw7Cu3c9daMz2/xMuHzjAx06BzeoEQMFjN89g929k02o+1xuaAjVbAa0dO896FeYJo5eiDfM7hoX2buGPbKDnXbAB6PVBas1Br8t75y7x7boqJ2QbNdkzOs9kwVGLP1mH2bBmnv1pcladWO+DN4+c4fnYGP0zHDzMQ6ZhRteSwfUM/uzaPUi0X6UgpSqlVBJglxV7/tdZoBbqz9ZrQgOlXa2WOK82+n9350UqjlE6vT2ecU8k02xg7cQSg0267SE/yy0KkM8wmblfDEJ38GWhlEhIdpe/lxmV+RBqWvV7IrganSccQughAsDItIwRCCrPhQrrpQne+Sbff08o8YPdHiLQcsu5ldO0apLXZ3UQIs+WSyHb7u9CpOzp1k6aVveeacUnLVOv0z5X1u6pMOmUhhCnHVWUhkKRkaKUEKASWbSEtiWVZV5BjljyzZdqrfLvdHyRuS4LUWnPk1CX++z89ysvH+7Bsj7/zRZu//WtbGR0sdTcdtIZDJy/w//7jo7x+so9IlQDTCDcPLvCPfn8LTz+wEde58nBzrTXT8zX+hz89wF++lqPuD2I2A9MUc23+q9+u8Luf20x/pdB96RXQWjO/1ODAwVO88M4cR86XuDDtMVdLCKIE17bpK7tsHoE7Ntb5zP0lnrhnK0P9ZYSA2cU6/9N3Xuc7L2gW2yPLL27mBkgB+bxkfDDhyTsVv/nkCDs39yOF6EmCnf8dd5IkRG2Fv6AIlhKCpkLFhthsT2DnNYmvSUIojEoKwxJhrTQelWjChiZYVIR1TeSbSTNhaaycximBW9ZIr0OWENY1rSlNVDeP4fZrCqMay7uyMYQNaF3WRA3jFoBbFuRHBU5Jk4SacAn8eUHig7QEwgIVa9wyFEYEcUvQnhaodLd2aQlyg1Aal8h0LbROoD2raV7WqHQHGmkJvKrAsqE919n0QmC7kuKoRWlM9iRJFWtac4raxQQVmZVIkH54dDoGmXF3qtUpQWmjwCmkHhqihqZ5GVQEhVFBfujKMgJQcZr/SYVSGsuD4oggN5gdBkk/UDH485rmhHlWBEhb4BQ0Qgr8xQxFrPDlMrLkZVmC3KCktNGMi8YNQXsW4haGDF2JUALbk/Rvd8j3OUh5dZLMmu77Ze2bgduSIIMg5k//+jX++bc0707tReHy5B2n+L/9vXEe2DuE3bXmSmvNm8fO8t/966O8fGID7WQ7Srs4coGtg6f5J/9gM198ZCNeDylQa83k7CL/5N+8wHcP9LHg7yahihRNyt4E/4ff8/g7X9nCYPXqBKm15tL0At997hh/8WLE0Qv9LLVH0bjYYhFbLKHwiPUAGgfPXmDfxiW+9pTga5/ezNbxQWYWa/z3f3yAP3vWZba1l4Q+hGhjU0MQmy+BEMQ6D8JhrLrI3/psyN/+0gibx6p0pJe1TBJpmjMRUwcDzv08YO5YhE4ElmckxiTUprEq0Ah2f81h+6+7WDnTuKOWonlRMflqwsQvY9qzGssVYEESKgSCyjbB+JOCgbvAHdAgYfG45tz3NfOHTMPu3w/bfltTvaNLqtOwdBLOfR8TNwLhwMB+wdavaio7oHZKcPHHMH/Y0IBOQEWGzIYfhG1fFdTOCM59XxMsmFff6xNs/oJk2zMSOyWjxIdLzylOfSchWDAfH7cqGHvEwi0Jzv0kJqobAimMSXb+hsuOZzysdCPnbKONWppzPws4+oc+sW+IH4xEmYQanQikCzJ9/VSsUSH07xPs/Ts21Z0mLRXC9BuKd/+DIgk0m78k2PGbdpreaoR1zcTzive+lRDVwS3Dxs9Ktv+2wM68qlqbj83kLzWnv6WJammZDEB1j6nr6VdAuiBsI+UrBco3RGl5AmGZseYkNPW94dOSO75pE8xpLvxEcfHZJB3ThCQwr2l1q8XD/9sKY/flsCxrTYLsJkl6EOPNJEjrH//jf/yPuz1vZWituTy/xH/8ybu8dmoj7bCKxqLlh+zflrBrU56c20MSRCMJqdUnmG8USJTDPVsv8FtPWjx17whDfQVkjy62WF56lhBFMyzUE5phhbHqFM880ubLjw6yZazcs2vfgdaamYUa/+lnx/ijnyQcurCTdlShmjvH/s0XeHJ/ncf2Bewcr1F0LhKG0zSDQS4vDXN2MsCRS2wdy1Ep5hBCEUezLNRDmkGZ4cocX7p/gV97WPHYnTEP7g4YLs9Qa4ZMLQ2w1GiyYzxh+3gBmSr8dswqcgwVC6cCjv1JjdPfbxI1EqpbJOMP2Wx83GZgjyBXBh0pVJjg5BQDd0rK2y0QimBJcflAxMk/bTP7ToRThIG9gvHHBcP3Q3kMLEfhTyfMvxXTmkpw+jRWUaV9RoVqJyQ1RVzTCEeRH1cIr4vIE4UQGu0rdEtR2Z4w9JCisFnTnlVc+pGidlxR3qYYvE+RH9YQJohYUdig6NsHblkhEo1qKpycZvBexcA94A2bLq2R6gA0IlGopsL2FMP3CobvF+RHNVIr4lpCrk8z/qjF0F2S3GBHtWel3rXWJKGifjZi8XhAaSNsfNxicJ+gtNGkr8OEwTth9BFJ3w6FW9YkSwleVdN/FzhVjUoU7YWE2ddjFg5F6DjBcjSl7WAVr+wNKKVAJ4hEEdcUyVJC4ie4gxpvWKNRJEmyXKagkEqRLCmcnGLkQU15qyZaVMRLCYN3aYYfgOoORa7PxPMqipFHYXC/prRZY0lFUk8obYHCRrj004jJZyOK45rxxyz6tkmITT3nBwRjj3gUR01b7ZYUu0mxg6sR5c3AbUeQSsObR8/wnRdanJ3dhCMuI0Wbdlymklvivt15Biq5VYUmhCDvOYwPFTg/eZF3L5UJ4jxP31Xjb395nN1bzNjlWgVt2zZjgyWCYJ5jZxNmG4NsHVnif/XrfTx29xiFnLvmtQDtIOSvDpzgj34ScOTiToSOeOyOKf7Olyx+7/ODfOmRMZ68b5yH9/bx8N4CezYpovAyczWLmdowk7NtRqoBOzeV2DLWTxItceK8IcBNA01+/8t5vvHZcR65s58H7qiwaShiYmqaCzMF2r7NnVsT9m3L4zr2qoa03IAjxcJ7Pu/+2SJzB9v077bY8zsFdv+NAqOPOFR3Sfr32ow+YjNyv0Vpo6C0UVLdJXH7BVFbcfmFNhd/1EYHmg1P2+z8PYeNX7Co7BGUtkHffhh6SFDcoEnqCfUTMcGswu5XuKMJuVFDOP55QxiqpbFKCe6oRouVRi9zCm/YkFY4pei/TzH0lMbKKWpHFYtvJ1R2aDZ9TTP4KU11n8Ib0EgUhU2K4nZNYSPYJYU/EWN7ig1fkFT3G3LrlAlC4/ZpnLKiPRFh2YoNX7IYuE+QH5M4OU3rTER+SLPlGZfqbvuKrufyhyjRBPMJ0VLM8AM2W7+aY+BeSXGjIJpPiBYjxp622PTrprzciiauK3KDmvIesEomjdaFmLmXI3TbkKhqK9wByG8CrbvIUWqcfrDLitaZmGgxRocJia/Ib9bI/MqzaqHw+sGtalrnEmwvYcNXBMWtmnAuwfY0Y5+F4aegcofAKUPrdExuULPlaxZDDwnK2zSWBUlTUd4qsFy4/GxArgp7fj/Hpi+4DN1jU91uoUNFeYNkaL+L12faXZbsOqZbesyaTtysfTNwpch0i6PebPPKkUnOzQ6SKJu8dZyCdQh0wmvH4fSlFmGUdF+GY9tUSwUKOQ+ZFmjOc6mWCniOfdVCtqSgXMxTLuaxU0nRsS0qpQJ57+rkmCjNyXNT/PjlRY5fGkdrwZN3zvMPfqvE3/2NO/jsw3dw585NbNswzL4dm3jqgX1889fu47/6+kaeunOCorfEe5eH+e6LTU6cXSTnOZRLK/mw03wM91cZ7q8wOlhluK9EztMgYmIliJSZGOqQ43LD0GZyxJ+LuPjTRWrvNhl90Gbv75cYecxD5rpmt9G4Q4Kxp1y2fNWlssdCo1g6EjD7UgtJxOZnLDb/lkN+HFR3o7UV1btg49dg4H5FcC5k4UCIP5WgkgRJguNE5KoR+CG1gzGNsyFRGBHHMUmSGKkniREixpIRQhv/KIiJaxEyicgNR1jVmEQl4Cr6HlRs+y80o1/R2P2KRCVonWCJGEvEKGXSXU5fGelqJV6CJSNQcfosCVolSBEhZXwFOXVMp4yloxn9lMP9/6jMtt/KIVOpWCuFJMYSEWDS1lJR3gu7/2vJtr8j8cbSceFmTPNCRDQf0n+XYvQpjVQRzfcCgkVTPt0miWO0SrBEhJeP8cox/vmQhVdDotbqZzbPvVImWifY/YoNvyXY+b8WlPauvD/oBEvGSBGhUSitsEow/BnB/n/oMP5liQpjaEcUhhK8MY3SCmFD3z6be/53Zfb//QqlLeaD3W066HZ/FLitCFJrzcWped56N2KhOUjBa/LM44M8uMun4NaZmC/zxokGC3U/Mwz90SIII948McGR80WaQZXNg/N87ekin35gC/2V0hXkKgRUS3mevG8n3/jsIPs2TSFEwlun8rx9qkWjFayKP19r8JMDB/mfv/1z/qdv/Yx/8ac/5l//xescOmUTxWX6iiHDFYlrWz1fPhUrFo40qR1vUN4o2PjZAqVtjhmU6HpxV5FlaofzMUuHWsQLAcOP2Aw+5GLlV9LPXquUaUzeGAw8JihuSfBPhzRPRsRBAsQ4+YjyvoTyXkUyGdM6nBAvmWuzjRlliEUIQwIajfQSHDsmmY8JZxKSMNONvIK8EqQ0JAur42Sv0VohZWRIg5Vwnd5fEqFV73uspHHlZJgxCilibCtBZqTkrEmSBJWYcvbPhNh2QnG3prBLkxuOiS6H+BMRSXwl4SVJgtbmGfMjEQMPg1uMaRwJabwbEkfm46KU+WigDZlacvUzddc/WiFliC1j0MkVdQ0gHYWbj0lqIa0LIUnQ4+Pc47pud8fvo8JtRZBhlPDOiYuculwiiPPsGq/ztc/s4IuPjDJcWSCIPZ4/GHB+qoVSK+o4HxW01tQaLY6fazK1VEEKxSN7NY/cOUi1nL9ClziLYt7jkf1buGdnSMlbotaqcuJ8zNxSO31hNFrDdG2c7768mX/+F0P8f749yP/w3WG+dWA7p2d3grDYtbHFljGJbRmC7H4Zw3pE/b0GquUzeLdLcauzrIrTibPmi600rQmfYKJNYVhRucPGqawe5+w2SqUkuQFK+wQWMdGFiHghRpJgywR3IKG4X5EbSQhPRrTfjUiC1SQkiLFljEhJS9sJ3mZNfnNCcCZk8ec+7Xcj4lpCEptrl++fSkG2iLFkAqkEmA3PxrNEjJWSQcdfY6QoSxopc9m/xzOvbRRCJNjCkHR3eCfNOIzxL0dEl0IKY4r8drD7FcVtoOshrfcCkrA3SWtlSNjxEnJbNZX7zDWNNwOi+cw1iUKpBJlKkNn8dJ7LQCOkwpbm+c209gqJaa3Bgty4RfUui2Q+YOr7S9TebhLNx+j4yo901mSR9bveeB80bhuC1Fozt1jnlaOzTC0OYImQJ+6S7N1W5ZH9W9g6NIclfI6d9zh+tkGrHXYn8RFA0GgFTC9atIIcnt1i3zaPscH8cjd/LQghGOovs3ODS3+5TaJtLs1oFupROiNoVnKEST8z9a1cmN/GxYVtTNV30gh3EOt+EuVyfrrA68caXJ6t9XzZgvmQYLqFV9IUNzvYRdnzRcxeu5xGrImmInQtoLBZ4o3KZXK9lsHROCMKtxqjF0PiWmLIQkYIGWNtVOT3KmQUER4LiS6vSDtGr1FhWxFSmC6u1hp3o6D0hKSwW5GcD6l9r0njBZ9oIkb5qwmMVHqzZIRYg5xWxRMRkpXrJQrb6lzfmxhX3S9Tjh0j0FgywbLiVXlYTXCapKmIL4fIJCS3RWP1gyiAtxEcLya+GBLNd7r/VxJ8h8yskiK/V5LfrInO+bTe8VGpPq1GI4XGtmJsK17eXOPKvANaY8sYSyTLBLkaGqdfMviZAv2PuOilgMk/neXyt2dpnm4TN5NlncteyN7zo8ZtQ5CJ0pw4N8mRsw71oI+Bco2H95YZ6SuwY9MId23XVPPzLLZKHDjSZHqhI2l9tAjCmHZgkSgLz/HpL0m8HrPsveBYFgNlj5JnZm4bvqIddFQmzDK1vvxFPrXnKL/56Al+61Mn+eoj7/KZfW+zc+BF8vYlzk738Z+eEzz39hy1pr+6TDTEtRDaAfk+cPsso7KxBjrXdhpyEiYk9QCpQ7x+sAqryfVaxiqBU1aIdgQtM9ZnWzFSJAhP4+wCd7tGXQ6IToToZoe09DK5ySy5CY27TVL9ikfpaRurlBC82aTx/TrB4QDVWCEsIbQhDRHDGgSnDRtgywTbWpEUjb/KjNetkG+WFHuZbPmBRqYfBSszQbTKKEUyHxGf83EqCd52CbYGS2OPCrxNwFJANBmmUmCXBKkVUkRYMkaTIAc1xfskjpcQHfMJz4epUj2gVSoVr5RJNwQYIk3jrexS1AUB3qjN6FerjH29j/xGSet4nUt/cJH55+aIFsx9u8vmVsNtQ5CtdsArhyc4PzeExuG+HRF3bC2Syzn0VYo8tG+U8f550JIDRwUnL7YIo7g7mQ8dQoKUpjEoJVF6zVeqBzSx0sRKorVACpF2y00KQsBI1ecbT3v87785yn/zzVH+m781xv/x727kH/5nA3zh3knK3gKnpvr52RsRZyZqV9xboLBEhO0prCvVQK8JSyQ4ToLtmtUTayE71ipEuhpFamy7Q4oKIZQhPakQQmANWeTutHCrGnWqTXIugnT+TQqFI2OEuHJCTlQEhcdzVL5RpPiQi2iF+M/XCN9ooRsKNCsEKWNEqprTq5EKYcYgpYwQciXcSH+mi93dGegmw+6wjAsp06GCHs8BoAJNPBnAgo87IrCG0iarQZYF3jYLGUck53y032tYSWGlkq4UGulJnG02+bssRC0gfruFrsdGeVxoLNHJz2qVGtJ6E9KUvSUN6cpMvKzpQBYklYdKbPzPxxj5Sj+2nTD/k0mmvzdBNBeuEkCvVm4fFW4LgtTp5MzbJ9ssNPrJ2XWevDvHhqECUpgJiLt2bWDXeIuc3eDibIU3TzRZqAdXEMKHC03OtSm4EZaICKI80wvJdXf/gyhmZiGi3jLM1VfUFHOr1ZFynsuWDcPctWsLd+3ewt27t/DIXTv5jafv4tcf72Pb6Bxaa05ctDg/FZEkhnzAfOXtnFFZEa02uhX17jH1gGksAssDS0ToZogOTCPv1VCy1wFmk4dQIcIQy4mRjjZkK2MsYY6SRYK1ycbZY2G1I/TJNnreSC1SKiwrwpKqW7vG3EOCNWyTe7pI8XNFnLxCHaqRnGhBkunepuOY2bytSqsjQWbikRKnkaKSZf9uSSjb2Dv/VxOOxhJGapOiF7kBjRh9ycd2E9ytNqJkmqxGI1yBNSxxygout0kuXymVmXyuHi+UJQv3Dg93FPTFFvGJNsTafCzTj4ZMlyVeaSSWFDhW+mHLrBxa00iBXbWpPtXP2Dc3UNhg0To8w+ILk6jwyg/DrUKO3C4EGUYJb5+4yKnLFYKkDLrGSwcv8f/8d2/xj/7FAf7h//cA//I/vcvZyQbQJIhL/PJwmwtTzVQJ9qNDuVhgfAhK+TahyvPOKZ8LUy2Sa+RLKc3EzAInLiQstgo4VoutY4LBPq9nQ+5GznXZPl5lrC/ClgH1lkWtqVfdVyBwqkYXDd8nXmyjY0Ogve7R8evY0pW4/TZuTkGtjW7GV1x3RWPpGA1iKcJuBjgDAqtqIa0VCVLKdBODko27J4e7xUJOthCnWohAY0sjQVqWQlq9t8uSUiLzFs7eArl7c1hRiL7YgkaSklOMLZOrSkFSkHalV+IZf51KZisSaPa6jnstf2NAysSMpaZS8yqjgIUIOdvG6dPYIzYi0OArY0KFVZTYGyxkw4eLbVOumTSkAEumM+XpqiRhCewRB+/eAjYR+lgNpiKkFDiWwrYSrLT8RfdmEsJIkYZIFcJaKetu+4q6cC3yO0sMfHEMx1X4784RzbRX5TdbbrcCbnmC1Fozt1Tn1aMzXF4aJtEF2vE4Pzu4iX/z1wP8j39Z5V/9qI8/+sUoRybuox2PkWiPw+dyHDvXpBVcn7R2MyCEoFLMcfeOKhsHFtA65vWTeX78yhQXpxdRa3wptdZMzS3xVwfO8MbJPM2wwnB1kb1bLPrLue7ovaEhShJipdGYLm3aeqDTSKXA7c9R3FzA0hHhmQWSeX85ieyL2+slFpbAGcvhjtjo6RrJRAMRryV5dCn+NhPE5RZWEuKM2th9DrbsTBJorGyjHM1h7yvgFDXyTAMx4WMtSzsK2dUgr/ift7GHHJwK2EGEDDXSAttJsImQugc5CbOVGVphEWPZMWKVVKWxRYwtYlO0XWSYdV+tPC1pJDFLsjrPQiJ8hZ5sIpea2FEEp+voN+dRb8yh35xHvzkPJ2pY7QA7CRGzHfLPlLnASMAZgpdSIgs2zo487r48crENRxaR7RjLMmTaIchuI6QwHwdpJn8kJt+9zPK9skTpWngjeXIjNvhtdGN1++xVbh8lbnmCNIrWlzly1qLWrmKLGTxxDocZbOa7zBw5cRpbzDHfqHLgcIup+a7Jmt6ctIxEad4+cZZ//sc/4b/9l9/nX33rec5cmiXpMSPZjc5QwB989wX+z/+/7/FP/+CvOfTeBHfuHOOh3T4DhSlmlyr8+fOSf/P947xz4jxtf/ULEoQxR967wB/+8HX+7OchZ2c24Fktntwfc/+ePgo5L+W4q79AtWaLg+9Nc27aIU7yDJQSBisSx1q9OkHmbQp7ByhsyhO9N41/ZApacTremYmXfeEREChkrHHHCuT3VLB0RHxsmuRSHaFWGnu3kVIiQwXvLSHOLeEMWNibC8iCjSXNzLQl9erG5kisbUWcPUXspo91aglZ89MubhqXlcOsJOY+2fW9liBV64nNDHTexilZWH6AtRhgqdWEYFkWFgKrFmLV27hFgV02CwqklFgSQyRWsrxevLtRC2HWKHdWH15ZFpiPwvKwQjYPAlGLkJfqWERYbR9xZA7emkW8M4d4e87Yh+aQlxvYMsaebyEvt5AiTcOSWJZIPzoJVmbnHMuysPpzOHf14QxZiHOLiNNLWCrCljEyJezuddKWZWHbAied7bbsK4lRLg+fKKTuIlohEVph6QhHxpCsJvRbDbfsUkOlNJMzC7x1/Aw/fOkYL58YpR4MsHP4FH/r84Lf+0I/v/FYiV97tLhsnrrHpmifZ26pTiMcpd5sUM7N4NkRSZJw/MwEL7x1mpMTQ/hxieHyRcq5JWYWFjkzMcOZS9OcujDFs68f4T8+W+fn7wwyXwvYv71Is9Xg5XdO8s5pi4XWKAV7ltHqHM32ImfTa09fmua1I6f585+d4kevVTlyzmX/9iIP3DFMf1kyPTvJpXmPqaUhTl+OOH3+ApPT52m2myw12hw7fZEfvXSQ//Tz8/zo9QKnpneCtnh83yx/9yv93Lm9nwtTcxx45yRvv6eZbYySsxcYLc8QBEucnZzlzKVpTp6b5KevvMcPDsScvLwVITVP393kiw9VGR4orqJWrTVW2UXohPjCHPGlRaQtsfpyCMdGpIRKSsk6TEgu14mOTkErwhosYFU9RMNHn5o1fmUPWXQRdhdJahCtCH18Dv3WZawoxr5/GHlHv+luTjawZhrIDQXkpjLCyWxgkLORnkQstrAu1bBqPpIEa2MRubmMbMTIM0uIWR9pW8iCg+hsrdVKEKcXYWIJa2MRa/cAsuggmgFyYgmhFHK4gCx7iPR+QgHzbdSRacRsA3tPP9Ydg8g0Tyz46LPzWJ7E2T2IrJihj1WNPVLouTZqtmnSzTsrZSkE+DHq/ALMN3C2VbE2Vcy1AJGCc0vw3izWpgL2E+PY+/ux9/Zh7ali3WGM3FPB2lHGygnETAPpSsTmtOyERDRCxNkFQ8C7+pBVzzyfEEjLwsrbSEsbgpxuIMMIKy9x7hjE6s+vxM0QHEs+6r1ZLFfg7BvGLpulvZ14uhURvzuDOr9kuviVvKkTKSFMSM7MEx6+hDOQp/zYVpzKlffpLsu1TBbd7g8CtyxBJkrzyuH3+Lc/nOLZg31M1bcTqxwFp8HXP9PH1z6znYfvHOOeXUPcs2uIu3cOMtrv8sbxSY5erNAIx6j5Oc5dVtQaNVyrzfdfnOD5Q33MNjcRqQL1lub4eYtfHpE8f1Dw/EHBCwcFb57Mc3F+B81kN4PlkPt3W7xy+Cw/eMXi3NwW/LiPIJKcm4JXjkleyFz7ynGXMzPjLIb7kLLEZx/wuGd3mQ1DVQYrmqXaZaYWJLP1Uc5cznH0nMXBMzGvHGnwizcjfvqmwztnR5lrbcexIj591zz/+TNVnrh3FK0V33vuON95MeH0zGba8QBBZHFxBl47YfLxwiHB8wclLx7OcWpqI5FyuWfrDH/zMwXuv2MYr8eWbkiBM1hA6ITk3AzRu5Pomo90baTWECXQClGLbeKT04TPvUd8aAIShT1awdlQwap40GyjTk2jLy0i0Vi2hUgUIkgQrRAx3US/NYF64yIiSbDuH8W6ZxTLs5H1AHlhATlXx+rLYQ0VkZ6DdOyVxllwkSis6RpWvY1laeSmCnJzH2KygXzlAtaxaYQfIYuukSSbEfK9OcThSSxHYN01grW1H5lzsD0b2WzD+XlEK8QqukZyDmLkbAv95gS8O421uYz9wAasoZJJsx0jJpbgwryZLBo2Hx3RijImRE3ViV46TfjyWaxKDntT/0ojDmKYaaDPzcNCAzmURw6WkI6NiBTicgPenUYuNJB7BrHvGUOOlpCDBeRgPrXT/1UPGcdYE4sIP8Sq5hCeqTtruom8MI/UCdZ4CVnykJ6zIhV6NlbeQTbbyMuLyDDEqrrYd4xg9ZsNXJbjIhCtECaW0GdnkBa4m/pMuXlm2zKBQC+0iX5xkuT186iZOlY1h7QsRCsiOTeH/8JJaPsUH9hE8d7Ny+S5lukQZzcxZu2bQY5wC293FiWKb//sVf7pn0S8e3kPse4DoGBP8t/9fsh/9pVNDGT2YNRac/riNP+n//EN/vqdfbSiDQAIEfHkHaf4nU9HfPu5RV5+dzeBGsVMURh9r17QWAghuX/rcf433/D4xevv8b1XtrHob0fjpDOXaynKSjQW/YXL/D/+C5vf/dwwxZxHyw9568RFfvDiDD95I+DM9DB+PAICJCFa2ygcbFFjy9Acn7tf8LWnB3lw7zDlosfU/BL/7I9f4U+eHWKutSfNhwbSGUqt0/lNjSAib09y/44a3/xchc8/PMZQXxGd0dVbvaROk7QCWq+fpv3qKZKpRQhjRDWP7Cui4wQ130D5MbLgYe8awXlkB9bmAZDpdmiXl4hePU184jI0fLAEsr8IOQdVa0OtDZaFGCgi7t0I+zegczb6/Dz6l6fQp2cRsQJbInYOoz61Hb2xurpoaz7i9fOINy8Y9yNb0Y9ug7Pz8PxJxFwTLAmeDZUcIkyg5qOLLty9CfnQFiilE11Koy8uoF85gz47ZyS3/jxCSvRCGx0niE0DyEe3IXePgBDQDFBvnkcdOIVuhsbPM5J2Z7u5ZVtpiBNEJY/3mb04j+4EQEUJ8YlJwp8dRU8tmYmxvIvYN471xE70xCLJL07AUtvsLbapH/HUbtg1vDzEs9xsNTCxiH72XcS5eYTS5ll3DsNgEV47C81UnaYvD/dtRjy2w5Rxh2CURp+bR//0GEwsIjb2Yz9zD2LzwGryaQYkr58leu5dCGPz3g6XcR7difPE7uX8qMuLBN99k+TMLMK1zXswWEIgULN1tOuS27+R0q/dizNSXUWG3due9SLHXgR5s3DLEmSsFH/9y4P8wQ/PcGHGRWkz/lP0Yv7eb27l15/YSaW0MmHRGf/7F3/+MgeOKPzIbCIhheDhvQ6fvr+Pn7xynoNnBHHirrpXL5iKgLu3w+98dgsvHzrNc2+HNIJc2tm8OoQQDFc0f//rO/n8w1vIe+aeYRwzMb3AkdPzHD0Xc/JizMSMT62ZUMjbbBzKs3NTnn1bJPfsqrBptA8v3YVnbqnBH/7gVX708hK1do/9JzUgNFIKRgfy3LerwON3Vbhr5xB9pQKwskqjQ5SrlYo1KkmI5+uEh88THruIWmpCnJgG79pY4/3Yd23G2jYCnlE/yjZaHSWoC3PEh8+jLs5BkK78kQJR9BA7RxD7NqL7DVmjNXpiAf36GZhYWHmUjf3wwDYYNx/GlQANF+bhzbOw2ELftRFxzxbExCL6jTOIRBtyXGgaKU0K6C/CnRtg9zjCW9mYRIj0sKuFJhy9iH5vCt0KTL4KHmLbMPLuzYihsnl+gFaAOnQB/c45iK/8uPZqrLK/iP3QTuy7thiPRBGfukz00gn0YtPcz5LIHSPIh3agLy+SHDgJfmT0E4fKiId2ILb1IEhATNXQB07C1JLxsC30pn7EQAkOXjD1B5B3EXs3IB7ajs4OnQgBrRB99KIpw6EK9tN7EeMrEq9AoFsB6uA54tdOrdy7lMO5fzv2Q4b80aBm60TPHUHN1ZHDFfRsDd0yJC0qOdz9W8k/sgerlLtCWuxlusmxmxh7lfkHhVuWIJXWTM0ucmZimrYfLstpjm2xY9Mo44N9yzvadNBqB7x34TJzSw2SdC22EILhvgqDfSUuzy6y2GitermuBgH0VYpsGhlkdrHGzEKN+BrqOR2IdIu1HRtGGR6oYHVt4pskilqzzcxCjYVaGz9M8BwzSz08UKFaKlxxTRDFnL00zeTsInFiVpCsQuqWQlAu5dk4MsBApYhMt9nPkmK3u9t/2SQJKowMQaREvfqWVzbYjltrjQ4jI6nZFnr5dL+V8O5re/ldL1Y1FA0khthF5j3p1ZiW/TQQx0byc+0VUuyB7sbZ3XC73Vl0l0G3u1ecrF/3/6v50XX/Xv+vle+17A663R2sSldpUBrpmXFYsWpC6kqJsRc5ynS/1u58rHX/DwK3LEGu49rorrq1GlXWZKXHrF+3O3tNd9pZu/t/1p21e/l1h2X9Pyh0N55u91p+14tVJLAG0fRCr3Lo2L38snb3/17uLLrz0Z3Pbr9uu9uvG2v50yMd0dVl7ibD7v/Z67J56U77ZmGdIG9zdFffWg2sY9Yiwm5S7Dbd98r+73Z3x18rrJd/9/9fFb0aVDfW8r8e9Ep/rYbcjV5l222v5Xc9bnrcu5tUrtdey+9q6L62l7kRYuyYXmnfLKwT5McA3VW4VsPrmF5S5FqmO43sPbJYy93rmm67O/xmoVdD6uV3o+hOI9uQs37d6C6Hbrv7fxbXEyeLXoTSbfcKXyvsetCdfne6oosgs/ZaJptOB93uDxKfOIJsJpqDDZ+5OOHhco7R69xZ51aHrxRv131errXZmnN5qpqnP92ZJ9vwOuZXIcdrudf63+1e6/+NYDpMONYKyFuS/UWXYo9zhTpYqyGt5c915Kv72qx7rf8d9Crb7vt1uzvo+CutmQpjfrnUYj5RPF0tsCd/5SRk9/2zZLNWWPf/q/mthW5Sy95P9Ohud/5n43X8s+l00O3+oPGJI8h6oni11mYqTPh0X4GN3vsjyEBrzvsRtVixI+/Qf5VDuz4MKK2pJYr5OKEgBQO2hZ1pSLU44bwfoYFNrkVZrhwDSxqvYzrurH/Wr4Nudwc30uC73deLznUTQcxbDZ+iJXmwnKPcNbF1tQZ0tbBurJXP7jSy7u6wq+FqZdZMEi4GMaHSbM05q55RA0GiWIgTYg0DtkWhx5Z13Xm5XsLpdq/ltxa644oe0mAvYsyGd/tl07rZWCfI90mQzUTxZsNnMoh5rJpnc6ry8lFCaY1Kj1Xu7DzWIbipMOH1ehulNQ+Ucow5V26M2/2/l939vxu9wnr5cRX/ayF73UQQ80bDp2RJHupBkFxHQ7pa+I3ksVc6vfy6cbV7aK1ZjBXvNHxqSvFgKceGtNeTvU5h2FKky+7XQnd+skTUjV5+HXSHdT9Dd3j3fbKE1/mfNWvFyaLbfTOwTpBdBPleO+Sv5pu82w5pJIr7Sjl+a6jMZs9eXrgeac07jYD/MLXEiXbIo5U8f3Okwq6cS+fjHSjNoabPd2cbnPMj7ix4PDNU4o6Ci5Op2EBp3m74fH+uwXk/ZMy1ebxa4MlqgSFnRSqdDmNervu8UffxleJTlTxPVwsMZuKc8yMONXzGPJs7Cx759JjXWqJ4YbHJt2frLEYJn+sr8MxgiY2OOYahliiONH3mooRdOQdfac75EXvyLrty9hVLE9fCWmFr+XONsOvBpQ5BSsnD5Rxle4Ugp6OYFxbbvNnwqcWKDZ7NVwZK3F30sDI78yzFCW83Al6ptznvR+QtyWeqBZ6s5qlkCFcBU2HMzxeavLTUpmxbfK6vwGOVPJVU8VoDU1HMwXqALWBH3uVcEBNpzf2l3Ko6rccJb9R9frLQZC6KebCc40v9RbbkVrrIzUTxet3nOzM1JsOIp/sKPDNYZkvmg9ypv6VIcU/JYzwzbJRozWQY87PFNi/X2gzYFp/vL/JEX4F8Zv/OttIcbga8VGtzxg8RCJ6sFvl8/+p37P2iF0F27F7EeDW7g273zcAtu9TwZiHUmktBTDPRbMs5VDINCuBSGHO8HbIr73JPyaOZKDwpGXYs3PSFkkKQkwJLCsZcmy/0F9ldcLFFuo4WuBzGvFEPKFqShyt5AGINw45NIdPopsKEt5pmDO2Bch5LCDxLsMVzKGXiLcWmEURa88WBEo+W85Rta1lSBJiNEk77EQUpGXNNfoUQuELgSIkAduZcnqwW2JJzsJZfMMFsnHA5TJBSshgr6oliY85hKD3x8XrMWl2ltfw7YdkZzBs1DaWZDBM8S7Ip55DLbMaxmGhO+jF5W/JwpYAjBREw6jkU02N+hRC0NZzxY2qJ5u5yns2eS11p+h2b4YzeXktpTvgRk5FifynH9oLLYqIpOxajaTwpBL6CC2HMQqJBSmZihSMFOwvecv4UgulY8V4QUbVt7irlaGmwpXkOOy0PR0pylsQSgo15lyerJbbl3eVwIQS+1lwIEuoKNuQc+jPLM1sajrUjpiPFfeU8m/MeC4mi4lgMuSubb4TAuSBmMlLcWcqxr5hjIVaUHIsNmTJ4P6a7brP13R2WNXzE5MjtsJvPhw0JDNmSO/IuOzyHipREWpE5awgBeFJQsSR9lkW/beGJFXIk3WtAoNnkOWzzHCq2RaLNFz2LSGsEsNm12ZlzGXFtvDUqv2hJtngOWzybqi2xe0Xrca0UgrwUVG2LAdeiz7FwMy9ozpL02zZSCKajhEWlydsWxTWWfV3NdC8Vy/qvZa4nzlpGWmbXGtkjzLYkVddmZyHHnqJnyE5K4sxzWJaFJS3yjs2GgsfuYo5NBY+cY6PSeJ30tLRIhKTPs9lV9BjyXEIhaOrVW37lbIuSY9NAcDFMSIRgwHUoZ4jLtiQbcy6/PlTh66NV7qkUGPJctGWDXP0MRceiz3MYcF36PZu8bXeVwYrpLgOkREtJv+ewu+gx4Ni0tWBJsXJ9mifPsRktuOwq5tiS9yg6Nkm6M9KvYrrfmyxRZm3z+q7Y3X4ddLtvJtYJsgtCgCUEjhBYqURw9VGd3kjQnA9i/nBqkf/7+Vl+PN+goczehVmkuzViSYElSLt+q6IswxICT5p8XQ3ZlyvjafxS04kj0mcs2BauZTEbJyzECVXbopKRsrIv8rVMdwO51nXdcW/UdHbg6WVsKXEtC1caIhSWtSr+ch6EwBESJy1fszFs133SsrOlxLEsUw9mX7BV8fJ2RzqDmdjsbVm1TfzO81pSEgFvNgL+Xxfn+b+cm+OFpTZtpVbVj5RmBx0prv6cImN6hdmWhW1ZSCnQ6XN0xzNlIHDTMugMQ/wqZjkPXX7d8brNymv70ZEj6wR58yARbPBsfnuown+7dYj/67ZhvjpYYuBXne3+AN+PzssmhCBvSYqWpKm0mQ11HYoZiSf7ct+oeb/X3ZjpfY/l7cuW46wdT3R20e7E6eyr2DPuyjXdpORZFv2ugydtlhKNFII+d3VZxggmI8WlKOHeSp7/cuMAD/cVyPXY2WYlb73zbszVwleHicwxCd1xsyQr1nj+GzG97pMlwRshw273h4F1gvwVoDOmGzIzmxhqzdvNgLfqPrVk9RkcEkGoNXNRQj1R+Mnq7vyvgu4XSgFKC2D1CyqEoGhLKo5FqI1MW7KMNNX9gnfcN2JiBIeaIf9qcpFvzTaYyRzr8EGYXlJxL3M9cZZNWkZZY6Xk0kjMzHIiBJ60KHSViy1N+eWkIETjSEHVXhnLlVKi07FDnY5LD7uOWTPfnY/UICQK0D3yZcJ7P59JU7KUKBYThRKSnGUtd/e743eeO9vjuCLODZqe90lN9h3M/u+4O+h2f1hYJ8j3CUcILOCths+fTNc43gpJMsQ27Nhs8BxeWmrxT87N8eJSi5wlyXcpMg86FuOuzYGlNv/swjwvLLVoX+eGGNeDzovlCUGiNS8ttfj+XJ2LwerzYzxhxlTz0qJkS/KWmdTpRvcLfj3GtSQ7ix6/PlThqf4SAxlp6lc1Qpg9CAVXacyZcbSrSUWrJcOsJGXSKdkW23IuLa3515eX+LPpGnkp2JQ3O0dljWdZDLgOA45N1XYoZzb/FULgSsmA69AC/mCqxj+9MMehZojoIdU5tkUi4I1GyPfmm5xPJ9OWTaYMuvNRtC225FwaieZfTizy7bkG/Y7N1h557i6/bvf7Nb3QK/xqcT8qfOLUfJQGX2tirSlIgd1V+IHS+ErhSfPChVpjpbPWWWrTWuNrTS1WSAEV28IVKxM1GvCVCQ+UImcJKpaVpptJB2gnilqsuBDGHG76VGyLJyp5xjLqGrHWtNPD1vOy9wRNmObdkQJPylX5VVrTVJpmnOAIQdmWq9SNtIZT7ZCXlloMORaPVfMfqPK71kaCFRkdzQ8CkdK0lUICedkZM07DtMZXGgm4UhBqAWhyXfWepCuREm0+FCq91kvHfLNNJNLQSBTNxNyzZEtKXfclfc/aSuErRd6yKPT44MQaGkrRiI3CvisFxXSoIxtXAa1E0UgUthBUbImbzb/WtBONSp9tVb2m70490bSUxgLKtqQo5ap6UECgFGFaBiJdDOGkE3w3A9dDfNcT52biE0eQtyoSDcfbIS8utRh3LZ6ofDD6Z73Qq8pDpTnSDDjY9Nmdc7m/nCN3kxrGOtZxPcR3PXFuNtYJ8hbATJTw88UmB5babPEcnhkqsTPvcnPocTV0KmW90/D5+WKTqmXxlcES23LOFRLPOtZxs3ErkGIW6wR5CyDWmkasaCujlN7d/b3ZUClJNpXCEWaC4cMg53V8MnGrkeDVsE6Q61gT66/GOj5o3E7kyDpBrmMd61jH2lhX81nHOtaxjjWwTpDrWMc61rEG1glyHetYxzrWwDpBrmMd61jHGlgnyHWsYx3rWAPrBLmOdaxjHWtgnSDXsY51rGMNrBPkOtaxjnWsgXWCXMc61rGONbBOkOtYxzrWsQbWCXId61jHOtbAOkGuYx3rWMcaWCfIdaxjHetYA+sEuY51rGMda2CdINexjnWsYw2sE+Q61rGOdayBdYJcxzrWsY418P8HFSBGRt8oj9AAAAAASUVORK5CYII=" alt="AlloB Consultants logo" class="footer-logo" />
    <p><strong>Downloaded from AlloB Consultants</strong></p>
    <p>Generated on ${new Date().toLocaleDateString('en-ZA')} at ${new Date().toLocaleTimeString('en-ZA')}</p>
    <p>SAICA Practice No. 31838440 &middot; Midrand, Johannesburg</p>
    <p>www.allob.co.za | info@allob.co.za | +27 67 921 1947</p>
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

Tags: ${article.tags.join(', ')}

${'-'.repeat(80)}

${content.trim()}

${'-'.repeat(80)}

This article was downloaded from AlloB Consultants website
Generated on: ${new Date().toLocaleDateString('en-ZA')} at ${new Date().toLocaleTimeString('en-ZA')}
SAICA Practice No. 31838440 - Midrand, Johannesburg
Website: www.allob.co.za
Email: info@allob.co.za
Phone: +27 67 921 1947

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
const RelatedArticles: React.FC<{ currentId: number; category: string; viewCounts: Record<string, number> }> = ({ currentId, category, viewCounts }) => {
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
                {viewCounts[String(article.id)] !== undefined && (
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {viewCounts[String(article.id)]}
                  </span>
                )}
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
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const incrementedForRef = useRef<number | null>(null);

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
    // Merge rather than replace: the increment POST below can land first, and
    // its fresher number must not be clobbered by this read-only snapshot.
    fetchViewCounts(Object.keys(articleMetadata)).then((counts) => {
      setViewCounts((prev) => ({ ...counts, ...prev }));
    });
  }, []);

  useEffect(() => {
    // Keyed by article id so navigating between articles (e.g. via Related
    // Articles, which reuses this component) still counts the new one once.
    if (article && incrementedForRef.current !== articleId) {
      incrementedForRef.current = articleId;
      incrementViewCount(articleId).then((views) => {
        if (views !== null) {
          setViewCounts((prev) => ({ ...prev, [String(articleId)]: views }));
        }
      });
    }
  }, [article, articleId]);

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
            {viewCounts[String(articleId)] !== undefined && (
              <div className="flex items-center"><Eye className="w-4 h-4 mr-1" /> {viewCounts[String(articleId)].toLocaleString()} views</div>
            )}
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

      <RelatedArticles currentId={articleId} category={article.category} viewCounts={viewCounts} />

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