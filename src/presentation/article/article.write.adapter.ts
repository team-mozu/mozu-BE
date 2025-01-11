import { Body, Controller, Delete, Get, Inject, Injectable, Param, Post } from '@nestjs/common';
import { ArticleReadDocumentation } from './document/article.read.documentation';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ArticleReadService } from 'src/application/article/article.read.service';
import { ArticleWriteDocumentation } from './document/article.write.documentation';
import { ArticleWriteService } from 'src/application/article/article.write.service';
import { RequestArticleForm } from './dto/request/request.article.form';
import { RequestArticleFormMapper } from './dto/request/request.article.form.mapper';

@Controller('/article')
@Injectable()
export class ArticleWriteAdapter implements ArticleWriteDocumentation {
    constructor(
        @Inject('write_impl')
        private readonly writeService: ArticleWriteService,
        private readonly requestArticleFormMapper: RequestArticleFormMapper
    ) {}

    @Post('/create')
    async create(@Body() form: RequestArticleForm): Promise<ArticleDTO> {
        const internalDTO = await this.requestArticleFormMapper.toDTO(form);

        return await this.writeService.create(internalDTO);
    }

    @Post('/update/:id')
    async update(
        @Param('id') articleId: string,
        @Body() form: RequestArticleForm
    ): Promise<ArticleDTO> {
        const internalDTO = await this.requestArticleFormMapper.toDTO(form);

        return await this.writeService.update(internalDTO, +articleId);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') articleId: string): Promise<void> {
        return await this.writeService.delete(+articleId);
    }
}

/**
 * 기사 API 쓰기 목록
 *
 * 1. 추가하기 [ 완료 ]
 * 2. 수정하기 [ 완료 ]
 * 2. 삭제하기 == 숨김처리
 */
