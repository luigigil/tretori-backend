import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from 'domains/product/product.controller'
import { ProductService } from 'domains/product/product.service'
import { IProduct } from 'domains/product/product.types'
import { oneProductFixture, productArrayFixture } from 'domains/product/tests/fixtures'

describe('ProductController', () => {
  let productController: ProductController
  let productService: ProductService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: ProductService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((product: IProduct) => Promise.resolve({ id: 1, ...product })),
            findAll: jest.fn().mockResolvedValue(productArrayFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...oneProductFixture })),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    productController = app.get<ProductController>(ProductController)
    productService = app.get<ProductService>(ProductService)
  })

  it('should be defined', () => {
    expect(productController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a product', async () => {
      productController.create(oneProductFixture)
      await expect(productController.create(oneProductFixture)).resolves.toEqual({
        id: 1,
        ...oneProductFixture,
      })
      expect(productService.create).toHaveBeenCalledWith(oneProductFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all product', () => {
      productController.findAll()
      expect(productService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a product', async () => {
      await expect(productController.findOne(3)).resolves.toEqual({
        id: 3,
        ...oneProductFixture,
      })
      expect(productService.findOne).toHaveBeenCalled()
    })
  })

  describe('update()', () => {
    it('should update a product', async () => {
      jest.spyOn(productService, 'update').mockResolvedValue(oneProductFixture)
      await expect(
        productController.update(oneProductFixture.id, oneProductFixture)
      ).resolves.toEqual(oneProductFixture)
      expect(productService.update).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove the product', () => {
      productController.remove(2)
      expect(productService.remove).toHaveBeenCalled()
    })
  })
})
