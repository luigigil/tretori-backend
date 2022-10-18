import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'
import { RenewService } from './renew.service'
import { IRenew } from './renew.types'

@Controller('renew')
export class RenewController {
  constructor(private readonly renewService: RenewService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IRenew })
  @ApiResponse({ status: 200, type: IRenew })
  @Post()
  create(@Body() renew: IRenew): Promise<IRenew> {
    return this.renewService.create(renew)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [IRenew] })
  @Get()
  findAll(): Promise<IRenew[]> {
    return this.renewService.findAll()
  }
}
