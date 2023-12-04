import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CloudService } from '@server/cloud/data-access';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MemberResponseInterceptor implements NestInterceptor {
  constructor(private cloudService: CloudService) {}

  configService = new ConfigService();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.mapMemberResponse(data)));
  }

  private async mapMemberResponse(data: any): Promise<any> {
    data = await Promise.all(
      data.map(async (user: User) => {
        return {
          id: user.id,
          department: user.department,
          info: {
            name: user['info'].name,
            email: user['info'].email,
            // avatar: await this.cloudService.getObjectSignedUrl(
            //   user['info'].avatar,
            // ),
            avatar: `https://${this.configService.getOrThrow('PUBLIC_URL')}/${
              user['info'].avatar
            }`,
            phone: user['info'].phone,
          },
        };
      }),
    );
    return data;
  }
}
