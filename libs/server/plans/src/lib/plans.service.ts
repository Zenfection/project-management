import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { CreatePlanDto, UpdatePlanDto } from '@server/shared/dto';
import { PlanEntity } from '@server/shared/entities';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PlansService {
  constructor(private readonly prismaService: PrismaService) {}

  private checkEmptyData(data: UpdatePlanDto) {
    if (Object.keys(data).length === 0) {
      throw new UnauthorizedException('Data is empty');
    }
  }

  create(createPlanDto: CreatePlanDto): Promise<PlanEntity> {
    return this.prismaService.plan.create({
      data: createPlanDto,
    });
  }

  findAll(params: { include?: Prisma.PlanInclude }): Promise<PlanEntity[]> {
    const { include } = params;
    return this.prismaService.plan.findMany({
      include,
    });
  }

  findFilter(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlanWhereUniqueInput;
    where?: Prisma.PlanWhereInput;
    orderBy?: Prisma.PlanOrderByWithRelationInput;
    include?: Prisma.PlanInclude;
  }): Promise<PlanEntity[]> {
    return this.prismaService.plan.findMany(params);
  }

  findOne(params: {
    where: Prisma.PlanWhereUniqueInput;
    include?: Prisma.PlanInclude;
  }): Promise<PlanEntity | null> {
    return this.prismaService.plan.findUnique(params);
  }

  getCategories() {
    return this.prismaService.categoryPlan.findMany();
  }

  update(params: {
    where: Prisma.PlanWhereUniqueInput;
    data: UpdatePlanDto;
    include?: Prisma.PlanInclude;
  }): Promise<PlanEntity> {
    this.checkEmptyData(params.data);
    return this.prismaService.plan.update(params);
  }

  remove(params: { where: Prisma.PlanWhereUniqueInput }): Promise<PlanEntity> {
    return this.prismaService.plan.delete(params);
  }
}
