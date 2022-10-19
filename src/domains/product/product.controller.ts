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
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { ProductService } from 'domains/product/product.service'
import { IProduct } from 'domains/product/product.types'
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IProduct })
  @ApiResponse({ status: 200, type: IProduct })
  @Post()
  create(@Body() product: IProduct): Promise<IProduct> {
    return this.productService.create(product)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [IProduct] })
  @Get()
  findAll(): Promise<IProduct[]> {
    return this.productService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IProduct })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IProduct> {
    return this.productService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IProduct })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() product: IProduct): Promise<IProduct> {
    return this.productService.update(id, product)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id)
  }
}
