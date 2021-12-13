import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module'; //Nuestro module creado de task
import { AppController } from './app.controller';
import { TaskController } from './task/task.controller';
import { AppService } from './app.service';

@Module({
  imports: [TaskModule],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {}
