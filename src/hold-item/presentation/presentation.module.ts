import { Module } from '@nestjs/common';
import { HoldItemApplicationModule } from '../application/application.module';
import { HoldItemReadAdapter } from './hold-item.read.adapter';
import { HoldItemWriteAdapter } from './hold-item.write.adapter';
import { RequestHoldItemFormMapper } from './form/request/request.hold-item.from.mapper';

@Module({
    imports: [HoldItemApplicationModule],
    controllers: [HoldItemReadAdapter, HoldItemWriteAdapter],
    providers: [RequestHoldItemFormMapper]
})
export class HoldItemPresentationModule {}