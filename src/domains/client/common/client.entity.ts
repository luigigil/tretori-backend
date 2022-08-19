import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  phone: string

  @Column()
  phone_secondary: string

  @Column()
  address: string

  @Column()
  cep: string

  @Column()
  city: string

  @Column()
  neighborhood: string

  @Column()
  uf: string

  @Column()
  email: string

  @Column()
  contract: string
}
