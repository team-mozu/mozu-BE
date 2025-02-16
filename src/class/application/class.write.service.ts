import { ClassArticleDTO } from '../common/data/class.article.dto';
import { ClassDTO } from '../common/data/class.dto';

export interface ClassWrtieService {
    create(
        classDTO: ClassDTO,
        classArticleDTO: ClassArticleDTO[]
    ): Promise<{ classDTO: ClassDTO; classArticleDTO: ClassArticleDTO[] }>;
}
