/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { compare } from 'bcrypt'
import { Strategy } from 'passport-local'
import { AuthService } from '~/shared/auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ username, password, compareFn: compare })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
