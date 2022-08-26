import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IContract } from './contract.types'
import { ContractService } from './contract.service'
import { Contract } from './contract.entity'

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  create(@Body() contract: IContract): Promise<Contract> {
    return this.contractService.create(contract)
  }

  @Get()
  findAll(): Promise<Contract[]> {
    return this.contractService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Contract> {
    return this.contractService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.contractService.remove(id)
  }
}
