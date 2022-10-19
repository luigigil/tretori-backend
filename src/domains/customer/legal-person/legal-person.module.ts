import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contract } from '~/domains/core/contract/contract.entity'
import { LegalPersonController } from '~/domains/customer/legal-person/legal-person.controller'
import { LegalPerson } from '~/domains/customer/legal-person/legal-person.entity'
import { LegalPersonService } from '~/domains/customer/legal-person/legal-person.service'

@Module({
  imports: [TypeOrmModule.forFeature([LegalPerson, Contract])],
  controllers: [LegalPersonController],
  providers: [LegalPersonService],
})
export class LegalPersonModule {}
