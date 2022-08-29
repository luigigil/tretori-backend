import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from '../product.controller'
import { ProductService } from '../product.service'
import { oneProductFixture, productArrayFixture } from './fixtures'
import { IProduct } from '../product.types'

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
    it('should create a physical person', () => {
      productController.create(oneProductFixture)
      expect(productController.create(oneProductFixture)).resolves.toEqual({
        id: 1,
        ...oneProductFixture,
      })
      expect(productService.create).toHaveBeenCalledWith(oneProductFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all physical person ', () => {
      productController.findAll()
      expect(productService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a physical person', () => {
      expect(productController.findOne(3)).resolves.toEqual({
        id: 3,
        ...oneProductFixture,
      })
      expect(productService.findOne).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove the physical person', () => {
      productController.remove(2)
      expect(productService.remove).toHaveBeenCalled()
    })
  })
})
