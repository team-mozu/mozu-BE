import { Body, Controller, Get, Inject, Injectable, Param } from "@nestjs/common";
import { HoldItemReadDocumentation } from "./document/hold-item.read.documentation";
import { HoldItemReadService } from "../application/hold-item.read.service";
import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";

@Controller("/hold-item")
@Injectable()
export class HoldItemReadAdapter implements HoldItemReadDocumentation{
    constructor(
        @Inject('hold_item_read_impl')
        private readonly holdItemReadService: HoldItemReadService
    ){}

    @Get(":id")
    async getByHoldItemID(@Param("id") holdItemId: string): Promise<HoldItemDTO> {
        return await this.holdItemReadService.findByHoldItemId(holdItemId);
    }

    @Get()
    async getHoldItemList(@Body("classTeamId") classTeamId: string): Promise<HoldItemDTO[]> {
        return await this.holdItemReadService.findByHoldItemList(classTeamId);
    }
}