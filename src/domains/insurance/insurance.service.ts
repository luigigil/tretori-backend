import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { Insurance } from './insurance.entity'
import { IInsurance } from './insurance.types'

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private readonly insuranceRepository: Repository<Insurance>
  ) {}

  findAll(): Promise<Insurance[]> {
    return this.insuranceRepository.find()
  }

  async findOne(id: number): Promise<Insurance> {
    const insurance = await this.insuranceRepository.findOneBy({ id })
    if (!insurance) throw new NotFoundException('Insurance not found')
    return insurance
  }

  create(Insurance: IInsurance): Promise<Insurance> {
    return this.insuranceRepository.save(Insurance)
  }

  async update(id: number, newInsurance: IInsurance): Promise<UpdateResult> {
    const oldInsurance = await this.findOne(id)
    return this.insuranceRepository.update(oldInsurance, newInsurance)
  }

  async remove(id: number): Promise<void> {
    const insurance = await this.findOne(id)
    await this.insuranceRepository.delete(id)
  }
}
