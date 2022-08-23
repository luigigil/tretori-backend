import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { legalPersonArrayFixture, oneLegalPersonFixture } from './fixtures'
import { LegalPersonService } from './legal-person.service'
import { LegalPerson } from './legal-person.entity'

describe('LegalPersonService', () => {
  let service: LegalPersonService
  let repository: Repository<LegalPerson>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LegalPersonService,
        {
          provide: getRepositoryToken(LegalPerson),
          useValue: {
            find: jest.fn().mockResolvedValue(legalPersonArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneLegalPersonFixture),
            save: jest.fn().mockResolvedValue(oneLegalPersonFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<LegalPersonService>(LegalPersonService)
    repository = module.get<Repository<LegalPerson>>(getRepositoryToken(LegalPerson))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a legal person', () => {
      expect(service.create(oneLegalPersonFixture)).resolves.toEqual(oneLegalPersonFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of legal person', async () => {
      const legalPersonArray = await service.findAll()
      expect(legalPersonArray).toEqual(legalPersonArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single legal person', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      expect(service.findOne(1)).resolves.toEqual(oneLegalPersonFixture)
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
