import { Module } from '@nestjs/common';
import { ClassArticleRepository } from './persistence/classArticle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassArticleEntity } from './persistence/classArticle.entity';
import { ConfigModule } from '@nestjs/config';
import { ClassArticleDomainMapper } from './persistence/classArticle.domain.mapper';

const REPOSITORY = { provide: 'classArticle_repository', useClass: ClassArticleRepository };
const ENTITY = TypeOrmModule.forFeature([ClassArticleEntity]);

@Module({
    imports: [ENTITY, ConfigModule],
    providers: [REPOSITORY, ClassArticleDomainMapper],
    exports: [REPOSITORY, ClassArticleDomainMapper]
})
export class DomainClassArticleModule {}
