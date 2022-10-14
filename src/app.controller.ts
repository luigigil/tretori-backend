/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './shared/auth/auth.service'
import { LocalAuthGuard } from './shared/guards/local-auth.guard'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  // Role example
  //   @Post()
  //   @Roles(Role.Admin)
  //   create(@Body() createCatDto: CreateCatDto) {
  //     this.catsService.create(createCatDto)
  //   }
}
