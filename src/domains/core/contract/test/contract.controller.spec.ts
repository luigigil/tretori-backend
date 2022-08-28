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
import { Access } from '../../access/access.entity'
import { AccessFixture } from '../../access/access.fixtures'
import { AccessService } from '../../access/access.service'
import { Move } from '../../move/move.entity'
import { MoveService } from '../../move/move.service'
import { moveArrayFixture, oneMoveFixture } from '../../move/test/fixtures'
import { Renew } from '../../renew/renew.entity'
import { RenewService } from '../../renew/renew.service'
import { oneRenewFixture, renewArrayFixture } from '../../renew/test/fixtures'
import { ContractController } from '../contract.controller'
import {
  IAccessToContractResponse,
  ILegalPersonToContractResponse,
  IMoveResponse,
  IPhysicalPersonToContractResponse,
  IRenewResponse,
} from '../contract.relations'
import { ContractService } from '../contract.service'
import { IContract } from '../contract.types'
import { contractArrayFixture, oneContractFixture, oneMoveContract } from './fixtures'

describe('ContractController', () => {
  let contractController: ContractController
  let contractService: ContractService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContractController],
      providers: [
        AccessService,
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
              .mockImplementation((id: number) =>
                Promise.resolve({ id, ...oneContractFixture, move: [] })
              ),
            remove: jest.fn(),
            update: jest.fn(),
            moveContract: jest.fn().mockResolvedValue(oneContractFixture),
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
        {
          provide: getRepositoryToken(Access),
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ id: 1, ...AccessFixture })),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...AccessFixture })),
            remove: jest.fn(),
            update: jest.fn(),
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
        move: [],
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

  describe('Contract relations', () => {
    it('should add an access to contract', async () => {
      expect(await contractController.addAccess(1, 1)).toEqual({
        access: { id: 1, ...AccessFixture },
        contract: { id: 1, access: { id: 1, ...AccessFixture }, ...oneContractFixture, move: [] },
      })
    })

    it('should add a legalPerson to contract', async () => {
      expect(await contractController.addLegalPerson(1, 1)).toEqual({
        legalPerson: { ...oneLegalPersonFixture },
        contract: {
          id: 1,
          ...oneContractFixture,
          legal_person: { ...oneLegalPersonFixture },
          move: [],
        },
      })
    })

    it('should add a move to contract', async () => {
      const moveContractResp = await contractController.moveContract({ ...oneMoveFixture }, 1)
      const expected = {
        move: { ...oneMoveFixture },
        contract: {
          id: 1,
          ...oneContractFixture,
          move: [{ ...oneMoveFixture }],
        },
      }
      expect(moveContractResp).toEqual({ ...expected })
    })

    // it('should add a physicalPerson to contract', () => {
    //   expect(contractController.addPhysicalPerson(1, 1)).resolves.toEqual({
    //     ...IPhysicalPersonToContractResponse,
    //   })
    // })

    // it('should add a renew to contract', () => {
    //   expect(contractController.renewContract({ ...oneRenewFixture }, 1)).resolves.toEqual({
    //     ...IRenewResponse,
    //   })
    // })
  })
})