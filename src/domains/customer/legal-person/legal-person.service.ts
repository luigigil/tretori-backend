import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ILegalPerson } from '../common/customer.types'
import { LegalPerson } from './legal-person.entity'

@Injectable()
export class LegalPersonService {
  constructor(
    @InjectRepository(LegalPerson)
    private readonly legalPersonRepository: Repository<LegalPerson>
  ) {}

  findAll(): Promise<LegalPerson[]> {
    return this.legalPersonRepository.find()
  }

  findOne(id: number): Promise<LegalPerson> {
    const legalPerson = this.legalPersonRepository.findOne({
      where: { id },
      relations: {
        contracts: true,
      },
    })
    if (!legalPerson) {
      throw new NotFoundException('Customer not found')
    }
    return legalPerson
  }

  create(legalPerson: ILegalPerson): Promise<LegalPerson> {
    legalPerson.type = 'customer'
    return this.legalPersonRepository.save(legalPerson)
  }

  async update(id: number, legalPerson: ILegalPerson): Promise<void> {
    if (legalPerson.type != 'customer') {
      throw new BadRequestException('Entity is not a customer')
    }
    await this.legalPersonRepository.update(id, legalPerson)
  }

  async remove(id: number): Promise<void> {
    const legalPerson = await this.findOne(id)
    try {
      await this.legalPersonRepository.delete(id)
    } catch (e) {
      throw new NotFoundException('Legal person not found')
    }
  }
}
