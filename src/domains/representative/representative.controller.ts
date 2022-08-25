import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { IRepresentative } from './representative.types'
import { RepresentativeService } from './representative.service'
import { RepresentativeRepository } from './representative.entity'
import { UpdateResult } from 'typeorm'

@Controller('representative')
export class RepresentativeController {
  constructor(private readonly representativeService: RepresentativeService) {}

  @Post()
  create(@Body() representative: IRepresentative): Promise<RepresentativeRepository> {
    return this.representativeService.create(representative)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RepresentativeRepository> {
    return this.representativeService.findOne(id)
  }

  @Get()
  findAll(): Promise<RepresentativeRepository[]> {
    return this.representativeService.findAll()
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRepresentative: IRepresentative
  ): Promise<UpdateResult> {
    return this.representativeService.update(id, updateRepresentative)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<RepresentativeRepository> {
    return this.representativeService.remove(id)
  }
}
