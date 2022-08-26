import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { IMove } from './move.types'
import { MoveService } from './move.service'
import { Move } from './move.entity'

@Controller('move')
export class MoveController {
  constructor(private readonly moveService: MoveService) {}

  @Post()
  create(@Body() move: IMove): Promise<Move> {
    return this.moveService.create(move)
  }

  @Get()
  findAll(): Promise<Move[]> {
    return this.moveService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Move> {
    return this.moveService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.moveService.remove(id)
  }
}
