import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IMove } from './move.types'
import { MoveService } from './move.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('move')
export class MoveController {
  constructor(private readonly moveService: MoveService) {}

  @ApiBody({ type: IMove })
  @ApiResponse({ status: 200, type: IMove })
  @Post()
  create(@Body() move: IMove): Promise<IMove> {
    return this.moveService.create(move)
  }

  @ApiResponse({ status: 200, type: [IMove] })
  @Get()
  findAll(): Promise<IMove[]> {
    return this.moveService.findAll()
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IMove })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IMove> {
    return this.moveService.findOne(id)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.moveService.remove(id)
  }
}
