import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IPhysicalPerson } from '../common/customer.types'
import { PhysicalPersonService } from './physical-person.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('physical-person')
export class PhysicalPersonController {
  constructor(private readonly physicalPersonService: PhysicalPersonService) {}

  @ApiBody({ type: IPhysicalPerson })
  @ApiResponse({ status: 201, type: IPhysicalPerson })
  @Post()
  @HttpCode(201)
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

  // TODO update route

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<void> {
    return this.physicalPersonService.remove(id)
  }
}
