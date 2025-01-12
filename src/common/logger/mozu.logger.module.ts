import { Global, Module } from '@nestjs/common';
import { MozuLogger } from './mozu.logger';

@Global()
@Module({
    providers: [MozuLogger],
    exports: [MozuLogger]
})
export class MozuLoggerModule {}
