import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

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
            entities: ['/dist/domain/persistence/*.entity{.ts,.js}'], //'dist/**/**/*.entity.{ts,js}' <- 이것처럼 .entity에 해당하는 파일들 자동으로 다 업로드 되게 할 예정
            synchronize: true, // production 단계에서 false로 변경
            autoLoadEntities: true,
            logging: true
        };
    }
}
