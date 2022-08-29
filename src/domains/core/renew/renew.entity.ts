import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Contract } from '../contract/contract.entity'

@Entity()
export class Renew {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  proposed_date: string

  @Column()
  proposed_adjustment: string

  @Column()
  closed_date: string

  @Column()
  closed_value: string

  @Column()
  details: string

  @ManyToOne(() => Contract, (contract) => contract.renew)
  contract?: Contract
}
