import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LegalPerson } from 'src/domains/customer/legal-person/legal-person.entity'
import { LegalPersonService } from 'src/domains/customer/legal-person/legal-person.service'
import { PhysicalPerson } from 'src/domains/customer/physical-person/physical-person.entity'
import { PhysicalPersonService } from 'src/domains/customer/physical-person/physical-person.service'
import { Move } from '../move/move.entity'
import { MoveService } from '../move/move.service'
import { Renew } from '../renew/renew.entity'
import { RenewService } from '../renew/renew.service'
import { ContractController } from './contract.controller'
import { Contract } from './contract.entity'
import { ContractService } from './contract.service'

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Move, Renew, PhysicalPerson, LegalPerson])],
  controllers: [ContractController],
  providers: [
    ContractService,
    MoveService,
    RenewService,
    LegalPersonService,
    PhysicalPersonService,
  ],
})
export class ContractModule {}
