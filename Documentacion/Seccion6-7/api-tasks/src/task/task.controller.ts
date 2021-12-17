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
import { resolve } from 'dns/promises';
import { setTimeout } from 'timers/promises';

@Controller('api/v1/task')
// eslint-disable-next-line prettier/prettier
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    // eslint-disable-next-line prettier/prettier

    @Post()
    @UsePipes(new ValidationPipe())
    createTask(@Body() taskDTO: TaskDTO) {
        return this.taskService.createTask(taskDTO);
    }

    @Post('createTaskInterceptors')
    @UsePipes(new ValidationPipe())
    createTaskInterceptors(@Body() taskDTO: TaskDTO) {
        return new Promise((resolve, reject) => {
            setTimeout(15000,() => reject('Something was wrong!')); //simulamos q una tarea durara 15 segundos
        });
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
