import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contract } from '../../core/contract/contract.entity'
import { PhysicalPersonController } from './physical-person.controller'
import { PhysicalPerson } from './physical-person.entity'
import { PhysicalPersonService } from './physical-person.service'

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalPerson, Contract])],
  controllers: [PhysicalPersonController],
  providers: [PhysicalPersonService],
})
export class PhysicalPersonModule {}
