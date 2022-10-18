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

  async findOne(id: number): Promise<PhysicalPerson> {
    const legalPerson = await this.physicalPersonRepository.findOneBy({ id })
    if (!legalPerson) {
      throw new NotFoundException('Legal Person not found')
    }
    return legalPerson
  }

  create(legalPerson: IPhysicalPerson): Promise<PhysicalPerson> {
    return this.physicalPersonRepository.save(legalPerson)
  }

  async update(id: number, legalPerson: IPhysicalPerson): Promise<IPhysicalPerson> {
    const oldLegalPerson = await this.findOne(id)
    Object.assign(oldLegalPerson, legalPerson)
    return this.physicalPersonRepository.save(oldLegalPerson)
  }

  async remove(id: number): Promise<void> {
    const legalPerson = await this.findOne(id)
    await this.physicalPersonRepository.remove(legalPerson)
  }
}
