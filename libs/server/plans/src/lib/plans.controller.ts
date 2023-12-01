import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePlanDto, UpdatePlanDto } from '@server/shared/dto';
import { PlansService } from './plans.service';
import { AvatarInterceptor } from '@server/cloud/utils';
import {
  ActiveUser,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';
import { Roles } from '@server/iam/feature/authorization/utils';
import { RoleEnum } from '@server/shared/entities';
import { PlanPermissionGuard } from './guards/plan-permission.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @Roles(RoleEnum.thu_ky_khoa, RoleEnum.truong_khoa)
  @UseInterceptors(AvatarInterceptor)
  async create(@Body() createPlanDto: CreatePlanDto) {
    const plan = await this.plansService.create(createPlanDto);
    return this.plansService.findOne({
      where: {
        id: plan.id,
      },
      include: {
        members: { select: { info: true } },
        owner: { select: { info: true } },
        category: true,
      },
    });
  }

  @Get('categories')
  getCategories() {
    return this.plansService.getCategories();
  }

  @Get(':id/tasks')
  @UseInterceptors(AvatarInterceptor)
  async getTasks(@Param('id') id: string) {
    const plans = await this.plansService.findFilter({
      where: {
        id: Number(id),
      },
      include: {
        tasks: {
          orderBy: {
            position: 'asc',
          },
          include: {
            assignee: { select: { info: true } },
            labels: true,
            todos: true,
            files: true,
            comments: {
              include: {
                user: { select: { info: true } },
              },
            },
          },
        },
      },
    });

    return plans.flatMap((plan) => plan['tasks']);
  }

  // @Get(':id/tasks/:taskId')
  // async getTask(@Param('id') id: string, @Param('taskId') taskId: string) {
  //   const tasks = await this.getTasks(id);
  //   const task = tasks.find((task) => task.id === Number(taskId));

  //   return task;
  // }

  @Get()
  @UseInterceptors(AvatarInterceptor)
  async findAll(@ActiveUser() user: ActiveUserData) {
    // if user is truong khoa or thu ky khoa, return all plans
    if (
      user.roles?.includes(RoleEnum.truong_khoa) ||
      user.roles?.includes(RoleEnum.thu_ky_khoa)
    ) {
      const plans = await this.plansService.findFilter({
        include: {
          category: true,
          tasks: {
            select: {
              status: true,
              dueDate: true,
              _count: {
                select: {
                  todos: true,
                  files: true,
                },
              },
            },
          },
          _count: {
            select: { tasks: true },
          },
          members: {
            select: { info: true },
          },
          owner: {
            select: { info: true },
          },
        },
      });

      return plans;
    } else {
      const plans = await this.plansService.findFilter({
        where: {
          OR: [
            {
              ownerId: user.sub,
            },
            {
              members: {
                some: {
                  id: user.sub,
                },
              },
            },
          ],
        },
        include: {
          tasks: {
            select: {
              status: true,
              dueDate: true,
              _count: {
                select: {
                  todos: true,
                  files: true,
                },
              },
            },
          },
          _count: {
            select: { tasks: true },
          },
          category: true,
          members: {
            select: { info: true },
          },
          owner: {
            select: { info: true },
          },
        },
      });

      return plans;
    }
  }

  @Get(':id')
  @UseGuards(PlanPermissionGuard)
  @UseInterceptors(AvatarInterceptor)
  async findOne(@Param('id') id: string) {
    const plan = await this.plansService.findOne({
      where: { id: Number(id) },
      include: {
        category: true,
        members: {
          select: { info: true },
        },
        owner: {
          select: { info: true },
        },
      },
    });

    return plan;
  }

  @Patch(':id')
  @UseInterceptors(AvatarInterceptor)
  @UseGuards(PlanPermissionGuard)
  async update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    const result = await this.plansService.update({
      where: { id: Number(id) },
      data: updatePlanDto,
      include: {
        members: { select: { info: true } },
        owner: { select: { info: true } },
        category: true,
      },
    });

    return result;
  }

  @Delete(':id')
  @UseGuards(PlanPermissionGuard)
  remove(@Param('id') id: string) {
    return this.plansService.remove({
      where: { id: Number(id) },
    });
  }
}
