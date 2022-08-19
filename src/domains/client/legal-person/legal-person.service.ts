import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ILegalPerson } from '../common/client.types'
import { LegalPerson } from './legal_person.entity'

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
    return this.legalPersonRepository.findOneBy({ id })
  }

  create(legalPerson: ILegalPerson): Promise<LegalPerson> {
    return this.legalPersonRepository.save(legalPerson)
  }

  async update(id: number, legalPerson: ILegalPerson): Promise<void> {
    await this.legalPersonRepository.update(id, legalPerson)
  }

  async remove(id: number): Promise<void> {
    await this.legalPersonRepository.delete(id)
  }
}
