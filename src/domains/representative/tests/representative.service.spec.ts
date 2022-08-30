import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DeleteResult } from 'typeorm'
import {
  RepresentativeFixture,
  RepresentativeFixtureArray,
  UpdateRepresentativeFixture,
} from '../fixtures/representative.fixtures'
import { RepresentativeRepository } from '../representative.entity'
import { RepresentativeService } from '../representative.service'

describe('RepresentativeService', () => {
  let service: RepresentativeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepresentativeService,
        {
          provide: getRepositoryToken(RepresentativeRepository),
          useValue: {
            find: jest.fn().mockImplementation(() => Promise.resolve(RepresentativeFixtureArray)),
            findOne: jest
              .fn()
              .mockResolvedValueOnce(RepresentativeFixture)
              .mockRejectedValueOnce(new NotFoundException('Representative not found')),
            findAll: jest.fn().mockReturnValue([RepresentativeFixtureArray]),
            save: jest.fn().mockResolvedValue(RepresentativeFixture),
            remove: jest.fn().mockResolvedValue(DeleteResult),
            update: jest.fn().mockResolvedValue(UpdateRepresentativeFixture),
          },
        },
      ],
    }).compile()

    service = module.get<RepresentativeService>(RepresentativeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a Representative', async () => {
      await expect(service.create(RepresentativeFixture)).resolves.toEqual(RepresentativeFixture)
    })
  })

  describe('findOne()', () => {
    it('should return Representative', async () => {
      await expect(service.findOne(1)).resolves.toBe(RepresentativeFixture)
    })
    it('should throw NotFoundException', async () => {
      service.findOne(1)
      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Representative not found')
      )
    })
  })

  describe('findAll()', () => {
    it('should return an array of Representatives', async () => {
      await expect(service.findAll()).resolves.toEqual(RepresentativeFixtureArray)
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      await expect(service.remove(1)).resolves.toBe(DeleteResult)
    })
  })

  describe('update()', () => {
    it('should call update with the passed value', async () => {
      await expect(service.update(1, UpdateRepresentativeFixture)).resolves.toBe(
        UpdateRepresentativeFixture
      )
    })
  })
})
