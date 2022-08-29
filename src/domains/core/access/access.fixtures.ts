import { IAccess } from './access.types'

export const oneAccessFixture: IAccess = {
  id: 1,
  system: 'system',
  login_tret: 'login_tret',
  pass_tret: 'pass_tret',
  login_client: 'login_client',
  pass_client: 'pass_client',
}

export const updateAccessFixture: IAccess = {
  system: 'system2',
  login_tret: 'login_tret2',
  pass_tret: 'pass_tret2',
  login_client: 'login_client2',
  pass_client: 'pass_client2',
}

export const createAccessFixture: IAccess = {
  system: 'system',
  login_tret: 'login_tret',
  pass_tret: 'pass_tret',
  login_client: 'login_client',
  pass_client: 'pass_client',
}
