import { Contract } from '../../core/contract/contract.entity'
import { Column, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

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
}
