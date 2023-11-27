import { PartialType } from '@nestjs/swagger';
import { CreateLabelDto } from './create-label.dto';

export class UpdateLabelDto extends PartialType(CreateLabelDto) {}
