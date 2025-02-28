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
    sseConnect(classId: number, organId: number, res: Response);
    getByClassNum(classNum: number): Promise<ClassDTO>;
    validateItems(classId: number, ids: number[]): Promise<void>;

    getOrganClassArticles(classId: number, organId: number): Promise<ClassArticleDTO[]>;
    getOrganClassItems(classId: number, organId: number): Promise<ClassItemDTO[]>;

    //학생용
    getClassItemById(teamId: number, itemId: number): Promise<ClassItemDTO>;
    getTeamClassArticles(teamId: number): Promise<ClassArticleDTO[]>;
    getTeamClassItems(teamId: number): Promise<ClassItemDTO[]>;
    getByTeamId(teamId: number): Promise<ClassDTO>;
}
