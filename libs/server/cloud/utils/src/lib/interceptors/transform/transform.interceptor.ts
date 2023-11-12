import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CloudService } from '@server/cloud/data-access';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private cloudService: CloudService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.replaceAvatars(data)));
  }

  private async replaceAvatars(obj: any): Promise<any> {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        obj[key] = await this.replaceAvatars(obj[key]);
      } else if (key === 'avatar') {
        obj[key] = await this.cloudService.getObject(obj[key]);
      }
    }
    return obj;
  }
}
