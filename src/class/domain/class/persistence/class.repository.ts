import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ClassDomainReader } from '../class.domain.reader';
import { ClassDomainWrtier } from '../class.domain.writer';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { Repository } from 'typeorm';
import { ClassEntity } from './class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassDomainMapper } from './class.domain.mapper';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassArticleEntity } from '../../classArticle/persistence/classArticle.entity';
import { log } from 'console';

@Injectable()
export class ClassRepository implements ClassDomainReader, ClassDomainWrtier {
    constructor(
        @InjectRepository(ClassEntity)
        private readonly typeormRepository: Repository<ClassEntity>,
        private readonly mapper: ClassDomainMapper
    ) {}

    async findByClassId(classId: number): Promise<ClassDTO> {
        const classEntity = await this.typeormRepository.findOneBy({
            id: classId,
            deleteYN: false
        });

        if (!classEntity) {
            throw new NotFoundException(
                `해당하는 id(${classId})의 수업이 존재하지 않거나 삭제 되었습니다.`
            );
        }

        return await this.mapper.toDomain(classEntity);
    }

    async findClassList(): Promise<ClassDTO[]> {
        const classEntities = await this.typeormRepository.find({
            where: {
                deleteYN: false
            }
        });

        const classList = await Promise.all(
            classEntities.map((entity) => this.mapper.toDomain(entity))
        );

        return classList;
    }

    async save(classDTO: ClassDTO): Promise<ClassDTO> {
        const entity = await this.mapper.toEntity(classDTO);

        console.log(entity);

        if (!entity.name) {
            throw new BadRequestException(`수업 이름(name)은 필수로 입력되어야 합니다.`);
        } else if (!entity.baseMoney) {
            throw new BadRequestException(`수업 기초 자금(baseMoney)은 필수로 입력되어야 합니다.`);
        } else if (!entity.maxInvDeg) {
            throw new BadRequestException(`수업 차수(maxInvDeg)는 필수로 입력되어야 합니다.`);
        }

        const savedEntity = await this.typeormRepository.save(entity);

        return await this.mapper.toDomain(savedEntity);
    }
}
