import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateLabelDto, UpdateLabelDto } from '@server/shared/dto';
import { LabelEntity } from '@server/shared/entities';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class LabelsService {
  constructor(private readonly prismaService: PrismaService) {}

  private checkEmptyDataUpdate(data: UpdateLabelDto) {
    if (Object.keys(data).length === 0) {
      throw new UnauthorizedException('Data is empty');
    }
  }

  // async checkPermission(): Promise<boolean> {}

  create(createLabelDto: CreateLabelDto): Promise<LabelEntity> {
    return this.prismaService.label.create({
      data: createLabelDto,
    });
  }

  findAll(params: { include?: Prisma.LabelInclude }): Promise<LabelEntity[]> {
    return this.prismaService.label.findMany(params);
  }

  findFilter(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LabelWhereUniqueInput;
    where?: Prisma.LabelWhereInput;
    orderBy?: Prisma.LabelOrderByWithRelationInput;
    include?: Prisma.LabelInclude;
  }): Promise<LabelEntity[]> {
    return this.prismaService.label.findMany(params);
  }

  findOne(params: {
    where: Prisma.LabelWhereUniqueInput;
    include?: Prisma.LabelInclude;
  }): Promise<LabelEntity | null> {
    return this.prismaService.label.findUnique(params);
  }

  update(params: {
    where: Prisma.LabelWhereUniqueInput;
    data: UpdateLabelDto;
  }): Promise<LabelEntity> {
    this.checkEmptyDataUpdate(params.data);
    return this.prismaService.label.update(params);
  }

  remove(params: {
    where: Prisma.LabelWhereUniqueInput;
  }): Promise<LabelEntity> {
    return this.prismaService.label.delete(params);
  }
}
