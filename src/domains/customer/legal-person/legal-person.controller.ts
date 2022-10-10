import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { ILegalPerson } from '../common/customer.types'
import { LegalPersonService } from './legal-person.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'

@Controller('legal-person')
export class LegalPersonController {
  constructor(private readonly legalPersonService: LegalPersonService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ILegalPerson })
  @ApiResponse({ status: 200, type: ILegalPerson })
  @Post()
  create(@Body() legalPerson: ILegalPerson): Promise<ILegalPerson> {
    return this.legalPersonService.create(legalPerson)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [ILegalPerson] })
  @Get()
  findAll(): Promise<ILegalPerson[]> {
    return this.legalPersonService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: ILegalPerson })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ILegalPerson> {
    return this.legalPersonService.findOne(id)
  }

  // TODO update route

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.legalPersonService.remove(id)
  }
}
