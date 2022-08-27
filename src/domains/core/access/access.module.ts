import { Module } from '@nestjs/common'
import { AccessService } from './access.service'
import { AccessController } from './access.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessRepository } from './access.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AccessRepository])],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
