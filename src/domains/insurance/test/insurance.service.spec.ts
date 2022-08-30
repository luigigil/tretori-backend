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
    it('should successfully insert a legal person', () => {
      expect(service.create(oneInsuranceFixture)).resolves.toEqual(oneInsuranceFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of legal person', async () => {
      const InsuranceArray = await service.findAll()
      expect(InsuranceArray).toEqual(insuranceArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single legal person', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      expect(service.findOne(1)).resolves.toEqual(oneInsuranceFixture)
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
