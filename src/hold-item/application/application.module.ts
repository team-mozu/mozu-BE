import { Module } from '@nestjs/common';
import { HoldItemReadServiceImpl } from './impl/hold-item.read.service.impl';
import { HoldItemWriteServiceImpl } from './impl/hold-item.write.service.impl';
import { HoldItemDomainModule } from '../domain/domain.module';

const HOLD_ITEM_READ_SERVICE = { provide: 'read_impl', useClass: HoldItemReadServiceImpl };
const HOLD_ITEM_WRITE_SERVICE = { provide: 'write_impl', useClass: HoldItemWriteServiceImpl };

@Module({
    imports: [HoldItemDomainModule],
    providers: [HOLD_ITEM_READ_SERVICE, HOLD_ITEM_WRITE_SERVICE],
    exports: [HOLD_ITEM_READ_SERVICE, HOLD_ITEM_WRITE_SERVICE]
})
export class HoldItemApplicationModule {}