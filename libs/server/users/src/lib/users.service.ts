import { type ExtendedPrismaClient } from './../../../../../apps/server/src/prisma.extension';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import {
  CreateUserDto,
  updateUserDto,
  updateInfoDto,
} from '@server/shared/dto';
import { CloudService } from '@server/cloud/data-access';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    // private readonly prismaService: PrismaService,
    private readonly cloudService: CloudService,
  ) {}

  private checkEmptyData(data: updateInfoDto) {
    if (Object.keys(data).length === 0) {
      throw new UnauthorizedException('Data is empty');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.client.user.create({
      data: createUserDto,
    });

    await this.prismaService.client.info.create({
      data: {
        userId: user.id,
        email: user.email,
      },
    });

    await this.prismaService.client.setting.create({
      data: {
        userId: user.id,
      },
    });

    return user;
  }

  findAll(include?: Prisma.UserInclude): Promise<User[]> {
    return this.prismaService.client.user.findMany({
      include,
    });
  }

  findFilter(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    include?: Prisma.UserInclude;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prismaService.client.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  findOne(where: Prisma.UserWhereUniqueInput, include?: Prisma.UserInclude) {
    return this.prismaService.client.user.findUnique({
      where,
      include,
    });
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: updateUserDto;
    include?: Prisma.UserInclude;
  }): Promise<User> {
    const { where, data, include } = params;
    this.checkEmptyData(data);
    return this.prismaService.client.user.update({
      where,
      data,
      include,
    });
  }

  async updateInfo(params: {
    where: Prisma.UserWhereUniqueInput;
    data: updateUserDto;
    include?: Prisma.UserInclude;
  }): Promise<User> {
    const { where, data, include } = params;

    this.checkEmptyData(data);

    return await this.prismaService.client.user.update({
      where,
      data: {
        info: {
          update: data.info,
        },
      },
      include,
    });
  }

  updateSetting(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.SettingUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    this.checkEmptyData(data);

    return this.prismaService.client.user.update({
      where,
      data: {
        setting: {
          update: data,
        },
      },
      include: {
        setting: true,
      },
    });
  }

  remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.client.user.delete({
      where,
    });
  }

  async uploadAvatar(
    where: Prisma.UserWhereUniqueInput,
    email: string,
    fileName: string,
    fileBuffer: Buffer,
  ) {
    const prefix = `data/${email}/avatar`;
    return Promise.all([
      this.cloudService.upload(fileName, fileBuffer, prefix),
      this.prismaService.client.user.update({
        where,
        data: {
          info: {
            update: {
              avatar: `${prefix}/${fileName}`,
            },
          },
        },
        include: {
          info: true,
          roles: true,
        },
      }),
    ]).then((result) => {
      return result[1];
    });
  }
}
