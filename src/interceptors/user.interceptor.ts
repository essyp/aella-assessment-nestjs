import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    private readonly cls: ClsService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    let user = request.user;
    const jwtToken = request.headers['authorization'];

    if (user == null && jwtToken != null) {
      const token = jwtToken?.substring(7);
      
    } else {
      this.cls.set('user', '');
    }
    return next.handle();
  }
}
