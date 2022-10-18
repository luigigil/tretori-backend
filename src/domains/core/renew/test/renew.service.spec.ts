import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Renew } from '../renew.entity'
import { RenewService } from '../renew.service'
import { oneRenewFixture, renewArrayFixture } from './fixtures'

describe('RenewService', () => {
  let service: RenewService

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
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a renew', async () => {
      await expect(service.create(oneRenewFixture)).resolves.toEqual(oneRenewFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of renew', async () => {
      const physicalPersonArray = await service.findAll()
      expect(physicalPersonArray).toEqual(renewArrayFixture)
    })
  })
})
