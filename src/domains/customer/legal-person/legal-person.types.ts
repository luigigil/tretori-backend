import { ApiProperty } from '@nestjs/swagger'
import { Customer } from '~/domains/customer/customer/customer.entity'

export class ILegalPerson {
  @ApiProperty()
  id?: number

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
  representatives?: string

  @ApiProperty()
  customer?: Customer
}
