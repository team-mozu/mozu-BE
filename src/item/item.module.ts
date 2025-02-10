import { Module } from '@nestjs/common';
import { ItemPresentationModule } from './presentation/item.presentation.module';

@Module({
    imports: [ItemPresentationModule],
    controllers: [],
    providers: []
})
export class ItemModule {}
