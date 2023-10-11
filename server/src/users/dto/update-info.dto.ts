import { PartialType } from '@nestjs/swagger';
import { CreateInfoDto } from './create-info.dto';

export class updateInfoDto extends PartialType(CreateInfoDto) {}
