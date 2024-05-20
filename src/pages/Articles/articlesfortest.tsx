export interface ArticleData {
  id: number;
  title: string;
  tags: (string | null)[];
}

export const filterArticlesByTags = (articles: ArticleData[], tags: string[]) => {
  if (tags.length === 0) return articles;
  return articles.filter((article) =>
    article.tags.some((tag) => tags.includes(tag!))
  );
};
