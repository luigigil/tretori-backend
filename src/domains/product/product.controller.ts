import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { IProduct } from './product.types'
import { ProductService } from './product.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBody({ type: IProduct })
  @ApiResponse({ status: 200, type: IProduct })
  @Post()
  create(@Body() product: IProduct): Promise<IProduct> {
    return this.productService.create(product)
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
  @ApiBody({ type: IProduct })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  update(@Body() product: IProduct, @Param('id') id: number): Promise<void> {
    return this.productService.update(id, product)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id)
  }
}
