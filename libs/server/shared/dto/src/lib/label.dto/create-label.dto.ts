import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsObject, IsString } from 'class-validator';

export class CreateLabelDto implements Prisma.LabelCreateInput {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsObject()
  tasks?: Prisma.TaskCreateNestedManyWithoutLabelsInput;
}
