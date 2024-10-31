import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from './guards/auth/auth.guard';
import { ValidateUUIDPipe } from './pipes/validate-uuid/validate-uuid.pipe';
import { TaskService } from './task.service';

@Controller('/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(@Res() res: Response) {
    return res.status(200).json({
      tasks: this.taskService.getTasks(),
    });
  }

  @Get('/:id')
  getTask(@Param('id') id: string, @Res() res: Response) {
    return res.status(200).json(this.taskService.getTask(id));
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createTask(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    return res
      .status(201)
      .json(this.taskService.createTask(createTaskDto.name));
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  updateTask(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ) {
    return res.status(200).json({
      message: this.taskService.updateTask({ id, name: updateTaskDto.name }),
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteTask(@Param('id', ValidateUUIDPipe) id: string, @Res() res: Response) {
    return res.status(200).json({ message: this.taskService.deleteTask(id) });
  }
}
