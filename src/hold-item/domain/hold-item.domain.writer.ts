import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";

export interface HoldItemDomainWriter {
    save(holdItemDTO: HoldItemDTO): Promise<HoldItemDTO>;
}