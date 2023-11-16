import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

import { RoleEnum } from '@server/shared/entities';
import { Roles } from '@server/iam/feature/authorization/utils';
import {
  ActiveUser,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';
import { TransformInterceptor } from '@server/cloud/utils';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @Roles(RoleEnum.thu_ky_khoa, RoleEnum.truong_khoa)
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get('categories')
  getCategories() {
    return this.plansService.getCategories();
  }

  @Get(':id/tasks')
  @UseInterceptors(TransformInterceptor)
  async getTasks(@Param('id') id: string) {
    const plans = await this.plansService.findFilter({
      where: {
        id: Number(id),
      },
      include: {
        tasks: {
          include: {
            assignee: {
              select: {
                info: {
                  select: {
                    email: true,
                    avatar: true,
                    name: true,
                  },
                },
              },
            },
            labels: true,
            todos: true,
          },
        },
      },
    });

    return plans.flatMap((plan) => plan['tasks']);
  }

  @Get(':id/tasks/:taskId')
  async getTask(@Param('id') id: string, @Param('taskId') taskId: string) {
    const tasks = await this.getTasks(id);
    const task = tasks.find((task) => task.id === Number(taskId));

    return task;
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll(@ActiveUser() user: ActiveUserData) {
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
        category: true,
        members: {
          select: {
            id: true,
            email: true,
            department: true,
            info: {
              select: {
                avatar: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            email: true,
            department: true,
            info: {
              select: {
                avatar: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    return plans;
  }

  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  async findOne(@ActiveUser() user: ActiveUserData, @Param('id') id: string) {
    const plan = await this.plansService.findOne(
      { id: Number(id) },
      {
        category: true,
        members: {
          select: {
            id: true,
            email: true,
            department: true,
            info: {
              select: {
                avatar: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            email: true,
            department: true,
            info: {
              select: {
                avatar: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    );

    // check if user is member of plan or owner
    if (plan.ownerId !== user.sub) {
      const member = plan.members.find(
        (member: { id: number }) => member.id === user.sub,
      );
      if (!member) {
        throw new UnauthorizedException('You are not allowed to see this plan');
      }
    }

    return plan;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserData,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    const plan = await this.plansService.findOne({
      id: Number(id),
    });
    if (plan.ownerId !== user.sub) {
      throw new UnauthorizedException(
        'You are not allowed to update this plan',
      );
    }

    const result = await this.plansService.update({
      where: { id: Number(id) },
      data: updatePlanDto,
    });

    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(+id);
  }
}
