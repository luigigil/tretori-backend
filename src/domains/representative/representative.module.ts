import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RepresentativeController } from '~/domains/representative/representative.controller'
import { Representative } from '~/domains/representative/representative.entity'
import { RepresentativeService } from '~/domains/representative/representative.service'

@Module({
  imports: [TypeOrmModule.forFeature([Representative])],
  controllers: [RepresentativeController],
  providers: [RepresentativeService],
})
export class RepresentativeModule {}
