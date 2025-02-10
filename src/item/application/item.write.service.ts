import { ItemDTO } from '../common/data/item.dto';

export interface ItemWrtieService {
    create(itemDTO: ItemDTO, file: Express.Multer.File, userId: number): Promise<ItemDTO>;
    update(
        itemId: number,
        itemDTO: ItemDTO,
        file: Express.Multer.File,
        organId: number
    ): Promise<ItemDTO>;
    delete(itemId: number, organId: number): Promise<void>;
}
