import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthLogin } from '../../../application/AuthLogin/AuthLogin';
import { AuthLogout } from '../../../application/AuthLogout/AuthLogout';
import { AuthRegister } from '../../../application/AuthRegister/AuthRegister';
import { AuthResetPassword } from '../../../application/AuthResetPassword/AuthResetPassword';
import { AuthLoginDto } from '../dto/login-auth.dto';
import { AuthRegisterDto } from '../dto/register-auth.dto';
import { AuthResetPasswordDto } from '../dto/reset-password-auth.dto';
import { FindOneUserParams } from '../pipe/uuid-user.pipe';

@Controller('/auth')
export class UserController {
  constructor(
    @Inject('AuthLogin') private readonly authLogin: AuthLogin,
    @Inject('AuthRegister') private readonly authRegister: AuthRegister,
    @Inject('AuthLogout') private readonly authLogout: AuthLogout,
    @Inject('AuthResetPassword')
    private readonly authResetPassword: AuthResetPassword,
  ) {}

  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() body: AuthRegisterDto, @Res() res: Response) {
    return res
      .status(200)
      .json(
        (
          await this.authRegister.run(
            body.id,
            body.username,
            body.password,
            body.email,
          )
        ).toPlainObject(),
      );
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() body: AuthLoginDto, @Res() res: Response) {
    return res
      .status(200)
      .json(
        (
          await this.authLogin.run(body.useremail, body.password)
        ).toPlainObject(),
      );
  }

  @Post('/logout')
  @UsePipes(new ValidationPipe({ transform: true }))
  async logout(@Param() params: FindOneUserParams, @Res() res: Response) {
    return res
      .status(201)
      .json(`User was logout: ${await this.authLogout.run(params.id)}`);
  }

  // @Get('/:id')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async findById(@Param() params: FindOneUserParams, @Res() res: Response) {
  //   return res
  //     .status(200)
  //     .json((await this.userFindById.run(params.id)).toPlainObject());
  // }

  // @Get('/user/:id/tasks')
  // async getAllTasksByUser(
  //   @Param() params: FindOneUserParams,
  //   @Res() res: Response,
  // ) {
  //   return res.status(200).json({
  //     tasks: (await this.taskGetAllByUserId.run(params.id)).map((task) =>
  //       task.toPlainObject(),
  //     ),
  //   });
  // }

  @Patch('/reset-password/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(
    @Param() params: FindOneUserParams,
    @Body() body: AuthResetPasswordDto,
    @Res() res: Response,
  ) {
    return res
      .status(200)
      .json(
        (
          await this.authResetPassword.run(params.id, body.newPassword)
        ).toPlainObject(),
      );
  }
}
