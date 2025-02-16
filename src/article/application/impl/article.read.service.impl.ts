import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ArticleReadService } from '../article.read.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleDomainReader } from 'src/article/domain/article.domain.reader';

@Injectable()
export class ArticleReadServiceImpl implements ArticleReadService {
    constructor(
        @Inject('repository')
        private readonly reader: ArticleDomainReader
    ) {}

    async getByArticleID(articleId: number): Promise<ArticleDTO> {
        return await this.reader.findByArticleId(articleId);
    }

    async getArticleList(organId: number): Promise<ArticleDTO[]> {
        return await this.reader.findArticleList(organId);
    }

    async validateArticles(organId: number, ids: number[]): Promise<void> {
        return await this.reader.validateArticles(organId, ids);
    }
}
