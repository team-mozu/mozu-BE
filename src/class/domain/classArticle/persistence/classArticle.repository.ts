import { Injectable } from '@nestjs/common';
import { ClassArticleDomainReader } from '../classArticle.domain.reader';
import { ClassArticleDomainWriter } from '../classArticle.domain.writer';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassArticleEntity } from './classArticle.entity';
import { Repository } from 'typeorm';
import { ClassArticleDomainMapper } from './classArticle.domain.mapper';

@Injectable()
export class ClassArticleRepository implements ClassArticleDomainReader, ClassArticleDomainWriter {
    constructor(
        @InjectRepository(ClassArticleEntity)
        private readonly typeormRepository: Repository<ClassArticleEntity>,
        private readonly mapper: ClassArticleDomainMapper
    ) {}

    async save(classArticleDTO: ClassArticleDTO): Promise<ClassArticleDTO> {
        const entity = await this.mapper.toEntity(classArticleDTO);

        const saveEntity = await this.typeormRepository.save(entity);

        return await this.mapper.toDomain(saveEntity);
    }

    async saveAll(classArticleDTOs: ClassArticleDTO[]): Promise<ClassArticleDTO[]> {
        const entities = await Promise.all(
            classArticleDTOs.map((dto) => this.mapper.toEntity(dto))
        );

        const savedEntities = await this.typeormRepository.save(entities);

        const returnData = await Promise.all(
            savedEntities.map((entity) => this.mapper.toDomain(entity))
        );

        console.log(returnData);

        return returnData;
    }
}
