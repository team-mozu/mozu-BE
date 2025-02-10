import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './persistence/article.repository';
import { ArticleEntity } from './persistence/article.entity';
import { ArticleDomainMapper } from './persistence/article.domain.mapper';
import { S3Adapter } from 'src/common/thirdparty/s3.adapter';
import { ConfigModule } from '@nestjs/config';

const ARTICLE_REPOSITORY = { provide: 'repository', useClass: ArticleRepository };
const ARTICLE_ENTITY = TypeOrmModule.forFeature([ArticleEntity]);

@Module({
    imports: [ARTICLE_ENTITY, ConfigModule],
    providers: [ARTICLE_REPOSITORY, ArticleDomainMapper, ArticleRepository, S3Adapter],
    exports: [ARTICLE_REPOSITORY, ArticleDomainMapper, ArticleRepository]
})
export class ArticleDomainModule {}
