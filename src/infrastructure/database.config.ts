import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/domain/persistence/article.entity';
import { ClassEntity } from 'src/class/domain/persistence/entity/class.entity';
import { ClassArticleEntity } from 'src/class/domain/persistence/entity/classArticle.entity';
import { ClassItemEntity } from 'src/class/domain/persistence/entity/classItem.entity';

import { ItemEntity } from 'src/item/domain/persistence/item.entity';
import { OrganEntity } from 'src/organ/domain/persistence/organ.entity';

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
                ClassArticleEntity
            ],
            synchronize: true, // production 단계에서 false로 변경
            autoLoadEntities: true,
            logging: true,
            driver: true
        };
    }
}
