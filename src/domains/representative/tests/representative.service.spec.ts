import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Representative } from 'domains/representative/representative.entity'
import { RepresentativeService } from 'domains/representative/representative.service'
import {
  RepresentativeFixture,
  RepresentativeFixtureArray,
  UpdateRepresentativeFixture,
} from 'domains/representative/tests/fixtures'
import { Repository } from 'typeorm'

describe('RepresentativeService', () => {
  let service: RepresentativeService
  let repository: Repository<Representative>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepresentativeService,
        {
          provide: getRepositoryToken(Representative),
          useValue: {
            find: jest.fn().mockImplementation(() => Promise.resolve(RepresentativeFixtureArray)),
            findOne: jest
              .fn()
              .mockResolvedValue(RepresentativeFixture)
              .mockRejectedValue(new NotFoundException('Representative not found')),
            findAll: jest.fn().mockReturnValue([RepresentativeFixtureArray]),
            save: jest.fn().mockResolvedValue(RepresentativeFixture),
            remove: jest.fn().mockResolvedValue(RepresentativeFixture),
            update: jest.fn().mockResolvedValue(UpdateRepresentativeFixture),
          },
        },
      ],
    }).compile()

    service = module.get<RepresentativeService>(RepresentativeService)
    repository = module.get<Repository<Representative>>(getRepositoryToken(Representative))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a Representative', () => {
      expect(service.create(RepresentativeFixture)).resolves.toEqual(RepresentativeFixture)
    })
  })

  describe('findOne()', () => {
    it('should return Representative', () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(RepresentativeFixture as Representative)
      expect(service.findOne(1)).resolves.toBe(RepresentativeFixture)
    })
    it('should throw NotFoundException', () => {
      jest.spyOn(repository, 'findOne').mockReturnValueOnce(null)
      expect(service.findOne(1)).rejects.toThrow(new NotFoundException('Representative not found'))
    })
  })

  describe('findAll()', () => {
    it('should return an array of Representatives', () => {
      expect(service.findAll()).resolves.toEqual(RepresentativeFixtureArray)
    })
    it('it should throw a new not found exception', () => {
      jest.spyOn(repository, 'find').mockReturnValueOnce([] as unknown as Promise<Representative[]>)
      expect(service.findAll()).rejects.toThrow(new NotFoundException('Representatives not found'))
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(RepresentativeFixture as Representative)
      expect(service.remove(1)).resolves.toBe(RepresentativeFixture)
    })
  })

  describe('update()', () => {
    it('should call update with the passed value', () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(RepresentativeFixture as Representative)
      expect(service.update(1, UpdateRepresentativeFixture)).resolves.toEqual(RepresentativeFixture)
    })
    it('should throw NotFoundException', () => {
      jest.spyOn(repository, 'findOne').mockReturnValueOnce(null)
      expect(service.update(1, UpdateRepresentativeFixture)).rejects.toThrow(
        new NotFoundException('Representative not found')
      )
    })
  })
})
