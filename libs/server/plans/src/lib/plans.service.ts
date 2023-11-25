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

  async create(createPlanDto: CreatePlanDto): Promise<PlanEntity> {
    const plan = await this.prismaService.plan.create({
      data: createPlanDto,
    });

    return this.prismaService.plan.findUnique({
      where: {
        id: plan.id,
      },
      include: {
        members: true,
        owner: true,
        category: true,
      },
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
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prismaService.plan.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  findOne(
    where: Prisma.PlanWhereUniqueInput,
    include?: Prisma.PlanInclude,
  ): Promise<PlanEntity | null> {
    return this.prismaService.plan.findUnique({
      where,
      include,
    });
  }

  getCategories() {
    return this.prismaService.categoryPlan.findMany();
  }

  update(params: {
    where: Prisma.PlanWhereUniqueInput;
    data: UpdatePlanDto;
    include?: Prisma.PlanInclude;
  }): Promise<PlanEntity> {
    const { where, data, include } = params;

    this.checkEmptyData(data);

    return this.prismaService.plan.update({
      where,
      data,
      include,
    });
  }

  remove(where: Prisma.PlanWhereUniqueInput): Promise<PlanEntity> {
    return this.prismaService.plan.delete({
      where,
    });
  }
}
