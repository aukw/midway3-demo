import { Controller, Inject, Post, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserModel } from '../model/user.model';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  @Post('/login')
  async getUser(@Query('username') username, @Query('password') password) {
    const user = await this.userModel.getUserByUsernameAndPassword(
      username,
      password
    );

    return user
      ? {
          code: 200,
          result: 'success',
          message: '登录成功',
          data: {
            token: '...',
          },
        }
      : {
          code: 400,
          result: 'error',
          message: '账号或密码不正确',
          data: null,
        };
  }
}
