import { ItemDTO } from '../common/data/item.dto';

export interface ItemDomainWriter {
    save(itemDTO: ItemDTO, file: Express.Multer.File, organId: number): Promise<ItemDTO>;
    update(
        itemId: number,
        articleDTO: ItemDTO,
        file: Express.Multer.File,
        organId: number
    ): Promise<ItemDTO>;
    delete(itemId: number, organId: number): Promise<void>;
}
