import { Customer } from '../../customer/customer/customer.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Insurance } from '../../insurance/insurance.entity'
import { Access } from '../access/access.entity'
import { Move } from '../move/move.entity'
import { Renew } from '../renew/renew.entity'

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  policy: string

  @Column()
  size: string

  @Column()
  type: string

  @Column()
  version: number

  @Column()
  number_of_lives: number

  @Column()
  validity_start: string

  @Column()
  validity_end: string

  @Column()
  validity_time: number

  @Column()
  inclusion_period: string

  @Column()
  cutoff_date: string

  @Column()
  email_on_insurancy: string

  @Column()
  phone_on_insurancy: string

  @Column()
  copay: boolean

  @Column()
  adhesion: boolean

  @Column()
  copay_perc: number

  @Column()
  contributor_perc: number

  @Column()
  copay_details: string

  @Column()
  cost: number

  @Column()
  invoice_amount: number

  @Column()
  total_contract_value: number

  @Column()
  first_invoice_date: string

  @ManyToOne(() => Customer, (customer) => customer.contracts)
  customer?: Customer

  @OneToMany(() => Insurance, (insurance) => insurance.contracts)
  @JoinColumn()
  insurance?: Insurance

  @OneToOne(() => Access, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  access?: Access

  @OneToMany(() => Move, (move) => move.contract, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  move?: Move[]

  @OneToMany(() => Renew, (renew) => renew.contract, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  renew?: Renew[]
}
