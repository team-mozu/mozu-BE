import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganDomainReader } from '../organ.domain.reader';
import { OrganDomainWriter } from '../organ.domain.writer';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganEntity } from './organ.entity';
import { Repository } from 'typeorm';
import { OrganDTO } from 'src/organ/common/data/organ.dto';
import { OrganDomainMapper } from './organ.domain.mapper';

@Injectable()
export class OrganRepository implements OrganDomainReader, OrganDomainWriter {
    constructor(
        @InjectRepository(OrganEntity)
        private readonly typeormRepository: Repository<OrganEntity>,
        private readonly mapper: OrganDomainMapper
    ) {}

    async findByOrganId(organId: number): Promise<OrganDTO> {
        const organ = await this.typeormRepository.findOneBy({
            id: organId
        });

        if (!organ) {
            throw new NotFoundException(`해당하는 id(${organId})의 기관이 존재하지 않습니다.`);
        }

        return await this.mapper.toDomain(organ);
    }

    async findByOrganCode(code: string): Promise<OrganDTO> {
        const organ = await this.typeormRepository.findOneBy({
            code: code
        });

        return await this.mapper.toDomain(organ);
    }

    async findOrganList(): Promise<OrganDTO[]> {
        const entities = await this.typeormRepository.find();

        const organList = await Promise.all(entities.map((entity) => this.mapper.toDomain(entity)));

        return organList;
    }

    async save(organDTO: OrganDTO): Promise<OrganDTO> {
        const entity = await this.mapper.toEntity(organDTO);

        const savedEntity = await this.typeormRepository.save(entity);

        return await this.mapper.toDomain(savedEntity);
    }
}
