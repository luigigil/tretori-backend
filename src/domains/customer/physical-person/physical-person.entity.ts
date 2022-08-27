import { Contract } from '../../core/contract/contract.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { Customer } from '../common/customer.entity'

@Entity()
export class PhysicalPerson extends Customer {
  @Column()
  name: string

  @Column()
  birthdate: string

  @Column()
  cpf: string

  @Column()
  rg: string

  @Column()
  rg_emissor: string

  @Column()
  rg_emissor_uf: string

  @OneToMany(() => Contract, (contract) => contract.physical_person)
  contracts?: Contract[]
}
