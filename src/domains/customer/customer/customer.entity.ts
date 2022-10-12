import { Contract } from '../../core/contract/contract.entity'
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { PhysicalPerson } from '../physical-person/physical-person.entity'
import { LegalPerson } from '../legal-person/legal-person.entity'

export enum CustomerType {
  LEGAL_PERSON = 'LEGAL_PERSON',
  PHYSICAL_PERSON = 'PHYSICAL_PERSON',
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated('uuid')
  code: string

  @Column()
  phone: string

  @Column()
  phone_secondary: string

  @Column()
  address: string

  @Column()
  cep: string

  @Column()
  city: string

  @Column()
  neighborhood: string

  @Column()
  uf: string

  @Column()
  email: string

  @Column()
  customer_type: CustomerType

  @OneToMany(() => Contract, (contract) => contract.customer)
  contracts?: Contract[]

  @OneToOne(() => PhysicalPerson, (physical_person) => physical_person.id)
  @JoinColumn()
  physical_person?: PhysicalPerson

  @OneToOne(() => LegalPerson, (legal_person) => legal_person.id)
  @JoinColumn()
  legal_person?: LegalPerson
}
