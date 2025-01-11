import { Module } from '@nestjs/common';
import { ArticleReadAdapter } from './article.read.adapter';
import { ArticleWriteAdapter } from './article.write.adapter';
import { RequestArticleFormMapper } from './form/request/request.article.form.mapper';
import { ArticleApplicationModule } from '../application/application.module';

@Module({
    imports: [ArticleApplicationModule],
    controllers: [ArticleReadAdapter, ArticleWriteAdapter],
    providers: [RequestArticleFormMapper]
})
export class ArticlePresentationModule {}
