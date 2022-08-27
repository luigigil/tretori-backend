import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IRenew } from './renew.types'
import { RenewService } from './renew.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('renew')
export class RenewController {
  constructor(private readonly renewService: RenewService) {}

  @ApiBody({ type: IRenew })
  @ApiResponse({ status: 200, type: IRenew })
  @Post()
  create(@Body() renew: IRenew): Promise<IRenew> {
    return this.renewService.create(renew)
  }

  @ApiResponse({ status: 200, type: [IRenew] })
  @Get()
  findAll(): Promise<IRenew[]> {
    return this.renewService.findAll()
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IRenew })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IRenew> {
    return this.renewService.findOne(id)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.renewService.remove(id)
  }
}
