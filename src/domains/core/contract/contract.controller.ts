import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IContract } from './contract.types'
import { ContractService } from './contract.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { IMove } from '../move/move.types'
import { IRenew } from '../renew/renew.types'
import { MoveService } from '../move/move.service'
import { RenewService } from '../renew/renew.service'
import { PhysicalPersonService } from '../../customer/physical-person/physical-person.service'
import { LegalPersonService } from '../../customer/legal-person/legal-person.service'
import { ILegalPerson, IPhysicalPerson } from '../../customer/common/customer.types'
import { IAccess } from '../access/access.types'
import { AccessService } from '../access/access.service'
import {
  IMoveResponse,
  IRenewResponse,
  IPhysicalPersonToContractResponse,
  ILegalPersonToContractResponse,
  IAccessToContractResponse,
} from './contract.relations'

@Controller('contract')
export class ContractController {
  constructor(
    private readonly accessService: AccessService,
    private readonly contractService: ContractService,
    private readonly legalPersonService: LegalPersonService,
    private readonly moveService: MoveService,
    private readonly physicalPersonService: PhysicalPersonService,
    private readonly renewService: RenewService
  ) {}

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

  // TODO update route

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.contractService.remove(id)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'accessId', type: Number })
  @ApiResponse({ status: 200, type: IAccessToContractResponse })
  @Post(':id/access/:accessId')
  async addAccess(
    @Param('id', ParseIntPipe) id: number,
    @Param('accessId', ParseIntPipe) accessId: number
  ): Promise<{ access: IAccess; contract: IContract }> {
    const contract = await this.contractService.findOne(id)
    const access = await this.accessService.findOne(accessId)
    contract.access = access
    await this.contractService.update(contract.id, contract)
    return {
      access,
      contract,
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'personId', type: Number })
  @ApiResponse({ status: 200, type: ILegalPersonToContractResponse })
  @Post(':id/legal-person/:personId')
  async addLegalPerson(
    @Param('id', ParseIntPipe) id: number,
    @Param('personId', ParseIntPipe) personId: number
  ): Promise<{ legalPerson: ILegalPerson; contract: IContract }> {
    const contract = await this.contractService.findOne(id)
    const legalPerson = await this.legalPersonService.findOne(personId)
    contract.legal_person = legalPerson
    await this.contractService.update(contract.id, contract)
    return {
      legalPerson,
      contract,
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IMoveResponse })
  @ApiBody({ type: IMove })
  @Post(':id/move')
  async moveContract(
    @Body() newMove: IMove,
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ move: IMove; contract: IContract }> {
    const contract = await this.contractService.findOne(id)
    const move = await this.moveService.create(newMove)
    contract.move.push(move)
    await this.contractService.update(contract.id, contract)
    return {
      move,
      contract,
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'personId', type: Number })
  @ApiResponse({ status: 200, type: IPhysicalPersonToContractResponse })
  @Post(':id/physical-person/:personId')
  async addPhysicalPerson(
    @Param('id', ParseIntPipe) id: number,
    @Param('personId', ParseIntPipe) personId: number
  ): Promise<{ physicalPerson: IPhysicalPerson; contract: IContract }> {
    const contract = await this.contractService.findOne(id)
    const physicalPerson = await this.physicalPersonService.findOne(personId)
    contract.physical_person = physicalPerson
    await this.contractService.update(contract.id, contract)
    return {
      physicalPerson,
      contract,
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IRenewResponse })
  @ApiBody({ type: IRenew })
  @Post(':id/renew')
  async renewContract(
    @Body() newRenew: IRenew,
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ renew: IRenew; contract: IContract }> {
    const contract = await this.contractService.findOne(id)
    const renew = await this.renewService.create(newRenew)
    contract.renew.push(renew)
    await this.contractService.update(contract.id, contract)
    return {
      renew,
      contract,
    }
  }
}
