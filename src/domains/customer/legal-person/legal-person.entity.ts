import { Column, Entity } from 'typeorm'
import { Customer } from '../common/customer.entity'

@Entity()
export class LegalPerson extends Customer {
  @Column()
  fantasy_name: string

  @Column()
  cnpj: string

  @Column()
  social_reason: string

  @Column()
  type: string

  @Column()
  size: string

  @Column()
  representatives: string
}
