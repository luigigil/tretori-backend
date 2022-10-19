import { IUser } from '~/shared/users/user.types'

export const usersFixture: IUser[] = [
  {
    id: 7,
    username: 'dev-user@tretori.com',
    password: '$2a$12$QP8IlcvEoYOIqt/mLK.jXOOSIDSXa3aGpj2K7J3JX/ByueGdhZ.wW',
    roles: 'user',
  },
  {
    id: 8,
    username: 'dev-admin@tretori.com',
    password: '$2a$12$QP8IlcvEoYOIqt/mLK.jXOOSIDSXa3aGpj2K7J3JX/ByueGdhZ.wW',
    roles: 'admin',
  },
]

export const userFixture: IUser = {
  id: 8,
  username: 'dev-admin@tretori.com',
  password: '$2a$12$QP8IlcvEoYOIqt/mLK.jXOOSIDSXa3aGpj2K7J3JX/ByueGdhZ.wW',
  roles: 'admin',
}
