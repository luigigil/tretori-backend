import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { oneAccessFixture, updateAccessFixture } from '../access.fixtures'
import { AccessService } from '../access.service'
import { Access } from '../access.entity'
import { NotFoundException } from '@nestjs/common'

describe('AccessService', () => {
  let service: AccessService
  let repository: Repository<Access>
  let deleted: DeleteResult = new DeleteResult()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessService,
        {
          provide: getRepositoryToken(Access),
          useValue: {
            findOne: jest
              .fn()
              .mockResolvedValueOnce(oneAccessFixture)
              .mockRejectedValueOnce(new NotFoundException('Access not found'))
              .mockResolvedValueOnce(oneAccessFixture)
              .mockRejectedValueOnce(new NotFoundException('Access not found'))
              .mockResolvedValueOnce(oneAccessFixture)
              .mockRejectedValueOnce(new NotFoundException('Access not found')),
            save: jest.fn().mockResolvedValue(oneAccessFixture),
            remove: jest
              .fn()
              .mockResolvedValueOnce(deleted)
              .mockRejectedValueOnce(new NotFoundException('Access not found')),
            update: jest
              .fn()
              .mockResolvedValueOnce(updateAccessFixture)
              .mockRejectedValueOnce(new NotFoundException('Access not found')),
          },
        },
      ],
    }).compile()

    service = module.get<AccessService>(AccessService)
    repository = module.get<Repository<Access>>(getRepositoryToken(Access))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a access', () => {
      expect(service.create(oneAccessFixture)).resolves.toEqual(oneAccessFixture)
    })
  })

  describe('findOne()', () => {
    it('should return access', () => {
      const repoSpy = jest.spyOn(repository, 'findOne')
      expect(service.findOne(1))
        .resolves.toBe(oneAccessFixture)
        .catch((e) => expect(e).toBeInstanceOf(NotFoundException))
      expect(repoSpy).toBeCalledWith({ where: { id: 1 } })
    })
    it('should throw NotFoundException', () => {
      service.findOne(1)
      expect(service.findOne(1)).rejects.toThrow(new NotFoundException('Access not found'))
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', () => {
      expect(service.remove(1)).resolves.toBe(deleted)
    })
    it('Should throw a not found exception', () => {
      service.remove(1)
      expect(service.remove(1)).rejects.toThrow(new NotFoundException('Access not found'))
    })
  })

  describe('update()', () => {
    it('should call update with the passed value', () => {
      expect(service.update(1, updateAccessFixture)).resolves.toBe(updateAccessFixture)
    })
    it('Should throw a not found exception', () => {
      service.update(1, updateAccessFixture)
      expect(service.update(1, updateAccessFixture)).rejects.toThrow(
        new NotFoundException('Access not found')
      )
    })
  })
})
