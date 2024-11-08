import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from 'src/modules/auth/application/dto/login-auth.dto';
import { AuthLogoutDto } from 'src/modules/auth/application/dto/logout-auth.dto';
import { AuthRegisterDto } from 'src/modules/auth/application/dto/register-auth.dto';
import { AuthResetPasswordDto } from 'src/modules/auth/application/dto/reset-password-auth.dto';
import { FindOneUserParams } from 'src/modules/auth/application/param/uuid-user.param';
import { AuthService } from 'src/modules/auth/application/services/auth.service';

@Controller('/auth')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: AuthRegisterDto, @Res() res: Response) {
    return res.status(200).json(await this.authService.register(body));
  }

  @Post('/login')
  async login(@Body() body: AuthLoginDto, @Res() res: Response) {
    return res.status(200).json(await this.authService.login(body));
  }

  @Post('/logout')
  async logout(@Body() body: AuthLogoutDto, @Res() res: Response) {
    console.log('controller');
    return res
      .status(201)
      .json(`User was logout: ${await this.authService.logout(body)}`);
  }

  @Patch('/reset-password/:id')
  async resetPassword(
    @Param() params: FindOneUserParams,
    @Body() body: AuthResetPasswordDto,
    @Res() res: Response,
  ) {
    return res.status(200).json(
      await this.authService.resetPassword({
        id: params.id,
        newPassword: body.newPassword,
      }),
    );
  }
}
