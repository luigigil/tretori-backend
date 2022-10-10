import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { LegalPerson } from 'domains/customer/legal-person/legal-person.entity'
import { Repository } from 'typeorm'
import { CompanyService } from '../company.service'
import { oneCompanyArray, oneCompanyFixture } from './fixtures/company.fixtures'

describe('Company Service', () => {
  let service: CompanyService
  let repository: Repository<LegalPerson>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(LegalPerson),
          useValue: {
            find: jest.fn().mockResolvedValue(oneCompanyArray),
            findOne: jest.fn().mockResolvedValue(oneCompanyFixture),
            save: jest.fn().mockResolvedValue(oneCompanyFixture),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<CompanyService>(CompanyService)
    repository = module.get<Repository<LegalPerson>>(getRepositoryToken(LegalPerson))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a company', async () => {
      await expect(service.create(oneCompanyFixture)).resolves.toEqual(oneCompanyFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of companies', async () => {
      const companiesArray = await service.findAll()
      expect(companiesArray).toEqual(oneCompanyArray)
    })
  })

  describe('findOne()', () => {
    it('should get a company', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne')
      await expect(service.findOne(1)).resolves.toEqual(oneCompanyFixture)
      expect(repoSpy).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should delete a company', async () => {
      const removeSpy = jest.spyOn(repository, 'remove')
      const retVal = await service.remove(1)
      expect(removeSpy).toHaveBeenCalled()
      expect(retVal).toBeUndefined()
    })
  })
})
