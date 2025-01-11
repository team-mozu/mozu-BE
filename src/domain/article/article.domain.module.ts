import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './persistence/article.repository';
import { ArticleEntity } from './persistence/article.entity';
import { ArticleDomainMapper } from './persistence/article.domain.mapper';

const ARTICLE_REPOSITORY = { provide: 'repository', useClass: ArticleRepository };
const ARTICLE_ENTITY = TypeOrmModule.forFeature([ArticleEntity]);

@Module({
    imports: [ARTICLE_ENTITY],
    providers: [ARTICLE_REPOSITORY, ArticleDomainMapper, ArticleRepository],
    exports: [ARTICLE_REPOSITORY, ArticleDomainMapper, ArticleRepository]
})
export class ArticleDomainModule {}
