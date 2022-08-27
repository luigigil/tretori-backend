import { Test, TestingModule } from '@nestjs/testing'
import { IContract } from '../contract.types'
import { oneContractFixture, contractArrayFixture } from './fixtures'
import { ContractController } from '../contract.controller'
import { ContractService } from '../contract.service'
import { MoveService } from '../../move/move.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Move } from '../../move/move.entity'
import { moveArrayFixture, oneMoveFixture } from '../../move/test/fixtures'
import { RenewService } from '../../renew/renew.service'
import { Renew } from '../../renew/renew.entity'
import { oneRenewFixture, renewArrayFixture } from '../../renew/test/fixtures'

describe('ContractController', () => {
  let contractController: ContractController
  let contractService: ContractService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContractController],
      providers: [
        ContractService,
        MoveService,
        RenewService,
        {
          provide: ContractService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((contract: IContract) => Promise.resolve({ id: 1, ...contract })),
            findAll: jest.fn().mockResolvedValue(contractArrayFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...oneContractFixture })),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Move),
          useValue: {
            find: jest.fn().mockResolvedValue(moveArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneMoveFixture),
            save: jest.fn().mockResolvedValue(oneMoveFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
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

    contractController = app.get<ContractController>(ContractController)
    contractService = app.get<ContractService>(ContractService)
  })

  it('should be defined', () => {
    expect(contractController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a contract', () => {
      contractController.create(oneContractFixture)
      expect(contractController.create(oneContractFixture)).resolves.toEqual({
        id: 1,
        ...oneContractFixture,
      })
      expect(contractService.create).toHaveBeenCalledWith(oneContractFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all contract ', () => {
      contractController.findAll()
      expect(contractService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a contract', () => {
      expect(contractController.findOne(3)).resolves.toEqual({
        id: 3,
        ...oneContractFixture,
      })
      expect(contractService.findOne).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove the contract', () => {
      contractController.remove(2)
      expect(contractService.remove).toHaveBeenCalled()
    })
  })
})
