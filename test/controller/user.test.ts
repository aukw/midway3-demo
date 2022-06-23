import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { Response } from 'superagent';

describe('test/controller/user.test.ts', () => {

  it('should POST /api/user/login', async () => {
    const app = await createApp<Framework>();
    let result: Response;

    await createHttpRequest(app).get('/api/user/mockuser');

    //validate parameters
    result = await createHttpRequest(app).post('/api/user/login')
      .type('form')
      .send({ username: 123 });
    expect(result.status).toBe(422);

    //login with correct user
    result = await createHttpRequest(app).post('/api/user/login')
      .type('form')
      .send({ username: 'jack', password: 'redballoon' });
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      code: 200,
      result: 'success',
      message: '登录成功',
      data: {
        token: expect.any(String),
      },
    });


    // login with error user'
    result = await createHttpRequest(app).post('/api/user/login')
      .type('form')
      .send({ username: 'errorname', password: 'errorpwd' });
    expect(result.status).toBe(200);
    expect(result.body.result).toBe('error');

    await close(app);



  });
});
