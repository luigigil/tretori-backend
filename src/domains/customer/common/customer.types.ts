import { ApiProperty } from '@nestjs/swagger'
import { IContract } from '../../core/contract/contract.types'

export class ICustomer {
  @ApiProperty()
  id?: number

  @ApiProperty()
  code?: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  phone_secondary: string

  @ApiProperty()
  address: string

  @ApiProperty()
  cep: string

  @ApiProperty()
  city: string

  @ApiProperty()
  neighborhood: string

  @ApiProperty()
  uf: string

  @ApiProperty()
  email: string
}

export class IPhysicalPerson extends ICustomer {
  @ApiProperty()
  name: string

  @ApiProperty()
  birthdate: string

  @ApiProperty()
  cpf: string

  @ApiProperty()
  rg: string

  @ApiProperty()
  rg_emissor: string

  @ApiProperty()
  rg_emissor_uf: string

  @ApiProperty()
  contracts?: IContract[]
}

export class ILegalPerson extends ICustomer {
  @ApiProperty()
  fantasy_name: string

  @ApiProperty()
  cnpj: string

  @ApiProperty()
  social_reason: string

  @ApiProperty()
  type: string

  @ApiProperty()
  size: string

  @ApiProperty()
  representatives: string

  @ApiProperty()
  contracts?: IContract[]
}

export type Customer = IPhysicalPerson | ILegalPerson
