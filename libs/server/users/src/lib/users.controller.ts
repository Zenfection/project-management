import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto, updateUserDto } from '@server/shared/dto';
import {
  ActiveUser,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarInterceptor } from '@server/cloud/utils';
import { MemberResponseInterceptor } from '@server/tools';
import { UserEntity } from '@server/shared/entities';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return new UserEntity(user);
  }

  //? Get all users same department
  @Get('department')
  @UseInterceptors(MemberResponseInterceptor)
  async findUserWithDeparment(@ActiveUser() user: ActiveUserData) {
    const currentUser = await this.usersService.findOne({
      id: Number(user.sub),
    });
    const members = await this.usersService.findFilter({
      where: {
        department: currentUser.department,
      },

      include: {
        info: true,
      },
    });

    return members.filter((member) => member.id !== currentUser.id);
  }

  @Get('filter')
  async findFilter(
    @Body()
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
  ) {
    return this.usersService.findFilter(params);
  }

  @Get('')
  findOne(@ActiveUser() user: ActiveUserData) {
    return this.usersService.findOne({ id: Number(user.sub) });
  }

  @Get('info')
  @UseInterceptors(AvatarInterceptor)
  async findInfo(@ActiveUser() user: ActiveUserData) {
    return this.usersService
      .findOne({ id: Number(user.sub) }, { info: true })
      .then((user) => {
        return user.info;
      });
  }

  @Get('setting')
  async findSetting(@ActiveUser() user: ActiveUserData) {
    return this.usersService
      .findOne({ id: Number(user.sub) }, { setting: true })
      .then((user) => {
        return user.setting;
      });
  }

  @Get('tasks')
  async findTasks(@ActiveUser() user: ActiveUserData) {
    return this.usersService
      .findOne(
        { id: Number(user.sub) },
        {
          tasks: {
            include: {
              labels: true,
              todos: true,
            },
          },
        },
      )
      .then((user) => {
        return user.tasks;
      });
  }

  @Patch('')
  @UseInterceptors(AvatarInterceptor)
  async update(
    @ActiveUser() user: ActiveUserData,
    @Body() updateUser: updateUserDto,
  ) {
    const result = await this.usersService.update({
      where: { id: Number(user.sub) },
      data: updateUser,
    });

    return result;
  }

  @Patch('info')
  @UseInterceptors(AvatarInterceptor)
  async updateInfo(
    @Body() data: updateUserDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const result = await this.usersService.updateInfo({
      where: { id: Number(user.sub) },
      data,
      include: {
        roles: true,
        info: true,
      },
    });
    return new UserEntity(result);
  }

  @Patch('setting')
  async updateSetting(
    @ActiveUser() user: ActiveUserData,
    @Body() updateSetting: Prisma.SettingUpdateInput,
  ) {
    const result = (await this.usersService.updateSetting({
      where: { id: Number(user.sub) },
      data: updateSetting,
    })) as User & { setting: Prisma.SettingGetPayload<{ select: any }> };
    return result.setting;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: Number(id) });
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(AvatarInterceptor)
  async uploadAvatar(
    @ActiveUser() user: ActiveUserData,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileName = `avatar_${Date.now()}.${file.originalname
      .split('.')
      .pop()}`;
    return this.usersService.uploadAvatar(
      { id: Number(user.sub) },
      user.email,
      fileName,
      file.buffer,
    );
  }
}
