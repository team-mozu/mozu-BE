import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from './item.entity';
import { ItemDomainMapper } from './item.domain.mapper';
import { S3Adapter } from 'src/common/thirdparty/s3.adapter';
import { Repository } from 'typeorm';
import { ItemDomainReader } from '../item.domain.reader';
import { ItemDomainWriter } from '../item.domain.writer';
import { ItemDTO } from 'src/item/common/data/item.dto';

@Injectable()
export class ItemRepository implements ItemDomainReader, ItemDomainWriter {
    constructor(
        @InjectRepository(ItemEntity)
        private readonly typeormRepository: Repository<ItemEntity>,
        private readonly mapper: ItemDomainMapper,
        private readonly s3Adapter: S3Adapter
    ) {}

    async findByItemId(itemId: number): Promise<ItemDTO> {
        const item = await this.typeormRepository.findOneBy({
            id: itemId,
            deleteYN: false
        });

        if (!item) {
            throw new NotFoundException(
                `해당하는 id(${itemId})의 종목이 존재하지 않거나 삭제 되었습니다.`
            );
        }

        return await this.mapper.toDomain(item);
    }

    async findItemList(organId: number): Promise<ItemDTO[]> {
        const entities = await this.typeormRepository.find({
            where: {
                deleteYN: false,
                organ: {
                    id: organId
                }
            }
        });
        const itemList = await Promise.all(entities.map((entity) => this.mapper.toDomain(entity)));

        return itemList;
    }

    async validateItems(organId: number, ids: number[]): Promise<void> {
        const validItems = await this.typeormRepository
            .createQueryBuilder('item')
            .where('item.organId = :organId', { organId })
            .andWhere('item.deleteYN = :deleteYN', { deleteYN: false })
            .andWhere('item.id IN (:...ids)', { ids })
            .getMany();

        if (validItems.length !== ids.length) {
            const validIds = validItems.map((item) => item.id);
            const notFoundIds = ids.filter((id) => !validIds.includes(id));
            throw new NotFoundException(`[${notFoundIds}] 해당 종목 id들이 유효하지 않습니다.`);
        }
    }

    async save(itemDTO: ItemDTO, file: Express.Multer.File, organId: number): Promise<ItemDTO> {
        let image: string;

        if (!file) {
            image = await this.s3Adapter.getImageUrl('종목 기본 이미지.svg');
        } else {
            await this.s3Adapter.uploadImage(file.originalname, file.buffer);

            image = await this.s3Adapter.getImageUrl(file.originalname);
        }

        const imageAddDTO = {
            ...itemDTO,
            logo: image
        };

        const entity = await this.mapper.toEntity(imageAddDTO);

        const createEntity = await this.typeormRepository.create({
            ...entity,
            organ: {
                id: organId
            }
        });

        const saveEntity = await this.typeormRepository.save(createEntity);

        return await this.mapper.toDomain(saveEntity);
    }

    async update(
        itemId: number,
        itemDTO: ItemDTO,
        file: Express.Multer.File,
        organId: number
    ): Promise<ItemDTO> {
        const pastItem = await this.typeormRepository.findOneBy({
            id: itemId,
            deleteYN: false,
            organ: {
                id: organId
            }
        });

        if (!pastItem) {
            throw new NotFoundException(
                `해당하는 id(${itemId})의 종목이 존재하지 않거나 삭제 되었습니다.`
            );
        }

        const updatedEntity = await this.typeormRepository.create({
            ...pastItem,
            ...itemDTO,
            id: itemId,
            createdAt: pastItem.createdAt,
            deleteYN: false
        });

        if (itemDTO.logo == '') {
            updatedEntity.logo = pastItem.logo;
        } else if (!file) {
            updatedEntity.logo = await this.s3Adapter.getImageUrl('종목 기본 이미지.svg');
        } else {
            await this.s3Adapter.uploadImage(file.originalname, file.buffer);

            updatedEntity.logo = await this.s3Adapter.getImageUrl(file.originalname);
        }

        await this.typeormRepository.save(updatedEntity);

        const newItem = await this.typeormRepository.findOneBy({
            id: itemId
        });

        return await this.mapper.toDomain(newItem);
    }

    async delete(itemId: number, organId: number): Promise<void> {
        const entity = await this.typeormRepository.findOneBy({
            id: itemId,
            deleteYN: false,
            organ: {
                id: organId
            }
        });

        if (!entity) {
            throw new NotFoundException(
                `해당하는 id(${itemId})의 종목이 존재하지 않거나 삭제 되었습니다.`
            );
        }

        entity.deleteYN = true;

        const deletedEntity = await this.typeormRepository.update(entity.id, entity);

        return;
    }
}
