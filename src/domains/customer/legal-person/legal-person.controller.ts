import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ILegalPerson } from '../common/customer.types'
import { LegalPersonService } from './legal-person.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('legal-person')
export class LegalPersonController {
  constructor(private readonly legalPersonService: LegalPersonService) {}

  @ApiBody({ type: ILegalPerson })
  @ApiResponse({ status: 200, type: ILegalPerson })
  @Post()
  create(@Body() legalPerson: ILegalPerson): Promise<ILegalPerson> {
    return this.legalPersonService.create(legalPerson)
  }

  @ApiResponse({ status: 200, type: [ILegalPerson] })
  @Get()
  findAll(): Promise<ILegalPerson[]> {
    return this.legalPersonService.findAll()
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: ILegalPerson })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ILegalPerson> {
    return this.legalPersonService.findOne(id)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.legalPersonService.remove(id)
  }
}
