import { Module } from '@nestjs/common'
import { RepresentativeService } from './representative.service'
import { RepresentativeController } from './representative.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Representative } from './representative.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Representative])],
  controllers: [RepresentativeController],
  providers: [RepresentativeService],
})
export class RepresentativeModule {}
