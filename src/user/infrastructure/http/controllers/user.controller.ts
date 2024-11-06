import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UserFindById } from '../../../application/UserFindById/UserFindById';
import { UserLogin } from '../../../application/UserLogin/UserLogin';
import { UserLogout } from '../../../application/UserLogout/UserLogout';
import { UserRegister } from '../../../application/UserRegister/UserRegister';
import { UserResetPassword } from '../../../application/UserResetPassword/UserResetPassword';
import { UserLoginDto } from '../dto/login-user.dto';
import { UserRegisterDto } from '../dto/register-user.dto';
import { UserResetPasswordDto } from '../dto/reset-password-user.dto';
import { FindOneUserParams } from '../pipe/uuid-user.pipe';

@Controller('/auth')
export class UserController {
  constructor(
    @Inject('UserLogin') private readonly userLogin: UserLogin,
    @Inject('UserRegister') private readonly userRegister: UserRegister,
    @Inject('UserLogout') private readonly userLogout: UserLogout,
    @Inject('UserFindById') private readonly userFindById: UserFindById,
    @Inject('UserResetPassword')
    private readonly userResetPassword: UserResetPassword,
  ) {}

  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() body: UserRegisterDto, @Res() res: Response) {
    return res
      .status(200)
      .json(
        (
          await this.userRegister.run(
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
  async login(@Body() body: UserLoginDto, @Res() res: Response) {
    return res
      .status(200)
      .json(
        (
          await this.userLogin.run(body.useremail, body.password)
        ).toPlainObject(),
      );
  }

  @Post('/logout')
  @UsePipes(new ValidationPipe({ transform: true }))
  async logout(@Param() params: FindOneUserParams, @Res() res: Response) {
    return res
      .status(201)
      .json(`User was logout: ${await this.userLogout.run(params.id)}`);
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findById(@Param() params: FindOneUserParams, @Res() res: Response) {
    return res
      .status(200)
      .json((await this.userFindById.run(params.id)).toPlainObject());
  }

  @Patch('/reset-password/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(
    @Param() params: FindOneUserParams,
    @Body() body: UserResetPasswordDto,
    @Res() res: Response,
  ) {
    return res
      .status(200)
      .json(
        (
          await this.userResetPassword.run(params.id, body.newPassword)
        ).toPlainObject(),
      );
  }
}
