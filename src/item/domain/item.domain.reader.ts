import { ItemDTO } from '../common/data/item.dto';

export interface ItemDomainReader {
    findByItemId(itemId: number): Promise<ItemDTO>;
    findItemList(organId: number): Promise<ItemDTO[]>;
    validateItems(organId: number, ids: number[]);
}
