import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";

export interface HoldItemReadService {
    findByHoldItemId(holdItemId: string): Promise<HoldItemDTO>;
    findByHoldItemList(classTeamId: string): Promise<HoldItemDTO[]>;
}