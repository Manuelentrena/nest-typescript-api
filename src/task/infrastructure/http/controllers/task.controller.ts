import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskCreate } from '../../../application/TaskCreate/TaskCreate.service';
import { TaskDelete } from '../../../application/TaskDelete/TaskDelete.service';
import { TaskEdit } from '../../../application/TaskEdit/TaskEdit.service';
import { TaskFindById } from '../../../application/TaskFindById/TaskFindById.service';
import { TaskFindByUser } from '../../../application/TaskFindByUser/TaskFindByUser.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FindOneTaskParams } from '../pipe/uuid-task.pipe';

@Controller('/tasks')
export class TaskController {
  constructor(
    @Inject('TaskFindByUser')
    private readonly taskFindByUser: TaskFindByUser,
    @Inject('TaskFindById') private readonly taskFindById: TaskFindById,
    @Inject('TaskCreate') private readonly taskCreate: TaskCreate,
    @Inject('TaskEdit') private readonly taskEdit: TaskEdit,
    @Inject('TaskDelete') private readonly taskDelete: TaskDelete,
  ) {}

  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTask(@Param() params: FindOneTaskParams, @Res() res: Response) {
    return res
      .status(200)
      .json((await this.taskFindById.run(params.id)).toPlainObject());
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTask(@Body() body: CreateTaskDto, @Res() res: Response) {
    return res
      .status(201)
      .json(
        (
          await this.taskCreate.run(
            body.id,
            body.name,
            new Date(body.date),
            new Date(),
            body.userId,
          )
        ).toPlainObject(),
      );
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateTask(
    @Param() params: FindOneTaskParams,
    @Body() body: UpdateTaskDto,
    @Res() res: Response,
  ) {
    return res
      .status(200)
      .json(
        (
          await this.taskEdit.run(
            params.id,
            body.name,
            new Date(body.date),
            new Date(),
            body.userId,
          )
        ).toPlainObject(),
      );
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteTask(@Param() params: FindOneTaskParams, @Res() res: Response) {
    return res.status(200).json(await this.taskDelete.run(params.id));
  }
}
