import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppModule } from '@/app.module';
 import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

const logger: Logger = new Logger('Main');

const fastifyAdapter = new FastifyAdapter({
  bodyLimit: 10000489576,
  logger: true,
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  const config: ConfigService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });
  app.use(cookieParser());
  app.use(helmet());

  const port: number = config.get<number>('PORT');

  const swagger = new DocumentBuilder()
    .setTitle('Aella Assessment')
    .setDescription(
      `Youtube API. All Responses are sent via IleResponder with schema as indicated below
       
     {
      status: number,
      data: any,
      description: string 
     } 
     as JSON`,
    )
    .setVersion('1.0')

    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger-ui.html', app, document, {
    swaggerOptions: { tagsSorter: 'alpha', operationsSorter: 'alpha' },
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));


  await app.startAllMicroservices();

  await app.listen(port, '0.0.0.0', () => {
    logger.log('[SERVER RUNNING ON  ' + config.get<string>('BASE_URL') + ']');
  });

}
bootstrap();
