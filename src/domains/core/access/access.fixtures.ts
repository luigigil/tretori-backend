import { IAccess } from './access.types'

export const AccessFixture: IAccess = {
  id: 1,
  system: 'system',
  login_tret: 'login_tret',
  pass_tret: 'pass_tret',
  login_client: 'login_client',
  pass_client: 'pass_client',
  contract: '1',
}

export const UpdateAccessFixture: IAccess = {
  id: 1,
  system: 'system2',
  login_tret: 'login_tret2',
  pass_tret: 'pass_tret2',
  login_client: 'login_client2',
  pass_client: 'pass_client2',
  contract: '1',
}

export const CreateAccessFixture: IAccess = {
  system: 'system',
  login_tret: 'login_tret',
  pass_tret: 'pass_tret',
  login_client: 'login_client',
  pass_client: 'pass_client',
  contract: '1',
}
