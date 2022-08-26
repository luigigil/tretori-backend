import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IContract } from './contract.types'
import { ContractService } from './contract.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @ApiBody({ type: IContract })
  @ApiResponse({ status: 200, type: IContract })
  @Post()
  create(@Body() contract: IContract): Promise<IContract> {
    return this.contractService.create(contract)
  }

  @ApiResponse({ status: 200, type: [IContract] })
  @Get()
  findAll(): Promise<IContract[]> {
    return this.contractService.findAll()
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IContract })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IContract> {
    return this.contractService.findOne(id)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.contractService.remove(id)
  }
}
