import { Controller, All, Inject, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserModel } from '../model/user.model';
import { JwtService } from '@midwayjs/jwt';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  @Inject()
  jwtService: JwtService;

  @All('/mockuser')
  async mockUser() {
    const username = 'tom',
      password = 'jerry';
    await this.userModel.addUser(username, password);
    return {
      code: 200,
    };
  }

  @All('/admin')
  async demoAdmin() {
    return {
      code: 200,
    };
  }

  @Post('/login')
  async getUser(@Body('username') username, @Body('password') password) {
    const user = await this.userModel.getUserByUsernameAndPassword(
      username,
      password
    );
    if (!user)
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null,
      };
    const token = this.jwtService.signSync({ id: user.id });
    return {
      code: 200,
      result: 'success',
      message: '登录成功',
      data: {
        token: token,
      },
    };
  }
}
