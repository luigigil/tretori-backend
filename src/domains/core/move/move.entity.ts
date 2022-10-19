import { Contract } from 'domains/core/contract/contract.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Move {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  move_date: string

  @Column()
  action: string

  @Column()
  number_of_lives: number

  @Column()
  description: string

  @Column()
  details: string

  @ManyToOne(() => Contract, (contract) => contract.move, { onDelete: 'CASCADE' })
  contract?: Contract
}
