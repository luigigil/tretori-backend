import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard'
import { CompanyService } from './company.service'
import { ConsultCompany, ICompany } from './company.types'

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ICompany })
  @ApiResponse({ status: 201, type: ICompany })
  @Post()
  @HttpCode(201)
  create(@Body() company: ICompany): Promise<ICompany> {
    return this.companyService.create(company)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: ICompany })
  @Get()
  findAll(): Promise<ConsultCompany[]> {
    return this.companyService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: ICompany })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ICompany> {
    return this.companyService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ICompany })
  @ApiResponse({ status: 200, type: ICompany })
  @Put(':id')
  update(@Body() company: ICompany, @Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.companyService.update(id, company)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200 })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.companyService.remove(id)
  }
}
