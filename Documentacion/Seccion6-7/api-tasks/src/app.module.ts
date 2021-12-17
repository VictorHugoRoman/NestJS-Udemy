import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AppController } from './app.controller';
import { TaskController } from './task/task.controller';
import { AppService } from './app.service';
import { TaskService } from './task/task.service';

@Module({
  imports: [TaskModule],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
})
export class AppModule {}
