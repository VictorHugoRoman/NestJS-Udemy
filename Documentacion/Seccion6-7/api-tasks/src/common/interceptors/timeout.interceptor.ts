import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { timeout } from "rxjs/operators";

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
    //intercept(context: import("D:/Codigo/TypeScript/NestJS-Udemy/Documentacion/Seccion6/api-tasks/node_modules/@nestjs/common/interfaces/features/execution-context.interface").ExecutionContext
    //, next: import("D:/Codigo/TypeScript/NestJS-Udemy/Documentacion/Seccion6/api-tasks/node_modules/@nestjs/common/interfaces/features/nest-interceptor.interface").CallHandler<...>) {
    //    throw new Error("Method not implemented.");
    //}
    intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> { //retornamos un observable de tipo any o una promesa 

        //esperamos 3 segundos para dar una respuesta independientemente si un request tarda mas de 3 segundos
        //return next.handle().pipe(timeout(3000)); 

        //normalmente las peticions tienen como maximo 2 minutos
        return next.handle().pipe(timeout(120000)); 
    }
}