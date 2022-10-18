import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Customer } from '../../customer/customer.entity'
import { CustomerService } from '../customer.service'
import { customerFixture, customersFixture } from './fixtures'

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
    it('should throw an error if no customer is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null)
      await expect(service.findOne(customerFixture.id)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update()', () => {
    it('should update a customer', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(customerFixture as Customer)
      await expect(service.update(customerFixture.id, customerFixture)).resolves.toEqual(
        customerFixture
      )
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
