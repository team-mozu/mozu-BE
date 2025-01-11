import { Injectable } from '@nestjs/common';
import { ArticleDomainReader } from '../article.domain.reader';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ArticleDomainWriter } from '../article.domain.writer';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleDomainMapper } from './article.domain.mapper';

@Injectable()
export class ArticleRepository implements ArticleDomainReader, ArticleDomainWriter {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly typeormRepository: Repository<ArticleEntity>,
        private readonly mapper: ArticleDomainMapper
    ) {}

    async findByArticleId(articleId: number): Promise<ArticleDTO> {
        const article = await this.typeormRepository.findOneBy({
            id: articleId
        });

        return await this.mapper.toDomain(article);
    }

    async findArticleList(): Promise<ArticleDTO[]> {
        const entities = await this.typeormRepository.find({
            where: {
                deleteYN: false
            }
        });
        const articleList = await Promise.all(
            entities.map((entity) => this.mapper.toDomain(entity))
        );

        return articleList;
    }

    async save(articleDTO: ArticleDTO): Promise<ArticleDTO> {
        const entity = await this.mapper.toEntity(articleDTO);
        const saveEntity = await this.typeormRepository.save(entity);

        return await this.mapper.toDomain(saveEntity);
    }

    async update(articleDTO: ArticleDTO): Promise<ArticleDTO> {
        const pastArticle = await this.typeormRepository.findOneBy({
            id: articleDTO.id
        });

        if (!pastArticle) {
            // 에러처리 진행 잘못 된 아이디 일경우
        }
        articleDTO.createDate = pastArticle.createdAt;

        const entity = await this.mapper.toEntity(articleDTO);

        const saveEntity = await this.typeormRepository.update(pastArticle.id, entity);

        const updatedEntity = await this.typeormRepository.findOneBy({
            id: pastArticle.id
        });

        return await this.mapper.toDomain(updatedEntity);
    }

    async delete(articleId: number): Promise<void> {
        const entity = await this.typeormRepository.findOneBy({
            id: articleId
        });

        if (!entity) {
            // 에러처리 진행 잘못 된 아이디 일경우
        }

        entity.deleteYN = true;

        const deletedEntity = await this.typeormRepository.update(entity.id, entity);

        return;
    }
}
