import { ApiProperty } from '@nestjs/swagger'
import { IContract } from '../core/contract/contract.types'
import { Representative } from '../representative/representative.entity'

export class IInsurance {
  @ApiProperty()
  id?: number

  @ApiProperty()
  code: string

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
  representatives?: Representative[]

  @ApiProperty()
  contracts?: IContract[]
}
