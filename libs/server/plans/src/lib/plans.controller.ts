import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
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
import { TasksService } from '@server/tasks';

@Controller('plans')
export class PlansController {
  constructor(
    private readonly plansService: PlansService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  @Roles(RoleEnum.thu_ky_khoa, RoleEnum.truong_khoa)
  async create(@Body() createPlanDto: CreatePlanDto) {
    const plan = await this.plansService.create(createPlanDto);
    return this.plansService.findOne({
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
            files: true,
            comments: {
              include: {
                user: {
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
              },
            },
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

  // @Patch(':id/tasks/:taskId')
  // async updateTask(
  //   @Param('id') id: string,
  //   @Param('taskId') taskId: string,
  //   @Body() updateTaskDto: UpdatePlanDto,
  // ) {
  //   return this.tasksService.update({ id: Number(taskId) }, updateTaskDto, {
  //     labels: true,
  //     comments: true,
  //     plan: true,
  //   });
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
  }

  @Get(':id')
  @UseInterceptors(AvatarInterceptor)
  async findOne(@ActiveUser() user: ActiveUserData, @Param('id') id: string) {
    const plan = await this.plansService.findOne({
      where: { id: Number(id) },
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

    // check if user is member of plan or owner
    if (
      plan.ownerId !== user.sub &&
      !user.roles?.includes(RoleEnum.truong_khoa) &&
      !user.roles?.includes(RoleEnum.thu_ky_khoa)
    ) {
      const member = plan['members'].find(
        (member: { id: number }) => member.id === user.sub,
      );
      if (!member) {
        throw new UnauthorizedException('You are not allowed to see this plan');
      }
    }

    return plan;
  }

  @Patch(':id')
  @UseInterceptors(AvatarInterceptor)
  async update(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserData,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    const plan = await this.plansService.findOne({
      where: { id: Number(id) },
    });

    if (
      plan.ownerId !== user.sub &&
      !user.roles?.includes(RoleEnum.truong_khoa) &&
      !user.roles?.includes(RoleEnum.thu_ky_khoa)
    ) {
      throw new UnauthorizedException(
        'You are not allowed to update this plan',
      );
    }

    const result = await this.plansService.update({
      where: { id: Number(id) },
      data: updatePlanDto,
      include: {
        members: {
          include: {
            info: true,
          },
        },
        owner: {
          include: {
            info: true,
          },
        },
        category: true,
      },
    });

    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove({
      where: { id: Number(id) },
    });
  }
}
