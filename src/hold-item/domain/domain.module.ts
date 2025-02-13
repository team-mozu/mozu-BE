import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoldItemEntity } from './persistence/hold-item.entity';
import { ConfigModule } from '@nestjs/config';
import { HoldItemDomainMapper } from './persistence/hold-item.domain.mapper';
import { HoldItemChecker } from './persistence/hold-item.checker';

const HOLD_ITEM_ENTITY = TypeOrmModule.forFeature([HoldItemEntity]);

@Module({
    imports: [HOLD_ITEM_ENTITY, ConfigModule],
    providers: [
        HoldItemDomainMapper,
        HoldItemChecker
    ],
    exports: [HoldItemDomainMapper]
})
export class HoldItemDomainModule {}