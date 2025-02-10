import { Injectable } from '@nestjs/common';
import { OrganEntity } from './organ.entity';
import { OrganDTO } from 'src/organ/common/data/organ.dto';

@Injectable()
export class OrganDomainMapper {
    constructor() {}
    async toDomain(entity: OrganEntity): Promise<OrganDTO> {
        if (!entity) return null;

        const { id, name, code, password } = entity;

        return new OrganDTO(id, name, code, password);
    }

    async toEntity(domain: OrganDTO): Promise<OrganEntity> {
        return new OrganEntity(domain.name, domain.code, domain.password);
    }
}
