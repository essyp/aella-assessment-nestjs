import {Body, Controller, Get, HttpStatus, Post, Req, Res, UseInterceptors} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {FastifyReply} from "fastify";
import {RequestLoggingInterceptor} from "@/interceptors/request.logging.interceptor";

@Controller()
@ApiTags('General')
@UseInterceptors(RequestLoggingInterceptor)
export class GeneralController {
  constructor() {}

  @Get('/')
  async getHomeController(@Res() reply: FastifyReply) {

    return  reply.status(HttpStatus.OK).send();
  }
}
