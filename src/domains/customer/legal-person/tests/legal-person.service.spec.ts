import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { LegalPerson } from 'domains/customer/legal-person/legal-person.entity'
import { LegalPersonService } from 'domains/customer/legal-person/legal-person.service'
import {
  legalPersonArrayFixture,
  oneLegalPersonFixture,
} from 'domains/customer/legal-person/tests/fixtures'
import { Repository } from 'typeorm'

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
            findOneBy: jest.fn(),
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
    it('should successfully insert a legal person', async () => {
      await expect(service.create(oneLegalPersonFixture)).resolves.toEqual(oneLegalPersonFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of legal person', async () => {
      const legalPersonArray = await service.findAll()
      expect(legalPersonArray).toEqual(legalPersonArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single legal person', async () => {
      jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValueOnce(oneLegalPersonFixture as LegalPerson)
      await expect(service.findOne(1)).resolves.toEqual(oneLegalPersonFixture)
    })
    it('should throw an error if no legal person is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null)
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update()', () => {
    it('should update a legal person', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(oneLegalPersonFixture as LegalPerson)
      await expect(service.update(1, oneLegalPersonFixture)).resolves.toEqual(oneLegalPersonFixture)
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
