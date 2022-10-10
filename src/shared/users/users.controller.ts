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
} from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { IUser } from './user.types'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: IUser })
  @ApiResponse({ status: 201, type: IUser })
  @Post()
  @HttpCode(201)
  create(@Body() user: IUser): Promise<IUser> {
    return this.usersService.create(user)
  }

  @ApiResponse({ status: 200, type: [IUser] })
  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll()
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IUser })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    return this.usersService.findOne(id)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IUser })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  update(@Body() user: IUser, @Param('id') id: number): Promise<void> {
    return this.usersService.update(id, user)
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id)
  }
}
