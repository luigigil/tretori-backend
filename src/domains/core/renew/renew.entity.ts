import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
