import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { Representative } from '~/domains/representative/representative.entity'
import { RepresentativeService } from '~/domains/representative/representative.service'
import { IRepresentative } from '~/domains/representative/representative.types'
import { JwtAuthGuard } from '~/shared/guards/jwt-auth.guard'

@Controller('representatives')
export class RepresentativeController {
  constructor(private readonly representativeService: RepresentativeService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IRepresentative })
  @ApiResponse({ status: 200, type: IRepresentative })
  @Post()
  create(@Body() representative: IRepresentative): Promise<Representative> {
    return this.representativeService.create(representative)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IRepresentative })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Representative> {
    return this.representativeService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [IRepresentative] })
  @Get()
  findAll(): Promise<Representative[]> {
    return this.representativeService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IRepresentative })
  @ApiResponse({ status: 200, type: IRepresentative })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRepresentative: IRepresentative
  ): Promise<IRepresentative> {
    return this.representativeService.update(id, updateRepresentative)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<Representative> {
    return this.representativeService.remove(id)
  }
}
