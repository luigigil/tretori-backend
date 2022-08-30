import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { IRepresentative } from './representative.types'
import { RepresentativeService } from './representative.service'
import { Representative } from './representative.entity'
import { UpdateResult } from 'typeorm'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('representative')
export class RepresentativeController {
  constructor(private readonly representativeService: RepresentativeService) {}

  @ApiBody({ type: IRepresentative })
  @ApiResponse({ status: 200, type: IRepresentative })
  @Post()
  create(@Body() representative: IRepresentative): Promise<Representative> {
    return this.representativeService.create(representative)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IRepresentative })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Representative> {
    return this.representativeService.findOne(id)
  }

  @ApiResponse({ status: 200, type: [IRepresentative] })
  @Get()
  findAll(): Promise<Representative[]> {
    return this.representativeService.findAll()
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IRepresentative })
  @ApiResponse({ status: 200, type: IRepresentative })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRepresentative: IRepresentative
  ): Promise<UpdateResult> {
    return this.representativeService.update(id, updateRepresentative)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<Representative> {
    return this.representativeService.remove(id)
  }
}
