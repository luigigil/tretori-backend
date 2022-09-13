import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Move } from '../../move/move.entity'
import { MoveService } from '../../move/move.service'
import { moveArrayFixture, oneMoveFixture } from '../../move/test/fixtures'
import { Renew } from '../../renew/renew.entity'
import { RenewService } from '../../renew/renew.service'
import { oneRenewFixture, renewArrayFixture } from '../../renew/test/fixtures'
import { Contract } from '../contract.entity'
import { ContractService } from '../contract.service'
import { contractArrayFixture, oneContractFixture } from './fixtures'

describe('ContractService', () => {
  let service: ContractService
  let repository: Repository<Contract>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractService,
        MoveService,
        RenewService,
        {
          provide: getRepositoryToken(Contract),
          useValue: {
            find: jest.fn().mockResolvedValue(contractArrayFixture),
            findOne: jest.fn().mockResolvedValue(oneContractFixture),
            save: jest.fn().mockResolvedValue(oneContractFixture),
            remove: jest
              .fn()
              .mockResolvedValueOnce({ id: 1, ...oneContractFixture })
              .mockRejectedValueOnce(() => {
                throw new NotFoundException('Contract not found')
              }),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Move),
          useValue: {
            find: jest.fn().mockResolvedValue(moveArrayFixture),
            findOne: jest.fn().mockResolvedValue(oneMoveFixture),
            save: jest.fn().mockResolvedValue(oneMoveFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Renew),
          useValue: {
            find: jest.fn().mockResolvedValue(renewArrayFixture),
            findOne: jest.fn().mockResolvedValue(oneRenewFixture),
            save: jest.fn().mockResolvedValue(oneRenewFixture),
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
    it('should successfully insert a contract', async () => {
      await expect(service.create(oneContractFixture)).resolves.toEqual(oneContractFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of contract', async () => {
      const physicalPersonArray = await service.findAll()
      expect(physicalPersonArray).toEqual(contractArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single contract', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne')
      await expect(service.findOne(1)).resolves.toEqual(oneContractFixture)
      expect(repoSpy).toHaveBeenCalledWith({
        relations: {
          legal_person: true,
          move: true,
          physical_person: true,
          renew: true,
        },
        where: {
          id: 1,
        },
      })
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const recontractSpy = jest.spyOn(repository, 'delete')
      await expect(service.remove(1)).resolves.toBeDefined()
      expect(recontractSpy).toBeDefined()
    })
    it('should throw NotFoundException if no contract is found', async () => {
      await service.remove(1)
      await expect(service.remove(123)).rejects.toThrow(new NotFoundException('Contract not found'))
    })
  })
})
