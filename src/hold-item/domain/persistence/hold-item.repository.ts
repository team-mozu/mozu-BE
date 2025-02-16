import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HoldItemEntity } from "./hold-item.entity";
import { HoldItemDomainMapper } from "./hold-item.domain.mapper";
import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";
import { HoldItemDomainWriter } from "../hold-item.domain.writer";
import { HoldItemDomainReader } from "../hold-item.domain.reader";
import { HoldItemChecker } from "./hold-item.checker";

@Injectable()
export class HoldItemRepository implements HoldItemDomainWriter, HoldItemDomainReader {
    constructor(
        @InjectRepository(HoldItemEntity)
        private readonly typeormRepository: Repository<HoldItemEntity>,
        private readonly mapper: HoldItemDomainMapper,
        private readonly checker: HoldItemChecker
    ) {}


    async findByHoldItemId(holdItemId: string): Promise<HoldItemDTO> {
        const holdItem = await this.typeormRepository.findOneBy({ id: holdItemId });

        this.checker.existValidate(holdItem, holdItemId);

        return await this.mapper.toDomain(holdItem);
    }

    async findByHoldItemList(classTeamId: string): Promise<HoldItemDTO[]> {
        const holdItemEntities = await this.typeormRepository.find({
            where: { classTeamId }
        });

        if (!holdItemEntities.length) {
            return [];
        }

        const holdItemList = await Promise.all(
            holdItemEntities.map((entity) => this.mapper.toDomain(entity))
        );

        return holdItemList;
    }

    async save(holdItemDTO: HoldItemDTO): Promise<HoldItemDTO> {

        const entity = await this.mapper.toEntity(holdItemDTO);

        this.checker.formValidate(entity);

        const savedEntity = await this.typeormRepository.save(entity);

        return await this.mapper.toDomain(savedEntity);
    }
}
