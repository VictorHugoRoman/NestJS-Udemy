import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe()); //valida todos los metodos que usen el dto task. ya q st tiene configurada las validaciones
    app.useGlobalFilters(new AllExceptionFilter()); //configuramos globalmente nuestro filtro de excepciones
    app.useGlobalInterceptors(new TimeOutInterceptor()); //configuramos globalmente nuestro interceptor
    await app.listen(3000);
}
bootstrap();