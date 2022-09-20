import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Insurance } from '../insurance.entity'
import { InsuranceService } from '../insurance.service'
import { insuranceArrayFixture, oneInsuranceFixture } from './fixtures/index'

describe('InsuranceService', () => {
  let insuranceService: InsuranceService
  let insuranceRepository: Repository<Insurance>

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
            remove: jest
              .fn()
              .mockResolvedValueOnce({ id: 1, ...oneInsuranceFixture })
              .mockRejectedValueOnce(() => {
                throw new NotFoundException('Insurance not found')
              }),
          },
        },
      ],
    }).compile()

    insuranceService = module.get<InsuranceService>(InsuranceService)
    insuranceRepository = module.get<Repository<Insurance>>(getRepositoryToken(Insurance))
  })

  it('should be defined', () => {
    expect(insuranceService).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a insurance', async () => {
      await expect(insuranceService.create(oneInsuranceFixture)).resolves.toEqual(
        oneInsuranceFixture
      )
    })
  })

  describe('findAll()', () => {
    it('should return an array of insurance', async () => {
      const insuranceArray = await insuranceService.findAll()
      expect(insuranceArray).toEqual(insuranceArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single insurance', async () => {
      const repoSpy = jest.spyOn(insuranceRepository, 'findOneBy')
      await expect(insuranceService.findOne(1)).resolves.toEqual(oneInsuranceFixture)
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 })
    })
    it('should throw NotFoundException if no insurance is found', async () => {
      const repoSpy = jest.spyOn(insuranceRepository, 'findOneBy')
      repoSpy.mockResolvedValue(null)
      await expect(insuranceService.findOne(1)).rejects.toThrow(
        new NotFoundException('Insurance not found')
      )
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(insuranceRepository, 'remove')
      await expect(insuranceService.remove(2)).resolves.toBeUndefined()
      expect(removeSpy).toBeDefined()
    })
    it('should throw NotFoundException if no insurance is found', async () => {
      await insuranceService.remove(1)
      await expect(insuranceService.remove(99)).rejects.toThrow(
        new NotFoundException('Insurance not found')
      )
    })
  })
})
