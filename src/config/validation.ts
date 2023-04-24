import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .default('development'),
  LOGGER_LEVEL: Joi.string()
    .valid('error', 'warn', 'log', 'debug')
    .default('log'),
  PRETTY_PRINT_LOG: Joi.string().default('false'),
  PORT: Joi.number().default(3000),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  APPLICATION_VERSION: Joi.required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRE_IN: Joi.string().required(),
  JWT_REFRESH_EXPIRE_IN: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  ITERATION: Joi.number(),
  PASSWORD_KEY_LENGTH: Joi.number(),
  MAIL_HOST: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  MAIL_FROM: Joi.string().required()
});
