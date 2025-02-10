import { OrganDTO } from '../common/data/organ.dto';

export interface OrganDomainWriter {
    save(organDTO: OrganDTO): Promise<OrganDTO>;
    // update(organId: number, organDTO: OrganDTO): Promise<OrganDTO>;
}
