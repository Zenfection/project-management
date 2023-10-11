import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { updateInfoDto } from './dto/update-info.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private checkEmptyData(data: updateInfoDto) {
    if (Object.keys(data).length === 0) {
      throw new UnauthorizedException('Data is empty');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: createUserDto,
    });

    await this.prismaService.info.create({
      data: {
        userId: user.id,
        email: user.email,
      },
    });

    await this.prismaService.setting.create({
      data: {
        userId: user.id,
      },
    });

    return user;
  }

  findAll(include?: Prisma.UserInclude): Promise<User[]> {
    return this.prismaService.user.findMany({
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
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  findOne(where: Prisma.UserWhereUniqueInput, include?: Prisma.UserInclude) {
    return this.prismaService.user.findUnique({
      where,
      include,
    });
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: updateUserDto;
  }): Promise<User> {
    const { where, data } = params;
    console.log(where, data);
    this.checkEmptyData(data);
    return this.prismaService.user.update({
      where,
      data,
    });
  }

  async updateInfo(params: {
    where: Prisma.UserWhereUniqueInput;
    data: updateInfoDto;
  }): Promise<User> {
    const { where, data } = params;

    this.checkEmptyData(data);

    return await this.prismaService.user.update({
      where,
      data: {
        info: {
          update: data,
        },
      },
      include: {
        info: true,
      },
    });
  }

  updateSetting(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.SettingUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    this.checkEmptyData(data);

    return this.prismaService.user.update({
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
    return this.prismaService.user.delete({
      where,
    });
  }
}
