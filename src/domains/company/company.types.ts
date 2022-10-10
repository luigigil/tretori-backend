import { ApiProperty } from '@nestjs/swagger'
import { IContract } from 'domains/core/contract/contract.types'

export class ICompany {
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
