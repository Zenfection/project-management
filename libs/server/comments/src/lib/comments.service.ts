import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from '@server/shared/dto';
import { PrismaService } from 'nestjs-prisma';
import { CommentEntity } from '@server/shared/entities';
import { Prisma } from '@prisma/client';
import { RoleEnum } from '@server/shared/entities';
import { ActiveUserData } from '@server/iam/feature/authentication/utils';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  private checkEmptyDataUpdate(data: UpdateCommentDto) {
    if (Object.keys(data).length === 0) {
      throw new UnauthorizedException('Data is empty');
    }
  }

  async checkPermission(
    activeUser: ActiveUserData,
    commentId: number,
  ): Promise<boolean> {
    if (
      activeUser.roles?.includes(RoleEnum.truong_khoa) ||
      activeUser.roles?.includes(RoleEnum.thu_ky_khoa)
    ) {
      return true;
    }

    const comment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    return comment?.userId === activeUser.sub;
  }

  create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.prismaService.comment.create({
      data: createCommentDto,
    });
  }

  findAll(params: {
    include?: Prisma.CommentInclude;
  }): Promise<CommentEntity[]> {
    return this.prismaService.comment.findMany(params);
  }

  findOne(params: {
    where: Prisma.CommentWhereUniqueInput;
    include?: Prisma.CommentInclude;
  }): Promise<CommentEntity | null> {
    return this.prismaService.comment.findUnique(params);
  }

  findFilter(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
    include?: Prisma.CommentInclude;
  }): Promise<CommentEntity[]> {
    return this.prismaService.comment.findMany(params);
  }

  update(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: UpdateCommentDto;
    include?: Prisma.CommentInclude;
  }): Promise<CommentEntity> {
    this.checkEmptyDataUpdate(params.data);
    return this.prismaService.comment.update(params);
  }

  remove(params: {
    where: Prisma.CommentWhereUniqueInput;
  }): Promise<CommentEntity> {
    return this.prismaService.comment.delete(params);
  }
}
