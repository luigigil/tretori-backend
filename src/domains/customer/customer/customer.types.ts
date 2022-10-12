import { ApiProperty } from '@nestjs/swagger'
import { IContract } from '../../core/contract/contract.types'
import { ILegalPerson } from '../legal-person/legal-person.types'
import { IPhysicalPerson } from '../physical-person/physical-person.types'
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

  @ApiProperty()
  physical_person?: IPhysicalPerson

  @ApiProperty()
  legal_person?: ILegalPerson
}
