import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './infrastructure/database.config';
import { ArticleModule } from './article/article.module';
import { MozuLoggerModule } from './common/logger/mozu.logger.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService
        }),
        ArticleModule,
        MozuLoggerModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
