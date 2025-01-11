// import { Global, Inject, Injectable, Module } from '@nestjs/common';
// import { ArticleReadServiceImpl } from 'src/application/article/impl/article.read.service.impl';
// import { ArticleReadAdapter } from 'src/presentation/article/article.read.adapter';
// import { ArticleWriteAdapter } from 'src/presentation/article/article.write.adapter';
// import { ArticleRepository } from 'src/domain/article/persistence/article.repository';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ArticleEntity } from 'src/domain/article/persistence/article.entity';
// import { ArticleWriteServiceImpl } from 'src/application/article/impl/article.write.service.impl';
// import { ArticleDomainMapper } from 'src/domain/article/persistence/article.domain.mapper';
// import { RequestArticleFormMapper } from 'src/presentation/article/dto/request/request.article.form.mapper';

// const ARTICLE_READ_SERVICE = { provide: 'read_impl', useClass: ArticleReadServiceImpl };
// const ARTICLE_WRITE_SERVICE = { provide: 'write_impl', useClass: ArticleWriteServiceImpl };
// const ARTICLE_REPOSITORY = { provide: 'repository', useClass: ArticleRepository };

// const ARTICLE_ENTITY = TypeOrmModule.forFeature([ArticleEntity]);

// @Global()
// @Module({
//     imports: [ARTICLE_ENTITY],
//     controllers: [ArticleReadAdapter, ArticleWriteAdapter],
//     providers: [
//         ARTICLE_READ_SERVICE,
//         ARTICLE_WRITE_SERVICE,
//         ARTICLE_REPOSITORY,
//         ArticleDomainMapper,
//         RequestArticleFormMapper
//     ],
//     exports: [ArticleDomainMapper]
// })
// export class ArticleModule {}
