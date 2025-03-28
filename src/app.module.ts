import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './infrastructure/database.config';
import { ArticleModule } from './article/article.module';
import { MozuLoggerModule } from './common/logger/mozu.logger.module';
import { ClassModule } from './class/class.module';
import { OrganModule } from './organ/organ.module';
import { ItemModule } from './item/item.module';
import { JwtModule } from '@nestjs/jwt';
import { GlobalJwtModule } from './common/module/jwt.module';
import { GlobalConfigModule } from './common/module/config.module';
import { TeamModule } from './team/team.module';
import { HealthModule } from './health/health.module';

@Module({
    imports: [
        GlobalConfigModule,
        GlobalJwtModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService
        }),
        ArticleModule,
        MozuLoggerModule,
        ClassModule,
        OrganModule,
        ItemModule,
        TeamModule,
        HealthModule,
        MozuLoggerModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
