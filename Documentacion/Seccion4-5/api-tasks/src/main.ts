import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //valida todos los metodos que usen el dto task. ya q st tiene configurada las validaciones
  await app.listen(3000);
}
bootstrap();
