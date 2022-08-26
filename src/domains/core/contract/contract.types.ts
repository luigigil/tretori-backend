export interface IContract {
  id?: number
  policy: string
  size: string
  type: string
  version: number
  number_of_lives: number
  validity_start: string
  validity_end: string
  validity_time: number
  inclusion_period: string
  cutoff_date: string
  email_on_insurancy: string
  phone_on_insurancy: string
  copay: boolean
  adhesion: boolean
  copay_perc: number
  contributor_perc: number
  copay_details: string
  cost: number
  invoice_amount: number
  total_contract_value: number
  first_invoice_date: string
}
