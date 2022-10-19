import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Customer } from 'domains/customer/customer/customer.entity'
import { ICustomer } from 'domains/customer/customer/customer.types'
import { Repository } from 'typeorm'

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
    if (!customer) {
      throw new NotFoundException('Customer not found')
    }
    return customer
  }

  create(customer: ICustomer): Promise<Customer> {
    return this.customersRepository.save(customer)
  }

  async update(id: number, newCustomer: ICustomer): Promise<ICustomer> {
    const customer = await this.findOne(id)
    Object.assign(customer, newCustomer)
    return this.customersRepository.save(customer)
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id)
  }
}
