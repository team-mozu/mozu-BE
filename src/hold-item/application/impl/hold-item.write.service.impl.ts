import { Inject, Injectable } from "@nestjs/common";
import { HoldItemWriteService } from "../hold-item.write.service";
import { HoldItemDomainWriter } from "src/hold-item/domain/hold-item.domain.writer";
import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";

@Injectable()
export class HoldItemWriteServiceImpl implements HoldItemWriteService {
    constructor(
        @Inject('repository') 
        private readonly writer: HoldItemDomainWriter
    ) {}

    async save(holdItemDTO: HoldItemDTO): Promise<HoldItemDTO> {
        return await this.writer.save(holdItemDTO);
    }
}