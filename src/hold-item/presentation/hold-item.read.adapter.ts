import { Body, Controller, Get, Inject, Injectable, Param, Query } from "@nestjs/common";
import { HoldItemReadService } from "../application/hold-item.read.service";
import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";

@Controller("/hold-item")
export class HoldItemReadAdapter{
    constructor(
        @Inject('read_impl')
        private readonly holdItemReadService: HoldItemReadService
    ){}

    @Get(":id")
    async getByHoldItemID(@Param("id") holdItemId: string): Promise<HoldItemDTO> {
        return await this.holdItemReadService.findByHoldItemId(holdItemId);
    }

    @Get(":classTeamId")
    async getHoldItemList(@Param("classTeamId") classTeamId: string): Promise<HoldItemDTO[]> {
        return await this.holdItemReadService.findByHoldItemList(classTeamId);
    }
}