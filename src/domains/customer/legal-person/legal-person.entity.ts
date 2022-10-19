import { ApiProperty } from '@nestjs/swagger'
import { Customer } from 'domains/customer/customer/customer.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class LegalPerson {
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  fantasy_name: string

  @ApiProperty()
  @Column()
  cnpj: string

  @ApiProperty()
  @Column()
  social_reason: string

  @ApiProperty()
  @Column()
  type: string

  @ApiProperty()
  @Column()
  size: string

  @OneToOne(() => Customer, (customer) => customer.id)
  @JoinColumn()
  customer: Customer

  @ApiProperty()
  @Column({ nullable: true, default: null })
  representatives?: string
}
