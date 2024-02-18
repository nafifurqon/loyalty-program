import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Loyalty Progra, API')
    .setDescription(
      'API for manage Loyalty Program data such as member, transaction, loyalty program, etc',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter token in following format: <JWT>`,
        name: 'Authorization',
        type: 'http',
        in: 'Header',
      },
      'access_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
