import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { RequestClassForm } from './request.class.form';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { ClassItemDTO } from 'src/class/common/data/class.item.dto';

export class RequestClassFormMapper {
    async toDTO(form: RequestClassForm): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }> {
        const classDTO = new ClassDTO(
            undefined,
            form.className,
            form.classDeg,
            null,
            form.baseMoney,
            undefined,
            false,
            null,
            false
        );

        const classItemDTO: ClassItemDTO[] = form.classItems.map(
            (item) => new ClassItemDTO(null, item.id, item.money)
        );

        const classArticleDTO: ClassArticleDTO[] = form.classArticles.flatMap((articleGroup) =>
            articleGroup.articles.map(
                (articleId) => new ClassArticleDTO(null, articleId, articleGroup.invDeg)
            )
        );

        return { classDTO, classItemDTO, classArticleDTO };
    }
}
