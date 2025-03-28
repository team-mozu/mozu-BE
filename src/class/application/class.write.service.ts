import { ClassArticleDTO } from '../common/data/class.article.dto';
import { ClassDTO } from '../common/data/class.dto';
import { ClassItemDTO } from '../common/data/class.item.dto';

export interface ClassWrtieService {
    create(
        organId: number,
        classDTO: ClassDTO,
        classItemDTO: ClassItemDTO[],
        classArticleDTO: ClassArticleDTO[]
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }>;
    update(
        organId: number,
        classId: number,
        classDTO: ClassDTO,
        classItemDTO: ClassItemDTO[],
        classArticleDTO: ClassArticleDTO[]
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }>;
    changeStarYN(organId: number, classId: number): Promise<void>;
    delete(organId: number, classId: number): Promise<void>;
    startClass(organId: number, classId: number): Promise<number>;
    stopClass(organId: number, classId: number): Promise<void>;
    nextInvDeg(organId: number, classId: number): Promise<void>;
}
