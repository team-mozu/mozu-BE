import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassRepository } from './persistence/class.repository';
import { ClassEntity } from './persistence/entity/class.entity';
import { ClassArticleEntity } from './persistence/entity/classArticle.entity';
import { ClassItemEntity } from './persistence/entity/classItem.entity';
import { ClassDomainMapper } from './persistence/class.domain.mapper';

const CLASS_REPOSITORY = { provide: 'repository', useClass: ClassRepository };
const CLASS_ENTITY = TypeOrmModule.forFeature([ClassEntity, ClassItemEntity, ClassArticleEntity]);

@Module({
    imports: [CLASS_ENTITY],
    providers: [CLASS_REPOSITORY, ClassDomainMapper],
    exports: [CLASS_REPOSITORY]
})
export class ClassDomainModule {}
