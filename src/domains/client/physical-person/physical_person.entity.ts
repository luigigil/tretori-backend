import { Column, Entity } from 'typeorm'
import { Client } from '../common/client.entity'

@Entity()
export class PhysicalPerson extends Client {
  @Column()
  name: string

  @Column()
  birthdate: string

  @Column()
  cpf: string

  @Column()
  rg: string

  @Column()
  rg_emissor: string

  @Column()
  rg_emissor_uf: string
}
