import { Inject, Injectable } from "@nestjs/common";
import { HoldItemReadService } from "../hold-item.read.service";
import { HoldItemDomainReader } from "src/hold-item/domain/hold-item.domain.reader";
import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";

@Injectable()
export class HoldItemReadServiceImpl implements HoldItemReadService {
    constructor(
        @Inject('holdItemRepository')
        private readonly reader: HoldItemDomainReader
    ) {}

    async findByHoldItemId(holdItemId: string): Promise<HoldItemDTO> {
        return await this.reader.findByHoldItemId(holdItemId);
    }

    async findByHoldItemList(classTeamId: string): Promise<HoldItemDTO[]> {
        return await this.reader.findByHoldItemList(classTeamId);
    }
}