import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";
import { RequestHoldItemForm } from "./request.hold-item.form";

export class RequestHoldItemFormMapper{
    toDTO(form: RequestHoldItemForm): HoldItemDTO{
        return new HoldItemDTO(form.id, form.classTeamId, form.itemName, form.itemCnt, form.buyMoney, form.valProfit, form.profitNum);
    }
}