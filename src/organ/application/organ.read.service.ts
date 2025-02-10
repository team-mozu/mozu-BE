import { OrganDTO } from '../common/data/organ.dto';

export interface OrganReadService {
    getByOrganID(organId: number): Promise<OrganDTO>;
    getOrganList(): Promise<OrganDTO[]>;
    login(input: OrganDTO): Promise<{ accessToken: string; refreshToken: string }>;
}
