import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { userFixture, usersFixture } from 'shared/users/tests/fixtures'
import { User } from 'shared/users/user.entity'
import { UsersService } from 'shared/users/users.service'
import { Repository } from 'typeorm'

describe('UsersService', () => {
  let service: UsersService
  let repository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(usersFixture),
            findOneBy: jest.fn().mockResolvedValue(userFixture),
            save: jest.fn().mockResolvedValue(userFixture),
            remove: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a user', async () => {
      await expect(service.create(userFixture)).resolves.toEqual(userFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of user', async () => {
      const customers = await service.findAll()
      expect(customers).toEqual(usersFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single user', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      await expect(service.findOne(userFixture.id)).resolves.toEqual(userFixture)
      expect(repoSpy).toHaveBeenCalledWith({ id: userFixture.id })
    })
    it('should throw an error if user is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null)
      await expect(service.findOne(userFixture.id)).rejects.toThrow(NotFoundException)
    })
  })

  describe('findOneByUsername()', () => {
    it('should get a single user by username', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      await expect(service.findOneByUsername(userFixture.username)).resolves.toEqual(userFixture)
      expect(repoSpy).toHaveBeenCalledWith({ username: userFixture.username })
    })

    it('should throw an error if user is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null)
      await expect(service.findOneByUsername(userFixture.username)).rejects.toThrow(
        NotFoundException
      )
    })
  })

  describe('update()', () => {
    it('should update an user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(userFixture as User)
      await expect(service.update(userFixture.id, userFixture)).resolves.toEqual(userFixture)
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete')
      const retVal = await service.remove(userFixture.id)
      expect(removeSpy).toHaveBeenCalledWith(userFixture.id)
      expect(retVal).toBeUndefined()
    })
  })
})
