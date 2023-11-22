import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  name: string;
  id: number;
  description: string;
}

export enum RoleEnum {
  thu_ky_khoa = 'THU_KY_KHOA',
  truong_khoa = 'TRUONG_KHOA',
}
