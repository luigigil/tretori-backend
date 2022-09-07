import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { productArrayFixture, oneProductFixture } from './fixtures'
import { ProductService } from '../product.service'
import { Product } from '../product.entity'

describe('ProductService', () => {
  let service: ProductService
  let repository: Repository<Product>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue(productArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneProductFixture),
            save: jest.fn().mockResolvedValue(oneProductFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ProductService>(ProductService)
    repository = module.get<Repository<Product>>(getRepositoryToken(Product))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a product', async () => {
      await expect(service.create(oneProductFixture)).resolves.toEqual(oneProductFixture)
    })
  })

  describe('findAll()', () => {
    it('should return an array of product', async () => {
      const productArray = await service.findAll()
      expect(productArray).toEqual(productArrayFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single product', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      await expect(service.findOne(1)).resolves.toEqual(oneProductFixture)
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 })
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
