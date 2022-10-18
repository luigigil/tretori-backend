import { Test, TestingModule } from '@nestjs/testing'
import { IUser } from '../../users/user.types'
import { UsersController } from '../../users/users.controller'
import { UsersService } from '../../users/users.service'
import { userFixture, usersFixture } from './fixtures'

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((users: IUser) => Promise.resolve({ id: 1, ...users })),
            findAll: jest.fn().mockResolvedValue(userFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...usersFixture })),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    usersController = app.get<UsersController>(UsersController)
    usersService = app.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(usersController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a user', async () => {
      await expect(usersController.create(userFixture)).resolves.toEqual({
        id: 1,
        ...userFixture,
      })
      expect(usersService.create).toHaveBeenCalledWith(userFixture)
    })
  })

  describe('update()', () => {
    it('should update a user', async () => {
      const user = {
        id: 1,
        ...userFixture,
      }
      jest.spyOn(usersService, 'update').mockResolvedValue(user)
      await expect(usersController.update(1, userFixture)).resolves.toEqual(user)
    })
  })

  describe('findAll()', () => {
    it('should find all users', () => {
      usersController.findAll()
      expect(usersService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a user', async () => {
      await expect(usersController.findOne(3)).resolves.toEqual({
        id: 3,
        ...usersFixture,
      })
      expect(usersService.findOne).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove(2)
      expect(usersService.remove).toHaveBeenCalled()
    })
  })
})
