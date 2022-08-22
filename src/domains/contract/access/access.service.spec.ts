import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { accessFixture, accessUpdateFixture } from './fixtures'
import { AccessService } from './access.service'
import { Access } from './access.entity'
import { NotFoundException } from '@nestjs/common'

describe('AccessService', () => {
  let service: AccessService
  let repository: Repository<Access>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessService,
        {
          provide: getRepositoryToken(Access),
          useValue: {
            findOne: jest
              .fn()
              .mockResolvedValueOnce(accessFixture)
              .mockRejectedValueOnce(new NotFoundException('Access not found')),
            create: jest.fn().mockResolvedValue(accessFixture),
            remove: jest.fn().mockResolvedValue(DeleteResult),
            update: jest.fn().mockResolvedValue(accessUpdateFixture),
          },
        },
      ],
    }).compile()

    service = module.get<AccessService>(AccessService)
    repository = module.get<Repository<Access>>(getRepositoryToken(Access))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a access', async () => {
      await expect(service.create(accessFixture)).resolves.toEqual(accessFixture)
    })
  })

  describe('findOne()', () => {
    it('should return access', async () => {
      await expect(service.findOne(1)).resolves.toBe(accessFixture)
    })
    it('should throw NotFoundException', async () => {
      service.findOne(1)
      await expect(service.findOne(1)).rejects.toThrow(new NotFoundException('Access not found'))
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      await expect(service.remove(1)).resolves.toBe(DeleteResult)
    })
  })

  describe('update()', () => {
    it('should call update with the passed value', async () => {
      await expect(service.update(1, accessUpdateFixture)).resolves.toBe(accessUpdateFixture)
    })
  })
})
