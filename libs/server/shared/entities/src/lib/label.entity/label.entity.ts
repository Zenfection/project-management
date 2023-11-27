import { Label } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class LabelEntity implements Label {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
