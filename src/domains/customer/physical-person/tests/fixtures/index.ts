import { IPhysicalPerson } from '~/domains/customer/physical-person/physical-person.types'

export const physicalPersonArrayFixture: IPhysicalPerson[] = [
  {
    id: 1,
    birthdate: '2020-01-01',
    cpf: '12345678901',
    name: 'Delbert',
    rg: '12345678901',
    rg_emissor: 'SSP',
    rg_emissor_uf: 'New York',
  },
  {
    id: 2,
    birthdate: '2020-01-01',
    cpf: '8',
    name: 'Lonny',
    rg: '8',
    rg_emissor: '8',
    rg_emissor_uf: '8',
  },
]

export const onePhysicalPersonFixture: IPhysicalPerson = {
  id: 1,
  birthdate: '2020-01-01',
  cpf: '12345678901',
  name: 'Jakayla Waters',
  rg: '12345678901',
  rg_emissor: 'SSP',
  rg_emissor_uf: 'SP',
}
