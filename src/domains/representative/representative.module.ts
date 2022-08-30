import { Module } from '@nestjs/common'
import { RepresentativeService } from './representative.service'
import { RepresentativeController } from './representative.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RepresentativeRepository } from './representative.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RepresentativeRepository])],
  controllers: [RepresentativeController],
  providers: [RepresentativeService],
})
export class RepresentativeModule {}
