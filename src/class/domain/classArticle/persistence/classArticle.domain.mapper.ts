import { Injectable } from '@nestjs/common';
import { ClassArticleEntity } from './classArticle.entity';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassEntity } from '../../class/persistence/class.entity';

@Injectable()
export class ClassArticleDomainMapper {
    constructor() {}

    async toDomain(entity: ClassArticleEntity): Promise<ClassArticleDTO> {
        if (!entity) return null;

        return new ClassArticleDTO(entity.classId, entity.articleId, entity.invDeg);
    }

    async toEntity(domain: ClassArticleDTO): Promise<ClassArticleEntity> {
        if (!domain) return null;

        return new ClassArticleEntity(domain.classId, domain.articleId, domain.invDeg);
    }
}
