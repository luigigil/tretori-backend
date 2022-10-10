/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard'
import { LocalAuthGuard } from './shared/guards/local-auth.guard'
import { AuthService } from './shared/auth/auth.service'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  // Role example
  //   @Post()
  //   @Roles(Role.Admin)
  //   create(@Body() createCatDto: CreateCatDto) {
  //     this.catsService.create(createCatDto)
  //   }
}
