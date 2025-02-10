import { RequestItemForm } from './request.item.form';
import { ItemDTO } from 'src/item/common/data/item.dto';

export class RequestItemFormMapper {
    async toDTO(form: RequestItemForm): Promise<ItemDTO> {
        return new ItemDTO(
            null,
            form.name,
            form.info,
            null,
            form.money,
            form.debt,
            form.capital,
            form.profit,
            form.profitOG,
            form.profitBen,
            form.netProfit,
            false,
            null
        );
    }
}
