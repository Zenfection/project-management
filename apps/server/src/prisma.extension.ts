import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

export const extendedPrismaClient = new PrismaClient().$extends(
  withAccelerate(),
);

export type ExtendedPrismaClient = typeof extendedPrismaClient;
