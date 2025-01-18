import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/global.exception.filter';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter(new Logger()));

    const config = new DocumentBuilder()
        .setTitle('Swagger Example')
        .setDescription('Swagger study API description')
        .setVersion('0.0.1')
        .addTag('swagger')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
