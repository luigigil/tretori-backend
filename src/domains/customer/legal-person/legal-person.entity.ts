import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'
import { Customer } from '../common/customer.entity'

@Entity()
export class LegalPerson extends Customer {
  @ApiProperty()
  @Column()
  fantasy_name: string

  @ApiProperty()
  @Column()
  cnpj: string

  @ApiProperty()
  @Column()
  social_reason: string

  @ApiProperty()
  @Column()
  type: string

  @ApiProperty()
  @Column()
  size: string

  @ApiProperty()
  @Column()
  representatives: string
}
