import { OrganDTO } from '../common/data/organ.dto';

export interface OrganWrtieService {
    create(organDTO: OrganDTO): Promise<OrganDTO>;
    // update(organId: number, organDTO: OrganDTO): Promise<OrganDTO>;
}
