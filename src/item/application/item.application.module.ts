import { Module } from '@nestjs/common';
import { ItemDomainModule } from '../domain/item.domain.module';
import { ItemReadServiceImpl } from './impl/item.read.service.impl';
import { ItemWrtieServiceImpl } from './impl/item.write.service.impl';

const ITEM_READ_SERVICE = { provide: 'read_impl', useClass: ItemReadServiceImpl };
const ITEM_WRITE_SERVICE = { provide: 'write_impl', useClass: ItemWrtieServiceImpl };

@Module({
    imports: [ItemDomainModule],
    providers: [ITEM_READ_SERVICE, ITEM_WRITE_SERVICE],
    exports: [ITEM_READ_SERVICE, ITEM_WRITE_SERVICE]
})
export class ItemApplicationModule {}
