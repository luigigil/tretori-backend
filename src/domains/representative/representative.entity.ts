import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class RepresentativeRepository {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  name: string

  @Column()
  role: string

  @Column()
  description: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  birthdate: string

  @Column({ nullable: true })
  insurance?: string

  @Column({ nullable: true })
  company?: string
}
