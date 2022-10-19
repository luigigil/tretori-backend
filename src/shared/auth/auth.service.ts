import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ILoginResponse } from 'shared/auth/auth.controller'
import { IUser } from 'shared/users/user.types'
import { UsersService } from 'shared/users/users.service'

export interface IValidateUserParams {
  username: string
  password: string
  compareFn: CompareFnType
}

// extend type if needed
// please, prefere async
export type CompareFnType = (password: string | Buffer, hash: string) => Promise<boolean>

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser({
    username,
    password,
    compareFn,
  }: IValidateUserParams): Promise<Partial<IUser>> {
    const user = await this.usersService.findOneByUsername(username)
    if (user && (await compareFn(password, user.password))) {
      const { ...result } = user
      return result
    }
    return null
  }

  async login(user: Partial<IUser>): Promise<ILoginResponse> {
    const payload = { username: user.username, id: user.id, role: user.roles }
    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    }
  }
}
