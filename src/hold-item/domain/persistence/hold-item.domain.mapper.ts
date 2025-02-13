import { Injectable } from "@nestjs/common";
import { HoldItemEntity } from "./hold-item.entity";
import { promises } from "dns";
import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";

@Injectable()
export class HoldItemDomainMapper {
    constructor() {}

    async toDomain(holdItemEntity: HoldItemEntity, classTeamId: string): Promise<HoldItemDTO> {
        if (!holdItemEntity) return null;
        
                const {id, itemName, itemCnt, buyMoney, valProfit, profitNum} = holdItemEntity;
        
                return new HoldItemDTO(id, classTeamId, itemName, itemCnt, buyMoney, valProfit, profitNum);
    }

    async toEntity(holdItemdomain: HoldItemDTO): Promise<HoldItemEntity> {
            return new HoldItemEntity(holdItemdomain.id, holdItemdomain.classTeamId, holdItemdomain.itemName, holdItemdomain.itemCnt, holdItemdomain.buyMoney, holdItemdomain.valProfit, holdItemdomain.profitNum);
        }

}