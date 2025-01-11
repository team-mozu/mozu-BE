import { Injectable } from '@nestjs/common';
import { ArticleEntity } from './article.entity';
import { ArticleDTO } from 'src/common/data/article/article.dto';

@Injectable()
export class ArticleDomainMapper {
    constructor() {}
    async toDomain(entity: ArticleEntity): Promise<ArticleDTO> {
        if (!entity) return null;

        const { id, title, description, image, createdAt, deleteYN } = entity;

        return new ArticleDTO(id, title, description, image, createdAt, deleteYN);
    }

    async toEntity(domain: ArticleDTO): Promise<ArticleEntity> {
        return new ArticleEntity(domain.title, domain.description, domain.image, domain.createDate);
    }
}
