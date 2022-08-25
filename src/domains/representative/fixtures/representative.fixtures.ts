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

export const RepresentativeFixtureArray: IRepresentative[] = [
  {
    id: 1,
    type: 'Insurance',
    name: 'José da silva Sauro',
    role: 'Diretor de RH',
    description: 'Torcedor do Flamengo e gosta de vinhos portugueses',
    email: 'jose@jose.com',
    phone: '+55 (11) 99999-9999',
    birthdate: '01/02/1990',
    insurance: 'Seguradora Segura',
  },
  {
    id: 2,
    type: 'Company',
    name: 'Joao Amaro',
    role: 'Dono da empresa',
    description: 'Gosta de cafés especiais e cervejas artesanais',
    email: 'joao@amaro.com.br',
    phone: '+55 (21) 98888-9999',
    birthdate: '02/03/1970',
    company: 'Casa do Amaro',
  },
]
