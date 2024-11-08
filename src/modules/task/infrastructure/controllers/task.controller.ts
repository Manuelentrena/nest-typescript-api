import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateTaskDto } from 'src/modules/task/application/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/task/application/dto/update-task.dto';
import { FindOneTaskParams } from 'src/modules/task/application/param/uuid-task.param';
import { TaskService } from 'src/modules/task/application/services/task.service';

@Controller('/tasks')
@UsePipes(new ValidationPipe({ transform: true }))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:id')
  async getTask(@Param() params: FindOneTaskParams, @Res() res: Response) {
    return res.status(200).json(await this.taskService.get(params));
  }

  @Post()
  async createTask(@Body() body: CreateTaskDto, @Res() res: Response) {
    return res.status(201).json(await this.taskService.create(body));
  }

  @Put('/:id')
  async updateTask(
    @Param() params: FindOneTaskParams,
    @Body() body: UpdateTaskDto,
    @Res() res: Response,
  ) {
    return res
      .status(200)
      .json(await this.taskService.update({ id: params.id, ...body }));
  }

  @Delete('/:id')
  async deleteTask(@Param() params: FindOneTaskParams, @Res() res: Response) {
    return res.status(201).json(await this.taskService.get(params));
  }
}
