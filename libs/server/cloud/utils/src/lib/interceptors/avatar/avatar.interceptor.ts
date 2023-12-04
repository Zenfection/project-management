import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AvatarInterceptor implements NestInterceptor {
  constructor() {}
  configService = new ConfigService();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.replaceAvatars(data)));
  }

  private async replaceAvatars(obj: any): Promise<any> {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        obj[key] = await this.replaceAvatars(obj[key]);
      } else if (key === 'avatar') {
        // obj[key] = await this.cloudService.getObjectSignedUrl(obj[key]);
        obj[key] = `https://${this.configService.getOrThrow('PUBLIC_URL')}/${
          obj[key]
        }`;
      }
    }
    return obj;
  }
}
