// components/RelatedArticles.tsx
interface RelatedArticlesProps {
  currentArticleId: number;
  currentCategory: string;
  currentTags: string[];
}

export const RelatedArticles = ({ currentArticleId, currentCategory, currentTags }: RelatedArticlesProps) => {
  // Logic to find related articles based on category and tags
  // Display 3-4 related articles at the bottom of the article
  return (
    <div>
      <h3>Related Articles</h3>
      <p>Current Article ID: {currentArticleId}</p>
      <p>Category: {currentCategory}</p>
      <p>Tags: {currentTags.join(', ')}</p>
      {/* TODO: Render related articles here */}
    </div>
  );
};