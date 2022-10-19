import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from 'shared/auth/auth.service'
import { LocalAuthGuard } from 'shared/guards/local-auth.guard'

export interface ILoginResponse {
  access_token: string
  username: string
  id: number
  role: string
}

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Roles(Role.Admin)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<ILoginResponse> {
    return this.authService.login(req.user)
  }
}
