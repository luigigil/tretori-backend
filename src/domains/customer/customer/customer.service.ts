import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ICustomer } from './customer.types'
import { Customer } from './customer.entity'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find()
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customersRepository.findOne({
      where: { id },
      relations: {
        physical_person: true,
        legal_person: true,
      },
    })
    return customer
  }

  create(customer: ICustomer): Promise<Customer> {
    return this.customersRepository.save(customer)
  }

  async update(id: number, customer: ICustomer): Promise<void> {
    await this.customersRepository.update(id, customer)
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id)
  }
}
