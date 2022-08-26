import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IMove } from './move.types'
import { Move } from './move.entity'

@Injectable()
export class MoveService {
  constructor(
    @InjectRepository(Move)
    private readonly moveRepository: Repository<Move>
  ) {}

  findAll(): Promise<Move[]> {
    return this.moveRepository.find()
  }

  findOne(id: number): Promise<Move> {
    return this.moveRepository.findOneBy({ id })
  }

  create(move: IMove): Promise<Move> {
    return this.moveRepository.save(move)
  }

  async update(id: number, move: IMove): Promise<void> {
    await this.moveRepository.update(id, move)
  }

  async remove(id: number): Promise<void> {
    await this.moveRepository.delete(id)
  }
}
