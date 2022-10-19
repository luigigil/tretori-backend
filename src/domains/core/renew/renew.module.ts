import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RenewController } from 'domains/core/renew/renew.controller'
import { Renew } from 'domains/core/renew/renew.entity'
import { RenewService } from 'domains/core/renew/renew.service'

@Module({
  imports: [TypeOrmModule.forFeature([Renew])],
  controllers: [RenewController],
  providers: [RenewService],
})
export class RenewModule {}
