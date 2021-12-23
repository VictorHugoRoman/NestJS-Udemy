import { NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { timeout } from "rxjs/operators";

export class TimeOutInterceptor implements NestInterceptor
{
    //intercept(context: import("D:/Codigo/TypeScript/NestJS-Udemy/Documentacion/Seccion8/api-superflights/node_modules/@nestjs/common/interfaces/features/execution-context.interface").ExecutionContext, next: import("D:/Codigo/TypeScript/NestJS-Udemy/Documentacion/Seccion8/api-superflights/node_modules/@nestjs/common/interfaces/features/nest-interceptor.interface").CallHandler<...>) {
    //    throw new Error("Method not implemented.");
    //}
    //interceptor para retornar un error cuando una peticion tarde mas de 2 minutos 
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>
    {
        return next.handle().pipe(timeout(120000));
    }

}