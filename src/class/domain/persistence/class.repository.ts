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
            relations: ['classItems', 'classArticles', 'classItems.item', 'classArticles.article']
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

    async findClassByCode(classNum: number): Promise<ClassDTO> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                classNum: classNum,
                deleteYN: false
            }
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${classNum})의 수업이 존재하지 않거나 진행중이 아닙니다.`
            );
        }

        return await this.mapper.toClassDomain(existingClass);
    }

    async findOrganClassArticles(classId: number, organId: number): Promise<ClassArticleDTO[]> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                id: classId,
                organ: {
                    id: organId
                },
                progressYN: true,
                deleteYN: false
            },
            relations: ['classArticles', 'classArticles.article']
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 진행중이 아닙니다.`
            );
        }

        return await Promise.all(
            existingClass.classArticles.map((classArticle) =>
                this.mapper.toClassArticleDomain(classArticle)
            )
        );
    }

    async findOrganClassItems(classId: number, organId: number): Promise<ClassItemDTO[]> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                id: classId,
                organ: {
                    id: organId
                },
                progressYN: true,
                deleteYN: false
            },
            relations: ['classItems', 'classItems.item']
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 진행중이 아닙니다.`
            );
        }

        return await Promise.all(
            existingClass.classItems.map((classItem) => this.mapper.toClassItemDomain(classItem))
        );
    }

    async findClassItemById(teamId: number, itemId: number): Promise<ClassItemDTO> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                teams: {
                    id: teamId
                },
                progressYN: true,
                deleteYN: false
            }
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${teamId})의 학생이 참여한 수업이 존재하지 않거나 진행중이 아닙니다.`
            );
        }

        const classItem = await this.classItemTypeormRepository.findOne({
            where: {
                classId: existingClass.id,
                itemId: itemId
            },
            relations: ['item']
        });

        if (!classItem) {
            throw new NotFoundException(`해당하는 id(${itemId})의 수업 종목이 존재하지 않습니다.`);
        }

        return await this.mapper.toClassItemDomain(classItem);
    }

    async validateItems(classId: number, ids: number[]): Promise<void> {
        const validItems = await this.classItemTypeormRepository
            .createQueryBuilder('classItems')
            .where('classItems.classId = :classId', { classId })
            .andWhere('classItems.itemId IN (:...ids)', { ids })
            .getMany();

        if (validItems.length !== ids.length) {
            const validIds = validItems.map((item) => item.itemId);
            const notFoundIds = ids.filter((id) => !validIds.includes(id));
            throw new NotFoundException(`[${notFoundIds}] 해당 기사 id들이 유효하지 않습니다.`);
        }
    }

    async findTeamClassArticles(teamId: number): Promise<ClassArticleDTO[]> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                teams: {
                    id: teamId
                },
                progressYN: true,
                deleteYN: false
            }
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${teamId})의 학생이 참여한 수업이 존재하지 않거나 진행중이 아닙니다.`
            );
        }

        const invDegClassArticles = await this.classArticleTypeormRepository.find({
            where: {
                classId: existingClass.id,
                invDeg: existingClass.curInvDeg
            },
            relations: ['article']
        });

        return await Promise.all(
            invDegClassArticles.map((classArticle) =>
                this.mapper.toClassArticleDomain(classArticle)
            )
        );
    }

    async findTeamClassItems(teamId: number): Promise<ClassItemDTO[]> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                teams: {
                    id: teamId
                },
                progressYN: true,
                deleteYN: false
            },
            relations: ['classItems', 'classItems.item']
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${teamId})의 학생이 참여한 수업이 존재하지 않거나 진행중이 아닙니다.`
            );
        }

        return await Promise.all(
            existingClass.classItems.map((classItem) => this.mapper.toClassItemDomain(classItem))
        );
    }

    async findByTeamId(teamId: number): Promise<ClassDTO> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                teams: {
                    id: teamId
                },
                progressYN: true,
                deleteYN: false
            },
            relations: ['classItems', 'classItems.item']
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${teamId})의 학생이 참여한 수업이 존재하지 않거나 진행중이 아닙니다.`
            );
        }

        return await this.mapper.toClassDomain(existingClass);
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

        const newClass = await this.classTypeormRepository.findOne({
            where: {
                id: savedClassEntity.id,
                deleteYN: false,
                organ: { id: organId }
            },
            relations: ['classItems', 'classArticles', 'classItems.item', 'classArticles.article']
        });

        return {
            classDTO: await this.mapper.toClassDomain(newClass),
            classItemDTO: await Promise.all(
                newClass.classItems.map((item) => this.mapper.toClassItemDomain(item))
            ),
            classArticleDTO: await Promise.all(
                newClass.classArticles.map((article) => this.mapper.toClassArticleDomain(article))
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

        const newClass = await this.classTypeormRepository.findOne({
            where: {
                id: savedClassEntity.id,
                deleteYN: false,
                organ: { id: organId }
            },
            relations: ['classItems', 'classArticles', 'classItems.item', 'classArticles.article']
        });

        return {
            classDTO: await this.mapper.toClassDomain(newClass),
            classItemDTO: await Promise.all(
                newClass.classItems.map((item) => this.mapper.toClassItemDomain(item))
            ),
            classArticleDTO: await Promise.all(
                newClass.classArticles.map((article) => this.mapper.toClassArticleDomain(article))
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

    async startClass(organId: number, classId: number, classNum: number): Promise<void> {
        const existingClass = await this.classTypeormRepository.findOne({
            where: {
                id: classId,
                organ: { id: organId }
            },
            relations: ['organ']
        });

        if (!existingClass) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 삭제 되었습니다.`
            );
        }

        existingClass.classNum = classNum;
        existingClass.progressYN = true;
        existingClass.curInvDeg = 0;

        await this.classTypeormRepository.save(existingClass);
    }

    async stopClass(organId: number, classId: number): Promise<void> {
        const progressClass = await this.classTypeormRepository.findOne({
            where: {
                id: classId,
                organ: { id: organId },
                progressYN: true
            }
        });

        if (!progressClass) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 진행 중인 수업이 아닙니다.`
            );
        }

        progressClass.classNum = null;
        progressClass.progressYN = false;
        progressClass.curInvDeg = 0;

        await this.classTypeormRepository.save(progressClass);
    }

    async nextInvDeg(organId: number, classId: number): Promise<number> {
        const progressClass = await this.classTypeormRepository.findOne({
            where: {
                id: classId,
                organ: { id: organId },
                progressYN: true
            }
        });

        if (!progressClass) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 진행 중인 수업이 아닙니다.`
            );
        }

        progressClass.curInvDeg++;

        await this.classTypeormRepository.save(progressClass);

        return progressClass.curInvDeg;
    }
}
