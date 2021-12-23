import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //valida todos los metodos que usen el dto task. ya q st tiene configurada las validaciones
  await app.listen(3000);
}
bootstrap();

//ValidationPipe() hace uso de la clase "class-validator" y sus decoradores de validaci�n declarativa, Ofrece un m�todo conveniente para hacer cumplir 
    //las reglas de validaci�n para todas las ENTRADAS del cliente , 
    //donde las reglas espec�ficas se declaran con anotaciones simples en cada clase(DTO) local de declaraciones en cada m�dulo.
