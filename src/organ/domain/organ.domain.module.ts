import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrganEntity } from './persistence/organ.entity';
import { OrganRepository } from './persistence/organ.repository';
import { OrganDomainMapper } from './persistence/organ.domain.mapper';

const ORGAN_REPOSITORY = { provide: 'repository', useClass: OrganRepository };
const ORGAN_ENTITY = TypeOrmModule.forFeature([OrganEntity]);

@Module({
    imports: [ORGAN_ENTITY, ConfigModule],
    providers: [ORGAN_REPOSITORY, OrganDomainMapper, OrganRepository],
    exports: [ORGAN_REPOSITORY, OrganDomainMapper, OrganRepository]
})
export class OrganDomainModule {}
