import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<UserEntity> {
    const users = await this.userRepo.find({
      where: {
        username: username,
        password: password,
      },
      take: 1,
    });
    return users ? users[0] : null;
  }

  /**
   * 添加用户
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async addUser(username: string, password: string) {
    const user = new UserEntity();
    user.username = username;
    user.password = password;
    const res = await this.userRepo.save(user);
    return res;
  }
}
