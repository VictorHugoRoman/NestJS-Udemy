import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap()
{
    const app = await NestFactory.create(AppModule);
    
    //#region configuraciones globales
    app.useGlobalFilters(new AllExceptionFilter()); //filtro p/todas las request
    app.useGlobalInterceptors(new TimeOutInterceptor()); //interceptor de tiempo de espera p/todas las request
    app.useGlobalPipes(new ValidationPipe()); //  hace uso de la clase 'class-validator' y sus decoradores de validación declarativa
    //#endregion

    await app.listen(3000);
}
bootstrap();
