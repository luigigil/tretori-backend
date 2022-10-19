import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Product } from '~/domains/product/product.entity'
import { ProductService } from '~/domains/product/product.service'
import { oneProductFixture, productArrayFixture } from '~/domains/product/tests/fixtures'
import { Repository } from 'typeorm'

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

  describe('update()', () => {
    it('should update a product', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(oneProductFixture as Product)
      await expect(service.update(1, oneProductFixture)).resolves.toEqual(oneProductFixture)
    })
  })

  describe('findOne()', () => {
    it('should get a single product', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      await expect(service.findOne(1)).resolves.toEqual(oneProductFixture)
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 })
    })

    it('should throw an error if product is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null)
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException)
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
