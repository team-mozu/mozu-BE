import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './infrastructure/database.config';
import { PresentationModule } from './presentation/presentation.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService
        }),
        PresentationModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
