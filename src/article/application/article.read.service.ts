import { ArticleDTO } from 'src/common/data/article/article.dto';

export interface ArticleReadService {
    getByArticleID(articleId: number): Promise<ArticleDTO>;
    getArticleList(organId: number): Promise<ArticleDTO[]>;
}
