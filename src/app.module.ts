
import { Module } from '@nestjs/common';

import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getEnvPath } from '@Helper/env.helper';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

import * as winston from 'winston';

import * as path from 'path';

import { GlobalHttpModule } from './global-http-module/global-http-module';
import { GeneralController } from './general.controller';
import {YoutubeModule} from "@/youtube/youtube.module";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
console.log(envFilePath);

@Module({
  imports: [

    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/combined/'),
          filename: 'combined.log',
          maxsize: 2000000,
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'), //path to where save loggin result
          filename: 'error.log', //name of file where will be saved logging result
          level: 'error',
          maxsize: 1000000,
          zippedArchive: true,
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/debug/'), //path to where save loggin result
          filename: 'debug.log', //name of file where will be saved logging result
          level: 'debug',
          maxsize: 1000000,
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
          maxsize: 1000000,
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('ILEDOLA-APP', {
              prettyPrint: true,
              colors: true,
            }),
          ),
        }),
      ],
    }),   

    MomentModule.forRoot({
      tz: 'Africa/Lagos',
    }),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),

    GlobalHttpModule,
    YoutubeModule,
  ],

  controllers: [GeneralController],
  providers: [],
})
export class AppModule {}
