import { Module } from '@nestjs/common'
import { AccessService } from './representative.service'
import { AccessController } from './representative.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessRepository } from './representative.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AccessRepository])],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
