import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PhysicalPersonController } from './physical-person.controller'
import { PhysicalPerson } from './physical-person.entity'
import { PhysicalPersonService } from './physical-person.service'

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalPerson])],
  controllers: [PhysicalPersonController],
  providers: [PhysicalPersonService],
})
export class PhysicalPersonModule {}
