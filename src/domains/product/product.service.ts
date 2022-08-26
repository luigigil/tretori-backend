import { Injectable } from '@nestjs/common'
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

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id })
  }

  create(product: IProduct): Promise<Product> {
    return this.productRepository.save(product)
  }

  async update(id: number, product: IProduct): Promise<void> {
    await this.productRepository.update(id, product)
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id)
  }
}
