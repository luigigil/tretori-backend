import { Test, TestingModule } from '@nestjs/testing'
import { ILegalPerson } from '../../customer/customer.types'
import { legalPersonArrayFixture, oneLegalPersonFixture } from './fixtures'
import { LegalPersonController } from '../legal-person.controller'
import { LegalPersonService } from '../legal-person.service'

describe('LegalPersonController', () => {
  let legalPersonController: LegalPersonController
  let legalPersonService: LegalPersonService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LegalPersonController],
      providers: [
        LegalPersonService,
        {
          provide: LegalPersonService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((legalPerson: ILegalPerson) =>
                Promise.resolve({ id: 1, ...legalPerson })
              ),
            findAll: jest.fn().mockResolvedValue(legalPersonArrayFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve({ id, ...oneLegalPersonFixture })
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    legalPersonController = app.get<LegalPersonController>(LegalPersonController)
    legalPersonService = app.get<LegalPersonService>(LegalPersonService)
  })

  it('should be defined', () => {
    expect(legalPersonController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a legal person', async () => {
      legalPersonController.create(oneLegalPersonFixture)
      await expect(legalPersonController.create(oneLegalPersonFixture)).resolves.toEqual({
        id: 1,
        ...oneLegalPersonFixture,
      })
      expect(legalPersonService.create).toHaveBeenCalledWith(oneLegalPersonFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all legal person', () => {
      legalPersonController.findAll()
      expect(legalPersonService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a legal person', async () => {
      await expect(legalPersonController.findOne(3)).resolves.toEqual({
        id: 3,
        ...oneLegalPersonFixture,
      })
      expect(legalPersonService.findOne).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove the legal person', () => {
      legalPersonController.remove(2)
      expect(legalPersonService.remove).toHaveBeenCalled()
    })
  })
})
