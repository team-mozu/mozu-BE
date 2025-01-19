import { ArticleDTO } from 'src/common/data/article/article.dto';
import { RequestArticleForm } from './request.article.form';

export class RequestArticleFormMapper {
    async toDTO(form: RequestArticleForm): Promise<ArticleDTO> {
        return new ArticleDTO(null, form.title, form.description, null, null, null);
    }
}
