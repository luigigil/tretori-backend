import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { renewArrayFixture, oneRenewFixture } from './fixtures'
import { RenewService } from '../renew.service'
import { Renew } from '../renew.entity'

describe('RenewService', () => {
  let service: RenewService
  let repository: Repository<Renew>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RenewService,
        {
          provide: getRepositoryToken(Renew),
          useValue: {
            find: jest.fn().mockResolvedValue(renewArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneRenewFixture),
            save: jest.fn().mockResolvedValue(oneRenewFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<RenewService>(RenewService)
    repository = module.get<Repository<Renew>>(getRepositoryToken(Renew))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a renew', () => {
      expect(service.create(oneRenewFixture)).resolves.toEqual(oneRenewFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of renew', async () => {
      const physicalPersonArray = await service.findAll()
      expect(physicalPersonArray).toEqual(renewArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single renew', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      expect(service.findOne(1)).resolves.toEqual(oneRenewFixture)
      expect(repoSpy).toBeCalledWith({ id: 1 })
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete')
      const retVal = await service.remove(2)
      expect(removeSpy).toBeCalledWith(2)
      expect(retVal).toBeUndefined()
    })
  })
})
