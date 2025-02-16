import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ClassDomainReader } from '../class.domain.reader';
import { ClassDomainWrtier } from '../class.domain.writer';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { Repository } from 'typeorm';
import { ClassEntity } from './entity/class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassDomainMapper } from './class.domain.mapper';
import { ClassArticleEntity } from './entity/classArticle.entity';
import { ClassItemEntity } from './entity/classItem.entity';
import { ClassItemDTO } from 'src/class/common/data/class.item.dto';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';

@Injectable()
export class ClassRepository implements ClassDomainReader, ClassDomainWrtier {
    constructor(
        @InjectRepository(ClassEntity)
        private readonly classTypeormRepository: Repository<ClassEntity>,
        @InjectRepository(ClassItemEntity)
        private readonly classItemTypeormRepository: Repository<ClassItemEntity>,
        @InjectRepository(ClassArticleEntity)
        private readonly classArticleTypeormRepository: Repository<ClassArticleEntity>,
        private readonly mapper: ClassDomainMapper
    ) {}

    async findClassList(organId: number): Promise<ClassDTO[]> {
        const entities = await this.classTypeormRepository.find({
            where: {
                deleteYN: false,
                organ: {
                    id: organId
                }
            }
        });

        const classList = await Promise.all(
            entities.map((entity) => this.mapper.toClassDomain(entity))
        );

        return classList;
    }

    async findClassById(
        classId: number,
        organId: number
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                id: classId,
                deleteYN: false,
                organ: { id: organId }
            },
            relations: ['classItems', 'classArticles']
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 삭제 되었습니다.`
            );
        }

        return {
            classDTO: await this.mapper.toClassDomain(existingClass),
            classItemDTO: await Promise.all(
                existingClass.classItems.map((item) => this.mapper.toClassItemDomain(item))
            ),
            classArticleDTO: await Promise.all(
                existingClass.classArticles.map((article) =>
                    this.mapper.toClassArticleDomain(article)
                )
            )
        };
    }

    async save(
        organId: number,
        classDTO: ClassDTO,
        classItemDTO: ClassItemDTO[],
        classArticleDTO: ClassArticleDTO[]
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }> {
        const classEntity = this.classTypeormRepository.create({
            ...(await this.mapper.toClassEntity(classDTO)),
            organ: { id: organId },
            classItems: await Promise.all(
                classItemDTO.map((item) => this.mapper.toClassItemEntity(item, 0)) // 임시 classId (0)
            ),
            classArticles: await Promise.all(
                classArticleDTO.map((article) => this.mapper.toClassArticleEntity(article, 0)) // 임시 classId (0)
            )
        });

        const savedClassEntity = await this.classTypeormRepository.save(classEntity);

        savedClassEntity.classItems = savedClassEntity.classItems.map((item) => ({
            ...item,
            classId: savedClassEntity.id
        }));

        savedClassEntity.classArticles = savedClassEntity.classArticles.map((article) => ({
            ...article,
            classId: savedClassEntity.id
        }));

        await this.classTypeormRepository.save(savedClassEntity);

        return {
            classDTO: await this.mapper.toClassDomain(savedClassEntity),
            classItemDTO: await Promise.all(
                savedClassEntity.classItems.map((item) => this.mapper.toClassItemDomain(item))
            ),
            classArticleDTO: await Promise.all(
                savedClassEntity.classArticles.map((article) =>
                    this.mapper.toClassArticleDomain(article)
                )
            )
        };
    }

    async update(
        organId: number,
        classId: number,
        classDTO: ClassDTO,
        classItemDTO: ClassItemDTO[],
        classArticleDTO: ClassArticleDTO[]
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                id: classId,
                deleteYN: false,
                organ: { id: organId }
            },
            relations: ['classItems', 'classArticles']
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 삭제 되었습니다.`
            );
        }

        await this.classItemTypeormRepository.delete({ classId });
        await this.classArticleTypeormRepository.delete({ classId });

        const updatedClass = await this.classTypeormRepository.create({
            ...existingClass,
            ...(await this.mapper.toClassEntity(classDTO)),
            classItems: await Promise.all(
                classItemDTO.map((item) => this.mapper.toClassItemEntity(item, classId))
            ),
            classArticles: await Promise.all(
                classArticleDTO.map((article) => this.mapper.toClassArticleEntity(article, classId))
            ),
            id: classId,
            createdAt: existingClass.createdAt,
            deleteYN: false
        });

        const savedClassEntity = await this.classTypeormRepository.save(updatedClass);

        return {
            classDTO: await this.mapper.toClassDomain(savedClassEntity),
            classItemDTO: await Promise.all(
                savedClassEntity.classItems.map((item) => this.mapper.toClassItemDomain(item))
            ),
            classArticleDTO: await Promise.all(
                savedClassEntity.classArticles.map((article) =>
                    this.mapper.toClassArticleDomain(article)
                )
            )
        };
    }

    async changeStarYN(organId: number, classId: number): Promise<void> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                id: classId,
                deleteYN: false,
                organ: { id: organId }
            }
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 삭제 되었습니다.`
            );
        }

        existingClass.starYN = existingClass.starYN ? false : true;
        await this.classTypeormRepository.save(existingClass);

        return;
    }

    async delete(organId: number, classId: number): Promise<void> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                id: classId,
                organ: { id: organId }
            }
        });

        await this.classItemTypeormRepository.delete({ classId });
        await this.classArticleTypeormRepository.delete({ classId });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 삭제 되었습니다.`
            );
        }

        existingClass.deleteYN = true;
        await this.classTypeormRepository.save(existingClass);

        return;
    }
}
