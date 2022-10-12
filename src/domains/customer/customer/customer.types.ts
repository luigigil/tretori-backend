import { ApiProperty } from '@nestjs/swagger'
import { IContract } from '../../core/contract/contract.types'
import { CustomerType } from './customer.entity'

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

  @ApiProperty()
  customer_type: CustomerType

  @ApiProperty()
  contracts?: IContract[]
}
