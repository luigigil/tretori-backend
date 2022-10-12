import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PhysicalPerson } from './physical-person.entity'
import { IPhysicalPerson } from './physical-person.types'

@Injectable()
export class PhysicalPersonService {
  constructor(
    @InjectRepository(PhysicalPerson)
    private readonly physicalPersonRepository: Repository<PhysicalPerson>
  ) {}

  findAll(): Promise<PhysicalPerson[]> {
    return this.physicalPersonRepository.find()
  }

  findOne(id: number): Promise<PhysicalPerson> {
    const legalPerson = this.physicalPersonRepository.findOneBy({ id })
    if (!legalPerson) {
      throw new NotFoundException('Legal Person not found')
    }
    return legalPerson
  }

  create(legalPerson: IPhysicalPerson): Promise<PhysicalPerson> {
    return this.physicalPersonRepository.save(legalPerson)
  }

  async update(id: number, legalPerson: IPhysicalPerson): Promise<void> {
    const oldLegalPerson = await this.findOne(id)
    await this.physicalPersonRepository.update(oldLegalPerson, legalPerson)
  }

  async remove(id: number): Promise<void> {
    const legalPerson = await this.findOne(id)
    try {
      await this.physicalPersonRepository.remove(legalPerson)
    } catch (e) {
      throw new NotFoundException('Error removing Legal Person')
    }
  }
}
