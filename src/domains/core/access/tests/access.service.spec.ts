import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { Access } from '../access.entity'
import { oneAccessFixture, updateAccessFixture } from '../access.fixtures'
import { AccessService } from '../access.service'

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
            findOne: jest.fn().mockResolvedValue(oneAccessFixture),
            save: jest.fn().mockResolvedValue(oneAccessFixture),
            remove: jest.fn(),
            update: jest
              .fn()
              .mockResolvedValue(updateAccessFixture)
              .mockRejectedValue(new NotFoundException('Access not found')),
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
      expect(service.findOne(1)).resolves.toBe(oneAccessFixture)
      expect(repoSpy).toBeCalledWith({ where: { id: 1 } })
    })
    it('should throw NotFoundException', () => {
      jest.spyOn(repository, 'findOne').mockReturnValueOnce(null)
      expect(service.findOne(1)).rejects.toThrow(new NotFoundException('Access not found'))
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', () => {
      const removeSpy = jest.spyOn(service, 'remove')
      expect(service.remove(1)).resolves.toBeUndefined()
      expect(removeSpy).toBeDefined()
    })
    it('Should throw a not found exception', () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('Access not found'))
      expect(service.remove(1)).rejects.toThrow(new NotFoundException('Access not found'))
    })
  })

  describe('update()', () => {
    it('should call update with the passed value', () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(new UpdateResult())
      expect(service.update(1, updateAccessFixture)).resolves.toBeInstanceOf(UpdateResult)
    })
    it('Should throw a not found exception', () => {
      jest.spyOn(repository, 'findOne').mockReturnValueOnce(null)
      expect(service.update(1, updateAccessFixture)).rejects.toThrow(
        new NotFoundException('Access not found')
      )
    })
  })
})
