import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassItemDTO } from 'src/class/common/data/class.item.dto';
import { ClassDTO } from '../common/data/class.dto';

export interface ClassDomainWrtier {
    save(
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
    startClass(organId: number, classId: number, classNum: number): Promise<void>;
    stopClass(organId: number, classId: number): Promise<void>;
    nextInvDeg(organId: number, classId: number): Promise<number>;
}
