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
import { FindOneUserParams } from 'src/user/infrastructure/http/pipe/uuid-user.pipe';
import { TaskCreate } from '../../../application/TaskCreate/TaskCreate';
import { TaskDelete } from '../../../application/TaskDelete/TaskDelete';
import { TaskEdit } from '../../../application/TaskEdit/TaskEdit';
import { TaskGetAllByUserId } from '../../../application/TaskGetAllByUserId/TaskGetAllByUserId';
import { TaskGetOneById } from '../../../application/TaskGetOneById/TaskGetOneById';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FindOneTaskParams } from '../pipe/uuid-task.pipe';

@Controller('/tasks')
export class TaskController {
  constructor(
    @Inject('TaskGetAllByUserId')
    private readonly taskGetAllByUserId: TaskGetAllByUserId,
    @Inject('TaskGetOneById') private readonly taskGetOneById: TaskGetOneById,
    @Inject('TaskCreate') private readonly taskCreate: TaskCreate,
    @Inject('TaskEdit') private readonly taskEdit: TaskEdit,
    @Inject('TaskDelete') private readonly taskDelete: TaskDelete,
  ) {}

  @Get()
  async getAllTasksByUser(
    @Param() params: FindOneUserParams,
    @Res() res: Response,
  ) {
    return res.status(200).json({
      tasks: (await this.taskGetAllByUserId.run(params.id)).map((task) =>
        task.toPlainObject(),
      ),
    });
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTask(@Param() params: FindOneTaskParams, @Res() res: Response) {
    return res
      .status(200)
      .json((await this.taskGetOneById.run(params.id)).toPlainObject());
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
