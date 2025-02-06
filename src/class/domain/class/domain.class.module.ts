import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClassEntity } from './persistence/class.entity';
import { ClassRepository } from './persistence/class.repository';
import { ClassDomainMapper } from './persistence/class.domain.mapper';

const REPOSITORY = { provide: 'class_repository', useClass: ClassRepository };
const ENTITY = TypeOrmModule.forFeature([ClassEntity]);

@Module({
    imports: [ENTITY, ConfigModule],
    providers: [REPOSITORY, ClassDomainMapper],
    exports: [REPOSITORY]
})
export class DomainClassModule {}
