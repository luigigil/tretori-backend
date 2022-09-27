import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IPhysicalPerson } from '../common/customer.types'
import { PhysicalPerson } from './physical-person.entity'

@Injectable()
export class PhysicalPersonService {
  constructor(
    @InjectRepository(PhysicalPerson)
    private readonly physicalPersonService: Repository<PhysicalPerson>
  ) {}

  findAll(): Promise<PhysicalPerson[]> {
    return this.physicalPersonService.find()
  }

  findOne(id: number): Promise<PhysicalPerson> {
    const legalPerson = this.physicalPersonService.findOneBy({ id })
    if (!legalPerson) {
      throw new NotFoundException('Legal Person not found')
    }
    return legalPerson
  }

  create(legalPerson: IPhysicalPerson): Promise<PhysicalPerson> {
    return this.physicalPersonService.save(legalPerson)
  }

  async update(id: number, legalPerson: IPhysicalPerson): Promise<void> {
    const oldLegalPerson = await this.findOne(id)
    await this.physicalPersonService.update(oldLegalPerson, legalPerson)
  }

  async remove(id: number): Promise<void> {
    const legalPerson = await this.findOne(id)
    try {
      await this.physicalPersonService.remove(legalPerson)
    } catch (e) {
      throw new NotFoundException('Error removing Legal Person')
    }
  }
}
