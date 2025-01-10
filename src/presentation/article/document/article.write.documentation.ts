import { ArticleDTO } from 'src/common/data/article/article.dto';
import { RequestArticleForm } from '../dto/request/request.article.form';

export interface ArticleWriteDocumentation {
    create(createArticleDTO: RequestArticleForm): Promise<ArticleDTO>;
    update(articleId: string, updateArticleDTO: RequestArticleForm): Promise<ArticleDTO>;
    delete(articleId: string): Promise<void>;
}
