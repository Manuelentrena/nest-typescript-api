import {
  Controller,
  Get,
  Param,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { FindOneUserParams } from 'src/modules/user/application/param/uuid-user.param';
import { UserService } from 'src/modules/user/application/services/user.service';

@Controller('/users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/tasks')
  async findUserWithTasks(
    @Param() params: FindOneUserParams,
    @Res() res: Response,
  ) {
    const userWithTasks = await this.userService.findUserWithTasks(params);
    return res.status(200).json(userWithTasks);
  }
}
