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

    async create(articleDTO: ArticleDTO): Promise<ArticleDTO> {
        const article = await new ArticleDTO(
            articleDTO.id,
            articleDTO.title,
            articleDTO.description,
            articleDTO.image,
            this.getDate(),
            articleDTO.deleteYN
        );

        return await this.writer.save(article);
    }

    async update(articleDTO: ArticleDTO, articleId: number): Promise<ArticleDTO> {
        const aritcle: ArticleDTO = articleDTO;
        aritcle.id = articleId;

        return await this.writer.update(aritcle);
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
