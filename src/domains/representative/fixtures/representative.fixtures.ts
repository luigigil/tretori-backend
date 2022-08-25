import { IRepresentative } from '../representative.types'

export const RepresentativeFixture: IRepresentative = {
  id: 1,
  type: 'Insurance',
  name: 'José da silva',
  role: 'Diretor de RH',
  description: 'Torcedor do Flamengo',
  email: 'jose@jose.com',
  phone: '+55 (11) 99999-9999',
  birthdate: '01/02/1990',
  insurance: 'Seguradora Segura',
}

export const CreateRepresentativeFixture: IRepresentative = {
  type: 'Insurance',
  name: 'José da silva',
  role: 'Diretor de RH',
  description: 'Torcedor do Flamengo',
  email: 'jose@jose.com',
  phone: '+55 (11) 99999-9999',
  birthdate: '01/02/1990',
  insurance: 'Seguradora Segura',
}

export const UpdateRepresentativeFixture: IRepresentative = {
  id: 1,
  type: 'Insurance',
  name: 'José da silva Sauro',
  role: 'Diretor de RH',
  description: 'Torcedor do Flamengo e gosta de vinhos portugueses',
  email: 'jose@jose.com',
  phone: '+55 (11) 99999-9999',
  birthdate: '01/02/1990',
  insurance: 'Seguradora Segura',
}
