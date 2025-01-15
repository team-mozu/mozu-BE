import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Injectable,
    Param,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ArticleWriteDocumentation } from './document/article.write.documentation';
import { RequestArticleForm } from './form/request/request.article.form';
import { RequestArticleFormMapper } from './form/request/request.article.form.mapper';
import { ArticleWriteService } from '../application/article.write.service';
import { MozuLogger } from 'src/common/logger/mozu.logger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/article')
@Injectable()
export class ArticleWriteAdapter implements ArticleWriteDocumentation {
    constructor(
        @Inject('write_impl')
        private readonly writeService: ArticleWriteService,
        private readonly requestArticleFormMapper: RequestArticleFormMapper
    ) {}

    @Post('/create')
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() form: RequestArticleForm,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ArticleDTO> {
        const internalDTO = await this.requestArticleFormMapper.toDTO(form);

        return await this.writeService.create(internalDTO, file);
    }

    @Post('/update/:id')
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param('id') articleId: string,
        @Body() form: RequestArticleForm,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ArticleDTO> {
        const internalDTO = await this.requestArticleFormMapper.toDTO(form);

        return await this.writeService.update(+articleId, internalDTO, file);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') articleId: string): Promise<void> {
        return await this.writeService.delete(+articleId);
    }
}
