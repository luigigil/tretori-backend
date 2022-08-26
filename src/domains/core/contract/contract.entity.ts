import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  policy: string

  @Column()
  size: string

  @Column()
  type: string

  @Column()
  version: number

  @Column()
  number_of_lives: number

  @Column()
  validity_start: string

  @Column()
  validity_end: string

  @Column()
  validity_time: number

  @Column()
  inclusion_period: string

  @Column()
  cutoff_date: string

  @Column()
  email_on_insurancy: string

  @Column()
  phone_on_insurancy: string

  @Column()
  copay: boolean

  @Column()
  adhesion: boolean

  @Column()
  copay_perc: number

  @Column()
  contributor_perc: number

  @Column()
  copay_details: string

  @Column()
  cost: number

  @Column()
  invoice_amount: number

  @Column()
  total_contract_value: number

  @Column()
  first_invoice_date: string

  // @Column()
  // Pessoa Física (Vinculação)

  // @Column()
  // Produto (Vinculação)

  // @Column()
  // Acesso (Vinculação)

  // @Column()
  // Movimentação (Vinculação)

  // @Column()
  // Renovação (Vinculação)
}
