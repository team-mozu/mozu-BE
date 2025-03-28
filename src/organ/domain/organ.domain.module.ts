import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganEntity } from './persistence/organ.entity';
import { OrganRepository } from './persistence/organ.repository';
import { OrganDomainMapper } from './persistence/organ.domain.mapper';

const ORGAN_REPOSITORY = { provide: 'repository', useClass: OrganRepository };
const ORGAN_ENTITY = TypeOrmModule.forFeature([OrganEntity]);

@Module({
    imports: [ORGAN_ENTITY],
    providers: [ORGAN_REPOSITORY, OrganDomainMapper],
    exports: [ORGAN_REPOSITORY]
})
export class OrganDomainModule {}
