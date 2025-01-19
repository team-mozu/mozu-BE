import { ArticleDTO } from 'src/common/data/article/article.dto';
import { RequestArticleForm } from '../form/request/request.article.form';

export interface ArticleWriteDocumentation {
    create(createArticleDTO: RequestArticleForm, file: Express.Multer.File): Promise<ArticleDTO>;
    update(
        articleId: string,
        updateArticleDTO: RequestArticleForm,
        file: Express.Multer.File
    ): Promise<ArticleDTO>;
    delete(articleId: string): Promise<void>;
}
