// utils/articleUtils.ts
export interface ArticleData {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  content: string;
}

export class ArticleSaveAndPrint {
  static generatePrintHTML(article: ArticleData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${article.title} - AlloB Consultants</title>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: Georgia, serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            background: white;
          }
          .header { 
            border-bottom: 2px solid #1e40af; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
            text-align: center;
          }
          .logo { 
            font-size: 24px; 
            font-weight: bold; 
            color: #1e40af; 
            margin-bottom: 5px; 
          }
          .tagline {
            font-style: italic; 
            color: #6b7280;
            font-size: 14px;
          }
          .article-title { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 15px; 
            color: #1f2937;
            text-align: center;
          }
          .article-meta { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 15px; 
            font-size: 14px; 
            color: #6b7280; 
            margin-bottom: 30px;
            justify-content: center;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 15px;
          }
          .category { 
            background: #eff6ff; 
            color: #1e40af; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-weight: 500; 
          }
          .content { 
            font-size: 16px; 
            line-height: 1.8; 
            text-align: justify;
          }
          .content h1, .content h2 { 
            font-size: 22px; 
            margin: 30px 0 15px 0; 
            color: #1f2937;
            page-break-after: avoid;
          }
          .content h3 { 
            font-size: 18px; 
            margin: 25px 0 10px 0; 
            color: #374151;
            page-break-after: avoid;
          }
          .content p { 
            margin-bottom: 15px;
            orphans: 3;
            widows: 3;
          }
          .content ul, .content ol {
            margin: 15px 0;
            padding-left: 25px;
          }
          .content li {
            margin-bottom: 5px;
          }
          .content blockquote {
            border-left: 4px solid #1e40af;
            margin: 20px 0;
            padding-left: 20px;
            font-style: italic;
            color: #4b5563;
          }
          .tags {
            margin: 20px 0;
            text-align: center;
          }
          .tag {
            display: inline-block;
            background: #f3f4f6;
            color: #374151;
            padding: 3px 8px;
            margin: 2px;
            border-radius: 3px;
            font-size: 12px;
          }
          .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #e5e7eb; 
            text-align: center; 
            font-size: 12px; 
            color: #6b7280;
            page-break-inside: avoid;
          }
          @media print {
            body { padding: 15px; }
            .no-print { display: none !important; }
            .page-break { page-break-before: always; }
          }
          @page {
            margin: 2cm;
            @bottom-center {
              content: "Page " counter(page) " of " counter(pages);
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">AlloB Consultants</div>
          <div class="tagline">Integrity and Innovation</div>
        </div>
        
        <article>
          <h1 class="article-title">${article.title}</h1>
          <div class="article-meta">
            <span class="category">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
            <span>By ${article.author}</span>
            <span>${new Date(article.date).toLocaleDateString('en-ZA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span>${article.readTime}</span>
            <span>${article.views.toLocaleString()} views</span>
          </div>
          
          <div class="tags">
            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          
          <div class="content">
            ${article.content}
          </div>
        </article>
        
        <div class="footer">
          <p><strong>Downloaded from AlloB Consultants</strong></p>
          <p>Generated on ${new Date().toLocaleDateString('en-ZA')} at ${new Date().toLocaleTimeString('en-ZA')}</p>
          <p>For professional advice and services: www.allobconsultants.com | info@allobconsultants.com</p>
          <p>© ${new Date().getFullYear()} AlloB Consultants. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
  }

  static async printArticle(article: ArticleData): Promise<void> {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(this.generatePrintHTML(article));
      printWindow.document.close();
      
      // Wait for content to load before printing
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      throw new Error('Unable to open print window. Please check your browser settings.');
    }
  }

  static async savePDF(article: ArticleData): Promise<void> {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(this.generatePrintHTML(article));
      printWindow.document.close();
      
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    } else {
      throw new Error('Unable to open print window for PDF generation.');
    }
  }

  static saveHTML(article: ArticleData): void {
    const htmlContent = this.generatePrintHTML(article);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_allob_consultants.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static saveText(article: ArticleData): void {
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

${'-'.repeat(50)}

${article.content
  .replace(/<h[1-6][^>]*>/g, '\n\n')
  .replace(/<\/h[1-6]>/g, '\n')
  .replace(/<p[^>]*>/g, '')
  .replace(/<\/p>/g, '\n\n')
  .replace(/<br\s*\/?>/g, '\n')
  .replace(/<[^>]*>/g, '')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/\n\s*\n\s*\n/g, '\n\n')
  .trim()}

${'-'.repeat(50)}

This article was downloaded from AlloB Consultants website
Generated on: ${new Date().toLocaleDateString('en-ZA')} at ${new Date().toLocaleTimeString('en-ZA')}
Website: www.allobconsultants.com
Email: info@allobconsultants.com

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
  }

  static async shareArticle(article: ArticleData): Promise<void> {
    const shareData = {
      title: `${article.title} - AlloB Consultants`,
      text: `Check out this insightful article: ${article.title}`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to clipboard
        this.copyToClipboard(window.location.href);
      }
    } else {
      // Fallback to clipboard
      this.copyToClipboard(window.location.href);
    }
  }

  private static async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      // You might want to show a toast notification here
      alert('Link copied to clipboard!');
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  }
}

// React Hook for Save & Print functionality
export const useArticleSaveAndPrint = (article: ArticleData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveOptions, setShowSaveOptions] = useState(false);

  const handlePrint = async () => {
    setIsLoading(true);
    try {
      await ArticleSaveAndPrint.printArticle(article);
    } catch (error) {
      console.error('Print error:', error);
      alert('There was an error printing the article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePDF = async () => {
    setIsLoading(true);
    try {
      await ArticleSaveAndPrint.savePDF(article);
      setShowSaveOptions(false);
    } catch (error) {
      console.error('PDF save error:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveHTML = () => {
    try {
      ArticleSaveAndPrint.saveHTML(article);
      setShowSaveOptions(false);
    } catch (error) {
      console.error('HTML save error:', error);
      alert('There was an error saving the HTML file. Please try again.');
    }
  };

  const handleSaveText = () => {
    try {
      ArticleSaveAndPrint.saveText(article);
      setShowSaveOptions(false);
    } catch (error) {
      console.error('Text save error:', error);
      alert('There was an error saving the text file. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      await ArticleSaveAndPrint.shareArticle(article);
    } catch (error) {
      console.error('Share error:', error);
      alert('There was an error sharing the article. Please try again.');
    }
  };

  return {
    isLoading,
    showSaveOptions,
    setShowSaveOptions,
    handlePrint,
    handleSavePDF,
    handleSaveHTML,
    handleSaveText,
    handleShare
  };
};

// SEO and Meta Tags utility
// Simple mock implementation for useState (for non-React environments)
function useState<T>(initialValue: T): [T, (value: T) => void] {
    let value = initialValue;
    const setValue = (newValue: T) => {
        value = newValue;
    };
    return [value, setValue];
}
