import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContractController } from './contract.controller'
import { Contract } from './contract.entity'
import { ContractService } from './contract.service'

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ConctractModule {}
