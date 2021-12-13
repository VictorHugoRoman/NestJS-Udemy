import { Injectable } from '@nestjs/common';

@Injectable() //con esto Nest inyectara la instancia d esta clase en donde c st mandando llamar el tipo de esta clase, ver el constructor de app.controller
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
