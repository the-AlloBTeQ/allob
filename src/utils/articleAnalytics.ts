// utils/articleAnalytics.ts
declare var gtag: (...args: any[]) => void;

export const trackArticleView = (articleId: number, title: string) => {
  // Track page view
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: title,
      page_location: window.location.href,
      content_group1: 'Article',
      event_label: `Article ${articleId}`
    });
  }
};

export const trackArticleEngagement = (articleId: number, action: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: 'Article Engagement',
      event_label: `Article ${articleId}`,
      value: 1
    });
  }
};