import { Test, TestingModule } from '@nestjs/testing'
import { LegalPersonService } from '../../../customer/legal-person/legal-person.service'
import { PhysicalPersonService } from '../../../customer/physical-person/physical-person.service'
import { AccessService } from '../../access/access.service'
import { MoveService } from '../../move/move.service'
import { RenewService } from '../../renew/renew.service'
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
        renew: [],
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
