import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IPhysicalPerson } from '../common/customer.types'
import { PhysicalPersonService } from './physical-person.service'
import { PhysicalPerson } from './physical-person.entity'

@Controller('physical-person')
export class PhysicalPersonController {
  constructor(private readonly physicalPersonService: PhysicalPersonService) {}

  @Post()
  create(@Body() physicalPerson: IPhysicalPerson): Promise<PhysicalPerson> {
    return this.physicalPersonService.create(physicalPerson)
  }

  @Get()
  findAll(): Promise<PhysicalPerson[]> {
    return this.physicalPersonService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PhysicalPerson> {
    return this.physicalPersonService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.physicalPersonService.remove(id)
  }
}
