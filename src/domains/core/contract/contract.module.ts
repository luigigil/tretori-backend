import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LegalPerson } from '../../customer/legal-person/legal-person.entity'
import { LegalPersonService } from '../../customer/legal-person/legal-person.service'
import { PhysicalPerson } from '../../customer/physical-person/physical-person.entity'
import { PhysicalPersonService } from '../../customer/physical-person/physical-person.service'
import { Insurance } from '../../insurance/insurance.entity'
import { InsuranceService } from '../../insurance/insurance.service'
import { Access } from '../access/access.entity'
import { AccessService } from '../access/access.service'
import { Move } from '../move/move.entity'
import { MoveService } from '../move/move.service'
import { Renew } from '../renew/renew.entity'
import { RenewService } from '../renew/renew.service'
import { ContractController } from './contract.controller'
import { Contract } from './contract.entity'
import { ContractService } from './contract.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contract,
      Move,
      Renew,
      PhysicalPerson,
      LegalPerson,
      Access,
      Insurance,
    ]),
  ],
  controllers: [ContractController],
  providers: [
    ContractService,
    MoveService,
    RenewService,
    LegalPersonService,
    PhysicalPersonService,
    AccessService,
    InsuranceService,
  ],
})
export class ContractModule {}
