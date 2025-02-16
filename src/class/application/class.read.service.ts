import { ClassArticleDTO } from '../common/data/class.article.dto';
import { ClassDTO } from '../common/data/class.dto';
import { ClassItemDTO } from '../common/data/class.item.dto';

export interface ClassReadService {
    getByClassId(
        classId: number,
        organId: number
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }>;
    getClassList(organId: number): Promise<ClassDTO[]>;
}
