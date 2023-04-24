import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ParamGuard } from './guards/param.guard';
import { useRequestLogging } from './middlewares/request-logger';
import { MAX_JSON_REQUEST_SIZE } from './shared/constants/constants';
import { CustomLogger } from './shared/custom-logger/custom-logger.service';
import { UtilsService } from './utils/utils.service';
import { description, name, version } from '../package.json';
import multipart from 'fastify-multipart';
async function bootstrap() {
  const logger = new CustomLogger('main');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: MAX_JSON_REQUEST_SIZE })
  );
  app.useLogger(logger);
  useRequestLogging(app);
  const config = app.get<ConfigService>(ConfigService);
  const prefix = '/storemate/' + config.get('config.application_version');
  app.setGlobalPrefix(prefix);
  app.useGlobalGuards(new ParamGuard());
  app.enableVersioning({
    type: VersioningType.URI
  });

  const port = config.get('config.port');
  const env = config.get('config.environment');

  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true
    });
  }
  // Swagger Configuration
  if (process.env.SWAGGER_SERVER === 'true') {
    const options = new DocumentBuilder()
      .setTitle(
        UtilsService.convertStringToSentenceCase(name.replace(/-/gi, ' '))
      )
      .setDescription(`${description}\nRunning on ${process.env.NODE_ENV} Mode`)
      .setVersion(version)
      .addServer(
        `http://${process.env.LOCALHOST}:${process.env.PORT}`,
        'Local Dev Server'
      )
      .addServer(
        `http://${process.env.DEV_SERVER_URL}:${process.env.PORT}`,
        'Project Dev Server'
      )
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }
  app.register(multipart);
  await app.listen(port, '0.0.0.0');
  logger.log(`Listening on port ${port}, running in ${env} environment`);
}

bootstrap();
