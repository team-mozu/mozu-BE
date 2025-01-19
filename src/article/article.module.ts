import { Module } from '@nestjs/common';
import { ArticlePresentationModule } from './presentation/article.presentation.module';

@Module({
    imports: [ArticlePresentationModule],
    controllers: [],
    providers: []
})
export class ArticleModule {}
