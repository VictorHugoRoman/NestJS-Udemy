import { ExceptionFilter, ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter
{
    private readonly logger = new Logger(AllExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        
        // instanceof confirma el tipo de un objeto en tiempo de ejecución
        //si exception es tipo HttpException obtenemos el status sino creamos uno
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        //si exception es tipo HttpException obtenemos la respuesta sino retornamos la excepcion
        const msg = exception instanceof HttpException ? exception.getResponse() : exception;

        //Escribimos en consola la excepcion
        this.logger.error(`Status ${status} Error:${JSON.stringify(msg)}`);

        response.status(status).json({
            time: new Date().toISOString(),
            path: request.url,
            error: msg
        });
    }   
}