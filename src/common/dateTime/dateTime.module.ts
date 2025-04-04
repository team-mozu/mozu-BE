import { Global, Module } from '@nestjs/common';
import { DateTimeService } from './dateTime.service';

@Global()
@Module({
    providers: [DateTimeService],
    exports: [DateTimeService]
})
export class GlobalDateTimeModule {}
