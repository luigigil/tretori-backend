import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IPhysicalPerson } from '../common/customer.types'
import { PhysicalPersonService } from './physical-person.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('physical-person')
export class PhysicalPersonController {
  constructor(private readonly physicalPersonService: PhysicalPersonService) {}

  @ApiBody({ type: IPhysicalPerson })
  @ApiResponse({ status: 200, type: IPhysicalPerson })
  @Post()
  create(@Body() physicalPerson: IPhysicalPerson): Promise<IPhysicalPerson> {
    return this.physicalPersonService.create(physicalPerson)
  }

  @ApiResponse({ status: 200, type: [IPhysicalPerson] })
  @Get()
  findAll(): Promise<IPhysicalPerson[]> {
    return this.physicalPersonService.findAll()
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IPhysicalPerson })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IPhysicalPerson> {
    return this.physicalPersonService.findOne(id)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.physicalPersonService.remove(id)
  }
}
