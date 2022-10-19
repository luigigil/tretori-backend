import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contract } from '~/domains/core/contract/contract.entity'
import { CustomerController } from '~/domains/customer/customer/customer.controller'
import { Customer } from '~/domains/customer/customer/customer.entity'
import { CustomerService } from '~/domains/customer/customer/customer.service'

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Contract])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
