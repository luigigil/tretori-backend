import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contract } from '../core/contract/contract.entity'
import { InsuranceController } from './insurance.controller'
import { Insurance } from './insurance.entity'
import { InsuranceService } from './insurance.service'

@Module({
  imports: [TypeOrmModule.forFeature([Insurance, Contract])],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}
