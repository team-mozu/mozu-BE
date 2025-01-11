import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { ArticleReadAdapter } from './article.read.adapter';
import { ArticleWriteAdapter } from './article.write.adapter';
import { RequestArticleFormMapper } from './dto/request/request.article.form.mapper';

@Module({
    imports: [ApplicationModule],
    controllers: [ArticleReadAdapter, ArticleWriteAdapter],
    providers: [RequestArticleFormMapper]
})
export class ArticlePresentationModule {}
