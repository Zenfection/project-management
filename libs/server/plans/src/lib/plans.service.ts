import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from 'nestjs-prisma';
import { Plan, Prisma } from '@prisma/client';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prismaService: PrismaService) {}

  private checkEmptyData(data: UpdatePlanDto) {
    if (Object.keys(data).length === 0) {
      throw new UnauthorizedException('Data is empty');
    }
  }

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = await this.prismaService.plan.create({
      data: createPlanDto,
    });

    return plan;
  }

  findAll(include?: Prisma.PlanInclude): Promise<Plan[]> {
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
  }): Promise<Plan[]> {
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

  findOne(where: Prisma.PlanWhereUniqueInput, include?: Prisma.PlanInclude) {
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
  }): Promise<Plan> {
    const { where, data } = params;
    console.log(data);
    this.checkEmptyData(data);
    return this.prismaService.plan.update({
      where,
      data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
