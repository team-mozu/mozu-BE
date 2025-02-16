import { ClassItemDTO } from 'src/class/common/data/class.item.dto';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassDTO } from '../common/data/class.dto';

export interface ClassDomainReader {
    findClassList(organId: number): Promise<ClassDTO[]>;
    findClassById(
        classId: number,
        organId: number
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }>;
}
