import { Module } from '@nestjs/common'
import { AccessService } from './access.service'
import { AccessController } from './access.controller'

@Module({
  imports: [],
  controllers: [AccessController],
  providers: [AccessService],
})
export class LegalPersonModule {}
