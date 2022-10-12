import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LegalPerson } from 'domains/customer/legal-person/legal-person.entity'
import { Repository } from 'typeorm'
import { ConsultCompany, ICompany } from './company.types'

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(LegalPerson)
    private readonly legalPersonRepository: Repository<LegalPerson>
  ) {}

  findAll(): Promise<ConsultCompany[]> {
    return this.legalPersonRepository.find()
  }

  async findOne(id: number): Promise<LegalPerson> {
    const company = await this.legalPersonRepository.findOne({
      where: { id },
    })
    if (!company) {
      throw new NotFoundException('Company not found')
    }
    return company
  }

  create(company: ICompany): Promise<LegalPerson> {
    if (company.type === 'customer') {
      throw new BadRequestException('Company is a customer')
    }
    return this.legalPersonRepository.save(company)
  }

  async update(id: number, company: ICompany): Promise<void> {
    if (company.type === 'customer') {
      throw new BadRequestException('Company is a customer')
    }
    await this.legalPersonRepository.update(id, company)
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id)
    try {
      await this.legalPersonRepository.remove(company)
    } catch (e) {
      throw new NotFoundException('Error removing entity: ', e)
    }
  }
}
