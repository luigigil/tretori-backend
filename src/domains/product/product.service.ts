import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity'
import { IProduct } from './product.types'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find()
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return product
  }

  create(product: IProduct): Promise<Product> {
    return this.productRepository.save(product)
  }

  async update(id: number, newProduct: IProduct): Promise<IProduct> {
    const product = await this.findOne(id)
    Object.assign(product, newProduct)
    return this.productRepository.save(product)
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.productRepository.delete(id)
  }
}
