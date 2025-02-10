import {
    Body,
    Controller,
    Delete,
    Inject,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { RequestArticleForm } from './form/request/request.article.form';
import { RequestArticleFormMapper } from './form/request/request.article.form.mapper';
import { ArticleWriteService } from '../application/article.write.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';

@Controller('/article')
export class ArticleWriteAdapter {
    constructor(
        @Inject('write_impl')
        private readonly writeService: ArticleWriteService,
        private readonly requestArticleFormMapper: RequestArticleFormMapper
    ) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() form: RequestArticleForm,
        @UploadedFile() file: Express.Multer.File,
        @UserID() id: string
    ): Promise<ArticleDTO> {
        const internalDTO = await this.requestArticleFormMapper.toDTO(form);

        return await this.writeService.create(internalDTO, file, +id);
    }

    @Post('/update/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param('id') articleId: string,
        @Body() form: RequestArticleForm,
        @UploadedFile() file: Express.Multer.File,
        @UserID() id: string
    ): Promise<ArticleDTO> {
        const internalDTO = await this.requestArticleFormMapper.toDTO(form);

        return await this.writeService.update(+articleId, internalDTO, file, +id);
    }

    @Delete('/delete/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async delete(@Param('id') articleId: string, @UserID() id: string): Promise<void> {
        return await this.writeService.delete(+articleId, +id);
    }
}
