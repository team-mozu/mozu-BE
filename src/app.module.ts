import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './infrastructure/database.config';
import { ArticleModule } from './article/article.module';
import { MozuLoggerModule } from './common/logger/mozu.logger.module';
import { HoldItemModule } from './hold-item/hold-item.module';
import { ClassModule } from './class/class.module';
import { OrganModule } from './organ/organ.module';
import { ItemModule } from './item/item.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService
        }),
        ArticleModule,
        MozuLoggerModule,
        HoldItemModule,
        ClassModule,
        OrganModule,
        ItemModule,
        MozuLoggerModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
