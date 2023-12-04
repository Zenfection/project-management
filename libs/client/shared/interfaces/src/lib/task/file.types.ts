import { File as FilePrisma, Prisma } from '@prisma/client';

export interface File extends FilePrisma {}
export interface CreateFile extends Prisma.FileCreateInput {}
export interface UpdateFile extends Prisma.FileUpdateInput {}
