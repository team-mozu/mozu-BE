import { ArticleDTO } from 'src/common/data/article/article.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ArticleWriteService } from '../article.write.service';
import { ArticleDomainWriter } from 'src/article/domain/article.domain.writer';
import { DateTimeService } from 'src/common/dateTime/dateTime.service';

@Injectable()
export class ArticleWriteServiceImpl implements ArticleWriteService {
    constructor(
        @Inject('repository')
        private readonly writer: ArticleDomainWriter,
        private readonly dateTimeService: DateTimeService
    ) {}

    async create(
        articleDTO: ArticleDTO,
        file: Express.Multer.File,
        organId: number
    ): Promise<ArticleDTO> {
        const article = {
            ...articleDTO,
            createDate: await this.dateTimeService.getNowDate()
        };

        return await this.writer.save(article, file, organId);
    }

    async update(
        articleId: number,
        articleDTO: ArticleDTO,
        file: Express.Multer.File,
        organId: number
    ): Promise<ArticleDTO> {
        return await this.writer.update(articleId, articleDTO, file, organId);
    }

    async delete(articleId: number, organId: number): Promise<void> {
        return await this.writer.delete(articleId, organId);
    }
}
