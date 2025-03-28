import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Adapter } from 'src/common/thirdparty/s3.adapter';
import { ItemRepository } from './persistence/item.repository';
import { ItemEntity } from './persistence/item.entity';
import { ItemDomainMapper } from './persistence/item.domain.mapper';

const ITEM_REPOSITORY = { provide: 'repository', useClass: ItemRepository };
const ITEM_ENTITY = TypeOrmModule.forFeature([ItemEntity]);

@Module({
    imports: [ITEM_ENTITY],
    providers: [ITEM_REPOSITORY, ItemDomainMapper, S3Adapter],
    exports: [ITEM_REPOSITORY]
})
export class ItemDomainModule {}
