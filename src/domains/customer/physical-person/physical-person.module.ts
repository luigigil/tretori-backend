import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contract } from '~/domains/core/contract/contract.entity'
import { PhysicalPersonController } from '~/domains/customer/physical-person/physical-person.controller'
import { PhysicalPerson } from '~/domains/customer/physical-person/physical-person.entity'
import { PhysicalPersonService } from '~/domains/customer/physical-person/physical-person.service'

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalPerson, Contract])],
  controllers: [PhysicalPersonController],
  providers: [PhysicalPersonService],
})
export class PhysicalPersonModule {}
