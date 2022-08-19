import { Module } from '@nestjs/common'
import { LegalPersonController } from './legal-person.controller'
import { LegalPersonService } from './legal-person.service'

@Module({
  imports: [],
  controllers: [LegalPersonController],
  providers: [LegalPersonService],
})
export class LegalPersonModule {}
