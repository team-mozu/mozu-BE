import { ArticleDTO } from 'src/common/data/article/article.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ArticleDomainWriter } from 'src/article/domain/article.domain.writer';
import { ItemWrtieService } from '../item.write.service';
import { ItemDomainWriter } from 'src/item/domain/item.domain.writer';
import { ItemDTO } from 'src/item/common/data/item.dto';

@Injectable()
export class ItemWrtieServiceImpl implements ItemWrtieService {
    constructor(
        @Inject('repository')
        private readonly writer: ItemDomainWriter
    ) {}

    async create(itemDTO: ItemDTO, file: Express.Multer.File, userId: number): Promise<ItemDTO> {
        const item = {
            ...itemDTO,
            createdAt: this.getDate()
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

    private getDate(): string {
        const date = new Date();
        const options = {
            timeZone: 'Asia/Seoul'
        };
        const koreanDate = new Intl.DateTimeFormat('en-CA', options).format(date); // 'en-CA'는 'YYYY-MM-DD' 형식

        return koreanDate;
    }
}
