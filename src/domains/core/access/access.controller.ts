import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { Access } from 'domains/core/access/access.entity'
import { AccessService } from 'domains/core/access/access.service'
import { IAccess } from 'domains/core/access/access.types'
import { JwtAuthGuard } from 'shared/guards/jwt-auth.guard'

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IAccess })
  @ApiResponse({ status: 201, type: IAccess })
  @Post()
  @HttpCode(201)
  create(@Body() access: IAccess): Promise<Access> {
    return this.accessService.create(access)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: IAccess })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Access> {
    return this.accessService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IAccess })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IAccess })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAccess: IAccess): Promise<Access> {
    return this.accessService.update(id, updateAccess)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<void> {
    return this.accessService.remove(id)
  }
}
