import { HttpStatus } from '@nestjs/common';
 import { FastifyReply } from 'fastify';
import {YoutubeResponseDto} from "@/common/dto/youtube.response.dto";

export default class YoutubeResponder {
  static send(
    reply: FastifyReply,
    status: HttpStatus,
    description?: string,
    data?: any,
  ) {
    const response = new YoutubeResponseDto();
    response.status = status;
    response.description = description;
    response.data = data;

    reply.status(status);

    return response;
  }
  static create(status?: HttpStatus, description?: string, data?: any) {
    const response = new YoutubeResponseDto();
    response.status = status;
    response.data = data;
    response.description = description;
    return response;
  }

  static sendFound(description?: string, data?: any) {
    if (description == null) {
      description = 'Record Found!';
    }
    return this.create(HttpStatus.OK, description, data);
  }

  static sendBadRequest(description?: string, data?: any) {
    return this.create(HttpStatus.BAD_REQUEST, description, data);
  }
  static sendCreated(description?: string, data?: any) {
    if (description == null) {
      description = 'Record Created!';
    }
    return this.create(HttpStatus.CREATED, description, data);
  }
  static sendUnauthorized(description?: string, data?: any) {
    return this.create(HttpStatus.UNAUTHORIZED, description, data);
  }
  static sendNotFound(description?: string, data?: any) {
    return this.create(HttpStatus.NOT_FOUND, description, data);
  }
}
