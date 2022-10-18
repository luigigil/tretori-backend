import { ILegalPerson } from '../../legal-person.types'

export const legalPersonArrayFixture: ILegalPerson[] = [
  {
    cnpj: '8',
    fantasy_name: 'Marks - Dach',
    id: 1,
    representatives: '',
    size: 'metallic',
    social_reason: 'Zemlak and Sons',
    type: 'l',
  },
  {
    cnpj: '1',
    fantasy_name: 'Bernhard Group',
    id: 2,
    representatives: '',
    size: 'similar',
    social_reason: "O'Kon, Gutmann and Reynolds",
    type: 'b',
  },
]

export const oneLegalPersonFixture: ILegalPerson = {
  id: 3,
  cnpj: '2',
  fantasy_name: 'Orn Inc',
  representatives: '',
  size: 'mountainous',
  social_reason: 'Hauck, Wunsch and Halvorson',
  type: 'h',
}
