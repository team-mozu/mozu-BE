import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Injectable,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { RequestArticleForm } from './form/request/request.article.form';
import { RequestArticleFormMapper } from './form/request/request.article.form.mapper';
import { ArticleWriteService } from '../application/article.write.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
    ArticleCreateSwagger,
    ArticleDeleteSwagger,
    ArticleUpdateSwagger
} from './document/article.swagger.documentation';

@ApiTags('기사 API')
@Controller('/article')
@Injectable()
export class ArticleWriteAdapter {
    constructor(
        @Inject('write_impl')
        private readonly writeService: ArticleWriteService,
        private readonly requestArticleFormMapper: RequestArticleFormMapper
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ArticleCreateSwagger()
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() formData: RequestArticleForm
    ): Promise<any> {
        const internalDTO = await this.requestArticleFormMapper.toDTO(formData);

        return await this.writeService.create(internalDTO, file);
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    @ArticleUpdateSwagger()
    async update(
        @Param('id') articleId: string,
        @Body() form: RequestArticleForm,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ArticleDTO> {
        const internalDTO = await this.requestArticleFormMapper.toDTO(form);

        return await this.writeService.update(+articleId, internalDTO, file);
    }

    @Delete('/:id')
    @ArticleDeleteSwagger()
    async delete(@Param('id') articleId: string): Promise<void> {
        return await this.writeService.delete(+articleId);
    }
}
