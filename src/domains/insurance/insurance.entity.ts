import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Contract } from '../core/contract/contract.entity'

@Entity()
export class Insurance {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
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

  @OneToMany((type) => Contract, (contract) => contract.insurance)
  @JoinColumn()
  contracts: Contract[]
}
