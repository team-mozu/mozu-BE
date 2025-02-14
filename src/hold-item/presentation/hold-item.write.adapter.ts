import { Body, Controller, Inject, Injectable, Post } from "@nestjs/common";
import { HoldItemWriteService } from "../application/hold-item.write.service";
import { RequestHoldItemForm } from "./form/request/request.hold-item.form";
import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";

@Controller("/hold-item")
@Injectable()
export class HoldItemWriteAdapter{
    constructor(
        @Inject('write_impl')
                private readonly holdItemWriteService: HoldItemWriteService
    ){}

    @Post("/create")
    async create(@Body() requestForm: RequestHoldItemForm): Promise<HoldItemDTO> {
        return await this.holdItemWriteService.save(new HoldItemDTO(
            requestForm.id,
            requestForm.classTeamId,
            requestForm.itemName,
            requestForm.itemCnt,
            requestForm.buyMoney,
            requestForm.valProfit,
            requestForm.profitNum
        ));
    }
}