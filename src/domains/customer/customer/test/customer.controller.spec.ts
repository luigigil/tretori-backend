import { Test, TestingModule } from '@nestjs/testing'
import { CustomerController } from '../../customer/customer.controller'
import { CustomerService } from '../../customer/customer.service'
import { ICustomer } from '../../customer/customer.types'
import { customerFixture, customersFixture } from './fixtures'

describe('CustomerController', () => {
  let customerController: CustomerController
  let customerService: CustomerService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CustomerService,
        {
          provide: CustomerService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((customer: ICustomer) => Promise.resolve({ id: 1, ...customer })),
            findAll: jest.fn().mockResolvedValue(customersFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...customerFixture })),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    customerController = app.get<CustomerController>(CustomerController)
    customerService = app.get<CustomerService>(CustomerService)
  })

  it('should be defined', () => {
    expect(customerController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a customer', async () => {
      customerController.create(customerFixture)
      await expect(customerController.create(customerFixture)).resolves.toEqual({
        id: 1,
        ...customerFixture,
      })
      expect(customerService.create).toHaveBeenCalledWith(customerFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all customer', () => {
      customerController.findAll()
      expect(customerService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a customer', async () => {
      await expect(customerController.findOne(3)).resolves.toEqual({
        id: 3,
        ...customerFixture,
      })
      expect(customerService.findOne).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove the customer', () => {
      customerController.remove(2)
      expect(customerService.remove).toHaveBeenCalled()
    })
  })
})
