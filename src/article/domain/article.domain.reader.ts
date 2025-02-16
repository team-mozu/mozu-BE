import { ArticleDTO } from 'src/common/data/article/article.dto';

export interface ArticleDomainReader {
    findByArticleId(articleId: number): Promise<ArticleDTO>;
    findArticleList(organId: number): Promise<ArticleDTO[]>;
    validateArticles(organId: number, ids: number[]);
}
