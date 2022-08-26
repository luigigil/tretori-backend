import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IProduct } from './product.types'
import { ProductService } from './product.service'
import { Product } from './product.entity'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() physicalPerson: IProduct): Promise<Product> {
    return this.productService.create(physicalPerson)
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id)
  }
}
