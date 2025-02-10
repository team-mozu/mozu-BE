import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/domain/persistence/article.entity';
import { ClassEntity } from 'src/class/domain/class/persistence/class.entity';
import { ClassArticleEntity } from 'src/class/domain/classArticle/persistence/classArticle.entity';
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
            entities: [ArticleEntity, ClassEntity, ClassArticleEntity, OrganEntity],
            synchronize: true, // production 단계에서 false로 변경
            autoLoadEntities: true,
            logging: true,
            driver: true
        };
    }
}
