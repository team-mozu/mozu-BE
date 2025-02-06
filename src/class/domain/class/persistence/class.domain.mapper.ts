import { Injectable } from '@nestjs/common';
import { ClassEntity } from './class.entity';
import { ClassDTO } from 'src/class/common/data/class.dto';

@Injectable()
export class ClassDomainMapper {
    constructor() {}

    async toDomain(entity: ClassEntity): Promise<ClassDTO> {
        if (!entity) return null;

        return new ClassDTO(
            entity.id,
            entity.name,
            entity.maxInvDeg,
            entity.curInvDeg,
            entity.baseMoney,
            entity.classNum,
            entity.starYN,
            entity.createdAt,
            entity.deleteYN
        );
    }

    async toEntity(domain: ClassDTO): Promise<ClassEntity> {
        return new ClassEntity(
            domain.name,
            domain.maxInvDeg,
            domain.curInvDeg,
            domain.baseMoney,
            domain.classNum,
            domain.starYN,
            domain.createdAt,
            domain.deleteYN
        );
    }
}
