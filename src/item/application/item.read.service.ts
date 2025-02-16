import { ItemDTO } from '../common/data/item.dto';

export interface ItemReadService {
    getByItemId(itemId: number): Promise<ItemDTO>;
    getItemList(organId: number): Promise<ItemDTO[]>;
    validateItems(organId: number, ids: number[]): Promise<void>;
}
