import { ArticleDTO } from 'src/common/data/article/article.dto';

export interface ArticleDomainReader {
    findByArticleId(articleId: number): Promise<ArticleDTO>;
    findArticleList(): Promise<ArticleDTO[]>;
}
