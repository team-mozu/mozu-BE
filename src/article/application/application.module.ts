import { Module } from '@nestjs/common';
import { ArticleReadServiceImpl } from './impl/article.read.service.impl';
import { ArticleWriteServiceImpl } from './impl/article.write.service.impl';
import { ArticleDomainModule } from '../domain/article.domain.module';

const ARTICLE_READ_SERVICE = { provide: 'read_impl', useClass: ArticleReadServiceImpl };
const ARTICLE_WRITE_SERVICE = { provide: 'write_impl', useClass: ArticleWriteServiceImpl };

@Module({
    imports: [ArticleDomainModule],
    providers: [ARTICLE_READ_SERVICE, ARTICLE_WRITE_SERVICE],
    exports: [ARTICLE_READ_SERVICE, ARTICLE_WRITE_SERVICE]
})
export class ArticleApplicationModule {}
