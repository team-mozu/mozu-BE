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
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
        credentials: true,
        preflightContinue: false
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
