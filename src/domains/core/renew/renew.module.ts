import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RenewController } from './renew.controller'
import { Renew } from './renew.entity'
import { RenewService } from './renew.service'

@Module({
  imports: [TypeOrmModule.forFeature([Renew])],
  controllers: [RenewController],
  providers: [RenewService],
})
export class RenewModule {}
