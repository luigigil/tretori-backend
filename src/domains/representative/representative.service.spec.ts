import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { RepresentativeFixture } from './fixtures/representative.types'
import { RepresentativeService } from './representative.service'
import { RepresentativeRepository } from './representative.entity'
import { NotFoundException } from '@nestjs/common'

describe('RepresentativeService', () => {
  let service: RepresentativeService
  let repository: Repository<RepresentativeRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepresentativeService,
        {
          provide: getRepositoryToken(RepresentativeRepository),
          useValue: {
            findOne: jest
              .fn()
              .mockResolvedValueOnce(AccessFixture)
              .mockRejectedValueOnce(new NotFoundException('Access not found')),
            save: jest.fn().mockResolvedValue(AccessFixture),
            remove: jest.fn().mockResolvedValue(DeleteResult),
            update: jest.fn().mockResolvedValue(UpdateAccessFixture),
          },
        },
      ],
    }).compile()

    service = module.get<AccessService>(AccessService)
    repository = module.get<Repository<AccessRepository>>(getRepositoryToken(AccessRepository))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a access', async () => {
      await expect(service.create(AccessFixture)).resolves.toEqual(AccessFixture)
    })
  })

  describe('findOne()', () => {
    it('should return access', async () => {
      await expect(service.findOne(1)).resolves.toBe(AccessFixture)
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
      await expect(service.update(1, UpdateAccessFixture)).resolves.toBe(UpdateAccessFixture)
    })
  })
})
