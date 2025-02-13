import { HoldItemDTO } from "src/common/data/hold-item/hold-item.dto";
import { RequestHoldItemForm } from "../form/request/request.hold-item.form";

export interface HoldItemeWriteDocumentation {
    create(createArticleDTO: RequestHoldItemForm): Promise<HoldItemDTO>;
}
