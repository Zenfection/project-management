import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudService } from './cloud.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloud')
export class CloudController {
  constructor(private readonly cloudService: CloudService) {}

  //   @Get('buckets')
  //   async listAllBuckets() {
  //     const buckets = await this.cloudService.listAllBuckets();
  //     return buckets.Buckets;
  //   }

  @Get('objects')
  async listAllObjects() {
    const objects = await this.cloudService.listAllObjects();
    return objects.Contents;
  }

  @Get('objects/:prefix')
  async listAllObjectsWithPrefix(@Param('prefix') prefix: string) {
    const objects = await this.cloudService.listAllObjects(prefix);
    return objects.Contents;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    this.cloudService.upload(file.originalname, file.buffer);
  }
}
