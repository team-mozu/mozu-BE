import { Body, Controller, Inject, Injectable, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { RequestHoldItemForm } from "./form/request/request.hold-item.form";
import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";
import { HoldItemWriteService } from "../application/hold-item.write.service";

@Controller("/hold-item")
@Injectable()
export class HoldItemWriteAdapter{
    constructor(
        @Inject('write_impl')
                private readonly holdItemWriteService: HoldItemWriteService
    ){}

    @Post("/create")
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
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