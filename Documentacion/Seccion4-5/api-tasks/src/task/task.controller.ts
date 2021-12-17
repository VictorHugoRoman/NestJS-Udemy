//Body,Controller,Delete,Get,Param,Post,Put,
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('api/v1/task')
// eslint-disable-next-line prettier/prettier
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  // eslint-disable-next-line prettier/prettier

  @Post()
  @UsePipes(new ValidationPipe())
  createTask(@Body() taskDTO: TaskDTO) {
    return this.taskService.createTask(taskDTO);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  createTask_Excepcion(@Body() taskDTO: TaskDTO) {
    
    //retorna un objeto con los campos code 400, el msg "Error en Peticion" y error "Bad Request" 
    //throw new BadRequestException('Error en Peticion');
    
    //retorna el code 400 y el mensaje "Error en peticion", estos throw se usan en los try catch
    //throw new HttpException('Error en peticion', HttpStatus.BAD_REQUEST);

    //la sig promesa retorna un "error internal server" code 500 pero deberia retornar el mensaje "Error en Peticion"
    //Sin embargo Nest lo intercepta con ExceptionsHandler pero lo muestra en consola
    return new Promise((resolve, reject) => {
      setTimeout(() => reject('Error en Peticion'), 2000);
    });
    // return this.taskService.createTask(taskDTO);
  }

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  updateTaskById(@Param('id') id: string, @Body() taskDTO: TaskDTO) {
    return this.taskService.updateTaskById(id, taskDTO);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }
}
