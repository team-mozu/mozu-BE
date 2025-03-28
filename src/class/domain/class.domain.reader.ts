import { ClassItemDTO } from 'src/class/common/data/class.item.dto';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassDTO } from '../common/data/class.dto';

export interface ClassDomainReader {
    // 기관용
    findClassList(organId: number): Promise<ClassDTO[]>;
    findClassById(
        classId: number,
        organId: number
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }>;
    findClassByCode(classNum: number): Promise<ClassDTO>;
    validateItems(classId: number, ids: number[]): Promise<void>;
    findOrganClassArticles(classId: number, organId: number): Promise<ClassArticleDTO[]>;
    findOrganClassItems(classId: number, organId: number): Promise<ClassItemDTO[]>;

    //학생용
    findClassItemById(teamId: number, itemId: number): Promise<ClassItemDTO>;
    findTeamClassArticles(teamId: number): Promise<ClassArticleDTO[]>;
    findTeamClassItems(teamId: number): Promise<ClassItemDTO[]>;
    findByTeamId(teamId: number): Promise<ClassDTO>;
    // 공용.?
}
