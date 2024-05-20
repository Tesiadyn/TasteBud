import { ArticleData } from "./articlesfortest";
import { filterArticlesByTags } from "./articlesfortest";

describe("filterArticlesByTags", () => {
  const articles: ArticleData[] = [
    { id: 1, title: "Article 1", tags: ["tag1", "tag2"] },
    { id: 2, title: "Article 2", tags: ["tag2", "tag3"] },
    { id: 3, title: "Article 3", tags: ["tag3", "tag4"] },
  ];

  it("should return all articles if tags array is empty", () => {
    const filteredArticles = filterArticlesByTags(articles, []);
    expect(filteredArticles).toEqual(articles);
  });

  it("should filter articles by tags", () => {
    const filteredArticles = filterArticlesByTags(articles, ["tag1"]);
    expect(filteredArticles).toEqual([
      { id: 1, title: "Article 1", tags: ["tag1", "tag2"] },
    ]);
  });

  it("should return empty array if no matching articles found", () => {
    const filteredArticles = filterArticlesByTags(articles, ["tag5"]);
    expect(filteredArticles).toEqual([]);
  });
});
