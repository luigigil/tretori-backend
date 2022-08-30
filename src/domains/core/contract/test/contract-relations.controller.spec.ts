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
import { oneAccessFixture } from '../../access/access.fixtures'
import { AccessService } from '../../access/access.service'
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
                Promise.resolve({ id, ...oneContractFixture, move: [], renew: [] })
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
              .mockImplementation(() => Promise.resolve({ id: 1, ...oneAccessFixture })),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...oneAccessFixture })),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    contractController = app.get<ContractController>(ContractController)
  })

  it('should be defined', () => {
    expect(contractController).toBeDefined()
  })

  describe('Contract relations', () => {
    it('should add an access to contract', async () => {
      expect(await contractController.addAccess(1, 1)).toEqual({
        access: { id: 1, ...oneAccessFixture },
        contract: {
          id: 1,
          access: { id: 1, ...oneAccessFixture },
          ...oneContractFixture,
          move: [],
          renew: [],
        },
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
          renew: [],
        },
      })
    })

    it('should add a move to contract', async () => {
      expect(contractController.moveContract({ ...oneMoveFixture }, 1)).resolves.toEqual({
        move: { ...oneMoveFixture },
        contract: {
          id: 1,
          ...oneContractFixture,
          move: [{ ...oneMoveFixture }],
          renew: [],
        },
      })
    })

    it('should add a physicalPerson to contract', () => {
      expect(contractController.addPhysicalPerson(1, 1)).resolves.toEqual({
        physicalPerson: { ...onePhysicalPersonFixture },
        contract: {
          id: 1,
          ...oneContractFixture,
          physical_person: { ...onePhysicalPersonFixture },
          move: [],
          renew: [],
        },
      })
    })

    it('should add a renew to contract', () => {
      expect(contractController.renewContract({ ...oneRenewFixture }, 1)).resolves.toEqual({
        renew: { ...oneRenewFixture },
        contract: {
          id: 1,
          ...oneContractFixture,
          move: [],
          renew: [{ ...oneRenewFixture }],
        },
      })
    })
  })
})
