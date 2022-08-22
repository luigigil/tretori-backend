import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { IAccess } from '../common/contract.types'
import { AccessService } from './access.service'
import { Access } from './access.entity'
import { UpdateResult } from 'typeorm'

@Controller('contract/access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  create(@Body() access: IAccess): Promise<Access> {
    return this.accessService.create(access)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Access> {
    return this.accessService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccess: IAccess
  ): Promise<UpdateResult> {
    return this.accessService.update(id, updateAccess)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Access> {
    return this.accessService.remove(id)
  }
}
