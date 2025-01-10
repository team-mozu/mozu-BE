import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ResponseArticleForm } from '../dto/response/response.article.form';

export interface ArticleReadDocumentation {
    getByArticleID(articleId: string): Promise<ArticleDTO>;
    getArticleList(): Promise<ResponseArticleForm>;
}
