import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  id: number;
  description: string;
}
