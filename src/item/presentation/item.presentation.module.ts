import { Module } from '@nestjs/common';
import { ItemApplicationModule } from '../application/item.application.module';
import { ItemReadAdapter } from './item.read.adapter';
import { ItemWrtieAdapter } from './item.write.adapter';
import { RequestItemFormMapper } from './form/request/request.item.form.mapper';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ItemApplicationModule, JwtModule.register({}), ConfigModule],
    controllers: [ItemReadAdapter, ItemWrtieAdapter],
    providers: [RequestItemFormMapper]
})
export class ItemPresentationModule {}
