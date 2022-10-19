import { Contract } from '~/domains/core/contract/contract.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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

  @ManyToOne(() => Contract, (contract) => contract.renew, { onDelete: 'CASCADE' })
  contract?: Contract
}
