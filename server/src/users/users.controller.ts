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
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { Roles } from '../iam/authorization/decorators/roles/roles.decorator';
import { RoleEntity } from './entity/role.entity';
import { updateInfoDto } from './dto/update-info.dto';
import { ActiveUser } from '../iam/authentication/decorators/active-user/active-user.decorator';
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from '../cloud/interceptors/transform/transform.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(new RoleEntity('ADMIN'))
  @Get()
  async findAll() {
    return this.usersService.findAll();
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
  @UseInterceptors(TransformInterceptor)
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
  @UseInterceptors(TransformInterceptor)
  async update(
    @ActiveUser() user: ActiveUserData,
    @Body() updateUser: updateUserDto,
  ) {
    const result = await this.usersService.update({
      where: { id: Number(user.sub) },
      data: updateUser,
    });

    return {
      ...result,
      password: undefined,
    };
  }

  @Patch('info')
  @UseInterceptors(TransformInterceptor)
  async updateInfo(
    @Body() updateInfo: updateInfoDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const result = (await this.usersService.updateInfo({
      where: { id: Number(user.sub) },
      data: updateInfo,
    })) as User & { info: Prisma.InfoGetPayload<{ select: any }> };
    return result.info;
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
  @UseInterceptors(TransformInterceptor)
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
