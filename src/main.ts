import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const AllowedHeaders = `X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, x-access-token, Authorization`;

  const Methods = `GET,PUT,POST,DELETE,UPDATE,OPTIONS`;

  app
    .useGlobalPipes(new ValidationPipe())
    .setGlobalPrefix(process.env.APP_API_PREFIX)
    .enableCors({
      allowedHeaders: AllowedHeaders,
      methods: Methods,
      credentials: false,
    });

  await app.listen(3000);
}
bootstrap();
