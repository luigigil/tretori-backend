import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { Contract } from 'domains/core/contract/contract.entity'
import { ContractService } from 'domains/core/contract/contract.service'
import {
  ContractUpdateBody,
  IContract,
  IContractUpdate,
  IMoveResponse,
  IRenewResponse,
} from 'domains/core/contract/contract.types'
import { MoveService } from 'domains/core/move/move.service'
import { IMove } from 'domains/core/move/move.types'
import { RenewService } from 'domains/core/renew/renew.service'
import { IRenew } from 'domains/core/renew/renew.types'
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard'

@Controller('contracts')
export class ContractController {
  constructor(
    private readonly contractService: ContractService,
    private readonly moveService: MoveService,
    private readonly renewService: RenewService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IContract })
  @ApiResponse({ status: 201, type: IContract })
  @Post()
  create(@Body() contract: IContract): Promise<IContract> {
    return this.contractService.create(contract)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [IContract] })
  @Get()
  findAll(): Promise<IContract[]> {
    return this.contractService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IContract })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IContract> {
    return this.contractService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: ContractUpdateBody })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() contract: IContractUpdate): Promise<Contract> {
    return this.contractService.update(id, contract)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.contractService.remove(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IMoveResponse })
  @ApiBody({ type: IMove })
  @Post(':id/move')
  async moveContract(
    @Param('id', ParseIntPipe) id: number,
    @Body() newMove: IMove
  ): Promise<IMoveResponse> {
    return this.contractService.moveContract(id, newMove)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IRenewResponse })
  @ApiBody({ type: IRenew })
  @Post(':id/renew')
  async renewContract(
    @Param('id', ParseIntPipe) id: number,
    @Body() newRenew: IRenew
  ): Promise<{ renew: IRenew; contract: IContract }> {
    return this.contractService.renewContract(id, newRenew)
  }
}
