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
import { IMove } from './move.types'
import { MoveService } from './move.service'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard'

@Controller('move')
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

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IMove })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IMove> {
    return this.moveService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IMove })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  update(@Body() move: IMove, @Param('id') id: number): Promise<void> {
    return this.moveService.update(id, move)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.moveService.remove(id)
  }
}
