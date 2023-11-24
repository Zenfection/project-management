import { Comment as CommentPrisma, Prisma } from '@prisma/client';
import { Info } from '../user/user.types';

export interface Comment extends CommentPrisma {
  user: {
    info: Info;
  };
}

export interface CreateComent extends Prisma.CommentCreateInput {}
export interface UpdateComment extends Prisma.CommentUpdateInput {}
