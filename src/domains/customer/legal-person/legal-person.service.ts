import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LegalPerson } from 'domains/customer/legal-person/legal-person.entity'
import { ILegalPerson } from 'domains/customer/legal-person/legal-person.types'
import { Repository } from 'typeorm'

@Injectable()
export class LegalPersonService {
  constructor(
    @InjectRepository(LegalPerson)
    private readonly legalPersonRepository: Repository<LegalPerson>
  ) {}

  findAll(): Promise<LegalPerson[]> {
    return this.legalPersonRepository.find()
  }

  async findOne(id: number): Promise<LegalPerson> {
    const legalPerson = await this.legalPersonRepository.findOneBy({ id })
    if (!legalPerson) {
      throw new NotFoundException('Legal person not found')
    }
    return legalPerson
  }

  create(legalPerson: ILegalPerson): Promise<LegalPerson> {
    return this.legalPersonRepository.save(legalPerson)
  }

  async update(id: number, newLegalPerson: ILegalPerson): Promise<ILegalPerson> {
    const legalPerson = await this.findOne(id)
    Object.assign(legalPerson, newLegalPerson)
    return this.legalPersonRepository.save(legalPerson)
  }

  async remove(id: number): Promise<void> {
    await this.legalPersonRepository.delete(id)
  }
}
