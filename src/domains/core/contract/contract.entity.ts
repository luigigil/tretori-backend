import { LegalPerson } from '../../customer/legal-person/legal-person.entity'
import { PhysicalPerson } from '../../customer/physical-person/physical-person.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Move } from '../move/move.entity'
import { Renew } from '../renew/renew.entity'
import { Access } from '../access/access.entity'
import { Insurance } from 'src/domains/insurance/insurance.entity'

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

  @ManyToOne(() => PhysicalPerson, (physical_person) => physical_person.contracts)
  physical_person?: PhysicalPerson

  @ManyToOne(() => LegalPerson, (legal_person) => legal_person.contracts)
  legal_person?: LegalPerson

  @OneToMany(() => Insurance, (insurance) => insurance.contracts)
  @JoinColumn()
  insurance: Insurance

  // @Column()
  // Produto (Vinculação)
  @OneToOne(() => Access)
  @JoinColumn()
  access?: Access

  @OneToMany(() => Move, (move) => move.contract)
  @JoinColumn()
  move?: Move[]

  @OneToMany(() => Renew, (renew) => renew.contract)
  @JoinColumn()
  renew?: Renew[]
}
