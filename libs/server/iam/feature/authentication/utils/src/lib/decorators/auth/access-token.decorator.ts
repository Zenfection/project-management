import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export const AccessToken = createParamDecorator(
  (field: keyof string | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    // Lấy giá trị của token từ header hoặc query string hoặc cookie
    const token =
      request.headers.authorization?.split(' ')[1] || request.cookies.token;

    return field ? new JwtService().decode(token)[field] : token;
  },
);
