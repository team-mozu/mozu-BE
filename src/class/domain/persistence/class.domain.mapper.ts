import { Injectable } from '@nestjs/common';
import { ClassEntity } from './entity/class.entity';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { ClassItemEntity } from './entity/classItem.entity';
import { ClassItemDTO } from 'src/class/common/data/class.item.dto';
import { ClassArticleEntity } from './entity/classArticle.entity';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';

@Injectable()
export class ClassDomainMapper {
    constructor() {}

    async toClassDomain(entity: ClassEntity): Promise<ClassDTO> {
        if (!entity) return null;

        return new ClassDTO(
            entity.id,
            entity.name,
            entity.maxInvDeg,
            entity.curInvDeg,
            entity.baseMoney,
            entity.classNum,
            entity.starYN,
            entity.progressYN,
            entity.createdAt,
            entity.deleteYN
        );
    }

    async toClassEntity(domain: ClassDTO): Promise<ClassEntity> {
        return new ClassEntity(
            domain.name,
            domain.maxInvDeg,
            domain.curInvDeg,
            domain.baseMoney,
            domain.classNum,
            domain.starYN,
            domain.progressYN,
            domain.createdAt,
            domain.deleteYN
        );
    }

    async toClassItemDomain(entity: ClassItemEntity): Promise<ClassItemDTO> {
        if (!entity) return null;

        return new ClassItemDTO(entity.classId, entity.itemId, entity.money, entity.item);
    }

    async toClassItemEntity(domain: ClassItemDTO, classId: number): Promise<ClassItemEntity> {
        return new ClassItemEntity(classId, domain.itemId, domain.money);
    }

    async toClassArticleDomain(entity: ClassArticleEntity): Promise<ClassArticleDTO> {
        if (!entity) return null;

        return new ClassArticleDTO(entity.classId, entity.articleId, entity.invDeg, entity.article);
    }

    async toClassArticleEntity(
        domain: ClassArticleDTO,
        classId: number
    ): Promise<ClassArticleEntity> {
        return new ClassArticleEntity(classId, domain.articleId, domain.invDeg);
    }
}
