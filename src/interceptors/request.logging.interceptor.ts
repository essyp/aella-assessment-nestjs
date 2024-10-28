import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

function isExpressRequest(
  request: Request | FastifyRequest,
): request is Request {
  return (request as FastifyRequest).req === undefined;
}
@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  logger: Logger = new Logger('RequestLoggingInterceptor');

  intercept(context: ExecutionContext, next: CallHandler) {
    const request: Request | FastifyRequest = context
      .switchToHttp()
      .getRequest();

    const path = request.url;
    const method = isExpressRequest(request)
      ? request.method
      : (request as FastifyRequest).req.method;

    this.logger.log(`Youtube Request for ${method} : ${path}\n`);

    this.logger.log(`\n\n ${JSON.stringify(request.headers)} \n\n`);

    this.logger.log(`\n\n Payload ${JSON.stringify(request?.body)}\n\n`);

    this.logger.log(`Youtube Request Packet End.\n`);
    return next.handle();
  }
}
