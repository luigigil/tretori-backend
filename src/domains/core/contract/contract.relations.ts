import { ApiProperty } from '@nestjs/swagger'
import { IPhysicalPerson, ILegalPerson } from '../../customer/common/customer.types'
import { IAccess } from '../access/access.types'
import { IMove } from '../move/move.types'
import { IRenew } from '../renew/renew.types'
import { IContract } from './contract.types'

export class IMoveResponse {
  @ApiProperty()
  move: IMove

  @ApiProperty()
  contract: IContract
}
export class IRenewResponse {
  @ApiProperty()
  renew: IRenew

  @ApiProperty()
  contract: IContract
}

export class IPhysicalPersonToContractResponse {
  @ApiProperty()
  physicalPerson: IPhysicalPerson

  @ApiProperty()
  contract: IContract
}

export class ILegalPersonToContractResponse {
  @ApiProperty()
  legalPerson: ILegalPerson

  @ApiProperty()
  contract: IContract
}

export class IAccessToContractResponse {
  @ApiProperty()
  access: IAccess

  @ApiProperty()
  contract: IContract
}
