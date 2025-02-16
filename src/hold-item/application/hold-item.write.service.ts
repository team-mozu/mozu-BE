import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";

export interface HoldItemWriteService {
    save(holdItemDTO: HoldItemDTO): Promise<HoldItemDTO>;
}