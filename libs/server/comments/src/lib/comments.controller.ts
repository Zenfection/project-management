import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from '@server/shared/dto';
import {
  ActiveUser,
  ActiveUserData,
} from '@server/iam/feature/authentication/utils';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Patch(':id')
  async update(
    @ActiveUser() activeUser: ActiveUserData,
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id') id: string,
  ) {
    if (!(await this.commentsService.checkPermission(activeUser, Number(id)))) {
      throw new UnauthorizedException('Permission denied');
    }

    return this.commentsService.update({
      where: { id: Number(id) },
      data: updateCommentDto,
      include: {
        user: {
          select: { info: true },
        },
        task: true,
      },
    });
  }

  // @Get()
  // findAll() {
  //   return this.commentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentsService.remove(+id);
  // }
}
