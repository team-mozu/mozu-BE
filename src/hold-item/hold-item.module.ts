import { Module } from '@nestjs/common';
import { HoldItemPresentationModule } from './presentation/presentation.module';

@Module({
  imports: [HoldItemPresentationModule],
  controllers: [],
  providers: []
})
export class HoldItemModule {}