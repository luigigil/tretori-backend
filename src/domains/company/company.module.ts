import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LegalPerson } from 'domains/customer/legal-person/legal-person.entity'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'

@Module({
  imports: [TypeOrmModule.forFeature([LegalPerson])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModyle {}
