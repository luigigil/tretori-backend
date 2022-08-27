import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { LegalPerson } from '../../../customer/legal-person/legal-person.entity'
import { LegalPersonService } from '../../../customer/legal-person/legal-person.service'
import {
  legalPersonArrayFixture,
  oneLegalPersonFixture,
} from '../../../customer/legal-person/test/fixtures'
import { PhysicalPerson } from '../../../customer/physical-person/physical-person.entity'
import { PhysicalPersonService } from '../../../customer/physical-person/physical-person.service'
import {
  onePhysicalPersonFixture,
  physicalPersonArrayFixture,
} from '../../../customer/physical-person/test/fixtures'
import { Move } from '../../move/move.entity'
import { MoveService } from '../../move/move.service'
import { moveArrayFixture, oneMoveFixture } from '../../move/test/fixtures'
import { Renew } from '../../renew/renew.entity'
import { RenewService } from '../../renew/renew.service'
import { oneRenewFixture, renewArrayFixture } from '../../renew/test/fixtures'
import { ContractController } from '../contract.controller'
import { ContractService } from '../contract.service'
import { IContract } from '../contract.types'
import { contractArrayFixture, oneContractFixture } from './fixtures'

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
        PhysicalPersonService,
        LegalPersonService,
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
        {
          provide: getRepositoryToken(PhysicalPerson),
          useValue: {
            find: jest.fn().mockResolvedValue(physicalPersonArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(onePhysicalPersonFixture),
            save: jest.fn().mockResolvedValue(onePhysicalPersonFixture),
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
