import { Controller, Get, Inject, Injectable, Param } from '@nestjs/common';
import { ArticleReadDocumentation } from './document/article.read.documentation';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ResponseArticleForm } from './form/response/response.article.form';
import { ArticleReadService } from '../application/article.read.service';

@Controller('/article')
@Injectable()
export class ArticleReadAdapter implements ArticleReadDocumentation {
    constructor(
        @Inject('read_impl')
        private readonly readService: ArticleReadService
    ) {}

    @Get('/:id')
    async getByArticleID(@Param('id') articleId: string): Promise<ArticleDTO> {
        return await this.readService.getByArticleID(+articleId);
    }

    @Get()
    async getArticleList(): Promise<ResponseArticleForm> {
        const articleList = await this.readService.getArticleList();

        return new ResponseArticleForm(articleList);
    }
}
