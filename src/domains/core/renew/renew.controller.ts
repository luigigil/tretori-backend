import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IRenew } from './renew.types'
import { RenewService } from './renew.service'
import { Renew } from './renew.entity'

@Controller('renew')
export class RenewController {
  constructor(private readonly renewService: RenewService) {}

  @Post()
  create(@Body() renew: IRenew): Promise<Renew> {
    return this.renewService.create(renew)
  }

  @Get()
  findAll(): Promise<Renew[]> {
    return this.renewService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Renew> {
    return this.renewService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.renewService.remove(id)
  }
}
