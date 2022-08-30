import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { InsuranceService } from './insurance.service'
import { IInsurance } from './insurance.types'

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @ApiBody({ type: IInsurance })
  @ApiResponse({ status: 200, type: IInsurance })
  @Post()
  create(@Body() legalPerson: IInsurance): Promise<IInsurance> {
    return this.insuranceService.create(legalPerson)
  }

  @ApiResponse({ status: 200, type: [IInsurance] })
  @Get()
  findAll(): Promise<IInsurance[]> {
    return this.insuranceService.findAll()
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IInsurance })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IInsurance> {
    return this.insuranceService.findOne(id)
  }

  // TODO update route

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.insuranceService.remove(id)
  }
}
