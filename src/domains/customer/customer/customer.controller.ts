import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { CustomerService } from '~/domains/customer/customer/customer.service'
import { ICustomer } from '~/domains/customer/customer/customer.types'
import { JwtAuthGuard } from '~/shared/guards/jwt-auth.guard'

@Controller('customers')
export class CustomerController {
  constructor(private readonly customersService: CustomerService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ICustomer })
  @ApiResponse({ status: 200, type: ICustomer })
  @Post()
  create(@Body() customer: ICustomer): Promise<ICustomer> {
    return this.customersService.create(customer)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [ICustomer] })
  @Get()
  findAll(): Promise<ICustomer[]> {
    return this.customersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: ICustomer })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ICustomer> {
    return this.customersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: ICustomer })
  @ApiResponse({ status: 200, type: ICustomer })
  @Put(':id')
  update(@Param('id') id: number, @Body() customer: ICustomer): Promise<ICustomer> {
    return this.customersService.update(id, customer)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.customersService.remove(id)
  }
}
