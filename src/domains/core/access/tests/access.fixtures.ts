import { Access } from '~/domains/core/access/access.entity'
import { IAccess } from '~/domains/core/access/access.types'

export const oneAccessFixture: IAccess = {
  id: 1,
  system: 'system',
  login_tret: 'login_tret',
  pass_tret: 'pass_tret',
  login_client: 'login_client',
  pass_client: 'pass_client',
}

export const updateAccessFixture: Access = {
  id: 1,
  system: 'system2',
  login_tret: 'login_tret2',
  pass_tret: 'pass_tret2',
  login_client: 'login_client2',
  pass_client: 'pass_client2',
  contract: {
    id: 1,
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
  },
}

export const createAccessFixture: IAccess = {
  system: 'system',
  login_tret: 'login_tret',
  pass_tret: 'pass_tret',
  login_client: 'login_client',
  pass_client: 'pass_client',
}
