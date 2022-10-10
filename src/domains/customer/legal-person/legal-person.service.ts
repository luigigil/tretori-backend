import { BadRequestException, Injectable } from '@nestjs/common'
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
    return this.legalPersonRepository.findOne({
      where: { id },
      relations: {
        contracts: true,
      },
    })
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
    await this.legalPersonRepository.delete(id)
  }
}
