import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contract } from 'src/domains/core/contract/contract.entity'
import { LegalPersonController } from './legal-person.controller'
import { LegalPerson } from './legal-person.entity'
import { LegalPersonService } from './legal-person.service'

@Module({
  imports: [TypeOrmModule.forFeature([LegalPerson, Contract])],
  controllers: [LegalPersonController],
  providers: [LegalPersonService],
})
export class LegalPersonModule {}
