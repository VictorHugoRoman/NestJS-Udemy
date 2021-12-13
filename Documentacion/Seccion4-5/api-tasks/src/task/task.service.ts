/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { ITask } from './task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  tasks: ITask[] = [];

  //con la interfaz ITask le decimos al metodo q retornara un valor de tipo ITask
  createTask(taskDTO: TaskDTO): ITask {
    const task = {
      id: uuidv4(),
      ...taskDTO,
    };
    this.tasks.push(task);
    return task;
  }

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTaskById(id: string): ITask {
    //return this.tasks.find(item => item.id == id)
    return this.tasks.find((item) => item.id == id)
  }

  updateTaskById(id: string, taskDTO: TaskDTO): ITask {
    const newTask = { id, ...taskDTO };
    this.tasks = this.tasks.map(item => (item.id === id) ? newTask : item); //con map podemos actualizar directamente el item encontrado
    return newTask;
  }
  deleteTaskById(id: string) {
    this.tasks = this.tasks.filter(item=>item.id !== id);  //simulamos q eliminamos la tarea, reasignando los elementos diff al id
    return 'task deleted';
  }
}
