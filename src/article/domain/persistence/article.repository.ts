import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticleDomainReader } from '../article.domain.reader';
import { ArticleDTO } from 'src/common/data/article/article.dto';
import { ArticleDomainWriter } from '../article.domain.writer';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleDomainMapper } from './article.domain.mapper';
import { ArticleChecker } from './article.checker';
import { S3Adapter } from 'src/common/thirdparty/s3.adapter';

@Injectable()
export class ArticleRepository implements ArticleDomainReader, ArticleDomainWriter {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly typeormRepository: Repository<ArticleEntity>,
        private readonly mapper: ArticleDomainMapper,
        private readonly checker: ArticleChecker,
        private readonly s3Adapter: S3Adapter
    ) {}

    async findByArticleId(articleId: number): Promise<ArticleDTO> {
        const article = await this.typeormRepository.findOneBy({
            id: articleId,
            deleteYN: false
        });

        this.checker.existValidate(article, articleId);

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

    async save(articleDTO: ArticleDTO, file: Express.Multer.File): Promise<ArticleDTO> {
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

        this.checker.formValidate(entity);

        const saveEntity = await this.typeormRepository.save(entity);

        return await this.mapper.toDomain(saveEntity);
    }

    async update(
        articleId: number,
        articleDTO: ArticleDTO,
        file: Express.Multer.File
    ): Promise<ArticleDTO> {
        const pastArticle = await this.typeormRepository.findOneBy({
            id: articleId,
            deleteYN: false
        });

        this.checker.existValidate(pastArticle, articleId);

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

    async delete(articleId: number): Promise<void> {
        const entity = await this.typeormRepository.findOneBy({
            id: articleId,
            deleteYN: false
        });

        this.checker.existValidate(entity, articleId);

        entity.deleteYN = true;

        const deletedEntity = await this.typeormRepository.update(entity.id, entity);

        return;
    }
}
