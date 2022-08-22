import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IPhysicalPerson } from '../common/customer.types'
import { PhysicalPerson } from './physical-person.entity'

@Injectable()
export class PhysicalPersonService {
  constructor(
    @InjectRepository(PhysicalPerson)
    private readonly legalPersonRepository: Repository<PhysicalPerson>
  ) {}

  findAll(): Promise<PhysicalPerson[]> {
    return this.legalPersonRepository.find()
  }

  findOne(id: number): Promise<PhysicalPerson> {
    return this.legalPersonRepository.findOneBy({ id })
  }

  create(legalPerson: IPhysicalPerson): Promise<PhysicalPerson> {
    return this.legalPersonRepository.save(legalPerson)
  }

  async update(id: number, legalPerson: IPhysicalPerson): Promise<void> {
    await this.legalPersonRepository.update(id, legalPerson)
  }

  async remove(id: number): Promise<void> {
    await this.legalPersonRepository.delete(id)
  }
}
