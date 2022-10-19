import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductController } from '~/domains/product/product.controller'
import { Product } from '~/domains/product/product.entity'
import { ProductService } from '~/domains/product/product.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
