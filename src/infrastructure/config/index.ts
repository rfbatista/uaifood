import { envNumber, envString } from '@infrastructure/config/environment';

const config = {
  env: envString('NODE_ENV'),
  http: {
    port: envNumber('PORT', 3000),
    host: envString('HOST', 'localhost'),
  },
  dataSource: {
    mongodb: {
      database: envString('MONGODB_NAME'),
      host: envString('MONGODB_HOST'),
      user: envString('MONGODB_USER'),
      password: envString('MONGODB_PASSWORD'),
      port: envNumber('MONGODB_PORT'),
    },
    postgres: {
      database: envString('POSTGRES_NAME'),
      user: envString('POSTGRES_USER'),
      password: envString('POSTGRES_PASSWORD'),
      host: envString('POSTGRES_HOST'),
      port: envNumber('POSTGRES_PORT'),
    },
  },
};

export { config };
