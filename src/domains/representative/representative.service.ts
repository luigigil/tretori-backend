import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { IRepresentative } from './representative.types'
import { RepresentativeRepository } from './representative.entity'

@Injectable()
export class RepresentativeService {
  constructor(
    @InjectRepository(RepresentativeRepository)
    private readonly representativeRepository: Repository<RepresentativeRepository>
  ) {}

  async findOne(id: number): Promise<RepresentativeRepository> {
    const representative = await this.representativeRepository.findOne({ where: { id } })
    if (!representative) throw new NotFoundException('Representative not found')
    return representative
  }

  async findAll(): Promise<RepresentativeRepository[]> {
    const representative = await this.representativeRepository.find({ take: 10 })
    if (representative.length) return representative
    throw new NotFoundException('Representative not found')
  }

  async create(representative: IRepresentative): Promise<RepresentativeRepository> {
    return this.representativeRepository.save(representative)
  }

  async update(id: number, updateRepresentative: IRepresentative): Promise<UpdateResult> {
    const representative = await this.findOne(id)
    return this.representativeRepository.update(representative, updateRepresentative)
  }

  async remove(id: number): Promise<RepresentativeRepository> {
    const representative = await this.findOne(id)
    return this.representativeRepository.remove(representative)
  }
}
