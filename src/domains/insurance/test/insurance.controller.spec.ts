import { Test, TestingModule } from '@nestjs/testing'
import { InsuranceController } from '../insurance.controller'
import { InsuranceService } from '../insurance.service'
import { IInsurance } from '../insurance.types'
import { insuranceArrayFixture, oneInsuranceFixture } from './fixtures/index'

describe('InsuranceController', () => {
  let insuranceController: InsuranceController
  let insuranceService: InsuranceService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InsuranceController],
      providers: [
        InsuranceService,
        {
          provide: InsuranceService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((Insurance: IInsurance) =>
                Promise.resolve({ id: 1, ...Insurance })
              ),
            findAll: jest.fn().mockResolvedValue(insuranceArrayFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...oneInsuranceFixture })),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    insuranceController = app.get<InsuranceController>(InsuranceController)
    insuranceService = app.get<InsuranceService>(InsuranceService)
  })

  it('should be defined', () => {
    expect(InsuranceController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a insurance', () => {
      insuranceController.create(oneInsuranceFixture)
      expect(insuranceController.create(oneInsuranceFixture)).resolves.toEqual({
        id: 1,
        ...oneInsuranceFixture,
      })
      expect(insuranceService.create).toHaveBeenCalledWith(oneInsuranceFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all insurances ', () => {
      insuranceController.findAll()
      expect(insuranceService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find one insurance', () => {
      expect(insuranceController.findOne(3)).resolves.toEqual({ id: 3, ...oneInsuranceFixture })
      expect(insuranceService.findOne).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove the insurance', () => {
      insuranceController.remove(2)
      expect(insuranceService.remove).toHaveBeenCalled()
    })
  })
})
