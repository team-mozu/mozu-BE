import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleDomainReader } from '../article.domain.reader';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ArticleDomainWriter } from '../article.domain.writer';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleDomainMapper } from './article.domain.mapper';
import { S3Adapter } from 'src/common/thirdparty/s3.adapter';

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

    async save(
        articleDTO: ArticleDTO,
        file: Express.Multer.File,
        organId: number
    ): Promise<ArticleDTO> {
        let image: string;

        if (!file) {
            image = await this.s3Adapter.getImageUrl('내 로고.png');
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

        if (!file) {
            updatedEntity.image = await this.s3Adapter.getImageUrl('내 로고.png');
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
        const entity = await this.typeormRepository.findOneBy({
            id: articleId,
            deleteYN: false,
            organ: {
                id: organId
            }
        });

        if (!entity) {
            throw new NotFoundException(
                `해당하는 id(${articleId})의 기사가 존재하지 않거나 삭제 되었습니다.`
            );
        }

        entity.deleteYN = true;

        const deletedEntity = await this.typeormRepository.update(entity.id, entity);

        return;
    }
}
