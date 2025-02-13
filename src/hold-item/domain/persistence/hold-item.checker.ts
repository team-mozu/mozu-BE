import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { HoldItemEntity } from "./hold-item.entity";

@Injectable()
export class HoldItemChecker {

    existValidate(holdItem: HoldItemEntity, holdItemId: string): void {
        if (!holdItem) {
            throw new NotFoundException(`해당하는 보유주식(${holdItemId})이 존재하지 않습니다.`);
        }
    }

    formValidate(holdItemEntity: HoldItemEntity): void {
        if (!holdItemEntity.itemName || !holdItemEntity.itemCnt) {
            throw new BadRequestException("아이템 이름과 갯수는 필수 항목입니다.");
        }

        if (holdItemEntity.buyMoney <= 0 || holdItemEntity.valProfit < 0) {
            throw new BadRequestException("잘못된 구매 금액 또는 이익 값입니다.");
        }
    }
}
