import { Inject, Injectable } from '@nestjs/common';
import { ItemDomainReader } from 'src/item/domain/item.domain.reader';
import { ItemReadService } from '../item.read.service';
import { ItemDTO } from 'src/item/common/data/item.dto';

@Injectable()
export class ItemReadServiceImpl implements ItemReadService {
    constructor(
        @Inject('repository')
        private readonly reader: ItemDomainReader
    ) {}

    async getByItemId(itemId: number): Promise<ItemDTO> {
        return await this.reader.findByItemId(itemId);
    }

    async getItemList(organId: number): Promise<ItemDTO[]> {
        return await this.reader.findItemList(organId);
    }
}
