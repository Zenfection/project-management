import { Position } from '@prisma/client';

export class PositionEntity implements Position {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
