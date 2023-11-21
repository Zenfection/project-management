import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { CloudService } from '@server/cloud/data-access';
import { PrismaService } from 'nestjs-prisma';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudService: CloudService,
  ) {}
  // create(createTaskDto: CreateTaskDto) {
  //   return 'This action adds a new task';
  // }

  async checkPermission(email: string, taskId: number): Promise<boolean> {
    // Check if user is truong khoa or thu ky khoa and has permission to view this task
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

  findAll(include?: Prisma.TaskInclude): Promise<Task[]> {
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
  }): Promise<Task[]> {
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

  findOne(where: Prisma.TaskWhereUniqueInput, include?: Prisma.TaskInclude) {
    return this.prismaService.task.findUnique({
      where,
      include,
    });
  }

  update(
    where: Prisma.TaskWhereUniqueInput,
    data: UpdateTaskDto,
    include?: Prisma.TaskInclude,
  ) {
    return this.prismaService.task.update({
      where,
      data,
      include,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} task`;
  // }

  async uploadFile(
    where: Prisma.TaskWhereUniqueInput,
    taskID: number,
    fileName: string,
    fileBuffer: Buffer,
  ) {
    const prefix = `tasks/${taskID}`;
    return Promise.all([
      this.cloudService.upload(fileName, fileBuffer, prefix),
      this.prismaService.task.update({
        where,
        data: {
          files: {
            push: `${prefix}/${fileName}`,
          },
        },
      }),
    ]).then((result) => {
      return result[1];
    });
  }
}
