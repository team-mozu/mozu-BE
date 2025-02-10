import { Injectable } from '@nestjs/common';
import { ItemEntity } from './item.entity';
import { ItemDTO } from 'src/item/common/data/item.dto';

@Injectable()
export class ItemDomainMapper {
    constructor() {}
    async toDomain(entity: ItemEntity): Promise<ItemDTO> {
        if (!entity) return null;

        const {
            id,
            name,
            info,
            logo,
            money,
            debt,
            capital,
            profit,
            profitOG,
            profitBen,
            netProfit,
            createdAt,
            deleteYN
        } = entity;

        return new ItemDTO(
            id,
            name,
            info,
            logo,
            money,
            debt,
            capital,
            profit,
            profitOG,
            profitBen,
            netProfit,
            deleteYN,
            createdAt
        );
    }

    async toEntity(domain: ItemDTO): Promise<ItemEntity> {
        return new ItemEntity(
            domain.name,
            domain.info,
            domain.logo,
            domain.money,
            domain.debt,
            domain.capital,
            domain.profit,
            domain.profitOG,
            domain.profitBen,
            domain.netProfit,
            domain.deleteYN,
            domain.createdAt
        );
    }
}
