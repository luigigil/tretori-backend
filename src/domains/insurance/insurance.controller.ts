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
import { InsuranceService } from 'domains/insurance/insurance.service'
import { IInsurance } from 'domains/insurance/insurance.types'
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard'

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IInsurance })
  @ApiResponse({ status: 201, type: IInsurance })
  @Post()
  @HttpCode(201)
  create(@Body() insurance: IInsurance): Promise<IInsurance> {
    return this.insuranceService.create(insurance)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [IInsurance] })
  @Get()
  findAll(): Promise<IInsurance[]> {
    return this.insuranceService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IInsurance })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IInsurance> {
    return this.insuranceService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IInsurance })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() insurance: IInsurance): Promise<IInsurance> {
    return this.insuranceService.update(id, insurance)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<void> {
    return this.insuranceService.remove(id)
  }
}
