import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Insurance } from '../insurance.entity'
import { InsuranceService } from '../insurance.service'
import { insuranceArrayFixture, oneInsuranceFixture } from './fixtures/index'

describe('InsuranceService', () => {
  let service: InsuranceService
  let repository: Repository<Insurance>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsuranceService,
        {
          provide: getRepositoryToken(Insurance),
          useValue: {
            find: jest.fn().mockResolvedValue(insuranceArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneInsuranceFixture),
            save: jest.fn().mockResolvedValue(oneInsuranceFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<InsuranceService>(InsuranceService)
    repository = module.get<Repository<Insurance>>(getRepositoryToken(Insurance))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a insurance', async () => {
      await expect(service.create(oneInsuranceFixture)).resolves.toEqual(oneInsuranceFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of insurance', async () => {
      const insuranceArray = await service.findAll()
      expect(insuranceArray).toEqual(insuranceArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single insurance', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      await expect(service.findOne(1)).resolves.toEqual(oneInsuranceFixture)
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 })
    })
    it('should throw NotFoundException if no insurance is found', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      repoSpy.mockResolvedValue(null)
      await expect(service.findOne(1)).rejects.toThrow(new NotFoundException('Insurance not found'))
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete')
      const retVal = await service.remove(2)
      expect(removeSpy).toHaveBeenCalledWith(2)
      expect(retVal).toBeUndefined()
    })
  })
})
