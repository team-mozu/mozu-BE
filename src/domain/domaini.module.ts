import { Module } from '@nestjs/common';
import { ArticleDomainModule } from './article/article.domain.module';

@Module({
    imports: [ArticleDomainModule],
    providers: [],
    exports: [ArticleDomainModule]
})
export class DomainModule {}
