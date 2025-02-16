import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'] // 여러 환경 변수 파일 사용
        })
    ],
    exports: [ConfigModule]
})
export class GlobalConfigModule {}
