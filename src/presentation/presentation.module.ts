import { Module } from '@nestjs/common';
import { ArticlePresentationModule } from './article/article.presentation.module';

@Module({
    imports: [ArticlePresentationModule],
    controllers: [],
    providers: []
})
export class PresentationModule {}
