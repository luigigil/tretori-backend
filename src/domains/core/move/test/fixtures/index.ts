import { Contract } from 'src/domains/core/contract/contract.entity'
import { oneContractFixture } from '../../../contract/test/fixtures'
import { IMove } from '../../move.types'

export const moveArrayFixture: IMove[] = [
  {
    action: '',
    description: '',
    details: '',
    move_date: '2020-01-01',
    number_of_lives: 0,
  },
  {
    action: '',
    description: '',
    details: '',
    move_date: '2020-01-01',
    number_of_lives: 0,
  },
]

export const oneMoveFixture: IMove = {
  action: '',
  description: '',
  details: '',
  move_date: '2020-01-01',
  number_of_lives: 0,
  contract: { ...oneContractFixture } as Contract,
}
