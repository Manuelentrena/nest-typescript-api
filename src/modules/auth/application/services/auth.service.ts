import { Inject, Injectable } from '@nestjs/common';
import { AuthLoginDto } from 'src/modules/auth/application/dto/login-auth.dto';
import { AuthLogoutDto } from 'src/modules/auth/application/dto/logout-auth.dto';
import { AuthRegisterDto } from 'src/modules/auth/application/dto/register-auth.dto';
import { AuthResetPasswordDto } from 'src/modules/auth/application/dto/reset-password-auth.dto';
import { FindOneUserParams } from 'src/modules/auth/application/param/uuid-user.param';
import { AuthLogin } from 'src/modules/auth/application/use-cases/login.use-case';
import { AuthLogout } from 'src/modules/auth/application/use-cases/logout.use-case';
import { AuthRegister } from 'src/modules/auth/application/use-cases/register.use-case';
import { AuthResetPassword } from 'src/modules/auth/application/use-cases/reset-password.use-case';
import { UserFindByEmail } from 'src/modules/user/application/uses-cases/userFindByEmail.use-case';
import { UserPlainObject } from 'src/modules/user/domain/entities/User.plain-object';
import { UserNotFoundError } from 'src/modules/user/domain/errors/UserNotFound.error';

type ResetPasswordDto = AuthResetPasswordDto & FindOneUserParams;

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthLogin') private readonly authLogin: AuthLogin,
    @Inject('AuthRegister') private readonly authRegister: AuthRegister,
    @Inject('AuthLogout') private readonly authLogout: AuthLogout,
    @Inject('AuthResetPassword')
    private readonly authResetPassword: AuthResetPassword,
    @Inject('UserFindByEmail')
    private readonly userFindByEmail: UserFindByEmail,
  ) {}

  async register(register: AuthRegisterDto): Promise<UserPlainObject> {
    const user = await this.authRegister.run(register);
    return user.toPlainObject();
  }

  async login(login: AuthLoginDto): Promise<UserPlainObject> {
    const userFind = await this.userFindByEmail.run(login.useremail);

    if (!userFind) {
      throw new UserNotFoundError('User not found');
    }

    const user = await this.authLogin.run(userFind, login.password);
    return user.toPlainObject();
  }

  async logout({ id }: AuthLogoutDto): Promise<void> {
    return this.authLogout.run(id);
  }

  async resetPassword({
    id,
    newPassword,
  }: ResetPasswordDto): Promise<UserPlainObject> {
    const user = await this.authResetPassword.run(id, newPassword);
    return user.toPlainObject();
  }
}
