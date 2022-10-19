import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'
import { MoveService } from '~/domains/core/move/move.service'
import { IMove } from '~/domains/core/move/move.types'
import { JwtAuthGuard } from '~/shared/guards/jwt-auth.guard'

@Controller('movements')
export class MoveController {
  constructor(private readonly moveService: MoveService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IMove })
  @ApiResponse({ status: 200, type: IMove })
  @Post()
  create(@Body() move: IMove): Promise<IMove> {
    return this.moveService.create(move)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [IMove] })
  @Get()
  findAll(): Promise<IMove[]> {
    return this.moveService.findAll()
  }
}
