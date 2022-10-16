import { CustomerType } from '../../customer.entity'
import { ICustomer } from '../../customer.types'

export const customersFixture: ICustomer[] = [
  {
    id: 5,
    code: '3c7f2057-eb6d-45ba-8b47-47df9c410dbf',
    phone: 'asdsad61213123132132',
    phone_secondary: 'sadas6132132132132',
    address: 'asdsaasdsads',
    cep: 'dsad1231231',
    city: 'dsadasdasd',
    neighborhood: 'sadsaasdasd',
    uf: 'dsadassd',
    email: 'asdsadsadasdsasa@adasdsa.com',
    customer_type: CustomerType.PHYSICAL_PERSON,
  },
  {
    id: 6,
    code: '3b64bfb1-3bff-41fd-afe3-8de99414cb0b',
    phone: 'asdas',
    phone_secondary: 'dasd',
    address: 'dsad',
    cep: 'sadsa',
    city: 'sadas',
    neighborhood: 'dsad',
    uf: 'sadsa',
    email: 'sadsad',
    customer_type: CustomerType.LEGAL_PERSON,
  },
]

export const customerFixture: ICustomer = {
  id: 5,
  code: '3c7f2057-eb6d-45ba-8b47-47df9c410dbf',
  phone: 'asdsad61213123132132',
  phone_secondary: 'sadas6132132132132',
  address: 'asdsaasdsads',
  cep: 'dsad1231231',
  city: 'dsadasdasd',
  neighborhood: 'sadsaasdasd',
  uf: 'dsadassd',
  email: 'asdsadsadasdsasa@adasdsa.com',
  customer_type: CustomerType.PHYSICAL_PERSON,
  physical_person: {
    id: 2,
    name: 'asdsadsaJoão da Silva',
    birthdate: '2022-10-12',
    cpf: '02304093800',
    rg: 'asd123456789',
    rg_emissor: 'sadsaSSP',
    rg_emissor_uf: 'dsaSP',
  },
  legal_person: null,
}
