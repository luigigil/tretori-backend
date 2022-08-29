import { oneMoveFixture } from '../../../move/test/fixtures/index'
import { IContract } from '../../contract.types'

export const contractArrayFixture: IContract[] = [
  {
    adhesion: true,
    phone_on_insurancy: '',
    contributor_perc: 0,
    copay: true,
    copay_details: '',
    copay_perc: 0,
    cost: 0,
    cutoff_date: '2020-01-01',
    email_on_insurancy: '',
    inclusion_period: '',
    number_of_lives: 0,
    policy: '',
    size: '',
    type: '',
    validity_end: '2020-01-01',
    validity_start: '2020-01-01',
    validity_time: 0,
    version: 0,
    first_invoice_date: '2020-01-01',
    invoice_amount: 0,
    total_contract_value: 0,
  },
  {
    adhesion: true,
    phone_on_insurancy: '',
    contributor_perc: 0,
    copay: true,
    copay_details: '',
    copay_perc: 0,
    cost: 0,
    cutoff_date: '2020-01-01',
    email_on_insurancy: '',
    inclusion_period: '',
    number_of_lives: 0,
    policy: '',
    size: '',
    type: '',
    validity_end: '2020-01-01',
    validity_start: '2020-01-01',
    validity_time: 0,
    version: 0,
    first_invoice_date: '2020-01-01',
    invoice_amount: 0,
    total_contract_value: 0,
  },
]

export const oneContractFixture: IContract = {
  phone_on_insurancy: '',
  adhesion: true,
  contributor_perc: 0,
  copay: true,
  copay_details: '',
  copay_perc: 0,
  cost: 0,
  cutoff_date: '2020-01-01',
  email_on_insurancy: '',
  inclusion_period: '',
  number_of_lives: 0,
  policy: '',
  size: '',
  type: '',
  validity_end: '2020-01-01',
  validity_start: '2020-01-01',
  validity_time: 0,
  version: 0,
  first_invoice_date: '2020-01-01',
  invoice_amount: 0,
  total_contract_value: 0,
}

export const oneMoveContract: IContract = {
  phone_on_insurancy: '',
  adhesion: true,
  contributor_perc: 0,
  copay: true,
  copay_details: '',
  copay_perc: 0,
  cost: 0,
  cutoff_date: '2020-01-01',
  email_on_insurancy: '',
  inclusion_period: '',
  number_of_lives: 0,
  policy: '',
  size: '',
  type: '',
  validity_end: '2020-01-01',
  validity_start: '2020-01-01',
  validity_time: 0,
  version: 0,
  first_invoice_date: '2020-01-01',
  invoice_amount: 0,
  total_contract_value: 0,
  move: [{ ...oneMoveFixture }],
}
