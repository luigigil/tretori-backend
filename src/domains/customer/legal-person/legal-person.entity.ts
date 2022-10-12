import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

  @ApiProperty()
  @Column({ nullable: true, default: null })
  representatives?: string
}
