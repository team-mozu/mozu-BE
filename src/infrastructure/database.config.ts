import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/domain/persistence/article.entity';
import { ClassEntity } from 'src/class/domain/persistence/entity/class.entity';
import { ClassArticleEntity } from 'src/class/domain/persistence/entity/classArticle.entity';
import { ClassItemEntity } from 'src/class/domain/persistence/entity/classItem.entity';
import { ItemEntity } from 'src/item/domain/persistence/item.entity';
import { OrganEntity } from 'src/organ/domain/persistence/organ.entity';
import { HoldItemEntity } from 'src/team/domain/persistence/holdItem.entity';
import { TeamEntity } from 'src/team/domain/persistence/team.entity';
import { TeamOrderEntity } from 'src/team/domain/persistence/team.order.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: +this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_NAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [
                OrganEntity,
                ItemEntity,
                ArticleEntity,
                ClassEntity,
                ClassItemEntity,
                ClassArticleEntity,
                TeamEntity,
                TeamOrderEntity,
                HoldItemEntity
            ],
            synchronize: true, // production 단계에서 false로 변경
            autoLoadEntities: true,
            logging: false, // 성능 향상을 위해 로깅 비활성화
            driver: true,
            extra: {
                // MySQL 캐싱 완전 비활성화
                connectionLimit: 10,
                acquireTimeout: 60000,
                timeout: 60000,
                charset: 'utf8mb4',
                // 쿼리 캐시 비활성화
                queryCache: false,
                // 결과 캐시 비활성화
                resultCache: false
            }
        };
    }
}
