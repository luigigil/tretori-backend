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
import { JwtAuthGuard } from '~/shared/guards/jwt-auth.guard'
import { User } from '~/shared/users/user.entity'
import { IUser } from '~/shared/users/user.types'
import { UsersService } from '~/shared/users/users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: IUser })
  @ApiResponse({ status: 201, type: IUser })
  @Post()
  @HttpCode(201)
  create(@Body() user: IUser): Promise<IUser> {
    return this.usersService.create(user)
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: [IUser] })
  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: IUser })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    return this.usersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IUser })
  @ApiResponse({ status: 200 })
  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() user: IUser): Promise<User> {
    return this.usersService.update(id, user)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id)
  }
}
