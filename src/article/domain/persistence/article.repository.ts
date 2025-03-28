import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleDomainReader } from '../article.domain.reader';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ArticleDomainWriter } from '../article.domain.writer';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleDomainMapper } from './article.domain.mapper';
import { S3Adapter } from 'src/common/thirdparty/s3.adapter';
import { ClassArticleEntity } from 'src/class/domain/persistence/entity/classArticle.entity';

@Injectable()
export class ArticleRepository implements ArticleDomainReader, ArticleDomainWriter {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly typeormRepository: Repository<ArticleEntity>,
        private readonly mapper: ArticleDomainMapper,
        private readonly s3Adapter: S3Adapter
    ) {}

    async findByArticleId(articleId: number): Promise<ArticleDTO> {
        const article = await this.typeormRepository.findOneBy({
            id: articleId,
            deleteYN: false
        });

        if (!article) {
            throw new NotFoundException(
                `해당하는 id(${articleId})의 기사가 존재하지 않거나 삭제 되었습니다.`
            );
        }

        return await this.mapper.toDomain(article);
    }

    async findArticleList(organId: number): Promise<ArticleDTO[]> {
        const entities = await this.typeormRepository.find({
            where: {
                deleteYN: false,
                organ: {
                    id: organId
                }
            }
        });

        const articleList = await Promise.all(
            entities.map((entity) => this.mapper.toDomain(entity))
        );

        return articleList;
    }

    async validateArticles(organId: number, ids: number[]): Promise<void> {
        const validArticles = await this.typeormRepository
            .createQueryBuilder('article')
            .where('article.organId = :organId', { organId })
            .andWhere('article.deleteYN = :deleteYN', { deleteYN: false })
            .andWhere('article.id IN (:...ids)', { ids })
            .getMany();

        if (validArticles.length !== ids.length) {
            const validIds = validArticles.map((article) => article.id);
            const notFoundIds = ids.filter((id) => !validIds.includes(id));
            throw new NotFoundException(`[${notFoundIds}] 해당 기사 id들이 유효하지 않습니다.`);
        }
    }

    async save(
        articleDTO: ArticleDTO,
        file: Express.Multer.File,
        organId: number
    ): Promise<ArticleDTO> {
        let image: string;

        if (!file) {
            image = await this.s3Adapter.getImageUrl('기사 기본 이미지.svg');
        } else {
            await this.s3Adapter.uploadImage(file.originalname, file.buffer);

            image = await this.s3Adapter.getImageUrl(file.originalname);
        }

        const imageAddDTO = {
            ...articleDTO,
            image: image
        };

        const entity = await this.mapper.toEntity(imageAddDTO);

        const createEntity = await this.typeormRepository.create({
            ...entity,
            organ: {
                id: organId
            }
        });

        console.log(createEntity);

        const saveEntity = await this.typeormRepository.save(createEntity);

        return await this.mapper.toDomain(saveEntity);
    }

    async update(
        articleId: number,
        articleDTO: ArticleDTO,
        file: Express.Multer.File,
        organId: number
    ): Promise<ArticleDTO> {
        const pastArticle = await this.typeormRepository.findOneBy({
            id: articleId,
            deleteYN: false,
            organ: {
                id: organId
            }
        });

        if (!pastArticle) {
            throw new NotFoundException(
                `해당하는 id(${articleId})의 기사가 존재하지 않거나 삭제 되었습니다.`
            );
        }

        const updatedEntity = await this.typeormRepository.create({
            ...pastArticle,
            ...articleDTO,
            id: articleId,
            createdAt: pastArticle.createdAt,
            deleteYN: false
        });

        console.log(articleDTO);

        if (articleDTO.image == '') {
            updatedEntity.image = pastArticle.image;
        } else if (!file) {
            updatedEntity.image = await this.s3Adapter.getImageUrl('기사 기본 이미지.svg');
        } else {
            await this.s3Adapter.uploadImage(file.originalname, file.buffer);

            updatedEntity.image = await this.s3Adapter.getImageUrl(file.originalname);
        }

        await this.typeormRepository.save(updatedEntity);

        const newArticle = await this.typeormRepository.findOneBy({
            id: articleId
        });

        return await this.mapper.toDomain(newArticle);
    }

    async delete(articleId: number, organId: number): Promise<void> {
        const entity = await this.typeormRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.classes', 'classArticle')
            .where('article.id = :articleId', { articleId })
            .andWhere('article.deleteYN = :deleteYN', { deleteYN: false })
            .andWhere('article.organId = :organId', { organId })
            .getOne();

        if (!entity) {
            throw new NotFoundException(
                `해당하는 id(${articleId})의 기사가 존재하지 않거나 삭제 되었습니다.`
            );
        }

        await this.typeormRepository
            .createQueryBuilder()
            .delete()
            .from(ClassArticleEntity)
            .where('articleId = :articleId', { articleId })
            .execute();

        entity.deleteYN = true;
        await this.typeormRepository.save(entity);
    }
}
