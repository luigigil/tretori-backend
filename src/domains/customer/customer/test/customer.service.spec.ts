import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { customersFixture, customerFixture } from './fixtures'
import { Customer } from '../../customer/customer.entity'
import { CustomerService } from '../customer.service'

describe('CustomerService', () => {
  let service: CustomerService
  let repository: Repository<Customer>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            find: jest.fn().mockResolvedValue(customersFixture),
            findOne: jest.fn().mockResolvedValue(customerFixture),
            save: jest.fn().mockResolvedValue(customerFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<CustomerService>(CustomerService)
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a customer', async () => {
      await expect(service.create(customerFixture)).resolves.toEqual(customerFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of customer', async () => {
      const customers = await service.findAll()
      expect(customers).toEqual(customersFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single customer', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne')
      await expect(service.findOne(customerFixture.id)).resolves.toEqual(customerFixture)
      expect(repoSpy).toHaveBeenCalledWith({
        where: { id: customerFixture.id },
        relations: {
          physical_person: true,
          legal_person: true,
        },
      })
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete')
      const retVal = await service.remove(2)
      expect(removeSpy).toHaveBeenCalledWith(2)
      expect(retVal).toBeUndefined()
    })
  })
})
