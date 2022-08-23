export interface ICustomer {
  id?: number
  code: string
  phone: string
  phone_secondary: string
  address: string
  cep: string
  city: string
  neighborhood: string
  uf: string
  email: string
  contract: string
}

export interface IPhysicalPerson extends ICustomer {
  name: string
  birthdate: string
  cpf: string
  rg: string
  rg_emissor: string
  rg_emissor_uf: string
}

export interface ILegalPerson extends ICustomer {
  fantasy_name: string
  cnpj: string
  social_reason: string
  type: string
  size: string
  representatives: string
}

export type Customer = IPhysicalPerson | ILegalPerson
