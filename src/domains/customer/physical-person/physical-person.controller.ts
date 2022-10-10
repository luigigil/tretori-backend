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
import { IPhysicalPerson } from '../common/customer.types'
import { PhysicalPersonService } from './physical-person.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'

@Controller('physical-person')
export class PhysicalPersonController {
  constructor(private readonly physicalPersonService: PhysicalPersonService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IPhysicalPerson })
  @ApiResponse({ status: 201, type: IPhysicalPerson })
  @Post()
  @HttpCode(201)
  create(@Body() physicalPerson: IPhysicalPerson): Promise<IPhysicalPerson> {
    return this.physicalPersonService.create(physicalPerson)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [IPhysicalPerson] })
  @Get()
  findAll(): Promise<IPhysicalPerson[]> {
    return this.physicalPersonService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IPhysicalPerson })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IPhysicalPerson> {
    return this.physicalPersonService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IPhysicalPerson })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  update(@Body() physicalPerson: IPhysicalPerson, @Param('id') id: number): Promise<void> {
    return this.physicalPersonService.update(id, physicalPerson)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<void> {
    return this.physicalPersonService.remove(id)
  }
}
