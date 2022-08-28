import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Contract } from '../contract/contract.entity'

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

  @Column()
  contract?: string
}
