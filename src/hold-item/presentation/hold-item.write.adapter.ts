import { Body, Controller, Inject, Injectable, Post } from "@nestjs/common";
import { HoldItemWriteService } from "../application/hold-item.write.service";
import { RequestHoldItemForm } from "./form/request/request.hold-item.form";
import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";
import { RequestHoldItemFormMapper } from "./form/request/request.hold-item.from.mapper";

@Controller("/hold-item")
export class HoldItemWriteAdapter{
    constructor(
        @Inject('write_impl')
                private readonly holdItemWriteService: HoldItemWriteService,
                private readonly mapper: RequestHoldItemFormMapper
    ){}

    @Post("/create")
    async create(@Body() requestForm: RequestHoldItemForm): Promise<HoldItemDTO> {
        return await this.holdItemWriteService.save(this.mapper.toDTO(requestForm));
    }
}