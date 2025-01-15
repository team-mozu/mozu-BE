import { ArticleDTO } from 'src/common/data/article/article.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ArticleWriteService } from '../article.write.service';
import { ArticleDomainWriter } from 'src/article/domain/article.domain.writer';

@Injectable()
export class ArticleWriteServiceImpl implements ArticleWriteService {
    constructor(
        @Inject('repository')
        private readonly writer: ArticleDomainWriter
    ) {}

    async create(articleDTO: ArticleDTO, file: Express.Multer.File): Promise<ArticleDTO> {
        const article = {
            ...articleDTO,
            createDate: this.getDate()
        };

        return await this.writer.save(article, file);
    }

    async update(
        articleId: number,
        articleDTO: ArticleDTO,
        file: Express.Multer.File
    ): Promise<ArticleDTO> {
        return await this.writer.update(articleId, articleDTO, file);
    }

    async delete(articleId: number): Promise<void> {
        return await this.writer.delete(articleId);
    }

    private getDate(): string {
        const date = new Date();
        const options = {
            timeZone: 'Asia/Seoul'
        };
        const koreanDate = new Intl.DateTimeFormat('en-CA', options).format(date); // 'en-CA'는 'YYYY-MM-DD' 형식

        return koreanDate;
    }
}
