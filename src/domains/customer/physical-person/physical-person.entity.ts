import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Customer } from '~/domains/customer/customer/customer.entity'

@Entity()
export class PhysicalPerson {
  @PrimaryGeneratedColumn()
  id: number

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

  @OneToOne(() => Customer, (customer) => customer.id)
  @JoinColumn()
  customer: Customer
}
