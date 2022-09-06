import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Contract } from '../core/contract/contract.entity'
import { Representative } from '../representative/representative.entity'

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

  @OneToMany(() => Representative, (representative) => representative.insurance)
  representatives?: Representative[]

  @OneToMany(() => Contract, (contract) => contract.insurance)
  @JoinColumn()
  contracts?: Contract[]
}
