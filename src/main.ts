import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/global.exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter(new Logger()));
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    );
    app.enableCors({
        origin: [
            'http://localhost:3002', // 어드민
            'http://localhost:3001' // 학생
        ],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'rf-token', // 명시적으로 커스텀 헤더 추가
            'X-Requested-With',
            'Origin'
        ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
