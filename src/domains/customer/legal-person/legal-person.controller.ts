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
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { LegalPersonService } from 'domains/customer/legal-person/legal-person.service'
import { ILegalPerson } from 'domains/customer/legal-person/legal-person.types'
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard'

@Controller('legal-person')
export class LegalPersonController {
  constructor(private readonly legalPersonService: LegalPersonService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ILegalPerson })
  @ApiResponse({ status: 200, type: ILegalPerson })
  @Post()
  create(@Body() legalPerson: ILegalPerson): Promise<ILegalPerson> {
    return this.legalPersonService.create(legalPerson)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [ILegalPerson] })
  @Get()
  findAll(): Promise<ILegalPerson[]> {
    return this.legalPersonService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: ILegalPerson })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ILegalPerson> {
    return this.legalPersonService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: ILegalPerson })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() legalPerson: ILegalPerson): Promise<ILegalPerson> {
    return this.legalPersonService.update(id, legalPerson)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.legalPersonService.remove(id)
  }
}
