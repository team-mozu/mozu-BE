import { Controller, Get, Inject, Injectable, Param } from '@nestjs/common';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ResponseArticleForm } from './form/response/response.article.form';
import { ArticleReadService } from '../application/article.read.service';
import { ApiTags } from '@nestjs/swagger';
import { ArticleDetailSwagger, ArticleListSwagger } from './document/article.swagger.documentation';

@ApiTags('기사 API')
@Controller('/article')
export class ArticleReadAdapter {
    constructor(
        @Inject('read_impl')
        private readonly readService: ArticleReadService
    ) {}

    @Get()
    @ArticleListSwagger()
    async getArticleList(): Promise<ResponseArticleForm> {
        const articleList = await this.readService.getArticleList();

        return new ResponseArticleForm(articleList);
    }

    @Get('/:id')
    @ArticleDetailSwagger()
    async getByArticleID(@Param('id') articleId: string): Promise<ArticleDTO> {
        return await this.readService.getByArticleID(+articleId);
    }
}
