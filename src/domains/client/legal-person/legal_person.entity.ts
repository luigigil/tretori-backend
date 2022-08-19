import { Column, Entity } from 'typeorm'
import { Client } from '../common/client.entity'

@Entity()
export class LegalPerson extends Client {
  @Column()
  fantasy_name: string

  @Column()
  cnpj: string

  @Column()
  social_reason: string

  @Column()
  type: string

  @Column()
  size: string

  @Column()
  representatives: string[]
}
