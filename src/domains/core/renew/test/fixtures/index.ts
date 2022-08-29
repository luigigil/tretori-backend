import { Contract } from '../../../contract/contract.entity'
import { oneContractFixture } from '../../../contract/test/fixtures'
import { IRenew } from '../../renew.types'

export const renewArrayFixture: IRenew[] = [
  {
    closed_date: '2020-01-01',
    closed_value: '0',
    details: '',
    proposed_adjustment: '0',
    proposed_date: '2020-01-01',
  },
  {
    closed_date: '2020-01-01',
    closed_value: '0',
    details: '',
    proposed_adjustment: '0',
    proposed_date: '2020-01-01',
  },
]

export const oneRenewFixture: IRenew = {
  proposed_adjustment: '0',
  proposed_date: '2020-01-01',
  closed_date: '2020-01-01',
  closed_value: '0',
  details: '',
  contract: { ...oneContractFixture } as Contract,
}
