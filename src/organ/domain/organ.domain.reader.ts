import { OrganDTO } from '../common/data/organ.dto';

export interface OrganDomainReader {
    findByOrganId(organId: number): Promise<OrganDTO>;
    findByOrganCode(code: string): Promise<OrganDTO>;
    findOrganList(): Promise<OrganDTO[]>;
}
