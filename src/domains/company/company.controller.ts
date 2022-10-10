import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { CompanyService } from './company.service'
import { ICompany } from './company.types'

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiBody({ type: ICompany })
  @ApiResponse({ status: 201, type: ICompany })
  @Post()
  @HttpCode(201)
  create(@Body() company: ICompany): Promise<ICompany> {
    return this.companyService.create(company)
  }
}
