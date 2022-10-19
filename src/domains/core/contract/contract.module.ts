import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Access } from '~/domains/core/access/access.entity'
import { AccessService } from '~/domains/core/access/access.service'
import { ContractController } from '~/domains/core/contract/contract.controller'
import { Contract } from '~/domains/core/contract/contract.entity'
import { ContractService } from '~/domains/core/contract/contract.service'
import { Move } from '~/domains/core/move/move.entity'
import { MoveService } from '~/domains/core/move/move.service'
import { Renew } from '~/domains/core/renew/renew.entity'
import { RenewService } from '~/domains/core/renew/renew.service'
import { Customer } from '~/domains/customer/customer/customer.entity'
import { LegalPerson } from '~/domains/customer/legal-person/legal-person.entity'
import { LegalPersonService } from '~/domains/customer/legal-person/legal-person.service'
import { PhysicalPerson } from '~/domains/customer/physical-person/physical-person.entity'
import { PhysicalPersonService } from '~/domains/customer/physical-person/physical-person.service'
import { Insurance } from '~/domains/insurance/insurance.entity'
import { InsuranceService } from '~/domains/insurance/insurance.service'

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
      Customer,
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
