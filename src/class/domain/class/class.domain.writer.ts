import { ClassDTO } from '../../common/data/class.dto';

export interface ClassDomainWrtier {
    save(classDTO: ClassDTO): Promise<ClassDTO>;
}
