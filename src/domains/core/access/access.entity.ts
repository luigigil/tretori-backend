import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Contract } from '../contract/contract.entity'

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

  @OneToOne(() => Contract, (contract) => contract.access)
  contract: Contract
}
