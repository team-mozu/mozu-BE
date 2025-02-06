import { Inject, Injectable } from '@nestjs/common';
import { ClassWrtieService } from '../class.write.service';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { ClassDomainWrtier } from 'src/class/domain/class/class.domain.writer';
import { ClassArticleDomainWriter } from 'src/class/domain/classArticle/classArticle.domain.writer';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';

@Injectable()
export class ClassWriteServiceImpl implements ClassWrtieService {
    constructor(
        @Inject('class_repository')
        private readonly classWriter: ClassDomainWrtier,
        @Inject('classArticle_repository')
        private readonly classArticleWriter: ClassArticleDomainWriter
    ) {}

    async create(
        classDTO: ClassDTO,
        classArticleDTO: ClassArticleDTO[]
    ): Promise<{ classDTO: ClassDTO; classArticleDTO: ClassArticleDTO[] }> {
        const classData = {
            ...classDTO,
            createdAt: this.getDate()
        };

        const savedClass = await this.classWriter.save(classData);

        const classArticles: ClassArticleDTO[] = classArticleDTO.map((article) => {
            return new ClassArticleDTO(savedClass.id, article.articleId, article.invDeg);
        });

        const savedClassArticles = await this.classArticleWriter.saveAll(classArticles);

        return { classDTO: savedClass, classArticleDTO: savedClassArticles };
    }

    private getDate(): string {
        const date = new Date();
        const options = {
            timeZone: 'Asia/Seoul'
        };
        const koreanDate = new Intl.DateTimeFormat('en-CA', options).format(date);

        return koreanDate;
    }
}
