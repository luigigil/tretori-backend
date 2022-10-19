import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from 'shared/auth/auth.service'
import { User } from 'shared/users/user.entity'
import { UsersService } from 'shared/users/users.service'

describe('AuthService', () => {
  let service: AuthService
  const userFixture = {
    id: 1,
    username: 'username',
    password: 'password',
    roles: 'role',
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          provide: UsersService,
          useValue: {
            findOneByUsername: jest
              .fn()
              .mockImplementation((): Promise<User> => Promise.resolve(userFixture)),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation((): string => 'token'),
          },
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('validateUser()', () => {
    it('should return a valid user when username and password match', async () => {
      const compareFn = jest.fn().mockImplementation((): Promise<boolean> => Promise.resolve(true))

      await expect(
        service.validateUser({
          username: userFixture.username,
          password: userFixture.password,
          compareFn,
        })
      ).resolves.toEqual(userFixture)
    })

    it('should return null when username and password does not match', async () => {
      const compareFn = jest.fn().mockImplementation((): Promise<boolean> => Promise.resolve(false))

      await expect(
        service.validateUser({ username: 'username', password: 'wrong pass', compareFn })
      ).resolves.toBeNull()
    })
  })

  describe('login()', () => {
    it('should return an object with the user and a signed token', async () => {
      await expect(service.login(userFixture)).resolves.toEqual({
        username: userFixture.username,
        id: userFixture.id,
        role: userFixture.roles,
        access_token: 'token',
      })
    })
  })
})
