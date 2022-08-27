import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IProduct } from './product.types'
import { ProductService } from './product.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBody({ type: IProduct })
  @ApiResponse({ status: 200, type: IProduct })
  @Post()
  create(@Body() physicalPerson: IProduct): Promise<IProduct> {
    return this.productService.create(physicalPerson)
  }

  @ApiResponse({ status: 200, type: [IProduct] })
  @Get()
  findAll(): Promise<IProduct[]> {
    return this.productService.findAll()
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IProduct })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IProduct> {
    return this.productService.findOne(id)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id)
  }
}
