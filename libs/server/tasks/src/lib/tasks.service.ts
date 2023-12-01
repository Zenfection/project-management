import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CloudService } from '@server/cloud/data-access';
import { PrismaService } from 'nestjs-prisma';
import { CreateTaskDto, UpdateTaskDto } from '@server/shared/dto';
import { TaskEntity } from '@server/shared/entities';

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudService: CloudService,
  ) {}

  create(params: {
    data: CreateTaskDto;
    include?: Prisma.TaskInclude;
  }): Promise<TaskEntity> {
    const { data, include } = params;
    return this.prismaService.task.create({
      data,
      include,
    });
  }

  async checkPermission(email: string, taskId: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
        roles: {
          some: {
            name: {
              in: ['TRUONG_KHOA', 'THU_KY_KHOA'],
            },
          },
        },
      },
      select: {
        tasks: {
          where: {
            id: taskId,
          },
        },
      },
    });

    return !user || user.tasks.length === 0;
  }

  findAll(include?: Prisma.TaskInclude): Promise<TaskEntity[]> {
    return this.prismaService.task.findMany({
      include,
    });
  }

  findFilter(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
    include?: Prisma.TaskInclude;
  }): Promise<TaskEntity[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prismaService.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  findOne(
    where: Prisma.TaskWhereUniqueInput,
    include?: Prisma.TaskInclude,
  ): Promise<TaskEntity | null> {
    return this.prismaService.task.findUnique({
      where,
      include,
    });
  }

  update(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: UpdateTaskDto;
    include?: Prisma.TaskInclude;
  }): Promise<TaskEntity> {
    const { where, data, include } = params;
    return this.prismaService.task.update({
      where,
      data,
      include,
    });
  }

  remove(where: Prisma.TaskWhereUniqueInput) {
    console.log(where);
    return this.prismaService.task.delete({
      where,
    });
  }

  // async uploadFile(
  //   where: Prisma.TaskWhereUniqueInput,
  //   taskID: number,
  //   fileName: string,
  //   fileBuffer: Buffer,
  // ) {
  //   const prefix = `tasks/${taskID}`;
  //   return Promise.all([
  //     this.cloudService.upload(fileName, fileBuffer, prefix),
  //     this.prismaService.task.update({
  //       where,
  //       data: {
  //         files: {
  //           push: `${prefix}/${fileName}`,
  //         },
  //       },
  //     }),
  //   ]).then((result) => {
  //     return result[1];
  //   });
  // }
}
