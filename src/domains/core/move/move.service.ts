import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Move } from '~/domains/core/move/move.entity'
import { IMove } from '~/domains/core/move/move.types'
import { Repository } from 'typeorm'

@Injectable()
export class MoveService {
  constructor(
    @InjectRepository(Move)
    private readonly moveRepository: Repository<Move>
  ) {}

  findAll(): Promise<Move[]> {
    return this.moveRepository.find()
  }

  create(move: IMove): Promise<Move> {
    return this.moveRepository.save(move)
  }
}
