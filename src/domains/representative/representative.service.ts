import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { IRepresentative } from './representative.types'
import { Representative } from './representative.entity'

@Injectable()
export class RepresentativeService {
  constructor(
    @InjectRepository(Representative)
    private readonly representativeRepository: Repository<Representative>
  ) {}

  async findOne(id: number): Promise<Representative> {
    const representative = await this.representativeRepository.findOne({ where: { id } })
    if (!representative) throw new NotFoundException('Representative not found')
    return representative
  }

  async findAll(): Promise<Representative[]> {
    const representative = await this.representativeRepository.find({ take: 10 })
    if (representative.length == 0) throw new NotFoundException('Representative not found')
    return representative
  }

  async create(representative: IRepresentative): Promise<Representative> {
    return this.representativeRepository.save(representative)
  }

  async update(id: number, updateRepresentative: IRepresentative): Promise<UpdateResult> {
    const representative = await this.findOne(id)
    return this.representativeRepository.update(representative, updateRepresentative)
  }

  async remove(id: number): Promise<Representative> {
    const representative = await this.findOne(id)
    return this.representativeRepository.remove(representative)
  }
}
