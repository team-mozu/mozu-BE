import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    UseGuards
} from '@nestjs/common';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ResponseArticleForm } from './form/response/response.article.form';
import { ArticleReadService } from '../application/article.read.service';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';

@Controller('/article')
export class ArticleReadAdapter {
    constructor(
        @Inject('read_impl')
        private readonly readService: ArticleReadService
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN, Authority.STUDENT])
    async getByArticleID(@Param('id', ParseIntPipe) articleId: number): Promise<ArticleDTO> {
        return await this.readService.getByArticleID(articleId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getArticleList(@UserID() id: string): Promise<ResponseArticleForm> {
        const articleList = await this.readService.getArticleList(+id);

        return new ResponseArticleForm(articleList);
    }

    @Post('validate')
    async validateItems(@Body() body: { organId: number; ids: number[] }): Promise<Boolean> {
        await this.readService.validateArticles(body.organId, body.ids);

        return true;
    }
}
