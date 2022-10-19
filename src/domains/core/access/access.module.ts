import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessController } from '~/domains/core/access/access.controller'
import { Access } from '~/domains/core/access/access.entity'
import { AccessService } from '~/domains/core/access/access.service'

@Module({
  imports: [TypeOrmModule.forFeature([Access])],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
