import {
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import cloudflare_r2Config from './config/cloudflare_r2.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class CloudService {
  private readonly S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${this.cloudflare_r2ConfigService.account_id}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: this.cloudflare_r2ConfigService.access_key_id,
      secretAccessKey: this.cloudflare_r2ConfigService.secret_access_key,
    },
  });
  constructor(
    @Inject(cloudflare_r2Config.KEY)
    private readonly cloudflare_r2ConfigService: ConfigType<
      typeof cloudflare_r2Config
    >,
  ) {}

  async listAllBuckets() {
    return await this.S3.send(new ListBucketsCommand(''));
  }

  async listAllObjects(prefix?: string) {
    return await this.S3.send(
      new ListObjectsV2Command({
        Bucket: this.cloudflare_r2ConfigService.bucket_name,
        Prefix: prefix ?? '',
      }),
    );
  }

  async upload(fileName: string, file: Buffer, prefix?: string) {
    await this.S3.send(
      new PutObjectCommand({
        Bucket: this.cloudflare_r2ConfigService.bucket_name,
        Key: `${prefix ? `${prefix}/` : ''}${fileName}`,
        Body: file,
      }),
    );
  }
}
