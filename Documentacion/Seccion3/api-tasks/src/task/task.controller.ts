import { Delete, Param, Query, Body } from '@nestjs/common';
import { Controller, Post, Get, Put, Patch, Req } from '@nestjs/';
import { Request } from 'express';


@Controller('api/v1/task') //@Controller('task') lo editamos para acceder por api/v1/ en la url
export class TaskController 
{
    @Post() //decorador de nestjs/common, para verbos http de tipo post 
    methodPost(@Req() req: Request) { //Req() viene de nestjs/common, req s nombre d variable, Request viene de express y la usamos como tipo
        return `method ${req.method}`;
    }
    @Get('done')  //decorador de nestjs/common, para verbos http de tipo get, l agregamos una ruta mas a la url quedanndo "api/v1/task/done"
    methodGet(@Req() req: Request) { //Req() viene de nestjs/common, req s nombre d variable, Request viene de express y la usamos como tipo
        return `method ${req.method}`;
    }
    @Put()  //decorador de nestjs/common, para verbos http de tipo put, estos se usan para actualizar registros
    methodPut(@Req() req: Request) { //Req() viene de nestjs/common, req s nombre d variable, Request viene de express y la usamos como tipo
        return `method ${req.method}`;
    }
    @Patch()  //decorador de nestjs/common, para verbos http de tipo patch, estos se usan para actualizar registros de forma parcial
    methodPatch(@Req() req: Request) { //Req() viene de nestjs/common, req s nombre d variable, Request viene de express y la usamos como tipo
        return `method ${req.method}`;
    }
    @Delete()  //decorador de nestjs/common, para verbos http de tipo Delete, estos se usan para eliminar registros
    methodDelete(@Req() req: Request) { //Req() viene de nestjs/common, req s nombre d variable, Request viene de express y la usamos como tipo
        return `method ${req.method}`;
    }

    //**USANDO @Param ** */
    @Post(':id') //id s l nombre del parametro, y en la url solamente ponemos el valor "api/v1/task/12" ya q nest c encarga d asignar el valor a la variable id
    methodPostParam_1(@Param(':id') id: String) { //@Param() viene de nestjs/common, con Param(:id) obtenemos el valor del parametro donde ":id" s l nombre q pusimo en "@Post(':id')"
        return { id }; //retornamos un json con l valor del parametro
    }
    @Post(':id/description/:description/isdone/:isdone') //url api/v1/task/12/description/valor de descripcion/isdone/true
    methodPostParam_11(@Param(':id') id: number, @Param(':description') description: String, @Param(':isdone') isdone: boolean) {
        return { id, description, isdone }; //retornamos un json con l valor del parametro
        //retorna {"id": 12, "description": "valorDescriptiom", "isdone":true}
    }
    @Post(':id') //id s l nombre del parametro, y en la url solamente ponemos el valor "api/v1/task/12" ya q nest c encarga d asignar el valor a la variable id
    methodPostParam_2(@Param() param: any) { //@Param() viene de nestjs/common, con Param(:id) obtenemos el valor del parametro donde ":id" s l nombre q pusimo en "@Post(':id')"
        return { param }; //retornamos un json con l valor del parametro
        //retorna "param": {"id": 12}        
    }
    @Post(':id/description/:description/isdone/:isdone') //url api/v1/task/12/description/valor de descripcion/isdone/valor de isdone
    methodPostParam_22(@Param() param: any) { //@Param() viene de nestjs/common, con Param(:id) obtenemos el valor del parametro donde ":id" s l nombre q pusimo en "@Post(':id')"
        return { param }; //retornamos un json con l valor del parametro
        //retorna "param": {"id": "valorId", "description": "valorDescriptiom", "isdone":"valorIsDone"}
    }

    ///** USANDO @Query Param ** */
    @Post() //la url es api/v1/task?id=12&description="valor de descripcion"&isdone=true
    methodPostQueryParam_1(
        @Query('id') id: number, //@Query viene de nestjs/common obtiene el valor de la url n s t caso "id" y lo pasa al parametro "id"
        @Query('description') description: String,
        @Query('isdone') isdone: boolean) { //@Query viene de nestjs/common obtiene el valor de la url n s t caso "isdone" y lo pasa al parametro "isdone"
        return { id, description, isdone }; //retornamos un json con l valor del parametro
        //retorna {"id": 12, "description": "valorDescriptiom", "isdone":true}
    }
    @Post() //la url es api/v1/task?id=12&description="valor de descripcion"&isdone=true&day="lunes"
    methodPostQueryParam_11(@Query() query: any) { //@Query viene de nestjs/common obtiene el valor de la url pasandolo al parametro "query"
        //con esta forma de obtener los valores de la url podemos  agregar mas variables en la url sin necesidad de mandar llamar esa nueva variables
        return { query }; //retornamos un json con l valor del parametro
        //retorna "query": {"id": 12, "description": "valorDescriptiom", "isdone": true, "day": "lunes"}
    }

    ///** USANDO @Body Param ** */
    @Post() //la url es api/v1/task
    methodPostBodyParam_1(@Body() body: any) { //@Body viene de nestjs/common obtiene el valor del request Body normalmente c manda un json
        return { body }; //retornamos el valor q mandamos por el Body del request
        //retorna "body":{"id": 12, "description": "valorDescriptiom", "isdone":true}  ya q st s l objetmos q mandamos por la peticion
        //return body; //retornamos el valor q mandamos por el Body del request
        //retorna {"id": 12, "description": "valorDescriptiom", "isdone":true}  ya q st s l objetmos q mandamos por la peticion
    }
    @Post() //la url es api/v1/task 
    methodPostBodyParam_11(@Body('description') body: any) { //@Body viene de nestjs/common obtiene el valor del request Body normalmente c manda un json, nst caso tomamos la propiedad "description" del json
        return { body }; //retornamos el valor q mandamos por el Body del request
        //retorna "body":"valorDescriptiom"  ya q mandamos por la peticion el sig objeto {"id": 12, "description": "valorDescriptiom", "isdone":true}
        //return body; //retornamos el valor q mandamos por el Body del request
        //"valorDescriptiom"  ya q mandamos por la peticion el sig objeto {"id": 12, "description": "valorDescriptiom", "isdone":true}
    }
}
