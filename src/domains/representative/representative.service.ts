import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Representative } from '~/domains/representative/representative.entity'
import { IRepresentative } from '~/domains/representative/representative.types'
import { Repository } from 'typeorm'

@Injectable()
export class RepresentativeService {
  constructor(
    @InjectRepository(Representative)
    private readonly representativeRepository: Repository<Representative>
  ) {}

  async findOne(id: number): Promise<Representative> {
    const representative = await this.representativeRepository.findOne({ where: { id } })
    if (!representative) {
      throw new NotFoundException('Representative not found')
    }
    return representative
  }

  async findAll(): Promise<Representative[]> {
    return this.representativeRepository.find({ take: 10 })
  }

  async create(representative: IRepresentative): Promise<Representative> {
    return this.representativeRepository.save(representative)
  }

  async update(id: number, updateRepresentative: IRepresentative): Promise<IRepresentative> {
    const representative = await this.findOne(id)
    Object.assign(representative, updateRepresentative)
    return this.representativeRepository.save(representative)
  }

  async remove(id: number): Promise<Representative> {
    const representative = await this.findOne(id)
    return this.representativeRepository.remove(representative)
  }
}
