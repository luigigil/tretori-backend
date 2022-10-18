import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Move } from './move.entity'
import { IMove } from './move.types'

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
