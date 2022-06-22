import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1655896418124_8654',
  koa: {
    port: 7001,
  },
  orm: {
	  type: 'sqlite',
	  database: ":memory",
	  synchronize: true,
	  logging: true,
  },
} as MidwayConfig;
