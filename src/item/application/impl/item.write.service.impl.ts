import { Inject, Injectable } from '@nestjs/common';
import { ItemWrtieService } from '../item.write.service';
import { ItemDomainWriter } from 'src/item/domain/item.domain.writer';
import { ItemDTO } from 'src/item/common/data/item.dto';
import { DateTimeService } from 'src/common/dateTime/dateTime.service';

@Injectable()
export class ItemWrtieServiceImpl implements ItemWrtieService {
    constructor(
        @Inject('repository')
        private readonly writer: ItemDomainWriter,
        private readonly dateTimeService: DateTimeService
    ) {}

    async create(itemDTO: ItemDTO, file: Express.Multer.File, userId: number): Promise<ItemDTO> {
        const item = {
            ...itemDTO,
            createdAt: await this.dateTimeService.getNowDate()
        };

        return await this.writer.save(item, file, userId);
    }

    async update(
        itemId: number,
        itemDTO: ItemDTO,
        file: Express.Multer.File,
        organId: number
    ): Promise<ItemDTO> {
        return await this.writer.update(itemId, itemDTO, file, organId);
    }

    async delete(itemId: number, organId: number): Promise<void> {
        return await this.writer.delete(itemId, organId);
    }
}
