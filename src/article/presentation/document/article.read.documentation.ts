import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ResponseArticleForm } from '../form/response/response.article.form';

export interface ArticleReadDocumentation {
    getByArticleID(articleId: string): Promise<ArticleDTO>;
    getArticleList(): Promise<ResponseArticleForm>;
}
