import { Column, Generated, PrimaryGeneratedColumn } from 'typeorm'

export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated('uuid')
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
}
