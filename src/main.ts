import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { GenerateCombinationsModule } from './generate-combinations.module';

async function bootstrap() {
  const app = await NestFactory.create(GenerateCombinationsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
