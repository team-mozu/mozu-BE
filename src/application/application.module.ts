import { Module } from '@nestjs/common';
import { ArticleReadServiceImpl } from './article/impl/article.read.service.impl';
import { ArticleWriteServiceImpl } from './article/impl/article.write.service.impl';
import { DomainModule } from 'src/domain/domaini.module';

const ARTICLE_READ_SERVICE = { provide: 'read_impl', useClass: ArticleReadServiceImpl };
const ARTICLE_WRITE_SERVICE = { provide: 'write_impl', useClass: ArticleWriteServiceImpl };

@Module({
    imports: [DomainModule],
    providers: [ARTICLE_READ_SERVICE, ARTICLE_WRITE_SERVICE],
    exports: [ARTICLE_READ_SERVICE, ARTICLE_WRITE_SERVICE]
})
export class ApplicationModule {}
