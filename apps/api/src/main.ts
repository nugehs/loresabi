import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

config({ path: ['../../.env', '.env'] });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? true,
  });

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
