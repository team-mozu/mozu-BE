import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";
import { ResponseHoldItemForm } from "../form/response/response.hold-item.form";

export interface HoldItemReadDocumentation {
    getByHoldItemID(HoldItemId: string): Promise<HoldItemDTO>;
    getHoldItemList: (classTeamId: string) => Promise<HoldItemDTO[]>
}