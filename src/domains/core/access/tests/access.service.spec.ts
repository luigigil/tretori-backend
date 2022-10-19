import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Access } from 'domains/core/access/access.entity'
import { AccessService } from 'domains/core/access/access.service'
import { oneAccessFixture, updateAccessFixture } from 'domains/core/access/tests/access.fixtures'
import { Repository } from 'typeorm'

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
            update: jest.fn().mockResolvedValue(updateAccessFixture),
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
    it('should throw NotFoundException', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null)
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', () => {
      jest.spyOn(service, 'remove')
      expect(service.remove(1)).resolves.not.toThrow()
    })
    it('Should throw a not found exception', () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('Access not found'))
      expect(service.remove(1)).rejects.toThrow(new NotFoundException('Access not found'))
    })
  })

  describe('update()', () => {
    it('should call update with the passed value', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(updateAccessFixture)
      jest.spyOn(repository, 'save').mockResolvedValueOnce(updateAccessFixture)
      await expect(service.update(1, oneAccessFixture)).resolves.toEqual(updateAccessFixture)
    })
  })
})
