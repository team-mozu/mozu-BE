import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { RequestClassForm } from './request.class.form';
import { ClassDTO } from 'src/class/common/data/class.dto';

export class RequestClassFormMapper {
    async toDTO(
        form: RequestClassForm
    ): Promise<{ classArticleDTO: ClassArticleDTO[]; classDTO: ClassDTO }> {
        const classArticleDTO: ClassArticleDTO[] = form.classArticles.flatMap((articleGroup) =>
            articleGroup.articles.map(
                (articleId) => new ClassArticleDTO(null, articleId, articleGroup.invDeg)
            )
        );

        const classDTO = new ClassDTO(
            undefined,
            form.className,
            form.maxInvDeg,
            null,
            form.baseMoney,
            undefined,
            false,
            null,
            false
        );

        return { classArticleDTO, classDTO };
    }
}
