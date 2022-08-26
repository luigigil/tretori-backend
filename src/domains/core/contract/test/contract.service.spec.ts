import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { contractArrayFixture, oneContractFixture } from './fixtures'
import { ContractService } from '../contract.service'
import { Contract } from '../contract.entity'

describe('ContractService', () => {
  let service: ContractService
  let repository: Repository<Contract>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractService,
        {
          provide: getRepositoryToken(Contract),
          useValue: {
            find: jest.fn().mockResolvedValue(contractArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneContractFixture),
            save: jest.fn().mockResolvedValue(oneContractFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ContractService>(ContractService)
    repository = module.get<Repository<Contract>>(getRepositoryToken(Contract))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a contract', () => {
      expect(service.create(oneContractFixture)).resolves.toEqual(oneContractFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of contract', async () => {
      const physicalPersonArray = await service.findAll()
      expect(physicalPersonArray).toEqual(contractArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single contract', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      expect(service.findOne(1)).resolves.toEqual(oneContractFixture)
      expect(repoSpy).toBeCalledWith({ id: 1 })
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const recontractSpy = jest.spyOn(repository, 'delete')
      const retVal = await service.remove(2)
      expect(recontractSpy).toBeCalledWith(2)
      expect(retVal).toBeUndefined()
    })
  })
})
