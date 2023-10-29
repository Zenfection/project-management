import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { RoleEntity } from '../users/entity/role.entity';
import { Roles } from '../iam/authorization/decorators/roles/roles.decorator';
import { ActiveUser } from '../iam/authentication/decorators/active-user/active-user.decorator';
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get('categories')
  getCategories() {
    return this.plansService.getCategories();
  }

  @Get(':id/tasks')
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

  @Get()
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
      const member = plan.members.find((member) => member.id === user.sub);
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
