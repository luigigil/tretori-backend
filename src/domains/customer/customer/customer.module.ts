import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contract } from '../../core/contract/contract.entity'
import { CustomerController } from './customer.controller'
import { Customer } from './customer.entity'
import { CustomerService } from './customer.service'

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Contract])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
