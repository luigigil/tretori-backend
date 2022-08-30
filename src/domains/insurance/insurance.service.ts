import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Insurance } from './insurance.entity'
import { IInsurance } from './insurance.types'

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private readonly InsuranceRepository: Repository<Insurance>
  ) {}

  findAll(): Promise<Insurance[]> {
    return this.InsuranceRepository.find()
  }

  async findOne(id: number): Promise<Insurance> {
    const insurance = await this.InsuranceRepository.findOneBy({ id })
    if (!insurance) throw new NotFoundException('Insurance not found')
    return insurance
  }

  create(Insurance: IInsurance): Promise<Insurance> {
    return this.InsuranceRepository.save(Insurance)
  }

  async update(id: number, Insurance: IInsurance): Promise<void> {
    const insurance = await this.findOne(id)
    await this.InsuranceRepository.update(id, Insurance)
  }

  async remove(id: number): Promise<void> {
    await this.InsuranceRepository.delete(id)
  }
}
