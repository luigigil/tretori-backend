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
} from '@nestjs/common'
import { IAccess } from './access.types'
import { AccessService } from './access.service'
import { Access } from './access.entity'
import { UpdateResult } from 'typeorm'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @ApiBody({ type: IAccess })
  @ApiResponse({ status: 201, type: IAccess })
  @Post()
  @HttpCode(201)
  create(@Body() access: IAccess): Promise<Access> {
    return this.accessService.create(access)
  }

  @ApiResponse({ status: 200, type: IAccess })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Access> {
    return this.accessService.findOne(id)
  }

  @ApiBody({ type: IAccess })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IAccess })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccess: IAccess
  ): Promise<UpdateResult> {
    return this.accessService.update(id, updateAccess)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<void> {
    return this.accessService.remove(id)
  }
}
