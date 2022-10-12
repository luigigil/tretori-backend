import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PhysicalPerson {
  @PrimaryGeneratedColumn()
  id: number

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
