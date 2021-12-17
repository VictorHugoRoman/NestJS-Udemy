import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
//import { GqlContextType } from '@nestjs/graphql' m falto instalar este paquete
export class AllExceptionFilter implements ExceptionFilter //implements porque estamos usando una interfaz
{
    private readonly logger = new Logger(AllExceptionFilter.name); //obtenemos el nombre de la funcion q dio error
    catch(exception: any, host: ArgumentsHost) 
    {
        //ArgumentsHost proporciona métodos para recuperar los argumentos que se pasan a un controlador. Permite elegir el contexto apropiado (por ejemplo, HTTP, RPC (microservicio) o WebSockets) para recuperar los argumentos
        if (host.getType() === 'http') // do something that is only important in the context of regular HTTP requests (REST)
        {   
            const ctx = host.switchToHttp();  //devuelve un HttpArgumentsHostobject que es apropiado para el contexto de la aplicación HTTP
            const response = ctx.getResponse();  
            const request = ctx.getRequest();

            const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
            const msg = exception instanceof HttpException ? exception.getResponse() : exception;

            //lo q mostraremos en consola
            this.logger.error(`Status: ${status} Error:0 ${JSON.stringify(msg)}`);

            //lo q retornaremos al usuario
            response.status(status).json({
                time: new Date().toISOString(),
                path: request.url,
                error: msg
            });
        }
        else if (host.getType() === 'rpc') { /*do something that is only important in the context of Microservice requests*/}
        //else if (host.getType<GqlContextType>() === 'graphql') {/*do something that is only important in the context of GraphQL requests*/ }
    }
}