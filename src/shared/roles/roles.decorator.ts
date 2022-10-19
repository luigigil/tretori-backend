/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SetMetadata } from '@nestjs/common'
import { Role } from 'shared/roles/role.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
