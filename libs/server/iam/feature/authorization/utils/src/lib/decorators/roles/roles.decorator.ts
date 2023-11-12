import { SetMetadata } from '@nestjs/common';
import { RoleEntity } from '@server/shared/entities';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEntity[]) => SetMetadata(ROLES_KEY, roles);
