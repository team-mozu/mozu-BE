import { Injectable } from '@nestjs/common';
import { TeamEntity } from './team.entity';
import { TeamDTO } from 'src/team/common/data/team.dto';
import { TeamOrderEntity } from './team.order.entity';
import { TeamOrderDTO } from 'src/team/common/data/team.order.dto';
import { HoldItemEntity } from './holdItem.entity';
import { HoldItemDTO } from 'src/team/common/data/team.holdItem.dto';

@Injectable()
export class TeamDomainMapper {
    constructor() {}
    async toTeamDomain(entity: TeamEntity): Promise<TeamDTO> {
        if (!entity) return null;

        return new TeamDTO(
            entity.id,
            entity.name,
            entity.classNum,
            entity.schoolName,
            entity.baseMoney,
            entity.totalMoney,
            entity.cashMoney,
            entity.valueMoney,
            entity.invDeg,
            entity.createdAt
        );
    }

    async toTeamEntity(domain: TeamDTO): Promise<TeamEntity> {
        return new TeamEntity(
            domain.name,
            domain.classNum,
            domain.schoolName,
            domain.baseMoney,
            domain.totalMoney,
            domain.cashMoney,
            domain.valueMoney,
            domain.invDeg,
            domain.createdAt
        );
    }

    async toTeamOrderDomain(entity: TeamOrderEntity): Promise<TeamOrderDTO> {
        if (!entity) return null;

        return new TeamOrderDTO(
            entity.id,
            entity.itemId,
            entity.itemName,
            entity.itemMoney,
            entity.orderCount,
            entity.totalMoney,
            entity.orderType,
            entity.invDeg
        );
    }

    async toTeamOrderEntity(domain: TeamOrderDTO): Promise<TeamOrderEntity> {
        return new TeamOrderEntity(
            domain.itemId,
            domain.itemName,
            domain.itemMoney,
            domain.orderCount,
            domain.totalMoney,
            domain.orderType,
            domain.invDeg
        );
    }

    async toTeamHoldItemDomain(entity: HoldItemEntity): Promise<HoldItemDTO> {
        if (!entity) return null;

        return new HoldItemDTO(
            entity.id,
            entity.itemId,
            entity.itemName,
            entity.itemCnt,
            entity.buyMoney,
            entity.totalMoney,
            entity.nowMoney,
            entity.valMoney,
            entity.valProfit,
            entity.profitNum
        );
    }

    async toTeamHoldItemEntity(domain: HoldItemDTO): Promise<HoldItemEntity> {
        return new HoldItemEntity(
            domain.itemId,
            domain.itemName,
            domain.itemCnt,
            domain.buyMoney,
            domain.totalMoney,
            domain.nowMoney,
            domain.valMoney,
            domain.valProfit,
            domain.profitNum
        );
    }
}
