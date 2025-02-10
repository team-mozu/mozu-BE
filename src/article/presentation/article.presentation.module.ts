import { Module } from '@nestjs/common';
import { ArticleReadAdapter } from './article.read.adapter';
import { ArticleWriteAdapter } from './article.write.adapter';
import { RequestArticleFormMapper } from './form/request/request.article.form.mapper';
import { ArticleApplicationModule } from '../application/application.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ArticleApplicationModule, JwtModule.register({}), ConfigModule],
    controllers: [ArticleReadAdapter, ArticleWriteAdapter],
    providers: [RequestArticleFormMapper]
})
export class ArticlePresentationModule {}
