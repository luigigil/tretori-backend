import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Access {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  system: string

  @Column()
  login_tret: string

  @Column()
  pass_tret: string

  @Column()
  login_client: string

  @Column()
  pass_client: string
}
