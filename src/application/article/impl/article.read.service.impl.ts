import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ArticleReadService } from '../article.read.service';
import { Inject, Injectable } from '@nestjs/common';
import { ArticleDomainReader } from 'src/domain/article/article.domain.reader';

@Injectable()
export class ArticleReadServiceImpl implements ArticleReadService {
    constructor(
        @Inject('repository')
        private readonly reader: ArticleDomainReader
    ) {}

    async getByArticleID(articleId: number): Promise<ArticleDTO> {
        return await this.reader.findByArticleId(articleId);
    }

    async getArticleList(): Promise<ArticleDTO[]> {
        return await this.reader.findArticleList();
    }
}
