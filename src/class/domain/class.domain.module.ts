import { Module } from '@nestjs/common';
import { DomainClassModule } from './class/domain.class.module';
import { DomainClassArticleModule } from './classArticle/domain.classArticle.module';

@Module({
    imports: [DomainClassModule, DomainClassArticleModule],
    exports: [DomainClassModule, DomainClassArticleModule]
})
export class ClassDomainModule {}
