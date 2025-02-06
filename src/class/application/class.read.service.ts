import { ClassDTO } from '../common/data/class.dto';

export interface ClassReadService {
    getByClassId(classId: number): Promise<ClassDTO>;
    getClassList(): Promise<ClassDTO[]>;
}
