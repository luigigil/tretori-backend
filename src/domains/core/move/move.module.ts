import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoveController } from 'domains/core/move/move.controller'
import { Move } from 'domains/core/move/move.entity'
import { MoveService } from 'domains/core/move/move.service'

@Module({
  imports: [TypeOrmModule.forFeature([Move])],
  controllers: [MoveController],
  providers: [MoveService],
})
export class MoveModule {}
