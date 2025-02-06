import { ClassDTO } from '../../common/data/class.dto';

export interface ClassDomainReader {
    findByClassId(classId: number): Promise<ClassDTO>;
    findClassList(): Promise<ClassDTO[]>;
}
