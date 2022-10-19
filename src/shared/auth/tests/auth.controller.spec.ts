import { Test, TestingModule } from '@nestjs/testing'
import { AuthController, ILoginResponse } from '~/shared/auth/auth.controller'
import { AuthService } from '~/shared/auth/auth.service'

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService
  const authLoginResponse = {
    id: 1,
    access_token: 'token',
    username: 'username',
    role: 'role',
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            login: jest
              .fn()
              .mockImplementation(
                (): Promise<ILoginResponse> => Promise.resolve(authLoginResponse)
              ),
          },
        },
      ],
    }).compile()

    authController = app.get<AuthController>(AuthController)
    authService = app.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  describe('login()', () => {
    it('should allow user to login', async () => {
      const loginPayload = {
        user: {
          id: 1,
          username: 'username',
          role: 'role',
        },
      }
      authController.login(loginPayload)
      await expect(authController.login(loginPayload)).resolves.toEqual(authLoginResponse)
      expect(authService.login).toHaveBeenCalledWith(loginPayload.user)
    })
  })
})
