import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ILegalPerson } from '../common/client.types'
import { LegalPersonService } from './legal-person.service'
import { LegalPerson } from './legal_person.entity'

@Controller('clients/legal-person')
export class LegalPersonController {
  constructor(private readonly legalPersonService: LegalPersonService) {}

  @Post()
  create(@Body() legalPerson: ILegalPerson): Promise<LegalPerson> {
    return this.legalPersonService.create(legalPerson)
  }

  @Get()
  findAll(): Promise<LegalPerson[]> {
    return this.legalPersonService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<LegalPerson> {
    return this.legalPersonService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.legalPersonService.remove(id)
  }
}
