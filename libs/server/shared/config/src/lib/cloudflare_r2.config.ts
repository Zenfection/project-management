import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();

export default registerAs('cloudflare_r2', () => ({
  account_id: configService.getOrThrow('ACCOUNT_ID'),
  access_key_id: configService.getOrThrow('ACCESS_KEY_ID'),
  secret_access_key: configService.getOrThrow('SECRET_ACCESS_KEY'),
  bucket_name: configService.getOrThrow('BUCKET_NAME'),
}));
