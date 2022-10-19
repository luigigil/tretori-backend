import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contract } from 'domains/core/contract/contract.entity'
import { InsuranceController } from 'domains/insurance/insurance.controller'
import { Insurance } from 'domains/insurance/insurance.entity'
import { InsuranceService } from 'domains/insurance/insurance.service'

@Module({
  imports: [TypeOrmModule.forFeature([Insurance, Contract])],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}
